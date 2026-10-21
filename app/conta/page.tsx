'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, CreditCard, History, LogOut, ShieldCheck, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useApp } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/client'
import { getCalculatorTitle } from '@/lib/calculators/catalog'
import { CONTACT_EMAIL, withBase } from '@/lib/config'
import { PRODUCTS, hasActivePlan, planLabel, type ProductId } from '@/lib/plans'
import type { CalcResult, Payment } from '@/lib/supabase/types'

const STATUS: Record<string, string> = { pending: 'Aguardando pagamento', paid: 'Pago', canceled: 'Cancelado' }

function ContaContent() {
  const { profile, loading, refreshProfile } = useApp()
  const searchParams = useSearchParams()
  const pagamentoOk = searchParams.get('pagamento') === 'ok'
  const [supabase] = useState(() => createClient())
  const [payments, setPayments] = useState<Payment[]>([])
  const [calcs, setCalcs] = useState<CalcResult[]>([])
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [canceling, setCanceling] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) return
    setName(profile.name ?? '')
    supabase.from('payments').select('*').order('created_at', { ascending: false }).limit(20).then(({ data }) => setPayments((data ?? []).filter((p) => p.status !== 'canceled' || p.paid_at)))
    supabase.from('calc_results').select('*').order('created_at', { ascending: false }).limit(20).then(({ data }) => setCalcs(data ?? []))
  }, [profile?.id, supabase]) // eslint-disable-line react-hooks/exhaustive-deps

  // O webhook do pagamento pode chegar alguns segundos depois do retorno do checkout
  useEffect(() => {
    if (!pagamentoOk) return
    const timers = [3000, 8000, 15000].map((ms) => setTimeout(refreshProfile, ms))
    return () => timers.forEach(clearTimeout)
  }, [pagamentoOk, refreshProfile])

  const saveName = async () => {
    if (!profile) return
    await supabase.from('profiles').update({ name, updated_at: new Date().toISOString() }).eq('id', profile.id)
    setSaved(true)
    refreshProfile()
  }

  const cancel = async () => {
    if (!confirm('Cancelar a renovação automática? Você mantém o acesso até o fim do período já pago.')) return
    setCanceling(true)
    const res = await fetch(withBase('/api/assinatura/cancelar'), { method: 'POST' })
    setCanceling(false)
    setMessage(res.ok ? 'Assinatura cancelada. Não haverá novas cobranças.' : `Não foi possível cancelar agora. Tente novamente ou escreva para ${CONTACT_EMAIL}.`)
    refreshProfile()
  }

  if (loading) return <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10"><p className="text-slate-500">Carregando...</p></main>
  if (!profile) return <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10"><p>Entre para ver sua conta. <Link href="/auth/login?redirectTo=/conta" className="font-semibold text-amber-700 underline">Entrar</Link></p></main>

  const ativo = hasActivePlan(profile)

  return <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
    <div><p className="text-sm font-medium text-amber-600">Minha conta</p><h1 className="text-3xl font-bold">{profile.name || profile.email}</h1></div>

    {pagamentoOk && <Card className="border-emerald-200 bg-emerald-50"><CardContent className="flex gap-3 p-5 text-sm text-emerald-950"><CheckCircle2 className="shrink-0 text-emerald-700" /><p><strong>Pagamento enviado.</strong> Assim que o pagamento for confirmado (no Pix costuma ser imediato), seus créditos ou seu plano aparecem aqui. Se não aparecer em alguns minutos, atualize a página.</p></CardContent></Card>}
    {message && <p role="status" className="rounded-lg bg-slate-100 px-4 py-3 text-sm">{message}</p>}

    <Card className="border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="size-5" /> Plano e créditos</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm">
      <div className="flex items-center justify-between"><span className="text-slate-500">Plano</span><Badge className={ativo ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-100'}>{planLabel(profile)}</Badge></div>
      {ativo && <div className="flex items-center justify-between"><span className="text-slate-500">{profile.subscription_id ? 'Próxima renovação até' : 'Acesso até'}</span><strong>{new Date(profile.plan_expires_at!).toLocaleDateString('pt-BR')}</strong></div>}
      <div className="flex items-center justify-between"><span className="text-slate-500">Créditos</span><strong>{profile.credits}</strong></div>
      <div className="flex flex-wrap gap-2 pt-2">
        <ButtonLink href="/precos" className="h-9 bg-[#0F1B33] text-white hover:bg-[#1b2b4c]"><CreditCard data-icon="inline-start" /> {ativo ? 'Comprar créditos' : 'Ver planos e créditos'}</ButtonLink>
        {ativo && profile.subscription_id && <Button variant="outline" className="h-9" disabled={canceling} onClick={cancel}>{canceling ? 'Cancelando...' : 'Cancelar assinatura'}</Button>}
      </div>
    </CardContent></Card>

    <Card className="border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><History className="size-5" /> Últimos cálculos</CardTitle></CardHeader><CardContent className="flex flex-col gap-3 text-sm">
      {calcs.length === 0 ? <p className="text-slate-500">Nenhum cálculo ainda. <Link href="/#calculadoras" className="font-semibold text-amber-700 underline">Abrir calculadoras</Link></p> : calcs.map((c) => {
        const inputs = (c.inputs ?? {}) as Record<string, string>
        return <div key={c.id} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><div><p className="font-semibold">{getCalculatorTitle(c.calc_name)}</p><p className="text-xs text-slate-500">{inputs.nome || 'Sem nome'} · {new Date(c.created_at).toLocaleString('pt-BR')}</p></div><Link href={`/historico/${c.id}`} className="shrink-0 text-amber-700 underline">Ver</Link></div>
      })}
    </CardContent></Card>

    <Card className="border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><CreditCard className="size-5" /> Compras</CardTitle></CardHeader><CardContent className="flex flex-col gap-3 text-sm">
      {payments.length === 0 ? <p className="text-slate-500">Nenhuma compra ainda.</p> : payments.map((p) => <div key={p.id} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"><div><p className="font-semibold">{PRODUCTS[p.product as ProductId]?.name ?? p.product}</p><p className="text-xs text-slate-500">{new Date(p.created_at).toLocaleString('pt-BR')} · {(p.amount_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div><span className={p.status === 'paid' ? 'text-emerald-700' : 'text-slate-500'}>{STATUS[p.status] ?? p.status}</span></div>)}
    </CardContent></Card>

    <Card className="border-slate-200"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><User className="size-5" /> Dados pessoais</CardTitle></CardHeader><CardContent className="flex flex-col gap-4 text-sm">
      <label className="flex flex-col gap-2 font-semibold">Nome<Input value={name} onChange={(e) => { setName(e.target.value); setSaved(false) }} className="h-10" /></label>
      <div className="flex items-center justify-between"><span className="text-slate-500">E-mail</span><span>{profile.email}</span></div>
      <div className="flex flex-wrap items-center gap-3"><Button variant="outline" className="h-9" onClick={saveName}>Salvar nome</Button>{saved && <span className="text-emerald-700">Salvo.</span>}</div>
      <p className="text-xs text-slate-500">Para exportar ou excluir seus dados (LGPD), escreva para <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.</p>
      <form action={withBase('/auth/signout')} method="post"><Button type="submit" variant="ghost" className="h-9 px-0 text-slate-600"><LogOut data-icon="inline-start" /> Sair da conta</Button></form>
    </CardContent></Card>
  </main>
}

export default function ContaPage() {
  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]"><Header /><Suspense><ContaContent /></Suspense><Footer /></div>
}
