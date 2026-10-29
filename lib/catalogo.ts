// Leitura de planos e configurações no servidor (tabelas `plans` e `app_settings`).
import { createAdminClient } from '@/lib/supabase/admin'
import { DEFAULT_PLANS, DEFAULT_SIGNUP_CREDITS, type Plan } from '@/lib/plans'

function db() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL ? createAdminClient() : null
}

// Todos os planos (inclusive inativos), em ordem de exibição
export async function getPlans(): Promise<Plan[]> {
  const admin = db()
  if (!admin) return DEFAULT_PLANS
  const { data, error } = await admin.from('plans').select('*').order('sort').order('amount_cents')
  if (error || !data?.length) return DEFAULT_PLANS
  return data as Plan[]
}

export async function getActivePlans() {
  return (await getPlans()).filter((p) => p.active)
}

export async function getPlan(id: string) {
  return (await getPlans()).find((p) => p.id === id) ?? null
}

export async function getSignupCredits(): Promise<number> {
  const admin = db()
  if (!admin) return DEFAULT_SIGNUP_CREDITS
  const { data } = await admin.from('app_settings').select('value').eq('key', 'signup_credits').maybeSingle()
  const n = Number(data?.value)
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_SIGNUP_CREDITS
}
