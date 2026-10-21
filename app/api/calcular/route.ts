import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getCalculator, regrasAplicaveis, UFS } from '@/lib/calculators'
import { sanitize } from '@/lib/calculators/helpers'
import type { CalcResponse } from '@/lib/calculators/types'
import { CALC_COST, hasActivePlan } from '@/lib/plans'

const err = (error: string, status: number) => NextResponse.json({ error }, { status })

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const calc = getCalculator(String(body?.slug ?? ''))
  if (!calc) return err('calculadora_inexistente', 404)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return err('login', 401)

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, plan_expires_at, credits')
    .eq('id', user.id)
    .single()
  if (!profile) return err('perfil_inexistente', 400)

  const planoAtivo = hasActivePlan(profile)
  if (calc.categoria === 'estrategica' && !planoAtivo) return err('plano', 403)

  const uf = UFS.includes(body?.uf) ? body.uf : 'SP'
  const inputs = sanitize(calc.campos, body?.inputs ?? {})

  let eventId: string | null = null
  if (typeof body?.eventId === 'string' && body.eventId) {
    const { data: event } = await supabase.from('events').select('id').eq('id', body.eventId).maybeSingle()
    eventId = event?.id ?? null
  }

  // Calcula antes de cobrar: se a fórmula falhar, nenhum crédito é debitado.
  const output = calc.calcular(inputs)

  let creditsLeft: number | null = profile.credits
  if (!planoAtivo) {
    const { data, error } = await supabase.rpc('spend_credit', { p_user_id: user.id, p_amount: CALC_COST })
    if (error) return err(error.message.includes('credits_insuficientes') ? 'creditos' : 'debito', error.message.includes('credits_insuficientes') ? 402 : 500)
    creditsLeft = data
  }

  const meta = {
    nome: String(body?.meta?.nome ?? '').slice(0, 120),
    cidade: String(body?.meta?.cidade ?? '').slice(0, 120),
    data: String(body?.meta?.data ?? '').slice(0, 10),
    uf,
  }
  const { data: saved } = await supabase
    .from('calc_results')
    .insert({
      user_id: user.id,
      event_id: eventId,
      calc_name: calc.slug,
      inputs: { ...inputs, ...meta },
      result_json: output,
      credits_used: planoAtivo ? 0 : CALC_COST,
    })
    .select('id')
    .single()

  const response: CalcResponse = {
    ...output,
    slug: calc.slug,
    regras: regrasAplicaveis(calc, uf),
    creditsLeft: planoAtivo ? null : creditsLeft,
    resultId: saved?.id ?? null,
  }
  return NextResponse.json(response)
}
