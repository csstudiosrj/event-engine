'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Calculator,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  Home,
  Info,
  LayoutGrid,
  Loader2,
  Menu,
  MoreHorizontal,
  PencilRuler,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Logo({ variant = 'full', dark = false }: { variant?: 'full' | 'icon'; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2" aria-label="Event Engine">
      <svg viewBox="0 0 200 200" className={variant === 'icon' ? 'size-10' : 'size-9'} role="img" aria-label="Logo Event Engine">
        <rect x="20" y="20" width="160" height="160" rx="38" fill={dark ? '#FFFFFF' : '#0F1B33'} />
        <rect x="55" y="52" width="22" height="96" rx="11" fill={dark ? '#0F1B33' : '#FFFFFF'} />
        <rect x="55" y="52" width="92" height="22" rx="11" fill={dark ? '#0F1B33' : '#FFFFFF'} />
        <rect x="55" y="89" width="60" height="22" rx="11" fill={dark ? '#0F1B33' : '#FFFFFF'} />
        <rect x="55" y="126" width="92" height="22" rx="11" fill={dark ? '#0F1B33' : '#FFFFFF'} />
        <circle cx="140" cy="100" r="12" fill="#F59E0B" />
      </svg>
      {variant === 'full' && <span className="text-lg font-bold tracking-tight"><span className={dark ? 'text-white' : 'text-[#0F1B33]'}>event</span> <span className="text-[#F59E0B]">engine</span></span>}
    </div>
  )
}

const navItems = [
  { label: 'Visão geral', icon: Home },
  { label: 'Calculadoras', icon: Calculator, active: true },
  { label: 'Meus cálculos', icon: FileText },
  { label: 'Conta', icon: SlidersHorizontal },
]

function Section({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="border-t border-border py-10 first:border-0 first:pt-0"><div className="mb-6 flex items-start gap-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0F1B33] text-sm font-bold text-white dark:bg-amber-500 dark:text-[#0F1B33]">{number}</span><div><p className="text-xs font-semibold uppercase tracking-widest text-amber-600">{eyebrow}</p><h2 className="mt-1 text-xl font-bold tracking-tight text-[#0F1B33] dark:text-white">{title}</h2></div></div>{children}</section>
}

export default function Page() {
  const [openResult, setOpenResult] = useState(false)
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 dark:bg-[#0F172A] dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block"><Logo /><div className="mt-10 flex flex-col gap-1">{navItems.map(({ label, icon: Icon, active }) => <button key={label} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${active ? 'bg-[#0F1B33] text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}><Icon aria-hidden="true" />{label}</button>)}</div><div className="absolute bottom-6 left-5 right-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-900"><div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Seu saldo</span><Zap className="text-amber-500" /></div><p className="mt-2 text-2xl font-bold">3 <span className="text-sm font-medium text-slate-500">créditos</span></p><Button className="mt-3 w-full" size="sm">Adicionar créditos</Button></div></aside>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:ml-64 lg:px-8"><div className="flex items-center gap-3"><button className="rounded-lg p-2 lg:hidden" aria-label="Abrir menu"><Menu /></button><div className="lg:hidden"><Logo variant="full" /></div><div className="hidden lg:block"><p className="text-xs text-slate-500">Design system</p><h1 className="font-semibold">Event Engine</h1></div></div><div className="flex items-center gap-3"><Badge className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Zap data-icon="inline-start" />3 créditos</Badge><button className="rounded-lg p-2 text-slate-500" aria-label="Notificações"><Bell /></button><div className="flex size-9 items-center justify-center rounded-full bg-[#0F1B33] text-sm font-bold text-white">AM</div></div></header>
      <main className="pb-24 lg:ml-64 lg:pb-10"><div className="mx-auto max-w-6xl px-4 py-8 lg:px-10"><div className="mb-10"><div className="mb-3 flex items-center gap-2 text-sm text-slate-500"><span>Event Engine</span><span>/</span><span className="font-medium text-slate-900 dark:text-slate-100">Estilo</span></div><h1 className="text-3xl font-bold tracking-tight text-[#0F1B33] dark:text-white lg:text-4xl">Design system</h1><p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">Fundamentos e componentes para uma experiência técnica, clara e confiável.</p></div>
        <Section number="01" eyebrow="Fundamentos" title="Identidade e navegação"><div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Logo</CardTitle><CardDescription>Três variações, em fundos claro e escuro.</CardDescription></CardHeader><CardContent className="grid grid-cols-2 gap-3"><div className="flex min-h-24 items-center justify-center rounded-xl border bg-white"><Logo /></div><div className="flex min-h-24 items-center justify-center rounded-xl bg-[#0F1B33]"><Logo dark /></div><div className="flex min-h-24 items-center justify-center rounded-xl border bg-white"><Logo variant="icon" /></div><div className="flex min-h-24 items-center justify-center rounded-xl bg-[#0F1B33]"><Logo variant="icon" dark /></div></CardContent></Card><Card><CardHeader><CardTitle>Stepper de etapas</CardTitle><CardDescription>Progresso de um cálculo em quatro etapas.</CardDescription></CardHeader><CardContent><div className="flex items-center justify-between">{['Contexto', 'Parâmetros', 'Resultado', 'Revisão'].map((item, i) => <div key={item} className="flex flex-1 flex-col items-center gap-2 text-center"><div className={`flex size-9 items-center justify-center rounded-full text-sm font-bold ${i < 2 ? 'bg-[#0F1B33] text-white' : 'border-2 border-slate-200 text-slate-400 dark:border-slate-700'}`}>{i < 2 ? <Check /> : i + 1}</div><span className="text-xs font-medium text-slate-500">{item}</span></div>)}</div></CardContent></Card></div></Section>
        <Section number="02" eyebrow="Ações e campos" title="Controles de entrada"><div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Botões</CardTitle><CardDescription>Hierarquia clara para ações de cálculo.</CardDescription></CardHeader><CardContent className="flex flex-wrap items-center gap-3"><Button>Calcular agora</Button><Button variant="outline">Salvar rascunho</Button><Button variant="ghost">Cancelar</Button><Button disabled>Desabilitado</Button><Button disabled><Loader2 data-icon="inline-start" className="animate-spin" />Carregando</Button></CardContent></Card><Card><CardHeader><CardTitle>Campo numérico</CardTitle><CardDescription>Com unidade e texto de ajuda.</CardDescription></CardHeader><CardContent><Label htmlFor="area">Área do evento</Label><div className="mt-2 flex h-11 overflow-hidden rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring"><Input id="area" type="number" defaultValue="450" className="border-0 shadow-none focus-visible:ring-0" /><span className="flex items-center border-l bg-muted px-3 text-sm text-muted-foreground">m²</span></div><p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><CircleHelp /> Área total ocupada pelo público e estruturas.</p></CardContent></Card><Card><CardHeader><CardTitle>Seletor segmentado</CardTitle><CardDescription>Escolha o tipo de acesso ao evento.</CardDescription></CardHeader><CardContent><div className="grid grid-cols-3 rounded-lg bg-muted p-1"><button className="min-h-10 rounded-md bg-background px-3 text-sm font-semibold shadow-sm">Aberto</button><button className="min-h-10 rounded-md px-3 text-sm text-muted-foreground">Fechado</button><button className="min-h-10 rounded-md px-3 text-sm text-muted-foreground">Misto</button></div></CardContent></Card><Card><CardHeader><CardTitle>Estados de interface</CardTitle><CardDescription>Carregamento e erro sempre explícitos.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><div className="flex items-center gap-3"><Skeleton className="size-10 rounded-lg" /><div className="flex flex-1 flex-col gap-2"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></div><Alert variant="destructive"><AlertTriangle /><AlertTitle>Não foi possível calcular</AlertTitle><AlertDescription>Revise os campos obrigatórios e tente novamente.</AlertDescription></Alert></CardContent></Card></div></Section>
        <Section number="03" eyebrow="Dados e confiança" title="Cards e indicadores"><div className="grid gap-5 lg:grid-cols-3"><Card className="border-amber-200 shadow-sm"><CardHeader><div className="flex items-start justify-between"><div className="flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><Users /></div><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Essencial</Badge></div><CardTitle className="mt-2">Dimensionamento de brigada</CardTitle><CardDescription>Estime a equipe necessária conforme público e risco.</CardDescription></CardHeader><CardContent><Button variant="outline" className="w-full">Abrir calculadora <ChevronDown data-icon="inline-end" /></Button></CardContent></Card><Card><CardHeader><CardTitle>Nível de confiança</CardTitle><CardDescription>Transparência sobre a base do resultado.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><Badge className="w-fit gap-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-100"><ShieldCheck data-icon="inline-start" />Base legal verificada</Badge><Badge variant="outline" className="w-fit gap-1.5 border-amber-300 bg-amber-50 text-amber-800"><Info data-icon="inline-start" />Referência técnica, confirme com o órgão local</Badge></CardContent></Card><Card><CardHeader><CardTitle>Semáforo de conformidade</CardTitle><CardDescription>Leitura rápida da situação.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><div className="flex items-center gap-3"><span className="size-3 rounded-full bg-emerald-500" /><span className="text-sm font-medium">Conforme — dentro do recomendado</span></div><div className="flex items-center gap-3"><span className="size-3 rounded-full bg-amber-500" /><span className="text-sm font-medium">Atenção — requer revisão</span></div><div className="flex items-center gap-3"><span className="size-3 rounded-full bg-red-500" /><span className="text-sm font-medium">Não conforme — ação necessária</span></div></CardContent></Card></div></Section>
        <Section number="04" eyebrow="Saída" title="Card de resultado"><Card className="overflow-hidden"><CardHeader className="border-b bg-[#0F1B33] text-white"><div className="flex items-start justify-between"><div><p className="text-sm text-slate-300">Resultado estimado</p><div className="mt-2 text-5xl font-bold tracking-tight text-amber-400">12 <span className="text-lg font-medium text-slate-300">brigadistas</span></div><p className="mt-2 text-sm text-slate-300">Para um público de até 450 pessoas</p></div><Badge className="bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/15"><Check data-icon="inline-start" />Conforme</Badge></div></CardHeader><CardContent className="p-0"><button onClick={() => setOpenResult(!openResult)} className="flex min-h-14 w-full items-center justify-between px-6 text-left text-sm font-semibold hover:bg-muted"><span>Ver memória de cálculo</span><ChevronDown className={openResult ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>{openResult && <div className="border-t bg-muted/40 px-6 py-5"><p className="text-sm text-muted-foreground">Cálculo baseado na proporção de 1 profissional para cada 38 pessoas, considerando o nível de risco informado.</p></div>}<Separator /><div className="p-6"><h3 className="text-sm font-semibold">Fundamentação</h3><div className="mt-4 grid gap-3 text-sm sm:grid-cols-3"><div><p className="text-xs text-muted-foreground">Norma</p><p className="mt-1 font-medium">NT 01/2024</p></div><div><p className="text-xs text-muted-foreground">Artigo</p><p className="mt-1 font-medium">Art. 12, § 2º</p></div><div><p className="text-xs text-muted-foreground">Vigência</p><p className="mt-1 font-medium">01 jan. 2024</p></div></div></div></CardContent></Card></Section>
        <Section number="05" eyebrow="Organização" title="Abas, tabela e avisos"><Card><CardContent className="p-0"><Tabs defaultValue="resumo"><TabsList className="w-full justify-start rounded-none border-b bg-transparent px-5"><TabsTrigger value="resumo">Resumo</TabsTrigger><TabsTrigger value="historico">Histórico</TabsTrigger><TabsTrigger value="fontes">Fontes</TabsTrigger></TabsList><TabsContent value="resumo" className="p-5"><div className="overflow-x-auto"><table className="w-full min-w-[500px] text-left text-sm"><thead className="border-b text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="pb-3 font-semibold">Parâmetro</th><th className="pb-3 font-semibold">Valor</th><th className="pb-3 font-semibold">Status</th><th className="pb-3 text-right font-semibold">Ação</th></tr></thead><tbody><tr className="border-b"><td className="py-4 font-medium">Público estimado</td><td className="py-4">450 pessoas</td><td className="py-4"><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Validado</Badge></td><td className="py-4 text-right"><button aria-label="Editar público" className="rounded p-2 text-muted-foreground hover:bg-muted"><PencilRuler /></button></td></tr><tr><td className="py-4 font-medium">Tipo de evento</td><td className="py-4">Aberto</td><td className="py-4"><Badge variant="outline">Informado</Badge></td><td className="py-4 text-right"><button aria-label="Mais opções" className="rounded p-2 text-muted-foreground hover:bg-muted"><MoreHorizontal /></button></td></tr></tbody></table></div></TabsContent><TabsContent value="historico" className="p-5 text-sm text-muted-foreground">Nenhum cálculo anterior nesta sessão.</TabsContent><TabsContent value="fontes" className="p-5 text-sm text-muted-foreground">As fontes aparecem vinculadas a cada resultado.</TabsContent></Tabs></CardContent></Card><Alert className="mt-5 border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100"><Info /><AlertTitle>Aviso legal</AlertTitle><AlertDescription>Cálculo gerado por tecnologia com base em leis, decretos e normas técnicas. Para licenças e alvarás, solicite revisão de um profissional habilitado.</AlertDescription></Alert></Section>
      </div></main>
      <nav className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t border-slate-200 bg-white px-2 dark:border-slate-800 dark:bg-slate-950 lg:hidden">{navItems.map(({ label, icon: Icon, active }) => <button key={label} className={`flex min-w-16 flex-col items-center gap-1 rounded-lg py-1 text-[10px] ${active ? 'font-bold text-amber-600' : 'text-slate-500'}`}><Icon aria-hidden="true" /><span>{label}</span></button>)}</nav>
    </div>
  )
}
