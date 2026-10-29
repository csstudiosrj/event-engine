'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ErrorNote, btnDanger, btnPrimary, btnSecondary, field, useAdminAction } from '@/components/admin/admin-client'
import { checkoutName, formatBRL, type Plan } from '@/lib/plans'

type Draft = { id: string; kind: Plan['kind']; name: string; description: string; price: string; credits: string; features: string; highlight: boolean; active: boolean; sort: string; novo?: boolean }

const toDraft = (p: Plan): Draft => ({
  id: p.id, kind: p.kind, name: p.name, description: p.description, price: (p.amount_cents / 100).toFixed(2).replace('.', ','),
  credits: String(p.credits ?? ''), features: p.features.join('\n'), highlight: p.highlight, active: p.active, sort: String(p.sort),
})

const cents = (v: string) => Math.round(Number(v.replace(/\./g, '').replace(',', '.')) * 100)

function PlanCard({ initial, onRemoved }: { initial: Draft; onRemoved?: () => void }) {
  const { run, busy, error } = useAdminAction()
  const [d, setD] = useState(initial)
  const [salvo, setSalvo] = useState(false)
  const set = (patch: Partial<Draft>) => { setD({ ...d, ...patch }); setSalvo(false) }
  const valor = cents(d.price)
  const assinatura = d.kind === 'subscription'

  const salvar = async () => {
    const ok = await run('salvar', {
      acao: 'plano_salvar', novo: d.novo === true, id: d.id, kind: d.kind, name: d.name, description: d.description,
      amount_cents: valor, credits: assinatura ? null : Number.parseInt(d.credits, 10), features: d.features.split('\n'),
      highlight: d.highlight, active: d.active, sort: Number.parseInt(d.sort, 10),
    }, assinatura && valor !== cents(initial.price) ? 'O novo preço vale para quem assinar a partir de agora. Assinantes atuais continuam pagando o valor antigo no Mercado Pago. Salvar?' : undefined)
    if (ok) { setSalvo(true); setD({ ...d, novo: false }) }
  }

  return <div className={`rounded-xl border bg-white p-5 ${d.active ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-80'}`}>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${assinatura ? 'bg-[#0F1B33] text-white' : 'bg-amber-100 text-amber-800'}`}>{assinatura ? 'Assinatura mensal' : 'Pacote de créditos'}</span>
        <code className="text-xs text-slate-400">{d.id || 'novo'}</code>
      </div>
      <span className="text-sm text-slate-500">{Number.isFinite(valor) && valor > 0 ? `${formatBRL(valor)}${assinatura ? '/mês' : ''}` : ''}</span>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      {d.novo && <label className="text-xs font-medium text-slate-600">Código (não muda depois)<input className={`${field} mt-1`} value={d.id} onChange={(e) => set({ id: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })} placeholder="creditos_20" /></label>}
      <label className="text-xs font-medium text-slate-600">Nome no card<input className={`${field} mt-1`} value={d.name} onChange={(e) => set({ name: e.target.value })} /></label>
      <label className="text-xs font-medium text-slate-600">Preço (R$){assinatura ? ' por mês' : ''}<input className={`${field} mt-1`} value={d.price} onChange={(e) => set({ price: e.target.value })} inputMode="decimal" /></label>
      {!assinatura && <label className="text-xs font-medium text-slate-600">Créditos no pacote<input className={`${field} mt-1`} type="number" min={1} value={d.credits} onChange={(e) => set({ credits: e.target.value })} /></label>}
      <label className="text-xs font-medium text-slate-600">Ordem na página<input className={`${field} mt-1`} type="number" value={d.sort} onChange={(e) => set({ sort: e.target.value })} /></label>
      <label className="text-xs font-medium text-slate-600 sm:col-span-2">Descrição curta<input className={`${field} mt-1`} value={d.description} onChange={(e) => set({ description: e.target.value })} /></label>
      <label className="text-xs font-medium text-slate-600 sm:col-span-2">Itens do card (um por linha)<textarea className={`${field} mt-1 h-28 py-2`} value={d.features} onChange={(e) => set({ features: e.target.value })} /></label>
    </div>
    <div className="mt-3 flex flex-wrap gap-4 text-sm">
      <label className="flex items-center gap-2"><input type="checkbox" checked={d.active} onChange={(e) => set({ active: e.target.checked })} /> À venda</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={d.highlight} onChange={(e) => set({ highlight: e.target.checked })} /> Destacar como “Recomendado”</label>
    </div>
    <p className="mt-3 text-xs text-slate-400">No checkout aparece como “{checkoutName({ kind: d.kind, name: d.name || '…', credits: Number.parseInt(d.credits, 10) || 0 })}”.</p>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button type="button" className={btnPrimary} disabled={!!busy} onClick={salvar}>{busy === 'salvar' ? 'Salvando...' : d.novo ? 'Criar pacote' : 'Salvar'}</button>
      {!assinatura && !d.novo && <button type="button" className={btnDanger} disabled={!!busy} onClick={async () => { if (await run('excluir', { acao: 'plano_excluir', id: d.id }, `Excluir o pacote “${d.name}”? Compras já feitas não são afetadas. Para só tirar de venda, desmarque “À venda”.`)) onRemoved?.() }}>Excluir</button>}
      {d.novo && <button type="button" className={btnSecondary} onClick={onRemoved}>Descartar</button>}
      {salvo && <span className="text-sm text-emerald-700">Salvo.</span>}
    </div>
    <div className="mt-3"><ErrorNote error={error} /></div>
  </div>
}

export function PlansEditor({ plans, signupCredits }: { plans: Plan[]; signupCredits: number }) {
  const { run, busy, error } = useAdminAction()
  const [boasVindas, setBoasVindas] = useState(String(signupCredits))
  const [novos, setNovos] = useState<number[]>([])
  const [removidos, setRemovidos] = useState<string[]>([])
  const n = Number.parseInt(boasVindas, 10)

  return <div className="space-y-6">
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">Plano grátis</h2>
      <p className="mt-1 text-sm text-slate-500">Créditos que toda conta nova ganha ao se cadastrar. Com 0, o card “Grátis” some da página de preços.</p>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <input className={`${field} max-w-[7rem]`} type="number" min={0} value={boasVindas} onChange={(e) => setBoasVindas(e.target.value)} aria-label="Créditos de boas-vindas" />
        <button type="button" className={btnPrimary} disabled={!(n >= 0) || !!busy} onClick={() => run('cfg', { acao: 'config_salvar', signupCredits: n })}>Salvar</button>
      </div>
      <div className="mt-3"><ErrorNote error={error} /></div>
    </div>

    <div className="grid gap-4 lg:grid-cols-2">
      {plans.filter((p) => !removidos.includes(p.id)).map((p) => <PlanCard key={p.id} initial={toDraft(p)} onRemoved={() => setRemovidos([...removidos, p.id])} />)}
      {novos.map((k) => <PlanCard key={`novo-${k}`} initial={{ id: '', kind: 'credits', name: 'Créditos', description: '', price: '', credits: '', features: '', highlight: false, active: true, sort: '15', novo: true }} onRemoved={() => setNovos(novos.filter((x) => x !== k))} />)}
    </div>
    <button type="button" className={btnSecondary} onClick={() => setNovos([...novos, Date.now()])}><Plus className="size-4" /> Novo pacote de créditos</button>
    <p className="text-xs text-slate-400">As assinaturas são só Solo e Pro, porque o que cada uma libera (eventos ativos, calculadoras Estratégicas) está no sistema. Nome, preço, descrição e itens você muda à vontade.</p>
  </div>
}
