'use client'

import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, BarChart3, Bell, CalendarDays, CheckCircle2, ChevronRight,
  ClipboardCheck, Clock3, Download, FileText, Flame, History, LayoutDashboard,
  MapPin, Menu, Plus, ShieldCheck, Sparkles, Users, XCircle, Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const events = [
  { name: 'Festival Horizonte', date: '18 de outubro de 2026', city: 'São Paulo, SP', audience: '3.000 pessoas', green: 5, yellow: 2, red: 1 },
  { name: 'Conferência Nova Economia', date: '22 de novembro de 2026', city: 'Campinas, SP', audience: '850 pessoas', green: 3, yellow: 1, red: 0 },
]

const calculators = [
  ['Sanitários', '41 cabines', 'green'], ['Lotação e capacidade', '3.000 pessoas', 'green'], ['Saídas de emergência', '8 saídas', 'yellow'],
  ['Brigada de incêndio', '12 brigadistas', 'green'], ['Equipe médica', 'Calcular', 'empty'], ['Acessibilidade', 'Calcular', 'empty'],
  ['Geradores e energia', 'Calcular', 'empty'], ['Água', '9.000 litros', 'yellow'], ['Resíduos', 'Calcular', 'empty'],
]

const tabs = [
  { label: 'Visão geral', icon: LayoutDashboard }, { label: 'Cenários', icon: BarChart3 },
  { label: 'Licenciamento', icon: ClipboardCheck }, { label: 'Histórico', icon: History },
]

function Logo() {
  return <div className="flex items-center gap-2" aria-label="Event Engine"><div className="flex size-9 items-center justify-center rounded-xl bg-[#0F1B33] text-xl font-bold text-white">E<span className="text-amber-400">.</span></div><span className="text-lg font-bold tracking-tight text-[#0F1B33]">event <span className="text-amber-500">engine</span></span></div>
}

function Status({ status }: { status: string }) {
  if (status === 'green') return <span className="flex items-center gap-1 text-xs font-medium text-emerald-700"><CheckCircle2 className="size-4" /> Em conformidade</span>
  if (status === 'yellow') return <span className="flex items-center gap-1 text-xs font-medium text-amber-700"><Clock3 className="size-4" /> Atenção</span>
  return <span className="text-xs font-medium text-slate-500">Ainda não calculado</span>
}

export default function PainelPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [tab, setTab] = useState('Visão geral')
  const event = events[selectedEvent ?? 0]

  return <div className="min-h-screen bg-[#F7F8FA] text-[#0F1B33]">
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu"><Menu /></Button><Logo /></div><div className="flex items-center gap-3"><Badge className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Zap data-icon="inline-start" />3 créditos</Badge><Button variant="ghost" size="icon" aria-label="Notificações"><Bell /></Button><div className="flex size-9 items-center justify-center rounded-full bg-[#0F1B33] text-sm font-bold text-white">AM</div></div></div></header>
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-8 lg:pt-10">
      {selectedEvent === null ? <>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-sm font-medium text-amber-600">Área do assinante</p><h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Meus eventos</h1><p className="mt-2 text-slate-600">Acompanhe o planejamento e a conformidade dos seus eventos.</p></div><Button className="bg-[#0F1B33] hover:bg-[#1b2b4c]"><Plus data-icon="inline-start" />Novo evento</Button></div>
        <Card className="mb-6 border-amber-200 bg-[#FFF8E7]"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 text-amber-600" /><div><p className="font-semibold">Plano Solo</p><p className="text-sm text-slate-600">1 de 1 evento ativo. Precisa gerenciar mais eventos?</p></div></div><Button variant="outline" className="border-[#0F1B33] bg-transparent">Conheça o Pro <ArrowRight data-icon="inline-end" /></Button></CardContent></Card>
        <div className="grid gap-4 lg:grid-cols-2">{events.map((item, index) => <Card key={item.name} className="border-slate-200 transition-shadow hover:shadow-md"><CardContent className="p-5"><div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold">{item.name}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500"><span className="flex items-center gap-1"><CalendarDays className="size-4" />{item.date}</span><span className="flex items-center gap-1"><MapPin className="size-4" />{item.city}</span></div></div><Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">Ativo</Badge></div><Separator className="my-5" /><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Resumo de conformidade</p><div className="flex gap-3 text-sm"><span className="flex items-center gap-1 text-emerald-700"><CheckCircle2 className="size-4" />{item.green}</span><span className="flex items-center gap-1 text-amber-700"><Clock3 className="size-4" />{item.yellow}</span><span className="flex items-center gap-1 text-red-600"><XCircle className="size-4" />{item.red}</span></div></div><Button variant="ghost" onClick={() => setSelectedEvent(index)}>Abrir evento <ChevronRight data-icon="inline-end" /></Button></div><p className="mt-4 text-sm text-slate-500">Público previsto: <strong className="text-slate-700">{item.audience}</strong></p></CardContent></Card>)}</div>
      </> : <>
        <button onClick={() => setSelectedEvent(null)} className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33]"><ArrowLeft className="size-4" />Voltar para meus eventos</button>
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-2 text-sm font-medium text-amber-600">Meu evento</p><h1 className="text-3xl font-bold tracking-tight">{event.name}</h1><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500"><span className="flex items-center gap-1"><CalendarDays className="size-4" />{event.date}</span><span className="flex items-center gap-1"><MapPin className="size-4" />{event.city}</span><span className="flex items-center gap-1"><Users className="size-4" />{event.audience}</span></div></div><Button variant="outline"><Download data-icon="inline-start" />Exportar dossiê (PDF)</Button></div>
        <div className="mb-7 flex gap-1 overflow-x-auto border-b border-slate-200" role="tablist" aria-label="Seções do evento">{tabs.map(({ label, icon: Icon }) => <button key={label} onClick={() => setTab(label)} role="tab" aria-selected={tab === label} className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === label ? 'border-amber-500 text-[#0F1B33]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}><Icon className="size-4" />{label}</button>)}</div>
        {tab === 'Visão geral' && <section><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-bold">Calculadoras do evento</h2><p className="mt-1 text-sm text-slate-500">Resultados e pontos de atenção do seu planejamento.</p></div><Badge variant="outline" className="hidden sm:flex">{event.green + event.yellow} de 9 calculadas</Badge></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{calculators.map(([name, result, status]) => <Card key={name} className="border-slate-200"><CardContent className="flex min-h-32 flex-col justify-between gap-4 p-5"><div className="flex items-start justify-between gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-[#0F1B33]"><ShieldCheck className="size-5" /></div><Status status={status} /></div><div className="flex items-end justify-between gap-3"><div><h3 className="font-semibold">{name}</h3><p className={`mt-1 text-sm ${status === 'empty' ? 'text-slate-400' : 'font-bold text-[#0F1B33]'}`}>{result}</p></div><Button variant={status === 'empty' ? 'outline' : 'ghost'} size="sm">{status === 'empty' ? 'Calcular' : 'Ver resultado'}</Button></div></CardContent></Card>)}</div></section>}
        {tab === 'Cenários' && <section><div className="mb-5"><h2 className="text-xl font-bold">Comparação de cenários</h2><p className="mt-1 text-sm text-slate-500">Veja como as decisões mudam conforme o público do evento.</p></div><div className="grid gap-4 lg:grid-cols-2">{['Cenário atual · 3.000 pessoas', 'Cenário ampliado · 5.000 pessoas'].map((title, index) => <Card key={title} className={index === 1 ? 'border-amber-300' : 'border-slate-200'}><CardHeader><CardTitle className="flex items-center justify-between">{title}{index === 1 && <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Simulação</Badge>}</CardTitle></CardHeader><CardContent className="grid gap-3"><p className="flex justify-between border-b pb-3 text-sm"><span>Sanitários</span><strong>{index ? '68 cabines' : '41 cabines'}</strong></p><p className="flex justify-between border-b pb-3 text-sm"><span>Saídas de emergência</span><strong className={index ? 'text-amber-700' : ''}>{index ? '12 saídas' : '8 saídas'}</strong></p><p className="flex justify-between text-sm"><span>Água</span><strong>{index ? '15.000 L' : '9.000 L'}</strong></p></CardContent></Card>)}</div></section>}
        {tab === 'Licenciamento' && <section><div className="mb-5"><h2 className="text-xl font-bold">Licenciamento</h2><p className="mt-1 text-sm text-slate-500">Acompanhe as etapas necessárias para o seu evento.</p></div><Card><CardContent className="divide-y p-0">{[['Bombeiros', 'Projeto e vistoria do Corpo de Bombeiros', '12/09/2026', 'Em andamento'], ['Alvará', 'Licença para realização do evento', '20/09/2026', 'Pendente'], ['Vigilância sanitária', 'Autorização para operação de alimentos', '04/10/2026', 'Pendente'], ['ECAD', 'Licença de direitos autorais', '10/10/2026', 'Concluído'], ['Trânsito', 'Plano de operação viária', '15/09/2026', 'Concluído'], ['Seguro', 'Apólice de responsabilidade civil', '01/10/2026', 'Em andamento']].map(([name, desc, date, status]) => <div key={name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : status === 'Em andamento' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}><CheckCircle2 className="size-4" /></div><div><p className="font-semibold">{name}</p><p className="text-sm text-slate-500">{desc}</p></div></div><div className="flex items-center gap-4 pl-11 text-sm sm:pl-0"><span className="text-slate-500">Prazo: {date}</span><Badge variant="outline">{status}</Badge></div></div>)}</CardContent></Card></section>}
        {tab === 'Histórico' && <section><div className="mb-5"><h2 className="text-xl font-bold">Histórico de cálculos</h2><p className="mt-1 text-sm text-slate-500">Todos os resultados salvos neste evento.</p></div><Card><CardContent className="divide-y p-0">{[['Sanitários', '18/08/2026', 'v2', '1 crédito'], ['Lotação e capacidade', '15/08/2026', 'v1', '1 crédito'], ['Água', '12/08/2026', 'v1', '1 crédito'], ['Brigada de incêndio', '10/08/2026', 'v1', '1 crédito']].map(([name, date, version, credits]) => <div key={name} className="flex flex-wrap items-center justify-between gap-3 p-4"><div className="flex items-center gap-3"><FileText className="size-5 text-slate-400" /><div><p className="font-semibold">{name}</p><p className="text-sm text-slate-500">Salvo em {date} · {version}</p></div></div><Badge variant="secondary">{credits}</Badge></div>)}</CardContent></Card></section>}
      </>}
    </main>
  </div>
}
