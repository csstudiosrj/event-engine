import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createPaymentLink } from '@/lib/pagarme'
import { PRODUCTS, hasActivePlan, type ProductId } from '@/lib/plans'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const productId = body?.product as ProductId
  const product = PRODUCTS[productId]
  if (!product) return NextResponse.json({ error: 'produto_invalido' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'login' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (!profile) return NextResponse.json({ error: 'perfil_inexistente' }, { status: 400 })

  if (product.kind === 'subscription' && hasActivePlan(profile) && profile.pagarme_subscription_id) {
    return NextResponse.json({ error: 'plano_ativo' }, { status: 409 })
  }

  const admin = createAdminClient()
  const { data: payment, error } = await admin
    .from('payments')
    .insert({ user_id: user.id, product: product.id, amount_cents: product.amountCents })
    .select('id')
    .single()
  if (error || !payment) return NextResponse.json({ error: 'registro' }, { status: 500 })

  try {
    const link = await createPaymentLink(product.id, payment.id, { userId: user.id, name: profile.name ?? '', email: profile.email })
    await admin.from('payments').update({ pagarme_link_id: link.id }).eq('id', payment.id)
    return NextResponse.json({ url: link.url })
  } catch (e) {
    console.error('[checkout]', e)
    await admin.from('payments').update({ status: 'canceled' }).eq('id', payment.id)
    return NextResponse.json({ error: 'pagarme' }, { status: 502 })
  }
}
