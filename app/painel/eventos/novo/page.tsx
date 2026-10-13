'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { toast } from '@/components/ui/toast'
import { useApp } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/client'

const TIPOS = ['Show','Festival','Casamento','Corporativo','Feira','Esportivo','Religioso','Bloco','Congresso','Formatura','Outro']
const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const fieldClass = 'h-11 border-slate-200 bg-white'
const selectClass = `${fieldClass} w-full rounded-md border px-3 text-sm`

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#0F1B33]">
      {label}
      {hint && <span className="text-xs font-normal text-slate-500">{hint}</span>}
      {children}
    </label>
  )
}

function Toggle({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
            value === opt
              ? 'border-[#0F1B33] bg-[#0F1B33] text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function NovoEventoPage() {
  const router = useRouter()
  const { profile } = useApp()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: '',
    type: 'Show',
    state: 'RJ',
    city: '',
    date: '',
    duration_h: '6',
    environment: 'Aberto',
    pax: '',
    m2: '',
    exit_type: 'distintas',
    risk_level: 'medio',
    open_bar: 'Não',
    has_vip: 'Não',
    vip_pax: '',
    has_fireworks: 'Não',
    is_nocturnal: 'Não',
    has_kitchen: 'Não',
    has_generator: 'Não',
    team_size: '0',
    women_pct: '50',
  })

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async () => {
    if (!profile) return

    if (!form.name.trim()) {
      toast('Informe o nome do evento.', 'error')
      return
    }
    if (!form.pax || Number(form.pax) < 1) {
      toast('Informe o público esperado.', 'error')
      return
    }
    if (!form.city.trim()) {
      toast('Informe a cidade do evento.', 'error')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('events').insert({
      user_id: profile.id,
      name: form.name.trim(),
      type: form.type,
      state: form.state,
      city: form.city.trim(),
      date: form.date || null,
      duration_h: Number(form.duration_h) || 6,
      environment: form.environment,
      pax: Number(form.pax),
      m2: form.m2 ? Number(form.m2) : null,
      exit_type: form.exit_type,
      risk_level: form.risk_level,
      status: 'active',
    })

    if (error) {
      toast('Erro ao criar evento. Tente novamente.', 'error')
      setLoading(false)
      return
    }

    toast('Evento criado com sucesso!', 'success')
    router.push('/painel')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 lg:px-8">
        <a href="/painel" className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F1B33]">
          <ArrowLeft className="size-4" /> Voltar ao painel
        </a>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Novo evento</h1>
          <p className="mt-2 text-slate-600">
            Preencha os dados do evento. Quanto mais completo, menos você precisará repetir informações nas calculadoras.
          </p>
        </div>

        <div className="flex flex-col gap-6">

          {/* Identificação */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Identificação</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome do evento">
                <Input className={fieldClass} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex.: Festival de Inverno 2026" />
              </Field>
              <Field label="Tipo de evento">
                <select className={selectClass} value={form.type} onChange={(e) => set('type', e.target.value)}>
                  {TIPOS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Data">
                <Input type="date" className={fieldClass} value={form.date} onChange={(e) => set('date', e.target.value)} />
              </Field>
              <Field label="Duração (horas)">
                <Input type="number" min="1" max="72" className={fieldClass} value={form.duration_h} onChange={(e) => set('duration_h', e.target.value)} />
              </Field>
            </CardContent>
          </Card>

          {/* Localização */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Localização</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Field label="Estado">
                <select className={selectClass} value={form.state} onChange={(e) => set('state', e.target.value)}>
                  {ESTADOS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Cidade">
                <Input className={fieldClass} value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Ex.: Recife" />
              </Field>
            </CardContent>
          </Card>

          {/* Público e espaço */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Público e espaço</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Field label="Público esperado (pax)">
                <Input type="number" min="1" className={fieldClass} value={form.pax} onChange={(e) => set('pax', e.target.value)} placeholder="Ex.: 5000" />
              </Field>
              <Field label="Área total (m²)" hint="Opcional — usado em cálculos de lotação e brigada">
                <Input type="number" min="1" className={fieldClass} value={form.m2} onChange={(e) => set('m2', e.target.value)} placeholder="Ex.: 2000" />
              </Field>
              <Field label="Perfil de saídas de emergência">
                <Toggle options={['distintas', 'unica']} value={form.exit_type} onChange={(v) => set('exit_type', v)} />
              </Field>
              <Field label="Nível de risco estimado">
                <Toggle options={['baixo', 'medio', 'alto']} value={form.risk_level} onChange={(v) => set('risk_level', v)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Ambiente">
                  <Toggle options={['Aberto', 'Fechado', 'Misto']} value={form.environment} onChange={(v) => set('environment', v)} />
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Perfil operacional */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Perfil operacional</CardTitle>
              <p className="text-sm text-slate-500">Estas informações eliminam perguntas repetitivas nas calculadoras.</p>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Field label="Percentual de mulheres no público (%)">
                <Input type="number" min="0" max="100" className={fieldClass} value={form.women_pct} onChange={(e) => set('women_pct', e.target.value)} />
              </Field>
              <Field label="Equipe de trabalho (pessoas)">
                <Input type="number" min="0" className={fieldClass} value={form.team_size} onChange={(e) => set('team_size', e.target.value)} />
              </Field>
              <Field label="Open bar / consumo de álcool">
                <Toggle options={['Não', 'Moderado', 'Alto']} value={form.open_bar} onChange={(v) => set('open_bar', v)} />
              </Field>
              <Field label="Evento noturno?">
                <Toggle options={['Não', 'Sim']} value={form.is_nocturnal} onChange={(v) => set('is_nocturnal', v)} />
              </Field>
              <Field label="Área VIP / Camarote?">
                <Toggle options={['Não', 'Sim']} value={form.has_vip} onChange={(v) => set('has_vip', v)} />
              </Field>
              {form.has_vip === 'Sim' && (
                <Field label="Público do VIP/Camarote (pax)">
                  <Input type="number" min="0" className={fieldClass} value={form.vip_pax} onChange={(e) => set('vip_pax', e.target.value)} placeholder="Ex.: 200" />
                </Field>
              )}
              <Field label="Pirotecnia / fogos?">
                <Toggle options={['Não', 'Sim']} value={form.has_fireworks} onChange={(v) => set('has_fireworks', v)} />
              </Field>
              <Field label="Cozinha profissional?">
                <Toggle options={['Não', 'Sim']} value={form.has_kitchen} onChange={(v) => set('has_kitchen', v)} />
              </Field>
              <Field label="Gerador próprio?">
                <Toggle options={['Não', 'Sim']} value={form.has_generator} onChange={(v) => set('has_generator', v)} />
              </Field>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <a href="/painel">
              <Button variant="outline">Cancelar</Button>
            </a>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#0F1B33] hover:bg-[#1b2b4c]"
            >
              {loading ? 'Salvando...' : <>Criar evento <ArrowRight className="ml-2 size-4" /></>}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
