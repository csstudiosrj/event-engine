// Produtos à venda e regras de acesso às calculadoras.
// Preços, nomes e pacotes ficam na tabela `plans` (editados no super admin);
// DEFAULT_PLANS só vale enquanto a tabela não existe.

import type { Profile } from '@/lib/supabase/types'

export type ProductId = string

export type Plan = {
  id: ProductId
  kind: 'credits' | 'subscription'
  name: string
  description: string
  amount_cents: number
  credits: number | null
  features: string[]
  highlight: boolean
  active: boolean
  sort: number
}

export const DEFAULT_PLANS: Plan[] = [
  { id: 'creditos_5', kind: 'credits', name: 'Créditos', description: 'Pague só quando usar as calculadoras Essenciais.', amount_cents: 490, credits: 5, features: ['1 crédito por cálculo Essencial', 'Pix ou cartão', 'Créditos não expiram', 'Sem assinatura'], highlight: false, active: true, sort: 10 },
  { id: 'solo', kind: 'subscription', name: 'Solo', description: 'Para organizar um evento com confiança.', amount_cents: 2990, credits: null, features: ['Cálculos ilimitados', 'Calculadoras Essenciais e Estratégicas', '1 evento ativo no painel', 'Histórico de cálculos', 'Cancele quando quiser'], highlight: true, active: true, sort: 20 },
  { id: 'pro', kind: 'subscription', name: 'Pro', description: 'Para quem gerencia vários eventos.', amount_cents: 4990, credits: null, features: ['Tudo do plano Solo', 'Eventos ativos ilimitados', 'Histórico completo por evento', 'Cancele quando quiser'], highlight: false, active: true, sort: 30 },
]

export const DEFAULT_SIGNUP_CREDITS = 1

// Nome que aparece no checkout, na fatura do cartão e no histórico de compras
export function checkoutName(plan: Pick<Plan, 'kind' | 'name' | 'credits'>) {
  return plan.kind === 'credits' ? `Normato — ${plan.credits} créditos` : `Normato ${plan.name} (mensal)`
}

export function formatBRL(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
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
