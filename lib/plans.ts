// Produtos à venda e regras de acesso às calculadoras.

import type { Profile } from '@/lib/supabase/types'

export type ProductId = 'creditos_5' | 'solo' | 'pro'

export type Product = {
  id: ProductId
  name: string
  amountCents: number
  kind: 'credits' | 'subscription'
  credits?: number
}

export const PRODUCTS: Record<ProductId, Product> = {
  creditos_5: { id: 'creditos_5', name: 'Normato — 5 créditos', amountCents: 490, kind: 'credits', credits: 5 },
  solo: { id: 'solo', name: 'Normato Solo (mensal)', amountCents: 2990, kind: 'subscription' },
  pro: { id: 'pro', name: 'Normato Pro (mensal)', amountCents: 4990, kind: 'subscription' },
}

export const CALC_COST = 1

// Dias de tolerância após o vencimento da mensalidade antes de cortar o acesso,
// para cobrir atraso na renovação automática do cartão.
export const PLAN_GRACE_DAYS = 3

type PlanFields = Pick<Profile, 'plan' | 'plan_expires_at'>

export function hasActivePlan(profile: PlanFields | null | undefined) {
  if (!profile || (profile.plan !== 'solo' && profile.plan !== 'pro')) return false
  if (!profile.plan_expires_at) return false
  return new Date(profile.plan_expires_at).getTime() > Date.now()
}

export function maxActiveEvents(profile: PlanFields | null | undefined) {
  if (hasActivePlan(profile) && profile!.plan === 'pro') return Infinity
  return 1
}

export function planLabel(profile: PlanFields | null | undefined) {
  if (hasActivePlan(profile)) return profile!.plan === 'pro' ? 'Pro' : 'Solo'
  return 'Grátis'
}
