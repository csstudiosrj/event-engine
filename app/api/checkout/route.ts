import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPaymentLink } from '@/lib/pagarme'
import { createMercadoPagoCheckout } from '@/lib/mercadopago'
import { activeProvider } from '@/lib/payments'
import { checkoutName, hasActivePlan } from '@/lib/plans'
import { getPlan } from '@/lib/catalogo'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Informa à página de preços se há pagamento disponível e por qual provedor
export async function GET() {
  return NextResponse.json({ provider: activeProvider() })
}

export async function POST(request: Request) {
  const provider = activeProvider()
  if (!provider) return NextResponse.json({ error: 'indisponivel' }, { status: 503 })

  const body = await request.json().catch(() => null)
  const product = typeof body?.product === 'string' ? await getPlan(body.product) : null
  if (!product || !product.active) return NextResponse.json({ error: 'produto_invalido' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'login' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'perfil_inexistente' }, { status: 400 })

  if (product.kind === 'subscription' && hasActivePlan(profile) && profile.subscription_id) {
    return NextResponse.json({ error: 'plano_ativo' }, { status: 409 })
  }

  // No Mercado Pago a assinatura fica presa ao e-mail da conta MP de quem paga
  const payerEmail = typeof body?.payerEmail === 'string' && EMAIL.test(body.payerEmail.trim()) ? body.payerEmail.trim() : profile.email

  const admin = createAdminClient()
  const base = { user_id: user.id, product: product.id, amount_cents: product.amount_cents, provider }
  let { data: payment, error } = await admin
    .from('payments')
    .insert({ ...base, kind: product.kind, credits: product.credits, description: checkoutName(product) })
    .select('id')
    .single()
  // Banco ainda sem as colunas do super admin (20261029_super_admin.sql): grava só o básico
  if (error?.message?.includes('column')) {
    ({ data: payment, error } = await admin.from('payments').insert(base).select('id').single())
  }
  if (error || !payment) {
    console.error('[checkout] registro', error)
    return NextResponse.json({ error: 'registro' }, { status: 500 })
  }

  try {
    if (provider === 'mercadopago') {
      const checkout = await createMercadoPagoCheckout(product, payment.id, payerEmail)
      await admin.from('payments').update({ external_id: checkout.externalId }).eq('id', payment.id)
      return NextResponse.json({ url: checkout.url })
    }
    const link = await createPaymentLink(product, payment.id, { userId: user.id, name: profile.name ?? '', email: profile.email })
    await admin.from('payments').update({ pagarme_link_id: link.id, external_id: link.id }).eq('id', payment.id)
    return NextResponse.json({ url: link.url })
  } catch (e) {
    console.error('[checkout]', provider, e)
    await admin.from('payments').update({ status: 'canceled' }).eq('id', payment.id)
    return NextResponse.json({ error: 'provedor' }, { status: 502 })
  }
}
