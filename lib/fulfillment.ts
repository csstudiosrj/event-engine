// Baixa de compras no banco, comum aos webhooks e ao super admin.
import type { createAdminClient } from '@/lib/supabase/admin'
import type { Payment } from '@/lib/supabase/types'

type Admin = ReturnType<typeof createAdminClient>

// Compras antigas não guardavam tipo nem créditos: deduz pelo produto
export function paymentKind(p: Pick<Payment, 'kind' | 'product'>): 'credits' | 'subscription' | 'test' {
  if (p.kind) return p.kind
  return p.product === 'solo' || p.product === 'pro' ? 'subscription' : 'credits'
}

export function paymentCredits(p: Pick<Payment, 'credits' | 'product'>) {
  if (p.credits) return p.credits
  return p.product === 'creditos_5' ? 5 : 0
}

export function paymentDescription(p: Pick<Payment, 'description' | 'product'>) {
  return p.description ?? p.product
}

// Marca a compra como paga e entrega o que foi comprado. A condição status = 'pending'
// garante que os créditos entram uma única vez, mesmo com notificações repetidas.
export async function fulfillPayment(admin: Admin, payment: Payment, extra: Partial<Pick<Payment, 'external_id' | 'pagarme_order_id'>> = {}) {
  const kind = paymentKind(payment)
  if (kind === 'subscription') return 'cobrança de assinatura'

  const { data: updated } = await admin
    .from('payments')
    .update({ status: 'paid', paid_at: new Date().toISOString(), ...extra })
    .eq('id', payment.id)
    .eq('status', 'pending')
    .select('id')
  if (!updated?.length) return 'já processado'
  if (kind === 'test') return 'cobrança de teste paga'

  const { error } = await admin.rpc('grant_credits', {
    p_user_id: payment.user_id,
    p_amount: paymentCredits(payment),
    p_type: 'purchase',
    p_description: paymentDescription(payment),
  })
  if (error) {
    // Reabre a compra para a próxima notificação tentar de novo
    await admin.from('payments').update({ status: 'pending', paid_at: null }).eq('id', payment.id)
    throw error
  }
  return 'créditos liberados'
}
