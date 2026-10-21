import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CalculatorFlow, type CalculatorDef } from '@/components/calculator-flow'
import { CALCULATORS, getCalculator } from '@/lib/calculators'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = getCalculator((await params).slug)
  if (!calc) return {}
  return { title: `${calc.titulo} — Calculadora Normato`, description: `${calc.sub}. Dimensionamento para eventos com memória de cálculo e referências normativas.` }
}

export default async function CalculatorPage({ params }: Props) {
  const calc = getCalculator((await params).slug)
  if (!calc) notFound()

  // Só dados serializáveis vão para o navegador; a fórmula roda em /api/calcular
  const def: CalculatorDef = { slug: calc.slug, titulo: calc.titulo, sub: calc.sub, categoria: calc.categoria, campos: calc.campos }

  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
    <div className="print:hidden"><Header /></div>
    <main className="flex-1">
      <Suspense><CalculatorFlow def={def} /></Suspense>
    </main>
    <div className="print:hidden"><Footer /></div>
  </div>
}
