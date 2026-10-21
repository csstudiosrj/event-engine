import { notFound } from 'next/navigation'
import { LockKeyhole, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SanitariosPage from '../sanitarios/page'

// Calculadoras com página própria completa
const ready = ['sanitarios']

// Calculadoras pagas (paywall)
const premium = [
  'equipe-medica',
  'seguranca-patrimonial',
  'geradores-e-energia',
  'residuos',
  'insumos',
  'ponto-de-equilibrio',
  'orcamento-consolidado',
]

// Calculadoras em breve (free, mas ainda não implementadas)
const coming_soon = [
  'publico-maximo',
  'brigada',
  'saidas-emergencia',
  'extintores',
  'tempo-evacuacao',
  'mapa-de-risco',
  'estacionamento',
  'plano-de-evacuacao',
  'alvara',
  'orcamento-seguranca',
  'memorial-descritivo',
  'capacidade-maxima',
  'dimensionamento-geral',
]

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (ready.includes(slug)) {
    if (slug === 'sanitarios') return <SanitariosPage />
  }

  if (premium.includes(slug)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA] p-6">
        <Card className="max-w-md border-amber-200">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <LockKeyhole className="text-amber-600" size={32} />
            <h1 className="text-2xl font-bold text-[#0F1B33]">Calculadora Premium</h1>
            <p className="text-slate-600">
              Esta calculadora está disponível nos planos Solo e Pro.
            </p>
            <Button asChild className="w-full bg-[#0F1B33] hover:bg-[#1b2b4c]">
              <a href="/precos">Conhecer planos</a>
            </Button>
            <a href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <ArrowLeft size={14} /> Voltar ao catálogo
            </a>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (coming_soon.includes(slug)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA] p-6">
        <Card className="max-w-md border-slate-200">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
              🔧
            </div>
            <h1 className="text-2xl font-bold text-[#0F1B33]">Em breve</h1>
            <p className="text-slate-600">
              Esta calculadora está em desenvolvimento e será lançada em breve, gratuitamente.
            </p>
            <a href="/" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <ArrowLeft size={14} /> Voltar ao catálogo
            </a>
          </CardContent>
        </Card>
      </main>
    )
  }

  return notFound()
}
