import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin, data, dataHora } from '@/lib/admin'
import { hasActivePlan, planLabel } from '@/lib/plans'
import { getCalculatorTitle } from '@/lib/calculators/catalog'
import { PaymentsTable } from '@/components/admin/payments-table'
import { UserActions } from '@/components/admin/user-actions'

type Props = { params: Promise<{ id: string }> }

export default async function AdminUser({ params }: Props) {
  const { admin, profile: eu } = (await requireAdmin())!
  const { id } = await params
  const { data: u } = await admin.from('profiles').select('*').eq('id', id).maybeSingle()
  if (!u) notFound()

  const [pagamentos, calcs, eventos, movimentos] = await Promise.all([
    admin.from('payments').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(50),
    admin.from('calc_results').select('id, calc_name, created_at, credits_used').eq('user_id', id).order('created_at', { ascending: false }).limit(20),
    admin.from('events').select('id', { count: 'exact', head: true }).eq('user_id', id),
    admin.from('credit_transactions').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(20),
  ])

  return <div className="space-y-6">
    <Link href="/admin/usuarios" className="text-sm font-medium text-slate-500 hover:text-[#0F1B33]">← Usuários</Link>
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{u.name || u.email}</h1>
        <p className="mt-1 text-sm text-slate-500">{u.email} · cadastro em {data(u.created_at)}{u.accepted_terms_at ? ' · aceitou os termos' : ''}</p>
      </div>
      {u.is_admin && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Super admin</span>}
    </div>

    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wide text-slate-500">Plano</p><p className="mt-2 text-xl font-bold">{planLabel(u)}</p>{hasActivePlan(u) && <p className="text-xs text-slate-500">até {data(u.plan_expires_at)}</p>}</div>
      <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wide text-slate-500">Créditos</p><p className="mt-2 text-xl font-bold">{u.credits}</p></div>
      <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wide text-slate-500">Renovação automática</p><p className="mt-2 text-xl font-bold">{u.subscription_id ? 'Ativa' : 'Não'}</p>{u.subscription_provider && u.subscription_id && <p className="text-xs text-slate-500">{u.subscription_provider === 'pagarme' ? 'Pagar.me' : 'Mercado Pago'}</p>}</div>
      <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-xs uppercase tracking-wide text-slate-500">Uso</p><p className="mt-2 text-xl font-bold">{calcs.data?.length ?? 0}{(calcs.data?.length ?? 0) === 20 ? '+' : ''} cálculos</p><p className="text-xs text-slate-500">{eventos.count ?? 0} eventos</p></div>
    </section>

    <UserActions user={{ id: u.id, plan: hasActivePlan(u) ? u.plan : 'free', planExpiresAt: u.plan_expires_at, renova: !!u.subscription_id, isAdmin: u.is_admin, isSelf: u.id === eu.id }} />

    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-3 font-semibold">Compras</h2>
      <PaymentsTable payments={pagamentos.data ?? []} showUser={false} />
    </section>

    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Últimos cálculos</h2>
        {calcs.data?.length ? <ul className="space-y-2 text-sm">{calcs.data.map((c) => <li key={c.id} className="flex justify-between gap-3"><span>{getCalculatorTitle(c.calc_name)}</span><span className="text-slate-500">{dataHora(c.created_at)}</span></li>)}</ul> : <p className="text-sm text-slate-500">Nenhum cálculo.</p>}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 font-semibold">Movimentação de créditos</h2>
        {movimentos.data?.length ? <ul className="space-y-2 text-sm">{movimentos.data.map((m) => <li key={m.id} className="flex justify-between gap-3"><span>{m.description}</span><span className={m.type === 'spend' ? 'text-red-600' : 'text-emerald-700'}>{m.type === 'spend' ? '−' : '+'}{Math.abs(m.amount)} · <span className="text-slate-500">{dataHora(m.created_at)}</span></span></li>)}</ul> : <p className="text-sm text-slate-500">Sem movimentação.</p>}
      </div>
    </section>
  </div>
}
