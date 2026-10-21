'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Archive, ArrowRight, CalendarDays, CheckCircle2, ChevronRight, FileText, History, LayoutDashboard, LockKeyhole, MapPin, Plus, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useApp } from '@/components/app-shell'
import { toast } from '@/components/ui/toast'
import { createClient } from '@/lib/supabase/client'
import { CATALOG, getCalculatorTitle } from '@/lib/calculators/catalog'
import { hasActivePlan, planLabel } from '@/lib/plans'
import type { CalcResult, Event } from '@/lib/supabase/types'

const tabs = [
  { label: 'Calculadoras', icon: LayoutDashboard },
  { label: 'Histórico', icon: History },
]

const formatDate = (date: string) => new Date(date + 'T12:00').toLocaleDateString('pt-BR')

function PainelContent() {
  const { profile, loading } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedId = searchParams.get('evento')
  const [supabase] = useState(() => createClient())
  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [results, setResults] = useState<CalcResult[]>([])
  const [tab, setTab] = useState('Calculadoras')

  useEffect(() => {
    if (!profile) return
    supabase
      .from('events')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setEvents(data ?? []); setLoadingEvents(false) })
  }, [profile?.id, supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  const selectedEvent = events.find((e) => e.id === selectedId) ?? null

  useEffect(() => {
    if (!selectedEvent) { setResults([]); return }
    supabase
      .from('calc_results')
      .select('*')
      .eq('event_id', selectedEvent.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setResults(data ?? []))
  }, [selectedEvent?.id, supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  const archive = async (event: Event) => {
    if (!confirm(`Arquivar "${event.name}"? Ele sai da lista de eventos ativos, mas os cálculos continuam no seu histórico.`)) return
    const { error } = await supabase.from('events').update({ status: 'archived' }).eq('id', event.id)
    if (error) { toast('Não foi possível arquivar. Tente novamente.', 'error'); return }
    setEvents((list) => list.filter((e) => e.id !== event.id))
    router.push('/painel')
  }

  if (!loading && !profile) {
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10"><p>Entre para ver seu painel. <Link href="/auth/login?redirectTo=/painel" className="font-semibold text-amber-700 underline">Entrar</Link></p></main>
  }

  const latestBySlug = new Map<string, CalcResult>()
  for (const r of results) if (!latestBySlug.has(r.calc_name)) latestBySlug.set(r.calc_name, r)
  const planoAtivo = hasActivePlan(profile)

  return <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-8 lg:px-8 lg:pt-10">
    {selectedEvent === null ? <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-amber-600">Painel · plano {planLabel(profile)}{!planoAtivo && profile ? ` · ${profile.credits} crédito(s)` : ''}</p>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{loading ? 'Carregando...' : `Olá, ${profile?.name?.split(' ')[0] || 'organizador'}`}</h1>
          <p className="mt-2 text-slate-600">Crie um evento para calcular tudo com os mesmos dados e guardar o histórico.</p>
        </div>
        <ButtonLink href="/painel/eventos/novo" className="h-10 bg-[#0F1B33] text-white hover:bg-[#1b2b4c]"><Plus className="size-4" /> Novo evento</ButtonLink>
      </div>

      {loadingEvents ? (
        <div className="grid gap-4 lg:grid-cols-2">{[1, 2].map((i) => <Card key={i} className="animate-pulse border-slate-200"><CardContent className="h-40 p-5" /></Card>)}</div>
      ) : events.length === 0 ? (
        <Card className="border-dashed border-slate-300"><CardContent className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-slate-100"><CalendarDays className="size-7 text-slate-400" /></div>
          <div><h2 className="font-semibold text-slate-700">Nenhum evento ainda</h2><p className="mt-1 text-sm text-slate-500">Crie seu primeiro evento ou use as calculadoras avulsas pelo catálogo.</p></div>
          <div className="flex flex-wrap justify-center gap-2">
            <ButtonLink href="/painel/eventos/novo" className="h-10 bg-[#0F1B33] text-white hover:bg-[#1b2b4c]"><Plus className="size-4" /> Criar primeiro evento</ButtonLink>
            <ButtonLink href="/#calculadoras" variant="outline" className="h-10">Ver calculadoras</ButtonLink>
          </div>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">{events.map((item) => <Card key={item.id} className="border-slate-200 transition-shadow hover:shadow-md"><CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                {item.date && <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(item.date)}</span>}
                {item.city && <span className="flex items-center gap-1"><MapPin className="size-4" />{item.city}, {item.state}</span>}
              </div>
            </div>
            <Badge variant="outline" className="shrink-0 border-emerald-200 bg-emerald-50 text-emerald-700">Ativo</Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Público: <strong className="text-slate-700">{item.pax.toLocaleString('pt-BR')} pessoas</strong></p>
            <ButtonLink href={`/painel?evento=${item.id}`} variant="ghost" size="sm">Abrir <ChevronRight className="size-4" /></ButtonLink>
          </div>
        </CardContent></Card>)}</div>
      )}
    </> : <>
      <Link href="/painel" className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33]"><ArrowRight className="size-4 rotate-180" /> Voltar para meus eventos</Link>

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-amber-600">Meu evento</p>
          <h1 className="text-3xl font-bold">{selectedEvent.name}</h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            {selectedEvent.date && <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(selectedEvent.date)}</span>}
            {selectedEvent.city && <span className="flex items-center gap-1"><MapPin className="size-4" />{selectedEvent.city}, {selectedEvent.state}</span>}
            <span className="flex items-center gap-1"><Users className="size-4" />{selectedEvent.pax.toLocaleString('pt-BR')} pessoas</span>
          </div>
        </div>
        <Button variant="outline" className="h-9" onClick={() => archive(selectedEvent)}><Archive className="size-4" /> Arquivar evento</Button>
      </div>

      <div className="mb-7 flex gap-1 overflow-x-auto border-b border-slate-200">{tabs.map(({ label, icon: Icon }) => <button key={label} onClick={() => setTab(label)} className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === label ? 'border-amber-500 text-[#0F1B33]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}><Icon className="size-4" />{label}</button>)}</div>

      {tab === 'Calculadoras' && <section>
        <p className="mb-4 text-sm text-slate-500">{latestBySlug.size} de {CATALOG.length} calculadoras feitas para este evento. Os dados do evento já vêm preenchidos.</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{CATALOG.map(({ titulo, slug, categoria }) => {
          const last = latestBySlug.get(slug)
          const travada = categoria === 'estrategica' && !planoAtivo
          return <Card key={slug} className="border-slate-200"><CardContent className="flex min-h-32 flex-col justify-between gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{titulo}</h3>
              {last ? <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700"><CheckCircle2 className="size-4" /> Calculado</span>
                : travada ? <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-slate-500"><LockKeyhole className="size-4" /> Solo/Pro</span>
                : <span className="shrink-0 text-xs font-medium text-slate-400">Não calculado</span>}
            </div>
            <div className="flex items-end justify-between gap-3">
              <p className="text-xs text-slate-400">{last ? `Em ${new Date(last.created_at).toLocaleDateString('pt-BR')}` : ''}</p>
              <div className="flex gap-2">
                {last && <ButtonLink href={`/historico/${last.id}`} variant="ghost" size="sm">Ver</ButtonLink>}
                <ButtonLink href={`/calculadoras/${slug}?evento=${selectedEvent.id}`} variant="outline" size="sm">{last ? 'Recalcular' : 'Calcular'}</ButtonLink>
              </div>
            </div>
          </CardContent></Card>
        })}</div>
      </section>}

      {tab === 'Histórico' && <section>
        <h2 className="mb-4 text-xl font-bold">Histórico de cálculos</h2>
        {results.length === 0 ? <Card className="border-dashed border-slate-300"><CardContent className="flex flex-col items-center gap-3 py-16 text-center"><FileText className="size-10 text-slate-300" /><p className="text-sm text-slate-500">Nenhum cálculo salvo ainda para este evento.</p></CardContent></Card>
          : <Card className="border-slate-200"><CardContent className="flex flex-col gap-3 p-5 text-sm">{results.map((r) => <div key={r.id} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><div><p className="font-semibold">{getCalculatorTitle(r.calc_name)}</p><p className="text-xs text-slate-500">{new Date(r.created_at).toLocaleString('pt-BR')}</p></div><Link href={`/historico/${r.id}`} className="shrink-0 text-amber-700 underline">Ver resultado</Link></div>)}</CardContent></Card>}
      </section>}
    </>}
  </main>
}

export default function PainelPage() {
  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]"><Header /><Suspense><PainelContent /></Suspense><Footer /></div>
}
