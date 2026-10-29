// Cliente mínimo da API do Mercado Pago (https://api.mercadopago.com).
// Créditos: Checkout Pro (preferências). Planos: assinaturas sem plano associado (preapproval).

import { createHmac, timingSafeEqual } from 'crypto'
import { checkoutName, type Plan } from '@/lib/plans'
import { SITE_URL } from '@/lib/config'

const API = 'https://api.mercadopago.com'

export class MercadoPagoError extends Error {
  constructor(public status: number, public body: unknown) {
    super(`Mercado Pago ${status}: ${JSON.stringify(body).slice(0, 500)}`)
  }
}

export async function mercadopago<T = Record<string, any>>(path: string, init: { method?: string; body?: unknown; idempotencyKey?: string } = {}): Promise<T> {
  const token = process.env.MP_ACCESS_TOKEN
  if (!token) throw new Error('MP_ACCESS_TOKEN não configurado')
  const res = await fetch(API + path, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.idempotencyKey ? { 'X-Idempotency-Key': init.idempotencyKey } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new MercadoPagoError(res.status, body)
  return body as T
}

type Checkout = { url: string; externalId: string }

// `paymentId` (nosso id interno) vai em external_reference para o webhook achar a compra.
export async function createMercadoPagoCheckout(product: Plan, paymentId: string, payerEmail: string): Promise<Checkout> {
  const nome = checkoutName(product)
  const retorno = `${SITE_URL}/conta?pagamento=ok`

  if (product.kind === 'credits') {
    const pref = await mercadopago<{ id: string; init_point: string }>('/checkout/preferences', {
      method: 'POST',
      idempotencyKey: paymentId,
      body: {
        items: [{ id: product.id, title: nome, quantity: 1, unit_price: product.amount_cents / 100, currency_id: 'BRL' }],
        // Sem payer.email: o comprador entra com a própria conta no checkout, e um
        // e-mail igual ao do vendedor faz o Mercado Pago bloquear a preferência
        external_reference: paymentId,
        back_urls: { success: retorno, pending: retorno, failure: `${SITE_URL}/precos` },
        auto_return: 'approved',
        statement_descriptor: 'NORMATO',
        expires: true,
        expiration_date_to: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      },
    })
    return { url: pref.init_point, externalId: pref.id }
  }

  const sub = await mercadopago<{ id: string; init_point: string }>('/preapproval', {
    method: 'POST',
    idempotencyKey: paymentId,
    body: {
      reason: nome,
      external_reference: paymentId,
      payer_email: payerEmail,
      auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: product.amount_cents / 100, currency_id: 'BRL' },
      back_url: retorno,
      status: 'pending',
    },
  })
  return { url: sub.init_point, externalId: sub.id }
}

// Pix gerado direto (sem checkout): usado pelo super admin para cobrança de teste
// e para reenviar a cobrança de uma compra pendente ao cliente.
export type PixPayment = { id: number; status: string; date_of_expiration?: string; point_of_interaction?: { transaction_data?: { qr_code?: string; qr_code_base64?: string; ticket_url?: string } } }

export async function createMercadoPagoPix(p: { paymentId: string; amountCents: number; description: string; payerEmail: string; attempt: number }) {
  const expira = new Date(Date.now() + 24 * 3600 * 1000)
  return mercadopago<PixPayment>('/v1/payments', {
    method: 'POST',
    idempotencyKey: `pix-${p.paymentId}-${p.attempt}`,
    body: {
      transaction_amount: p.amountCents / 100,
      description: p.description.slice(0, 250),
      payment_method_id: 'pix',
      payer: { email: p.payerEmail },
      external_reference: p.paymentId,
      notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
      date_of_expiration: expira.toISOString().replace('Z', '-00:00'),
    },
  })
}

export async function refundMercadoPagoPayment(mpPaymentId: string, refundKey: string) {
  return mercadopago(`/v1/payments/${encodeURIComponent(mpPaymentId)}/refunds`, { method: 'POST', body: {}, idempotencyKey: refundKey })
}

// Conta Mercado Pago dona do access token configurado (para conferir PF x PJ)
export async function mercadoPagoAccount() {
  return mercadopago<{ id: number; nickname?: string; email?: string; first_name?: string; last_name?: string; identification?: { type?: string; number?: string }; company?: { brand_name?: string; corporate_name?: string } }>('/users/me')
}

export async function cancelMercadoPagoSubscription(preapprovalId: string) {
  await mercadopago(`/preapproval/${preapprovalId}`, { method: 'PUT', body: { status: 'cancelled' } })
}

// Valida o header x-signature: HMAC-SHA256 (hex) do manifesto
// "id:<data.id>;request-id:<x-request-id>;ts:<ts>;" com a assinatura secreta do painel.
// Partes ausentes na notificação saem do manifesto, como manda a documentação.
export function mercadoPagoSignatureOk(xSignature: string | null, xRequestId: string | null, dataId: string | null) {
  const secret = process.env.MP_WEBHOOK_SECRET
  if (!secret || !xSignature) return false
  const parts = Object.fromEntries(xSignature.split(',').map((p) => p.trim().split('=') as [string, string]))
  const ts = parts.ts
  const v1 = parts.v1
  if (!ts || !v1) return false
  let manifest = ''
  if (dataId) manifest += `id:${/^[a-z0-9]+$/i.test(dataId) ? dataId.toLowerCase() : dataId};`
  if (xRequestId) manifest += `request-id:${xRequestId};`
  manifest += `ts:${ts};`
  const expected = createHmac('sha256', secret).update(manifest).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(v1)
  return a.length === b.length && timingSafeEqual(a, b)
}
