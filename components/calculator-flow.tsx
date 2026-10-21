'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, ArrowLeft, ArrowRight, CircleHelp, ExternalLink, FileCheck2, LockKeyhole, MessageCircle, Pencil, Printer, RotateCcw, ShieldCheck, Sparkles, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FlowStepper } from '@/components/flow-stepper'
import { useApp } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/client'
import { UFS } from '@/lib/calculators/ufs'
import type { CalcResponse, Categoria, Field } from '@/lib/calculators/types'
import { CALC_COST, hasActivePlan } from '@/lib/plans'
import { withBase } from '@/lib/config'

export type CalculatorDef = { slug: string; titulo: string; sub: string; categoria: Categoria; campos: Field[] }

export type Meta = { nome: string; cidade: string; uf: string; data: string }
type CalcError = 'login' | 'creditos' | 'plano' | 'generico'

const fieldClass = 'h-11 border-slate-200 bg-white'
const selectClass = fieldClass + ' w-full rounded-md border px-3 text-sm'

function defaults(campos: Field[]) {
  return Object.fromEntries(campos.map((f) => [f.key, String(f.default)]))
}

function displayValue(field: Field, value: string) {
  if (field.type === 'select') return field.options.find((o) => o.value === value)?.label ?? value
  return `${Number(value).toLocaleString('pt-BR')}${field.unit ? ` ${field.unit}` : ''}`
}

export function CalculatorFlow({ def }: { def: CalculatorDef }) {
  const { profile, loading, refreshProfile } = useApp()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('evento')
  const [step, setStep] = useState(0)
  const [meta, setMeta] = useState<Meta>({ nome: '', cidade: '', uf: 'SP', data: '' })
  const [values, setValues] = useState<Record<string, string>>(() => defaults(def.campos))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<CalcError | null>(null)
  const [result, setResult] = useState<CalcResponse | null>(null)

  const planoAtivo = hasActivePlan(profile)
  const bloqueado = def.categoria === 'estrategica' && !planoAtivo

  // Preenche com os dados do evento quando a calculadora é aberta pelo painel
  useEffect(() => {
    if (!eventId) return
    const supabase = createClient()
    supabase.from('events').select('*').eq('id', eventId).maybeSingle().then(({ data }) => {
      if (!data) return
      setMeta({ nome: data.name, cidade: data.city ?? '', uf: data.state || 'SP', data: data.date ?? '' })
      setValues((current) => ({
        ...current,
        ...(def.campos.some((f) => f.key === 'publico') ? { publico: String(data.pax) } : {}),
        ...(def.campos.some((f) => f.key === 'duracao') ? { duracao: String(data.duration_h) } : {}),
        ...(def.campos.some((f) => f.key === 'risco') && data.risk_level ? { risco: data.risk_level } : {}),
      }))
    })
  }, [eventId, def.campos])

  const calcular = async () => {
    setError(null)
    if (!profile) { setError('login'); return }
    setSubmitting(true)
    try {
      const res = await fetch(withBase('/api/calcular'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: def.slug, inputs: values, uf: meta.uf, eventId, meta }),
      })
      const body = await res.json()
      if (!res.ok) {
        setError(body.error === 'login' ? 'login' : body.error === 'creditos' ? 'creditos' : body.error === 'plano' ? 'plano' : 'generico')
        return
      }
      setResult(body)
      setStep(3)
      refreshProfile()
      window.scrollTo({ top: 0 })
    } catch {
      setError('generico')
    } finally {
      setSubmitting(false)
    }
  }

  const loginHref = `/auth/login?redirectTo=${encodeURIComponent(`/calculadoras/${def.slug}${eventId ? `?evento=${eventId}` : ''}`)}`

  return <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 lg:px-8 lg:pb-12 lg:pt-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
      <Link href={eventId ? `/painel?evento=${eventId}` : '/#calculadoras'} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33]"><ArrowLeft className="size-4" /> {eventId ? 'Voltar ao evento' : 'Catálogo'}</Link>
      {def.categoria === 'estrategica'
        ? <Badge className="bg-[#0F1B33] text-white hover:bg-[#0F1B33]"><LockKeyhole data-icon="inline-start" /> Planos Solo e Pro</Badge>
        : <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100"><Sparkles data-icon="inline-start" /> {CALC_COST} crédito por cálculo</Badge>}
    </div>
    <div className="mb-6">
      <p className="text-sm font-medium text-amber-600">Calculadora</p>
      <h1 className="text-3xl font-bold tracking-tight">{def.titulo}</h1>
      <p className="mt-1 text-slate-600">{def.sub}</p>
    </div>
    {!bloqueado && <div className="mb-8 print:hidden"><FlowStepper currentStep={step} /></div>}

    {bloqueado && step < 3 && !loading && <UpsellCard />}

    {!bloqueado && <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0">
        {step === 0 && <Card className="border-slate-200"><CardHeader><p className="text-sm font-medium text-amber-600">Etapa 1 de 4</p><CardTitle>Dados do evento</CardTitle><p className="text-sm text-slate-500">O estado e a cidade definem quais normas entram no resultado (SP e RJ têm regras próprias; a capital do RJ, também municipais).</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2">
          <Label text="Nome do evento"><Input className={fieldClass} value={meta.nome} onChange={(e) => setMeta({ ...meta, nome: e.target.value })} placeholder="Ex.: Festival de Inverno" /></Label>
          <Label text="Data"><Input type="date" className={fieldClass} value={meta.data} onChange={(e) => setMeta({ ...meta, data: e.target.value })} /></Label>
          <Label text="Cidade"><Input className={fieldClass} value={meta.cidade} onChange={(e) => setMeta({ ...meta, cidade: e.target.value })} placeholder="Ex.: Petrópolis" /></Label>
          <Label text="Estado (UF)"><select className={selectClass} value={meta.uf} onChange={(e) => setMeta({ ...meta, uf: e.target.value })}>{UFS.map((uf) => <option key={uf}>{uf}</option>)}</select></Label>
        </CardContent></Card>}

        {step === 1 && <Card className="border-slate-200"><CardHeader><p className="text-sm font-medium text-amber-600">Etapa 2 de 4</p><CardTitle>Parâmetros</CardTitle><p className="text-sm text-slate-500">Os valores sugeridos são um ponto de partida: ajuste para o seu evento.</p></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2">
          {def.campos.map((field) => <Label key={field.key} text={field.label + (field.type === 'number' && field.unit ? ` (${field.unit})` : '')} help={field.help}>
            {field.type === 'number'
              ? <Input type="number" inputMode="decimal" className={fieldClass} min={field.min} max={field.max} step={field.step ?? 1} value={values[field.key]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} />
              : <select className={selectClass} value={values[field.key]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}>{field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>}
          </Label>)}
        </CardContent></Card>}

        {step === 2 && <div className="flex flex-col gap-5">
          <div><p className="text-sm font-medium text-amber-600">Etapa 3 de 4</p><h2 className="mt-1 text-2xl font-bold">Conferência</h2><p className="mt-1 text-sm text-slate-500">Revise os dados antes de calcular.</p></div>
          <ReviewBlock title="Dados do evento" onEdit={() => setStep(0)} rows={[['Nome', meta.nome || 'Não informado'], ['Data', meta.data ? new Date(meta.data + 'T12:00').toLocaleDateString('pt-BR') : 'Não informada'], ['Local', `${meta.cidade || 'Cidade não informada'} / ${meta.uf}`]]} />
          <ReviewBlock title="Parâmetros" onEdit={() => setStep(1)} rows={def.campos.map((f) => [f.label, displayValue(f, values[f.key])])} />
          <CostCard planoAtivo={planoAtivo} credits={profile?.credits ?? null} loggedIn={!!profile} />
          {error && <ErrorCard error={error} loginHref={loginHref} />}
        </div>}

        {step === 3 && result && <ResultView result={result} meta={meta} titulo={def.titulo} onNew={() => { setResult(null); setStep(1) }} />}

        {step < 3 && <div className="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white/95 p-4 backdrop-blur lg:static lg:mt-6 lg:border-0 lg:bg-transparent lg:p-0"><div className="mx-auto flex max-w-3xl justify-between gap-3 lg:justify-end">
          {step > 0 && <Button variant="outline" disabled={submitting} onClick={() => setStep(step - 1)}><ArrowLeft data-icon="inline-start" /> Voltar</Button>}
          {step < 2
            ? <Button onClick={() => setStep(step + 1)} className="w-full bg-[#0F1B33] hover:bg-[#1b2b4c] lg:w-auto">Continuar <ArrowRight data-icon="inline-end" /></Button>
            : <Button onClick={calcular} disabled={submitting} className="w-full bg-[#0F1B33] hover:bg-[#1b2b4c] lg:w-auto">{submitting ? 'Calculando...' : 'Confirmar e calcular'} <ArrowRight data-icon="inline-end" /></Button>}
        </div></div>}
      </section>

      <aside className="hidden lg:block print:hidden"><Card className="sticky top-24 border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileCheck2 /> Resumo</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm">
        <Summary label="Evento" value={meta.nome || 'Não informado'} />
        <Summary label="Local" value={`${meta.cidade || '—'} / ${meta.uf}`} />
        {def.campos.slice(0, 3).map((f) => <Summary key={f.key} label={f.label} value={displayValue(f, values[f.key])} />)}
      </CardContent></Card></aside>
    </div>}
  </div>
}

function Label({ text, help, children }: { text: string; help?: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-2 text-sm font-semibold">{text}{children}{help && <span className="text-xs font-normal text-slate-500">{help}</span>}</label>
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><span className="text-slate-500">{label}</span><span className="text-right font-semibold">{value}</span></div>
}

function ReviewBlock({ title, rows, onEdit }: { title: string; rows: string[][]; onEdit: () => void }) {
  return <Card className="border-slate-200"><CardHeader className="flex flex-row items-center justify-between space-y-0"><CardTitle className="text-base">{title}</CardTitle><Button variant="ghost" size="sm" onClick={onEdit}><Pencil data-icon="inline-start" /> Editar</Button></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{rows.map(([label, value]) => <Summary key={label} label={label} value={value} />)}</CardContent></Card>
}

function CostCard({ planoAtivo, credits, loggedIn }: { planoAtivo: boolean; credits: number | null; loggedIn: boolean }) {
  if (planoAtivo) return <Card className="border-emerald-200 bg-emerald-50"><CardContent className="flex gap-3 p-5 text-sm text-emerald-950"><ShieldCheck className="shrink-0 text-emerald-700" /><p><strong>Incluído no seu plano.</strong> Este cálculo não consome créditos.</p></CardContent></Card>
  return <Card className="border-amber-200 bg-amber-50"><CardContent className="flex flex-col gap-3 p-5">
    <div className="flex gap-3"><AlertTriangle className="shrink-0 text-amber-700" /><div><p className="font-semibold text-amber-950">Ao confirmar, será usado {CALC_COST} crédito.</p><p className="mt-1 text-sm text-amber-900/75">Recalcular também consome créditos.</p></div></div>
    {loggedIn && credits !== null
      ? <><div className="flex justify-between border-t border-amber-200 pt-3 text-sm"><span>Saldo atual</span><strong>{credits} créditos</strong></div><div className="flex justify-between text-sm"><span>Saldo após o uso</span><strong>{Math.max(0, credits - CALC_COST)} créditos</strong></div></>
      : <p className="border-t border-amber-200 pt-3 text-sm text-amber-900/75">Entre ou crie sua conta grátis para calcular: novas contas ganham 1 crédito.</p>}
  </CardContent></Card>
}

function ErrorCard({ error, loginHref }: { error: CalcError; loginHref: string }) {
  const content = {
    login: { title: 'Entre para calcular', text: 'Você precisa estar logado para usar créditos. Novas contas ganham 1 crédito grátis.', href: loginHref, cta: 'Entrar ou criar conta' },
    creditos: { title: 'Créditos insuficientes', text: `Este cálculo usa ${CALC_COST} crédito e seu saldo acabou.`, href: '/precos', cta: 'Comprar créditos' },
    plano: { title: 'Calculadora dos planos Solo e Pro', text: 'Assine um plano para usar esta calculadora.', href: '/precos', cta: 'Ver planos' },
    generico: { title: 'Não foi possível calcular', text: 'Ocorreu um erro. Nenhum crédito foi cobrado; tente novamente.', href: null, cta: null },
  }[error]
  return <Card role="alert" className="border-red-200 bg-red-50"><CardContent className="flex gap-3 p-5 text-sm text-red-950"><X className="shrink-0 text-red-700" /><div className="flex flex-col gap-2"><div><p className="font-semibold">{content.title}</p><p className="mt-1 text-red-900/75">{content.text}</p></div>{content.href && <Link href={content.href} className="font-semibold text-red-800 underline">{content.cta}</Link>}</div></CardContent></Card>
}

function UpsellCard() {
  return <Card className="mx-auto max-w-xl border-amber-200"><CardContent className="flex flex-col items-center gap-4 p-8 text-center">
    <LockKeyhole className="text-amber-600" size={32} />
    <h2 className="text-2xl font-bold">Calculadora dos planos Solo e Pro</h2>
    <p className="text-slate-600">Calculadoras estratégicas (equipe médica, segurança, geradores, resíduos, ponto de equilíbrio e orçamento) fazem parte dos planos mensais, com cálculos ilimitados.</p>
    <ButtonLink href="/precos" className="h-10 w-full bg-[#0F1B33] text-white hover:bg-[#1b2b4c]">Conhecer planos <ArrowRight data-icon="inline-end" /></ButtonLink>
  </CardContent></Card>
}

export function ResultView({ result, meta, titulo, onNew }: { result: CalcResponse; meta: Meta; titulo: string; onNew?: () => void }) {
  const share = () => {
    const linhas = [`*${titulo}* — ${meta.nome || 'meu evento'} (Normato)`, ...result.destaques.map((d) => `• ${d.label}: ${d.value}${d.unit ? ` ${d.unit}` : ''}`), '', 'Estimativa para planejamento. Não substitui projeto de profissional habilitado.']
    window.open(`https://wa.me/?text=${encodeURIComponent(linhas.join('\n'))}`, '_blank', 'noopener')
  }
  return <div className="flex flex-col gap-5">
    <div><p className="text-sm font-medium text-amber-600 print:hidden">Etapa 4 de 4</p><div className="mt-1 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">Resultado</h2>
      {result.estimativa
        ? <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100"><CircleHelp data-icon="inline-start" /> Estimativa de mercado</Badge>
        : <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"><ShieldCheck data-icon="inline-start" /> Baseado em norma</Badge>}
    </div><p className="mt-1 text-sm text-slate-500">{meta.nome || 'Evento'} · {meta.cidade || '—'} / {meta.uf}{meta.data ? ` · ${new Date(meta.data + 'T12:00').toLocaleDateString('pt-BR')}` : ''}</p></div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{result.destaques.map((d) => <Card key={d.label} className="border-slate-200"><CardContent className="p-4"><p className="text-2xl font-bold">{d.value}{d.unit && <span className="ml-1 text-sm font-medium text-slate-500">{d.unit}</span>}</p><p className="mt-1 text-xs text-slate-500">{d.label}</p></CardContent></Card>)}</div>

    {result.detalhes && result.detalhes.length > 0 && <Card className="border-slate-200"><CardContent className="flex flex-col gap-3 p-5 text-sm">{result.detalhes.map(([k, v]) => <Summary key={k} label={k} value={v} />)}</CardContent></Card>}

    {result.alertas.length > 0 && <Card className="border-amber-200 bg-amber-50"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="text-amber-700" /> Pontos de atenção</CardTitle></CardHeader><CardContent><ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-amber-950">{result.alertas.map((a) => <li key={a}>{a}</li>)}</ul></CardContent></Card>}

    <Card className="border-slate-200"><CardHeader><CardTitle className="text-base">Memória de cálculo</CardTitle></CardHeader><CardContent><ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-slate-700">{result.memoria.map((m) => <li key={m}>{m}</li>)}</ol></CardContent></Card>

    {result.regras.length > 0 && <Card className="border-slate-200"><CardHeader><CardTitle className="text-base">Fundamentação legal e normativa ({meta.uf})</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm">{result.regras.map((r) => <div key={r.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2"><p className="font-semibold">{r.fonte}{r.dispositivo ? ` — ${r.dispositivo}` : ''}</p>{r.estimativa_operacional && <Badge variant="outline" className="text-xs">Referência de mercado</Badge>}{r.veredito === 'duvidoso' && <Badge variant="outline" className="border-amber-300 text-xs text-amber-800">Verificar</Badge>}</div>
      <p className="mt-1 text-slate-600">{r.descricao}</p>
      {r.url_oficial && <a href={r.url_oficial} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-amber-700 underline">Texto oficial <ExternalLink className="size-3" /></a>}
    </div>)}</CardContent></Card>}

    <div className="flex flex-wrap gap-2 print:hidden">
      <Button variant="outline" onClick={() => window.print()}><Printer data-icon="inline-start" /> Imprimir / salvar PDF</Button>
      <Button variant="outline" onClick={share}><MessageCircle data-icon="inline-start" /> Compartilhar no WhatsApp</Button>
      {onNew
        ? <Button variant="outline" onClick={onNew}><RotateCcw data-icon="inline-start" /> Novo cálculo</Button>
        : <ButtonLink href={`/calculadoras/${result.slug}`} variant="outline"><RotateCcw data-icon="inline-start" /> Novo cálculo</ButtonLink>}
      <ButtonLink href="/painel" variant="secondary">Ir para o painel</ButtonLink>
    </div>
    {result.creditsLeft !== null && <p className="text-sm text-slate-500 print:hidden">Saldo restante: <strong>{result.creditsLeft} crédito(s)</strong>.</p>}
    <p className="text-xs leading-5 text-slate-500">Aviso legal: este resultado é uma estimativa para planejamento, gerada pelo Normato. Não substitui projeto técnico, vistoria nem a responsabilidade de profissional habilitado, e não garante aprovação pelos órgãos competentes. Exigências estaduais e municipais podem ser mais rigorosas.</p>
  </div>
}
