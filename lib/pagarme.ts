// Cliente mínimo da API v5 do Pagar.me (https://api.pagar.me/core/v5).
// Autenticação: Basic com a chave secreta como usuário e senha vazia.

import { PRODUCTS, type ProductId } from '@/lib/plans'
import { SITE_URL } from '@/lib/config'

const API = 'https://api.pagar.me/core/v5'

export class PagarmeError extends Error {
  constructor(public status: number, public body: unknown) {
    super(`Pagar.me ${status}: ${JSON.stringify(body).slice(0, 500)}`)
  }
}

export async function pagarme<T = Record<string, any>>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const key = process.env.PAGARME_SECRET_KEY
  if (!key) throw new Error('PAGARME_SECRET_KEY não configurada')
  const res = await fetch(API + path, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${key}:`).toString('base64'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: 'no-store',
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new PagarmeError(res.status, body)
  return body as T
}

export function planIdFor(product: ProductId) {
  if (product === 'solo') return process.env.PAGARME_PLAN_SOLO_ID
  if (product === 'pro') return process.env.PAGARME_PLAN_PRO_ID
  return undefined
}

export function productForPlanId(planId: string | undefined): 'solo' | 'pro' | null {
  if (!planId) return null
  if (planId === process.env.PAGARME_PLAN_SOLO_ID) return 'solo'
  if (planId === process.env.PAGARME_PLAN_PRO_ID) return 'pro'
  return null
}

type Customer = { userId: string; name: string; email: string }

// Cria um link de pagamento de uso único. O `paymentId` (nosso id interno) vai
// em `order_code` para o webhook encontrar a compra de volta.
export async function createPaymentLink(productId: ProductId, paymentId: string, customer: Customer) {
  const product = PRODUCTS[productId]
  const isSubscription = product.kind === 'subscription'
  const planId = planIdFor(productId)
  if (isSubscription && !planId) throw new Error(`Plano ${productId} sem PAGARME_PLAN_*_ID configurado`)

  const body = {
    name: product.name.slice(0, 64),
    type: isSubscription ? 'subscription' : 'order',
    order_code: paymentId,
    max_paid_sessions: 1,
    expires_in: 60 * 24,
    payment_settings: isSubscription
      ? {
          accepted_payment_methods: ['credit_card'],
          statement_descriptor: 'NORMATO',
          credit_card_settings: { operation_type: 'auth_and_capture' },
        }
      : {
          accepted_payment_methods: ['pix', 'credit_card'],
          statement_descriptor: 'NORMATO',
          pix_settings: { expires_in: 60 * 60 },
          credit_card_settings: { operation_type: 'auth_and_capture', installments: [{ number: 1, total: product.amountCents }] },
        },
    // Pix exige CPF/CNPJ e telefone do comprador. Na compra avulsa não enviamos
    // o cliente, e o checkout do Pagar.me pede todos os dados. Na assinatura o
    // `code` liga a recorrência ao usuário do Normato nas renovações.
    ...(isSubscription
      ? {
          customer_settings: {
            customer: {
              name: (customer.name || customer.email.split('@')[0]).slice(0, 64),
              email: customer.email.slice(0, 64),
              type: 'individual',
              code: customer.userId,
            },
          },
        }
      : {}),
    cart_settings: isSubscription
      ? { recurrences: [{ plan_id: planId }] }
      : { items: [{ name: product.name, amount: product.amountCents, default_quantity: 1 }] },
    layout_settings: { primary_color: '#0B1F3A', secondary_color: '#E8A020' },
    flow_settings: { success_url: `${SITE_URL}/conta?pagamento=ok` },
  }

  return pagarme<{ id: string; url: string }>('/paymentlinks', { method: 'POST', body })
}

// Procura, em qualquer nível do objeto, strings que satisfaçam o teste.
// Usado para achar o id do link de pagamento dentro do pedido/assinatura,
// cujo formato exato não é documentado.
export function findStrings(value: unknown, test: (s: string) => boolean, found = new Set<string>()): Set<string> {
  if (typeof value === 'string') { if (test(value)) found.add(value) }
  else if (Array.isArray(value)) value.forEach((v) => findStrings(v, test, found))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => findStrings(v, test, found))
  return found
}
