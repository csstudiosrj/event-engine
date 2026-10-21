import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { pagarme } from '@/lib/pagarme'
import { cancelMercadoPagoSubscription } from '@/lib/mercadopago'

// Cancela a renovação automática. O acesso continua até o fim do período pago
// (plan_expires_at), porque não haverá nova cobrança para renová-lo.
export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'login' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('subscription_id, subscription_provider').eq('id', user.id).single()
  const subscriptionId = profile?.subscription_id
  if (!subscriptionId) return NextResponse.json({ error: 'sem_assinatura' }, { status: 400 })

  try {
    if (profile.subscription_provider === 'mercadopago') await cancelMercadoPagoSubscription(subscriptionId)
    else await pagarme(`/subscriptions/${subscriptionId}`, { method: 'DELETE', body: { cancel_pending_invoices: true } })
  } catch (e) {
    console.error('[cancelar]', e)
    return NextResponse.json({ error: 'provedor' }, { status: 502 })
  }

  await createAdminClient().from('profiles').update({ subscription_id: null, pagarme_subscription_id: null }).eq('id', user.id)
  return NextResponse.json({ ok: true })
}
