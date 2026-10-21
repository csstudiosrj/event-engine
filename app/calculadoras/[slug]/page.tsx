import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CalculatorFlow, type CalculatorDef } from '@/components/calculator-flow'
import { CALCULATORS, getCalculator } from '@/lib/calculators'
import { CALCULATOR_SEO } from '@/lib/calculators/seo'
import { normDatabase, type Regra } from '@/lib/norm_database'
import { canonical, pageMetadata, CANONICAL_URL } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const calc = getCalculator((await params).slug)
  if (!calc) return {}
  const seo = CALCULATOR_SEO[calc.slug]
  return pageMetadata({
    title: seo ? `${seo.metaTitle} | Normato` : `${calc.titulo} — Calculadora Normato`,
    description: seo?.metaDescription ?? `${calc.sub}. Dimensionamento para eventos com memória de cálculo e referências normativas.`,
    path: `/calculadoras/${calc.slug}`,
  })
}

const GRUPOS: { titulo: string; filtro: (r: Regra) => boolean }[] = [
  { titulo: 'Todo o Brasil', filtro: (r) => !r.ufs },
  { titulo: 'São Paulo', filtro: (r) => !!r.ufs?.includes('SP') },
  { titulo: 'Rio de Janeiro', filtro: (r) => !!r.ufs?.includes('RJ') },
]

export default async function CalculatorPage({ params }: Props) {
  const calc = getCalculator((await params).slug)
  if (!calc) notFound()

  // Só dados serializáveis vão para o navegador; a fórmula roda em /api/calcular
  const def: CalculatorDef = { slug: calc.slug, titulo: calc.titulo, sub: calc.sub, categoria: calc.categoria, campos: calc.campos }
  const seo = CALCULATOR_SEO[calc.slug]
  const regras = (normDatabase[calc.normSlug]?.regras ?? []).filter((r) => r.veredito !== 'incorreto')
  const url = canonical(`/calculadoras/${calc.slug}`)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${seo?.h1 ?? calc.titulo} — Normato`,
      url,
      description: seo?.metaDescription ?? calc.sub,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL', description: '1 cálculo grátis ao criar a conta' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Normato', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Calculadoras', item: `${CANONICAL_URL}/#calculadoras` },
        { '@type': 'ListItem', position: 3, name: calc.titulo, item: url },
      ],
    },
    ...(seo ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    }] : []),
  ]

  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <div className="print:hidden"><Header /></div>
    <main className="flex-1">
      <header className="mx-auto max-w-7xl px-4 pt-6 lg:px-8 lg:pt-8">
        <nav aria-label="Trilha" className="mb-3 text-xs text-slate-500 print:hidden"><Link href="/" className="hover:text-[#0F1B33]">Normato</Link> › <Link href="/#calculadoras" className="hover:text-[#0F1B33]">Calculadoras</Link> › <span className="text-slate-700">{calc.titulo}</span></nav>
        <h1 className="text-3xl font-bold tracking-tight">{seo?.h1 ?? calc.titulo}</h1>
        <p className="mt-1 max-w-3xl text-slate-600">{seo?.intro[0] ?? calc.sub}</p>
      </header>

      <Suspense><CalculatorFlow def={def} /></Suspense>

      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8 print:hidden">
        {seo && <section className="mt-6">
          <h2 className="text-2xl font-bold">Como a calculadora de {calc.titulo.toLowerCase()} funciona</h2>
          {seo.intro.slice(1).map((p) => <p key={p} className="mt-3 leading-7 text-slate-700">{p}</p>)}
          <h3 className="mt-6 text-lg font-semibold">Dados que você informa</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
            <li>Estado e cidade do evento (definem as normas aplicadas)</li>
            {calc.campos.map((c) => <li key={c.key}>{c.label}</li>)}
          </ul>
        </section>}

        {regras.length > 0 && <section className="mt-10">
          <h2 className="text-2xl font-bold">Normas e referências aplicadas</h2>
          <p className="mt-2 text-sm text-slate-600">Cada número do resultado mostra a regra usada. Quando não há norma, o Normato indica que se trata de referência técnica ou de mercado.</p>
          {GRUPOS.map((g) => {
            const lista = regras.filter(g.filtro)
            if (!lista.length) return null
            return <div key={g.titulo} className="mt-6">
              <h3 className="text-lg font-semibold">{g.titulo}</h3>
              <ul className="mt-3 space-y-3">{lista.map((r) => <li key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-sm leading-6 text-slate-700">{r.descricao}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {r.estimativa_operacional ? 'Referência técnica · ' : ''}{r.fonte}{r.dispositivo ? `, ${r.dispositivo}` : ''}
                  {r.url_oficial && <> · <a href={r.url_oficial} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-amber-700 hover:underline">fonte <ExternalLink className="size-3" /></a></>}
                </p>
              </li>)}</ul>
            </div>
          })}
        </section>}

        {seo && <section className="mt-10">
          <h2 className="text-2xl font-bold">Perguntas frequentes</h2>
          <div className="mt-4 space-y-3">{seo.faq.map(([q, a]) => <details key={q} className="group rounded-lg border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold">{q}</summary>
            <p className="mt-2 leading-7 text-slate-700">{a}</p>
          </details>)}</div>
        </section>}

        <p className="mt-10 text-xs leading-5 text-slate-500">O Normato dá estimativas e referências para planejar. Projetos, laudos e responsabilidade técnica são de profissionais habilitados, e a aprovação é dos órgãos competentes.</p>
      </div>
    </main>
    <div className="print:hidden"><Footer /></div>
  </div>
}
