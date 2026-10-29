import { NextResponse, type NextRequest } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { findStrings, pagarme, productForPlanId } from '@/lib/pagarme'
import { PLAN_GRACE_DAYS } from '@/lib/plans'
import { fulfillPayment, paymentKind } from '@/lib/fulfillment'

// Webhook do Pagar.me. Configurar no painel (Configurações → Webhooks) com a URL
//   https://www.arxum.com.br/normato/api/webhooks/pagarme?token=<PAGARME_WEBHOOK_TOKEN>
// e os eventos order.paid e invoice.paid.
//
// O corpo recebido só serve para saber o que mudou: os dados são sempre
// buscados de novo na API do Pagar.me com a chave secreta, então um webhook
// falsificado não consegue liberar créditos nem planos.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type Admin = ReturnType<typeof createAdminClient>

function tokenOk(received: string | null) {
  const expected = process.env.PAGARME_WEBHOOK_TOKEN
  if (!expected || !received) return false
  const a = Buffer.from(received)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Acha a compra pendente: pelo order_code (nosso id) ou pelo id do link de pagamento.
async function findPayment(admin: Admin, source: unknown, code: string | undefined) {
  if (code && UUID.test(code)) {
    const { data } = await admin.from('payments').select('*').eq('id', code).maybeSingle()
    if (data) return data
  }
  const linkIds = [...findStrings(source, (s) => s.startsWith('pl_'))]
  if (linkIds.length) {
    const { data } = await admin.from('payments').select('*').in('pagarme_link_id', linkIds).limit(1).maybeSingle()
    if (data) return data
  }
  return null
}

async function handleOrderPaid(admin: Admin, orderId: string) {
  const order = await pagarme(`/orders/${orderId}`)
  if (order.status !== 'paid') return 'pedido não pago'

  const payment = await findPayment(admin, order, order.code)
  if (!payment) return 'compra não encontrada'
  if (paymentKind(payment) === 'subscription') return 'não é compra de créditos'
  if (order.amount !== undefined && order.amount < payment.amount_cents) return 'valor divergente'
  return fulfillPayment(admin, payment, { pagarme_order_id: orderId })
}

async function handleInvoicePaid(admin: Admin, invoiceId: string) {
  const invoice = await pagarme(`/invoices/${invoiceId}`)
  if (invoice.status !== 'paid') return 'fatura não paga'
  const subscriptionId: string | undefined = invoice.subscription?.id
  if (!subscriptionId) return 'fatura sem assinatura'

  const subscription = await pagarme(`/subscriptions/${subscriptionId}`)
  const productId = productForPlanId(subscription.plan?.id)
  if (!productId) return 'plano desconhecido'

  // Dono da assinatura: renovação (já vinculada) ou primeira cobrança (compra pendente)
  let userId: string | null = null
  const { data: linked } = await admin.from('profiles').select('id').eq('subscription_id', subscriptionId).maybeSingle()
  if (linked) userId = linked.id

  let payment = null
  if (!userId) {
    payment = await findPayment(admin, subscription, subscription.code)
    const customerCode: string | undefined = subscription.customer?.code
    if (!payment && customerCode && UUID.test(customerCode)) {
      const { data } = await admin.from('payments').select('*').eq('user_id', customerCode).eq('product', productId).eq('status', 'pending').order('created_at', { ascending: false }).limit(1).maybeSingle()
      payment = data
    }
    if (!payment) return 'assinante não encontrado'
    userId = payment.user_id
  }

  const cycleEnd = invoice.cycle?.end_at ?? subscription.next_billing_at
  const base = cycleEnd ? new Date(cycleEnd) : new Date(Date.now() + 31 * 86400000)
  const expiresAt = new Date(base.getTime() + PLAN_GRACE_DAYS * 86400000).toISOString()

  const { error } = await admin
    .from('profiles')
    .update({ plan: productId, plan_expires_at: expiresAt, pagarme_subscription_id: subscriptionId, pagarme_customer_id: subscription.customer?.id ?? null, subscription_provider: 'pagarme', subscription_id: subscriptionId })
    .eq('id', userId)
  if (error) throw error

  if (payment) {
    await admin
      .from('payments')
      .update({ status: 'paid', paid_at: new Date().toISOString(), pagarme_subscription_id: subscriptionId })
      .eq('id', payment.id)
  }
  return `plano ${productId} até ${expiresAt}`
}

export async function POST(request: NextRequest) {
  if (!tokenOk(request.nextUrl.searchParams.get('token'))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const event = await request.json().catch(() => null)
  const type: string = event?.type ?? event?.event ?? ''
  const dataId: string | undefined = event?.data?.id
  const eventId: string = event?.id ?? `${type}:${dataId}`
  if (!dataId) return NextResponse.json({ ok: true, ignored: 'sem data.id' })

  const admin = createAdminClient()
  const { data: seen } = await admin.from('webhook_events').select('id').eq('id', eventId).maybeSingle()
  if (seen) return NextResponse.json({ ok: true, ignored: 'duplicado' })

  try {
    let result = 'ignorado'
    if (type === 'order.paid') result = await handleOrderPaid(admin, dataId)
    else if (type === 'invoice.paid') result = await handleInvoicePaid(admin, dataId)
    await admin.from('webhook_events').insert({ id: eventId, type })
    console.log('[pagarme]', type, dataId, result)
    return NextResponse.json({ ok: true, result })
  } catch (e) {
    // Status 500 faz o Pagar.me reenviar o webhook mais tarde
    console.error('[pagarme]', type, dataId, e)
    return NextResponse.json({ error: 'processing' }, { status: 500 })
  }
}
