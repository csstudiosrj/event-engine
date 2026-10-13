'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight, BarChart3, CalendarDays, CheckCircle2, ChevronRight,
  ClipboardCheck, Clock3, Download, FileText, History, LayoutDashboard,
  MapPin, Plus, ShieldCheck, Users, XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useApp } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/lib/supabase/types'

const tabs = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Cenários', icon: BarChart3 },
  { label: 'Licenciamento', icon: ClipboardCheck },
  { label: 'Histórico', icon: History },
]

const CALCULADORAS = [
  { name: 'Sanitários', slug: 'sanitarios' },
  { name: 'Lotação e capacidade', slug: 'lotacao-e-capacidade' },
  { name: 'Saídas de emergência', slug: 'saidas-de-emergencia' },
  { name: 'Brigada de incêndio', slug: 'brigada-de-incendio' },
  { name: 'Equipe médica', slug: 'equipe-medica' },
  { name: 'Acessibilidade', slug: 'acessibilidade' },
]

function Status({ status }: { status: string }) {
  if (status === 'green') return (
    <span className="flex items-center gap-1 text-xs font-medium text-emerald-700">
      <CheckCircle2 className="size-4" /> Em conformidade
    </span>
  )
  if (status === 'yellow') return (
    <span className="flex items-center gap-1 text-xs font-medium text-amber-700">
      <Clock3 className="size-4" /> Atenção
    </span>
  )
  if (status === 'red') return (
    <span className="flex items-center gap-1 text-xs font-medium text-red-600">
      <XCircle className="size-4" /> Não conforme
    </span>
  )
  return <span className="text-xs font-medium text-slate-400">Não calculado</span>
}

export default function PainelPage() {
  const { profile, loading } = useApp()
  const [events, setEvents] = useState<Event[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [tab, setTab] = useState('Visão geral')
  const supabase = createClient()

  useEffect(() => {
    if (!profile) return
    const fetch = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', profile.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
      setEvents(data ?? [])
      setLoadingEvents(false)
    }
    fetch()
  }, [profile, supabase])

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-8 lg:px-8 lg:pt-10">
        {selectedEvent === null ? (
          <>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-amber-600">Área do assinante</p>
                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  {loading ? 'Carregando...' : `Olá, ${profile?.name?.split(' ')[0] ?? 'visitante'}`}
                </h1>
                <p className="mt-2 text-slate-600">Acompanhe o planejamento dos seus eventos.</p>
              </div>
              <a href="/painel/eventos/novo">
                <Button className="bg-[#0F1B33] hover:bg-[#1b2b4c]">
                  <Plus className="mr-2 size-4" /> Novo evento
                </Button>
              </a>
            </div>

            {loadingEvents ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse border-slate-200">
                    <CardContent className="h-40 p-5" />
                  </Card>
                ))}
              </div>
            ) : events.length === 0 ? (
              <Card className="border-dashed border-slate-300">
                <CardContent className="flex flex-col items-center gap-4 py-20 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-slate-100">
                    <CalendarDays className="size-7 text-slate-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-slate-700">Nenhum evento ainda</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Crie seu primeiro evento para começar a calcular.
                    </p>
                  </div>
                  <a href="/painel/eventos/novo">
                    <Button className="bg-[#0F1B33] hover:bg-[#1b2b4c]">
                      <Plus className="mr-2 size-4" /> Criar primeiro evento
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {events.map((item) => (
                  <Card key={item.id} className="border-slate-200 transition-shadow hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-bold">{item.name}</h2>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                            {item.date && (
                              <span className="flex items-center gap-1">
                                <CalendarDays className="size-4" />
                                {new Date(item.date).toLocaleDateString('pt-BR')}
                              </span>
                            )}
                            {item.city && (
                              <span className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                {item.city}, {item.state}
                              </span>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 shrink-0">
                          Ativo
                        </Badge>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                          Público:{' '}
                          <strong className="text-slate-700">
                            {item.pax.toLocaleString('pt-BR')} pessoas
                          </strong>
                        </p>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(item)}>
                          Abrir <ChevronRight className="ml-1 size-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33]"
            >
              <ArrowRight className="size-4 rotate-180" /> Voltar para meus eventos
            </button>

            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium text-amber-600">Meu evento</p>
                <h1 className="text-3xl font-bold">{selectedEvent.name}</h1>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  {selectedEvent.date && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-4" />
                      {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                  {selectedEvent.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4" />
                      {selectedEvent.city}, {selectedEvent.state}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="size-4" />
                    {selectedEvent.pax.toLocaleString('pt-BR')} pessoas
                  </span>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 size-4" /> Exportar dossiê (PDF)
              </Button>
            </div>

            <div className="mb-7 flex gap-1 overflow-x-auto border-b border-slate-200">
              {tabs.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setTab(label)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    tab === label
                      ? 'border-amber-500 text-[#0F1B33]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>

            {tab === 'Visão geral' && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Calculadoras do evento</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {CALCULADORAS.map(({ name, slug }) => (
                    <Card key={name} className="border-slate-200">
                      <CardContent className="flex min-h-32 flex-col justify-between gap-4 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-[#0F1B33]">
                            <ShieldCheck className="size-5" />
                          </div>
                          <Status status="empty" />
                        </div>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">{name}</h3>
                            <p className="mt-0.5 text-sm text-slate-400">Não calculado</p>
                          </div>
                          <a href={`/calculadoras/${slug}?evento=${selectedEvent.id}`}>
                            <Button variant="outline" size="sm">Calcular</Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {tab === 'Histórico' && (
              <section>
                <h2 className="mb-4 text-xl font-bold">Histórico de cálculos</h2>
                <Card className="border-dashed border-slate-300">
                  <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                    <FileText className="size-10 text-slate-300" />
                    <p className="text-sm text-slate-500">Nenhum cálculo salvo ainda para este evento.</p>
                  </CardContent>
                </Card>
              </section>
            )}

            {tab === 'Cenários' && (
              <section>
                <h2 className="mb-2 text-xl font-bold">Comparação de cenários</h2>
                <p className="mb-6 text-sm text-slate-500">Disponível no plano Pro.</p>
                <Card className="border-dashed border-slate-300">
                  <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                    <BarChart3 className="size-10 text-slate-300" />
                    <p className="text-sm text-slate-500">Faça upgrade para o plano Pro para comparar cenários.</p>
                    <a href="/precos">
                      <Button variant="outline">Ver planos</Button>
                    </a>
                  </CardContent>
                </Card>
              </section>
            )}

            {tab === 'Licenciamento' && (
              <section>
                <h2 className="mb-2 text-xl font-bold">Licenciamento</h2>
                <p className="text-sm text-slate-500 mb-6">Checklist em breve disponível.</p>
                <Card className="border-dashed border-slate-300">
                  <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                    <ClipboardCheck className="size-10 text-slate-300" />
                    <p className="text-sm text-slate-500">Em desenvolvimento.</p>
                  </CardContent>
                </Card>
              </section>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
