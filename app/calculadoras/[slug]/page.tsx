import { notFound } from 'next/navigation'
import SanitariosPage from '../sanitarios/page'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LockKeyhole, ArrowLeft } from 'lucide-react'

const strategic = ['equipe-medica', 'seguranca-patrimonial', 'geradores-e-energia', 'residuos', 'insumos', 'ponto-de-equilibrio', 'orcamento-consolidado']
export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === 'sanitarios') return <SanitariosPage />
  if (strategic.includes(slug)) return <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA] p-6"><Card className="max-w-md border-amber-200"><CardContent className="flex flex-col items-center gap-4 p-8 text-center"><LockKeyhole className="text-amber-600" /><h1 className="text-2xl font-bold text-[#0F1B33]">Calculadora Estratégica</h1><p className="text-slate-600">Esta calculadora está disponível nos planos Solo e Pro.</p><Button asChild className="bg-[#0F1B33]"><a href="/precos">Conhecer planos</a></Button><a href="/" className="flex items-center gap-2 text-sm text-slate-500"><ArrowLeft /> Voltar ao catálogo</a></CardContent></Card></main>
  return notFound()
}
