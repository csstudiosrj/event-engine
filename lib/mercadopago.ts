// Cliente mínimo da API do Mercado Pago (https://api.mercadopago.com).
// Créditos: Checkout Pro (preferências). Planos: assinaturas sem plano associado (preapproval).

import { createHmac, timingSafeEqual } from 'crypto'
import { PRODUCTS, type ProductId } from '@/lib/plans'
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
export async function createMercadoPagoCheckout(productId: ProductId, paymentId: string, payerEmail: string): Promise<Checkout> {
  const product = PRODUCTS[productId]
  const retorno = `${SITE_URL}/conta?pagamento=ok`

  if (product.kind === 'credits') {
    const pref = await mercadopago<{ id: string; init_point: string }>('/checkout/preferences', {
      method: 'POST',
      idempotencyKey: paymentId,
      body: {
        items: [{ id: product.id, title: product.name, quantity: 1, unit_price: product.amountCents / 100, currency_id: 'BRL' }],
        payer: { email: payerEmail },
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
      reason: product.name,
      external_reference: paymentId,
      payer_email: payerEmail,
      auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: product.amountCents / 100, currency_id: 'BRL' },
      back_url: retorno,
      status: 'pending',
    },
  })
  return { url: sub.init_point, externalId: sub.id }
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
