'use client'

import { useMemo, useState } from 'react'
import {
  Accessibility,
  Armchair,
  BadgeDollarSign,
  Bath,
  Beer,
  Boxes,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Coffee,
  Droplets,
  FileText,
  Flame,
  GlassWater,
  Headphones,
  KeyRound,
  LockKeyhole,
  Menu,
  PackageOpen,
  PiggyBank,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
  Users,
  Utensils,
  WalletCards,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Event Engine">
      <svg viewBox="0 0 200 200" className="size-9" role="img" aria-label="Logo Event Engine">
        <rect x="20" y="20" width="160" height="160" rx="38" fill="#0F1B33" />
        <rect x="55" y="52" width="22" height="96" rx="11" fill="#FFFFFF" />
        <rect x="55" y="52" width="92" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="89" width="60" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="126" width="92" height="22" rx="11" fill="#FFFFFF" />
        <circle cx="140" cy="100" r="12" fill="#F59E0B" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-[#0F1B33]">event <span className="text-[#F59E0B]">engine</span></span>
    </div>
  )
}

type CalculatorItem = { name: string; description: string; icon: typeof Users; kind: 'Essencial' | 'Estratégica'; locked?: boolean }
const groups: { name: string; icon: typeof ShieldCheck; items: CalculatorItem[] }[] = [
  { name: 'Segurança e conformidade', icon: ShieldCheck, items: [
    { name: 'Lotação e capacidade', description: 'Defina o público máximo do seu evento.', icon: Users, kind: 'Essencial' },
    { name: 'Saídas de emergência', description: 'Dimensione rotas e saídas com segurança.', icon: KeyRound, kind: 'Essencial' },
    { name: 'Brigada de incêndio', description: 'Estime a equipe de brigadistas necessária.', icon: Flame, kind: 'Essencial' },
    { name: 'Equipe médica', description: 'Planeje o suporte médico para o público.', icon: FirstAidIcon, kind: 'Estratégica', locked: true },
    { name: 'Segurança patrimonial', description: 'Calcule a equipe de segurança do evento.', icon: LockKeyhole, kind: 'Estratégica', locked: true },
    { name: 'Acessibilidade', description: 'Garanta recursos e atendimento acessíveis.', icon: Accessibility, kind: 'Essencial' },
  ] },
  { name: 'Infraestrutura', icon: Building2, items: [
    { name: 'Sanitários', description: 'Planeje a quantidade ideal de sanitários.', icon: Bath, kind: 'Essencial' },
    { name: 'Geradores e energia', description: 'Estime a demanda de energia do evento.', icon: Zap, kind: 'Estratégica', locked: true },
    { name: 'Sonorização', description: 'Dimensione a estrutura de áudio necessária.', icon: Headphones, kind: 'Essencial' },
    { name: 'Água', description: 'Calcule o consumo de água esperado.', icon: Droplets, kind: 'Essencial' },
    { name: 'Resíduos', description: 'Antecipe a geração e coleta de resíduos.', icon: Recycle, kind: 'Estratégica', locked: true },
  ] },
  { name: 'Operação e consumo', icon: ClipboardCheck, items: [
    { name: 'Alimentação', description: 'Estime refeições e estrutura de alimentação.', icon: Utensils, kind: 'Essencial' },
    { name: 'Bebidas', description: 'Calcule o volume de bebidas necessário.', icon: Beer, kind: 'Essencial' },
    { name: 'Gelo', description: 'Planeje a quantidade de gelo para o evento.', icon: GlassWater, kind: 'Essencial' },
    { name: 'Insumos', description: 'Organize os materiais de operação.', icon: PackageOpen, kind: 'Estratégica', locked: true },
    { name: 'Recepção e credenciamento', description: 'Dimensione os postos de atendimento.', icon: UserRound, kind: 'Essencial' },
  ] },
  { name: 'Financeiro', icon: CircleDollarSign, items: [
    { name: 'Ingressos e lotes', description: 'Modele sua estratégia de venda de ingressos.', icon: Ticket, kind: 'Essencial' },
    { name: 'Ponto de equilíbrio', description: 'Descubra quando seu evento se paga.', icon: PiggyBank, kind: 'Estratégica', locked: true },
    { name: 'Orçamento consolidado', description: 'Tenha uma visão completa dos custos.', icon: WalletCards, kind: 'Estratégica', locked: true },
  ] },
]

function FirstAidIcon(props: React.ComponentProps<typeof ShieldCheck>) { return <HeartPulse {...props} /> }
function HeartPulse(props: React.ComponentProps<typeof ShieldCheck>) { return <Sparkles {...props} /> }

const categories = ['Todos', ...groups.map((group) => group.name)]

export default function Page() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const filteredGroups = useMemo(() => groups.filter((group) => category === 'Todos' || group.name === category).map((group) => ({ ...group, items: group.items.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.items.length), [category, query])

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#0F1B33]">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu"><Menu /></Button><Logo /></div>
          <div className="flex items-center gap-3"><Badge className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Zap data-icon="inline-start" />3 créditos</Badge><div className="flex size-9 items-center justify-center rounded-full bg-[#0F1B33] text-sm font-bold text-white" aria-label="Perfil de Ana Martins">AM</div></div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 lg:px-8 lg:pt-12">
        <div className="mb-8 flex flex-col gap-2"><p className="text-sm font-medium text-amber-600">Event Engine / Calculadoras</p><h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Catálogo de calculadoras</h1><p className="max-w-2xl text-slate-600">Escolha uma calculadora para planejar seu evento com mais clareza, segurança e confiança.</p></div>
        <Card className="mb-8 overflow-hidden border-amber-200 bg-[#FFF8E7] shadow-sm"><CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex items-start gap-4"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-[#0F1B33]"><Sparkles /></div><div><p className="text-sm font-semibold text-amber-900">Comece pelo essencial</p><h2 className="mt-1 text-xl font-bold text-[#0F1B33]">Seu primeiro cálculo é grátis</h2><p className="mt-1 text-sm text-amber-900/70">Experimente qualquer calculadora essencial sem gastar créditos.</p></div></div><Button className="w-full shrink-0 bg-[#0F1B33] hover:bg-[#1b2b4c] sm:w-auto">Explorar agora <ChevronRight data-icon="inline-end" /></Button></CardContent></Card>
        <div className="relative mb-5"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar uma calculadora..." aria-label="Buscar uma calculadora" className="h-12 border-slate-200 bg-white pl-10 shadow-sm" /></div>
        <div className="mb-9 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por categoria">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} role="tab" aria-selected={category === item} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === item ? 'border-[#0F1B33] bg-[#0F1B33] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}>{item}</button>)}</div>
        <div className="flex flex-col gap-10">{filteredGroups.map((group) => { const GroupIcon = group.icon; return <section key={group.name} aria-labelledby={group.name}><div className="mb-4 flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-lg bg-[#0F1B33] text-white"><GroupIcon /></div><div><h2 id={group.name} className="font-bold">{group.name}</h2><p className="text-xs text-slate-500">{group.items.length} {group.items.length === 1 ? 'calculadora disponível' : 'calculadoras disponíveis'}</p></div></div><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{group.items.map((item) => { const Icon = item.icon; return <Card key={item.name} className="group border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"><CardContent className="flex min-h-36 flex-col p-5"><div className="flex items-start justify-between gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-[#0F1B33] group-hover:bg-amber-100 group-hover:text-amber-700"><Icon /></div><Badge variant="outline" className={item.kind === 'Essencial' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500'}>{item.locked && <LockKeyhole data-icon="inline-start" />}{item.kind}</Badge></div><h3 className="mt-4 font-semibold">{item.name}</h3><p className="mt-1 flex-1 text-sm leading-5 text-slate-500">{item.description}</p><button className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#0F1B33] hover:text-amber-700">{item.locked ? 'Conhecer plano' : 'Abrir calculadora'} <ChevronRight data-icon="inline-end" /></button></CardContent></Card> })}</div></section> })}</div>
        {filteredGroups.length === 0 && <Card className="border-dashed"><CardContent className="flex flex-col items-center gap-2 py-16 text-center"><Calculator className="text-slate-400" /><h2 className="font-semibold">Nenhuma calculadora encontrada</h2><p className="text-sm text-slate-500">Tente buscar por outro termo ou selecione outra categoria.</p></CardContent></Card>}
      </main>
    </div>
  )
}
