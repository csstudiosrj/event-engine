import { NextResponse, type NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { mercadopago, mercadoPagoSignatureOk } from '@/lib/mercadopago'
import { PLAN_GRACE_DAYS } from '@/lib/plans'
import { fulfillPayment, paymentKind } from '@/lib/fulfillment'

// Webhook do Mercado Pago. Configurar em Suas integrações → aplicação → Webhooks:
//   URL: https://www.arxum.com.br/normato/api/webhooks/mercadopago
//   Eventos: Pagamentos, Planos e assinaturas
// A assinatura secreta gerada lá vai em MP_WEBHOOK_SECRET.
//
// O corpo da notificação só diz o que mudou: os dados são sempre buscados de
// novo na API com o access token, então uma notificação falsa não libera nada.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type Admin = ReturnType<typeof createAdminClient>

async function paymentByReference(admin: Admin, reference: unknown) {
  if (typeof reference !== 'string' || !UUID.test(reference)) return null
  const { data } = await admin.from('payments').select('*').eq('id', reference).maybeSingle()
  return data
}

async function handlePayment(admin: Admin, paymentId: string) {
  const mp = await mercadopago(`/v1/payments/${paymentId}`)
  if (mp.status !== 'approved') return `pagamento ${mp.status}`

  const payment = await paymentByReference(admin, mp.external_reference)
  if (!payment) return 'compra não encontrada'
  // Cobranças de assinatura chegam também como payment; o plano é tratado pelo preapproval
  if (paymentKind(payment) === 'subscription') return 'cobrança de assinatura'
  if (Math.round(Number(mp.transaction_amount) * 100) < payment.amount_cents) return 'valor divergente'
  return fulfillPayment(admin, payment, { external_id: String(mp.id) })
}

async function handlePreapproval(admin: Admin, preapprovalId: string, cobrancaAprovada: boolean) {
  const pre = await mercadopago(`/preapproval/${preapprovalId}`)
  const payment = await paymentByReference(admin, pre.external_reference)
  if (!payment) return 'assinatura sem compra correspondente'
  if (paymentKind(payment) !== 'subscription' || (payment.product !== 'solo' && payment.product !== 'pro')) return 'não é assinatura'
  const plano = payment.product as 'solo' | 'pro'

  if (pre.status === 'cancelled' || pre.status === 'paused') {
    // O acesso segue até plan_expires_at; só deixa de renovar
    await admin.from('profiles').update({ subscription_id: null }).eq('id', payment.user_id).eq('subscription_id', pre.id)
    return `assinatura ${pre.status}`
  }

  const cobrada = cobrancaAprovada || Number(pre.summarized?.charged_quantity ?? 0) > 0
  if (pre.status !== 'authorized' || !cobrada) return `assinatura ${pre.status}, aguardando cobrança`

  const proxima = pre.next_payment_date ? new Date(pre.next_payment_date) : new Date(Date.now() + 31 * 86400000)
  const expiresAt = new Date(proxima.getTime() + PLAN_GRACE_DAYS * 86400000).toISOString()
  const { error } = await admin
    .from('profiles')
    .update({ plan: plano, plan_expires_at: expiresAt, subscription_provider: 'mercadopago', subscription_id: pre.id })
    .eq('id', payment.user_id)
  if (error) throw error
  await admin.from('payments').update({ status: 'paid', paid_at: new Date().toISOString() }).eq('id', payment.id).eq('status', 'pending')
  return `plano ${plano} até ${expiresAt}`
}

async function handleAuthorizedPayment(admin: Admin, id: string) {
  const ap = await mercadopago(`/authorized_payments/${id}`)
  if (!ap.preapproval_id) return 'cobrança sem assinatura'
  const aprovada = ap.payment?.status === 'approved'
  if (!aprovada) return `cobrança ${ap.payment?.status ?? ap.status}`
  return handlePreapproval(admin, ap.preapproval_id, true)
}

export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const body = await request.json().catch(() => ({}))
  const type: string = body?.type ?? params.get('type') ?? params.get('topic') ?? ''
  const dataId: string | undefined = String(body?.data?.id ?? params.get('data.id') ?? params.get('id') ?? '') || undefined

  // Com assinatura secreta configurada, rejeita notificações sem assinatura válida
  if (process.env.MP_WEBHOOK_SECRET && !mercadoPagoSignatureOk(request.headers.get('x-signature'), request.headers.get('x-request-id'), params.get('data.id') ?? dataId ?? null)) {
    return NextResponse.json({ error: 'assinatura_invalida' }, { status: 401 })
  }
  if (!dataId) return NextResponse.json({ ok: true, ignored: 'sem data.id' })

  const admin = createAdminClient()
  try {
    let result = 'ignorado'
    if (type === 'payment') result = await handlePayment(admin, dataId)
    else if (type === 'subscription_preapproval') result = await handlePreapproval(admin, dataId, false)
    else if (type === 'subscription_authorized_payment') result = await handleAuthorizedPayment(admin, dataId)
    console.log('[mercadopago]', type, dataId, result)
    return NextResponse.json({ ok: true, result })
  } catch (e) {
    // Status 500 faz o Mercado Pago reenviar a notificação mais tarde
    console.error('[mercadopago]', type, dataId, e)
    return NextResponse.json({ error: 'processing' }, { status: 500 })
  }
}
