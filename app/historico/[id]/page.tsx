import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ResultView } from '@/components/calculator-flow'
import { createClient } from '@/lib/supabase/server'
import { getCalculator, regrasAplicaveis } from '@/lib/calculators'
import type { CalcOutput, CalcResponse } from '@/lib/calculators/types'

export const metadata = { title: 'Resultado salvo — Normato', robots: { index: false } }

export default async function HistoricoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  // RLS garante que o usuário só lê os próprios resultados
  const { data } = await supabase.from('calc_results').select('*').eq('id', id).maybeSingle()
  const calc = data ? getCalculator(data.calc_name) : undefined
  if (!data || !calc) notFound()

  const inputs = (data.inputs ?? {}) as Record<string, string>
  const meta = { nome: inputs.nome ?? '', cidade: inputs.cidade ?? '', uf: inputs.uf ?? 'SP', data: inputs.data ?? '' }
  const result: CalcResponse = {
    ...(data.result_json as unknown as CalcOutput),
    slug: calc.slug,
    regras: regrasAplicaveis(calc, meta.uf),
    creditsLeft: null,
    resultId: data.id,
  }

  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
    <div className="print:hidden"><Header /></div>
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <Link href={data.event_id ? `/painel?evento=${data.event_id}` : '/conta'} className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33] print:hidden"><ArrowLeft className="size-4" /> Voltar</Link>
      <p className="text-sm font-medium text-amber-600">{calc.titulo}</p>
      <p className="mb-4 text-xs text-slate-500">Calculado em {new Date(data.created_at).toLocaleString('pt-BR')}</p>
      <ResultView result={result} meta={meta} titulo={calc.titulo} />
    </main>
    <div className="print:hidden"><Footer /></div>
  </div>
}
