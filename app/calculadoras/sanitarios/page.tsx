'use client'

import { useMemo, useState } from 'react'
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Coins,
  Download,
  Edit3,
  LockKeyhole,
  MessageCircle,
  Minus,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const steps = ['Evento', 'Parâmetros', 'Conferência', 'Resultado']
const eventData = [
  ['Nome do evento', 'Festival Aurora'],
  ['Tipo', 'Festival'],
  ['Cidade / UF', 'São Paulo / SP'],
  ['Data', '18 de outubro de 2025'],
  ['Duração', '8 horas'],
  ['Ambiente', 'Aberto'],
  ['Público esperado', '2.500 pessoas'],
]

function Logo() {
  return <div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-lg bg-[#0F1B33] text-sm font-black text-white">E<span className="text-amber-400">E</span></div><span className="font-bold tracking-tight text-[#0F1B33]">event <span className="text-amber-500">engine</span></span></div>
}

function Stepper({ current }: { current: number }) {
  return <nav aria-label="Etapas do cálculo" className="flex items-center justify-center gap-2 sm:gap-4">{steps.map((step, index) => <div key={step} className="flex items-center gap-2"><div className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${index < current ? 'bg-emerald-500 text-white' : index === current ? 'bg-[#0F1B33] text-white' : 'bg-slate-100 text-slate-400'}`}>{index < current ? <Check data-icon="inline-start" /> : index + 1}</div><span className={`hidden text-sm font-medium sm:inline ${index === current ? 'text-[#0F1B33]' : 'text-slate-400'}`}>{step}</span>{index < steps.length - 1 && <div className={`h-px w-5 sm:w-10 ${index < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />}</div>)}</nav>
}

function Summary({ onEdit }: { onEdit: () => void }) {
  return <Card className="border-slate-200 shadow-sm"><CardHeader className="flex flex-row items-center justify-between space-y-0"><div><p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Resumo do evento</p><CardTitle className="mt-1 text-lg">Festival Aurora</CardTitle></div><Button variant="ghost" size="sm" onClick={onEdit}><Edit3 data-icon="inline-start" /> Editar</Button></CardHeader><CardContent className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm">{eventData.map(([label, value]) => <div key={label}><p className="text-xs text-slate-500">{label}</p><p className="mt-0.5 font-medium text-[#0F1B33]">{value}</p></div>)}</CardContent></Card>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div className="flex flex-col gap-2"><Label>{label}</Label>{children}</div> }

export default function SanitariosPage() {
  const [step, setStep] = useState(0)
  const [free, setFree] = useState(true)
  const [memoryOpen, setMemoryOpen] = useState(false)
  const [audience, setAudience] = useState('2.500')
  const [accessibility, setAccessibility] = useState('Sim')
  const remaining = free ? 3 : 2
  const total = useMemo(() => Math.max(10, Math.ceil(Number(audience.replace('.', '')) / 50)), [audience])

  const next = () => setStep((value) => Math.min(3, value + 1))
  const back = () => setStep((value) => Math.max(0, value - 1))

  return <div className="min-h-screen bg-[#F7F8FA] pb-24 text-[#0F1B33] lg:pb-8">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"><div className="flex items-center gap-4"><Button variant="ghost" size="icon" aria-label="Voltar para calculadoras"><ArrowLeft /></Button><Logo /></div><div className="flex items-center gap-3"><Badge className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Coins data-icon="inline-start" /> {remaining} créditos</Badge><div className="flex size-9 items-center justify-center rounded-full bg-[#0F1B33] text-xs font-bold text-white">AM</div></div></div></header>
    <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-8 flex flex-col gap-5"><div><p className="text-sm font-medium text-amber-600">Calculadora essencial</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Sanitários</h1><p className="mt-1 text-sm text-slate-500">Dimensione a estrutura sanitária ideal para o seu evento.</p></div><Stepper current={step} /></div>
      {step === 0 && <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle>Dados do evento</CardTitle><p className="text-sm text-slate-500">Comece com as informações básicas do seu evento.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Nome do evento"><Input defaultValue="Festival Aurora" /></Field><Field label="Tipo de evento"><select className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option>Festival</option><option>Show</option><option>Casamento</option><option>Corporativo</option></select></Field><Field label="Cidade / UF"><Input defaultValue="São Paulo / SP" /></Field><Field label="Data"><Input type="date" defaultValue="2025-10-18" /></Field><Field label="Duração (horas)"><Input type="number" defaultValue="8" /></Field><Field label="Ambiente"><div className="flex gap-2"><Button type="button" variant="default">Aberto</Button><Button type="button" variant="outline">Fechado</Button><Button type="button" variant="outline">Misto</Button></div></Field><div className="sm:col-span-2"><Field label="Público esperado"><Input value={audience} onChange={(event) => setAudience(event.target.value)} inputMode="numeric" /></Field></div></CardContent></Card><Summary onEdit={() => undefined} /></div>}
      {step === 1 && <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle>Parâmetros específicos</CardTitle><p className="text-sm text-slate-500">Ajuste os dados para um resultado mais preciso.</p></CardHeader><CardContent className="flex flex-col gap-6"><Field label="Perfil do público"><div className="flex items-center gap-3"><Input defaultValue="50" className="max-w-24" /><span className="text-sm text-slate-500">% de mulheres</span></div></Field><Field label="Consumo de bebida alcoólica"><div className="grid grid-cols-3 gap-2"><Button variant="outline">Baixo</Button><Button variant="default">Médio</Button><Button variant="outline">Alto</Button></div></Field><Field label="Existe camarote ou área VIP?"><div className="flex gap-2"><Button variant="default">Sim</Button><Button variant="outline">Não</Button></div></Field><Field label="Equipe de trabalho"><Input defaultValue="120 pessoas" /></Field><Field label="Necessidade de acessibilidade"><div className="flex gap-2"><Button variant={accessibility === 'Sim' ? 'default' : 'outline'} onClick={() => setAccessibility('Sim')}>Sim</Button><Button variant={accessibility === 'Não' ? 'default' : 'outline'} onClick={() => setAccessibility('Não')}>Não</Button></div></Field></CardContent></Card><Summary onEdit={back} /></div>}
      {step === 2 && <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><div className="flex flex-col gap-5"><Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle>Confira seus dados</CardTitle><p className="text-sm text-slate-500">Tudo certo? Você poderá editar qualquer bloco antes de calcular.</p></CardHeader><CardContent className="flex flex-col gap-4"><div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Dados do evento</h3><Button variant="ghost" size="sm" onClick={() => setStep(0)}><Edit3 data-icon="inline-start" /> Editar</Button></div><p className="mt-2 text-sm text-slate-500">Festival Aurora · Festival · São Paulo / SP · 18 de outubro de 2025</p><p className="text-sm text-slate-500">8 horas · Ambiente aberto · {audience} pessoas</p></div><div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Parâmetros</h3><Button variant="ghost" size="sm" onClick={() => setStep(1)}><Edit3 data-icon="inline-start" /> Editar</Button></div><p className="mt-2 text-sm text-slate-500">50% mulheres · Bebida média · Camarote/VIP sim · Acessibilidade {accessibility.toLowerCase()}</p></div></CardContent></Card><Card className="border-amber-200 bg-[#FFF8E7]"><CardContent className="flex flex-col gap-3 p-5"><div className="flex items-center gap-2 font-semibold"><Sparkles className="text-amber-600" /> Primeiro cálculo grátis</div><p className="text-sm text-amber-900/75">Ao confirmar, será usado 1 crédito. Recalcular também consome créditos.</p><div className="flex items-center justify-between border-t border-amber-200 pt-3 text-sm"><span>Saldo atual</span><strong>{remaining} créditos</strong></div><div className="flex items-center justify-between text-sm"><span>Saldo após o uso</span><strong>{free ? '3 créditos (cálculo grátis)' : '2 créditos'}</strong></div></CardContent></Card></div><Summary onEdit={() => setStep(0)} /></div>}
      {step === 3 && <div className="grid gap-6 lg:grid-cols-[1fr_360px]"><div className="flex flex-col gap-5"><Card className="border-emerald-200 bg-emerald-50/50 shadow-sm"><CardHeader><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-emerald-700">Resultado do cálculo</p><CardTitle className="mt-1 text-2xl">Estrutura recomendada</CardTitle></div><Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><ShieldCheck data-icon="inline-start" /> Alta confiança</Badge></div></CardHeader><CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-xl bg-white p-4"><p className="text-xs text-slate-500">Total de cabines</p><p className="mt-1 text-3xl font-bold text-[#0F1B33]">{total}</p></div><div className="rounded-xl bg-white p-4"><p className="text-xs text-slate-500">Feminino</p><p className="mt-1 text-3xl font-bold text-[#0F1B33]">{Math.ceil(total * .55)}</p></div><div className="rounded-xl bg-white p-4"><p className="text-xs text-slate-500">Masculino</p><p className="mt-1 text-3xl font-bold text-[#0F1B33]">{Math.ceil(total * .4)}</p></div><div className="rounded-xl bg-white p-4"><p className="text-xs text-slate-500">Acessíveis</p><p className="mt-1 text-3xl font-bold text-[#0F1B33]">{accessibility === 'Sim' ? Math.max(1, Math.ceil(total * .1)) : 0}</p></div></CardContent></Card><Card><CardContent className="p-0"><button className="flex w-full items-center justify-between p-5 text-left font-semibold" onClick={() => setMemoryOpen(!memoryOpen)} aria-expanded={memoryOpen}>Memória de cálculo {memoryOpen ? <ChevronUp /> : <ChevronDown />}</button>{memoryOpen && <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-6 text-slate-600"><p>1. Público esperado: {audience} pessoas.</p><p>2. Base de dimensionamento: 1 cabine para cada 50 pessoas.</p><p>3. Ajuste de perfil e duração: fator de uso aplicado ao período de 8 horas.</p><p>4. Reserva de acessibilidade: 10% do total recomendado.</p></div>}</CardContent></Card><Card><CardHeader><CardTitle className="text-base">Fundamentação legal e normativa</CardTitle></CardHeader><CardContent className="flex flex-col gap-3 text-sm"><div className="flex items-start justify-between gap-3"><div><p className="font-medium">ABNT NBR 9050</p><p className="text-slate-500">Acessibilidade a edificações · vigente</p></div><Button variant="link" size="sm">Consultar</Button></div><div className="flex items-start justify-between gap-3"><div><p className="font-medium">NR 24 · Art. 24.1</p><p className="text-slate-500">Condições sanitárias e de conforto · vigente</p></div><Button variant="link" size="sm">Consultar</Button></div></CardContent></Card><div className="flex flex-wrap gap-2"><Button variant="outline"><Save data-icon="inline-start" /> Salvar</Button><Button variant="outline"><MessageCircle data-icon="inline-start" /> WhatsApp</Button><Button variant="outline"><Download data-icon="inline-start" /> Baixar PDF</Button></div><Button variant="secondary" className="w-full">Pedir orçamento a fornecedores</Button><p className="text-xs leading-5 text-slate-500">Aviso legal: este cálculo é uma estimativa orientativa e não substitui projeto, análise técnica ou validação dos órgãos responsáveis.</p></div><div className="flex flex-col gap-5"><Summary onEdit={() => setStep(0)} /><Card className="border-amber-200 bg-[#FFF8E7]"><CardContent className="p-5"><p className="font-semibold text-amber-900">Seu público mudou?</p><p className="mt-1 text-sm text-amber-900/70">Revise também Resíduos e Geradores para manter seu planejamento atualizado.</p></CardContent></Card></div></div>}
    </main>
    <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:static lg:mx-auto lg:mt-6 lg:max-w-7xl lg:border-0 lg:bg-transparent lg:p-0"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-1 lg:px-8">{step > 0 ? <Button variant="outline" onClick={back}><ArrowLeft data-icon="inline-start" /> Voltar</Button> : <span />}{step < 3 ? <Button className="bg-[#0F1B33] hover:bg-[#1b2b4c]" onClick={() => { if (step === 2) setFree(false); next() }}>{step === 2 ? 'Confirmar e calcular' : 'Continuar'} <ArrowRight data-icon="inline-end" /></Button> : <Button variant="outline" onClick={() => setStep(0)}>Novo cálculo</Button>}</div></div>
  </div>
}

export const metadata = { title: 'Calculadora de Sanitários | event engine' }
