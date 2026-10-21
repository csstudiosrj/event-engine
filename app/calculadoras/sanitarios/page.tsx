'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, ArrowRight, Bath, Check, ChevronDown, CircleHelp, Download, Edit3, FileCheck2, HeartHandshake, LockKeyhole, MessageCircle, Pencil, Plus, Save, ShieldCheck, Sparkles, Users, WalletCards, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FlowStepper } from '@/components/flow-stepper'
import { createClient } from '@/lib/supabase/client'

const eventTypes = ['Show', 'Festival', 'Casamento', 'Corporativo', 'Feira', 'Esportivo', 'Religioso', 'Bloco']
const fieldClass = 'h-11 border-slate-200 bg-white'
const CALC_COST = 1

type CreditError = 'login' | 'insufficient' | 'generic'

export default function SanitariosPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', type: 'Show', city: '', date: '', duration: '6', environment: 'Aberto', audience: '1000', women: '50', drinks: 'Médio', vip: 'Não', team: '50', accessible: 'Sim' })
  const [memoryOpen, setMemoryOpen] = useState(false)
  const [supabase] = useState(() => createClient())
  const [userId, setUserId] = useState<string | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [spending, setSpending] = useState(false)
  const [creditError, setCreditError] = useState<CreditError | null>(null)
  const set = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const result = useMemo(() => { const audience = Math.max(1, Number(form.audience) || 1000); const total = Math.ceil(audience / 50); return { total, women: Math.ceil(total * 0.55), men: Math.ceil(total * 0.45), accessible: Math.max(1, Math.ceil(total * 0.05)), sinks: Math.ceil(total / 2) } }, [form.audience])

  const next = () => setStep((current) => Math.min(3, current + 1))
  const back = () => setStep((current) => Math.max(0, current - 1))

  const loadCredits = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setUserId(null); setCredits(null); return }
    setUserId(user.id)
    const { data } = await supabase.from('profiles').select('credits').eq('id', user.id).single()
    setCredits(data?.credits ?? 0)
  }

  useEffect(() => { loadCredits() }, [])

  // Debita o crédito antes de liberar o resultado; só avança para a etapa 4 se a RPC confirmar.
  const confirmAndCalculate = async () => {
    setCreditError(null)
    if (!userId) { setCreditError('login'); return }
    setSpending(true)
    const { error } = await supabase.rpc('spend_credit', { p_user_id: userId, p_amount: CALC_COST })
    setSpending(false)
    if (error) {
      setCreditError(error.message.includes('credits_insuficientes') ? 'insufficient' : 'generic')
      loadCredits()
      return
    }
    setCredits((current) => (current === null ? current : current - CALC_COST))
    setStep(3)
  }

  return <div className="min-h-screen bg-[#F7F8FA] text-[#0F1B33]">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"><Link href="/" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft data-icon="inline-start" /> Catálogo</Link><div className="hidden text-center sm:block"><p className="text-xs font-medium text-slate-500">Calculadora</p><h1 className="font-bold">Sanitários</h1></div><Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100"><Sparkles data-icon="inline-start" /> Cálculo grátis</Badge></div></header>
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 lg:px-8 lg:pb-12 lg:pt-8">
      <div className="mb-8"><FlowStepper currentStep={step} /></div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0">
          {step === 0 && <EventStep form={form} set={set} />}
          {step === 1 && <ParameterStep form={form} set={set} />}
          {step === 2 && <ReviewStep form={form} setStep={setStep} credits={credits} loggedIn={!!userId} error={creditError} />}
          {step === 3 && <ResultStep result={result} memoryOpen={memoryOpen} setMemoryOpen={setMemoryOpen} />}
          {step < 2 && <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:static lg:mt-6 lg:border-0 lg:bg-transparent lg:p-0"><div className="mx-auto flex max-w-3xl justify-between gap-3 lg:justify-end">{step > 0 && <Button variant="outline" onClick={back}><ArrowLeft data-icon="inline-start" /> Voltar</Button>}<Button onClick={next} className="w-full bg-[#0F1B33] hover:bg-[#1b2b4c] lg:w-auto">Continuar <ArrowRight data-icon="inline-end" /></Button></div></div>}
          {step === 2 && <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:static lg:mt-6 lg:border-0 lg:bg-transparent lg:p-0"><div className="mx-auto flex max-w-3xl justify-between gap-3 lg:justify-end"><Button variant="outline" onClick={back} disabled={spending}>Voltar</Button><Button onClick={confirmAndCalculate} disabled={spending} className="w-full bg-[#0F1B33] hover:bg-[#1b2b4c] lg:w-auto">{spending ? 'Calculando...' : 'Confirmar e calcular'} <ArrowRight data-icon="inline-end" /></Button></div></div>}
        </section>
        <aside className="hidden lg:block"><Card className="sticky top-6 border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileCheck2 /> Resumo do evento</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm"><Summary label="Evento" value={form.name || 'Ainda não informado'} /><Summary label="Tipo" value={form.type} /><Summary label="Local" value={form.city || 'Cidade/UF'} /><Summary label="Público" value={`${form.audience || '0'} pessoas`} /><Summary label="Ambiente" value={form.environment} /></CardContent></Card></aside>
      </div>
    </main>
  </div>
}

function Summary({ label, value }: { label: string; value: string }) { return <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><span className="text-slate-500">{label}</span><span className="text-right font-semibold">{value}</span></div> }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="flex flex-col gap-2 text-sm font-semibold">{label}{children}</label> }
function EventStep({ form, set }: { form: any; set: (key: any, value: string) => void }) { return <Card className="border-slate-200"><CardHeader><p className="text-sm font-medium text-amber-600">Etapa 1 de 4</p><CardTitle>Dados do evento</CardTitle><p className="text-sm text-slate-500">Conte um pouco sobre o evento para começarmos o dimensionamento.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Nome do evento"><Input className={fieldClass} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex.: Festival de Inverno" /></Field><Field label="Tipo de evento"><select className={fieldClass + ' rounded-md border px-3 text-sm'} value={form.type} onChange={(e) => set('type', e.target.value)}>{eventTypes.map((type) => <option key={type}>{type}</option>)}</select></Field><Field label="Cidade/UF"><Input className={fieldClass} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Ex.: São Paulo, SP" /></Field><Field label="Data"><Input type="date" className={fieldClass} value={form.date} onChange={(e) => set('date', e.target.value)} /></Field><Field label="Duração (horas)"><Input type="number" min="1" className={fieldClass} value={form.duration} onChange={(e) => set('duration', e.target.value)} /></Field><Field label="Público esperado"><Input type="number" min="1" className={fieldClass} value={form.audience} onChange={(e) => set('audience', e.target.value)} /></Field><Field label="Ambiente"><div className="flex flex-wrap gap-2">{['Aberto', 'Fechado', 'Misto'].map((value) => <button type="button" key={value} onClick={() => set('environment', value)} className={`rounded-md border px-3 py-2 text-sm font-medium ${form.environment === value ? 'border-[#0F1B33] bg-[#0F1B33] text-white' : 'border-slate-200 bg-white text-slate-600'}`}>{value}</button>)}</div></Field></CardContent></Card> }
function ParameterStep({ form, set }: { form: any; set: (key: any, value: string) => void }) { return <Card className="border-slate-200"><CardHeader><p className="text-sm font-medium text-amber-600">Etapa 2 de 4</p><CardTitle>Parâmetros específicos</CardTitle><p className="text-sm text-slate-500">Esses detalhes refinam a recomendação para o seu evento.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><Field label="Perfil do público: mulheres (%)"><Input type="number" min="0" max="100" className={fieldClass} value={form.women} onChange={(e) => set('women', e.target.value)} /></Field><Field label="Consumo de bebida alcoólica"><select className={fieldClass + ' rounded-md border px-3 text-sm'} value={form.drinks} onChange={(e) => set('drinks', e.target.value)}><option>Baixo</option><option>Médio</option><option>Alto</option></select></Field><Field label="Existe camarote/VIP?"><select className={fieldClass + ' rounded-md border px-3 text-sm'} value={form.vip} onChange={(e) => set('vip', e.target.value)}><option>Não</option><option>Sim</option></select></Field><Field label="Equipe de trabalho"><Input type="number" min="0" className={fieldClass} value={form.team} onChange={(e) => set('team', e.target.value)} /></Field><Field label="Necessidade de acessibilidade"><select className={fieldClass + ' rounded-md border px-3 text-sm'} value={form.accessible} onChange={(e) => set('accessible', e.target.value)}><option>Sim</option><option>Não</option></select></Field></CardContent></Card> }
function ReviewStep({ form, setStep, credits, loggedIn, error }: { form: any; setStep: (step: number) => void; credits: number | null; loggedIn: boolean; error: CreditError | null }) { return <div className="flex flex-col gap-5"><div><p className="text-sm font-medium text-amber-600">Etapa 3 de 4</p><h2 className="mt-1 text-2xl font-bold">Conferência</h2><p className="mt-1 text-sm text-slate-500">Revise os dados antes de confirmar o cálculo.</p></div><ReviewBlock title="Dados do evento" icon={<Users />} onEdit={() => setStep(0)} rows={[['Nome', form.name || 'Não informado'], ['Tipo', form.type], ['Local', form.city || 'Não informado'], ['Público', `${form.audience} pessoas`], ['Ambiente', form.environment]]} /><ReviewBlock title="Parâmetros" icon={<Bath />} onEdit={() => setStep(1)} rows={[['Mulheres', `${form.women}%`], ['Bebidas', form.drinks], ['Camarote/VIP', form.vip], ['Equipe', `${form.team} pessoas`], ['Acessibilidade', form.accessible]]} /><Card className="border-amber-200 bg-amber-50"><CardContent className="flex flex-col gap-3 p-5"><div className="flex gap-3"><AlertTriangle className="shrink-0 text-amber-700" /><div><p className="font-semibold text-amber-950">Ao confirmar, será usado {CALC_COST} crédito.</p><p className="mt-1 text-sm text-amber-900/75">Recalcular também consome créditos.</p></div></div>{loggedIn && credits !== null ? <><div className="flex justify-between border-t border-amber-200 pt-3 text-sm"><span>Saldo atual</span><strong>{credits} créditos</strong></div><div className="flex justify-between text-sm"><span>Saldo após o uso</span><strong>{Math.max(0, credits - CALC_COST)} créditos</strong></div></> : !loggedIn && <p className="border-t border-amber-200 pt-3 text-sm text-amber-900/75">Entre na sua conta para usar seus créditos.</p>}</CardContent></Card>{error && <CreditErrorCard error={error} />}</div> }
function CreditErrorCard({ error }: { error: CreditError }) { const content = { login: { title: 'Entre para calcular', text: 'Você precisa estar logado para usar créditos.', href: '/auth/login?redirectTo=/calculadoras/sanitarios', cta: 'Entrar' }, insufficient: { title: 'Créditos insuficientes', text: `Este cálculo usa ${CALC_COST} crédito e seu saldo não é suficiente.`, href: '/precos', cta: 'Comprar créditos' }, generic: { title: 'Não foi possível calcular', text: 'Ocorreu um erro ao debitar o crédito. Nenhum valor foi cobrado; tente novamente.', href: null, cta: null } }[error]; return <Card role="alert" className="border-red-200 bg-red-50"><CardContent className="flex gap-3 p-5 text-sm text-red-950"><X className="shrink-0 text-red-700" /><div className="flex flex-col gap-2"><div><p className="font-semibold">{content.title}</p><p className="mt-1 text-red-900/75">{content.text}</p></div>{content.href && <Link href={content.href} className="font-semibold text-red-800 underline">{content.cta}</Link>}</div></CardContent></Card> }
function ReviewBlock({ title, icon, rows, onEdit }: { title: string; icon: React.ReactNode; rows: string[][]; onEdit: () => void }) { return <Card className="border-slate-200"><CardHeader className="flex flex-row items-center justify-between space-y-0"><CardTitle className="flex items-center gap-2 text-base">{icon}{title}</CardTitle><Button variant="ghost" size="sm" onClick={onEdit}><Pencil data-icon="inline-start" /> Editar</Button></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <Summary key={label} label={label} value={value} />)}</CardContent></Card> }
function ResultStep({ result, memoryOpen, setMemoryOpen }: { result: { total: number; women: number; men: number; accessible: number; sinks: number }; memoryOpen: boolean; setMemoryOpen: (value: boolean) => void }) { return <div className="flex flex-col gap-5"><div><p className="text-sm font-medium text-amber-600">Etapa 4 de 4</p><div className="mt-1 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">Resultado do dimensionamento</h2><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><ShieldCheck data-icon="inline-start" /> Alta confiança</Badge></div><p className="mt-1 text-sm text-slate-500">Uma recomendação inicial para apoiar a sua tomada de decisão.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['Total de cabines', result.total, Bath], ['Femininas', result.women, Users], ['Masculinas', result.men, Users], ['Acessíveis', result.accessible, AccessibilityIcon]].map(([label, value, Icon]) => <Card key={String(label)} className="border-slate-200"><CardContent className="p-4"><div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><Icon /></div><p className="text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></CardContent></Card>)}</div><Card className="border-slate-200"><button className="flex w-full items-center justify-between p-5 text-left font-semibold" onClick={() => setMemoryOpen(!memoryOpen)} aria-expanded={memoryOpen}>Memória de cálculo{'>'}<ChevronDown className={memoryOpen ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>{memoryOpen && <CardContent className="border-t border-slate-100 pt-4 text-sm text-slate-600"><ol className="flex list-decimal flex-col gap-2 pl-5"><li>Base de público: {result.total} cabines para o público informado.</li><li>Distribuição estimada por gênero considerando o perfil do evento.</li><li>Reserva de acessibilidade e lavatórios incluída no dimensionamento.</li></ol></CardContent>}</Card><Card className="border-slate-200"><CardHeader><CardTitle className="text-base">Fundamentação legal e normativa</CardTitle></CardHeader><CardContent className="flex flex-col gap-3 text-sm"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">ABNT NBR 9050:2020</p><p className="text-slate-500">Acessibilidade a edificações, mobiliário e espaços.</p></div><a href="#norma" className="text-amber-700 underline">Ver norma</a></div><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">Código de segurança estadual</p><p className="text-slate-500">Regras vigentes para eventos temporários.</p></div><a href="#norma" className="text-amber-700 underline">Ver artigo</a></div></CardContent></Card><Card className="border-blue-200 bg-blue-50"><CardContent className="flex gap-3 p-4 text-sm text-blue-950"><CircleHelp className="shrink-0 text-blue-700" /><p>Seu público mudou? Revise também as calculadoras de <strong>Resíduos</strong> e <strong>Geradores</strong>.</p></CardContent></Card><div className="flex flex-wrap gap-2"><Button variant="outline"><Save data-icon="inline-start" /> Salvar</Button><Button variant="outline"><MessageCircle data-icon="inline-start" /> Compartilhar no WhatsApp</Button><Button variant="outline"><Download data-icon="inline-start" /> Baixar PDF para revisão técnica</Button><Button variant="secondary"><HeartHandshake data-icon="inline-start" /> Pedir orçamento a fornecedores</Button></div><p className="text-xs leading-5 text-slate-500">Aviso legal: este resultado é uma estimativa para planejamento e não substitui projeto, vistoria ou responsabilidade de profissional habilitado.</p></div> }
function AccessibilityIcon(props: React.ComponentProps<typeof Bath>) { return <HeartHandshake {...props} /> }
