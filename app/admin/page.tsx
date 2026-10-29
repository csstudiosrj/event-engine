import Link from 'next/link'
import { requireAdmin } from '@/lib/admin'
import { activeProvider } from '@/lib/payments'
import { mercadoPagoAccount } from '@/lib/mercadopago'
import { getPlans } from '@/lib/catalogo'
import { formatBRL } from '@/lib/plans'
import { paymentKind } from '@/lib/fulfillment'
import { TestPixButton } from '@/components/admin/admin-client'
import { PaymentsTable, emailsFor } from '@/components/admin/payments-table'

const DIA = 86400000

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
    {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
  </div>
}

async function contaMercadoPago() {
  if (!process.env.MP_ACCESS_TOKEN) return null
  try {
    const c = await mercadoPagoAccount()
    const doc = c.identification?.type?.toUpperCase()
    const nome = c.company?.corporate_name || c.company?.brand_name || [c.first_name, c.last_name].filter(Boolean).join(' ') || c.nickname
    return { ok: true as const, nome, email: c.email, doc, pj: doc === 'CNPJ' }
  } catch {
    return { ok: false as const }
  }
}

export default async function AdminHome() {
  const { admin } = (await requireAdmin())!
  const agora = new Date()
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1).toISOString()
  const ha30 = new Date(Date.now() - 30 * DIA).toISOString()

  const [usuarios, novos, assinantes, calcs, pagos, recentes, planos, mp] = await Promise.all([
    admin.from('profiles').select('id', { count: 'exact', head: true }),
    admin.from('profiles').select('id', { count: 'exact', head: true }).gte('created_at', ha30),
    admin.from('profiles').select('plan').in('plan', ['solo', 'pro']).gt('plan_expires_at', agora.toISOString()),
    admin.from('calc_results').select('id', { count: 'exact', head: true }).gte('created_at', ha30),
    admin.from('payments').select('amount_cents, paid_at, kind, product').eq('status', 'paid').limit(10000),
    admin.from('payments').select('*').order('created_at', { ascending: false }).limit(8),
    getPlans(),
    contaMercadoPago(),
  ])

  const vendas = (pagos.data ?? []).filter((p) => paymentKind(p) !== 'test')
  const receitaMes = vendas.filter((p) => p.paid_at && p.paid_at >= inicioMes).reduce((s, p) => s + p.amount_cents, 0)
  const receitaTotal = vendas.reduce((s, p) => s + p.amount_cents, 0)
  const subs = assinantes.data ?? []
  const preco = (id: string) => planos.find((p) => p.id === id)?.amount_cents ?? 0
  const mrr = subs.reduce((s, u) => s + preco(u.plan), 0)
  const emails = await emailsFor(admin, (recentes.data ?? []).map((p) => p.user_id))
  const provider = activeProvider()

  return <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold">Visão geral</h1>
      <p className="mt-1 text-sm text-slate-500">Números do Normato em tempo real.</p>
    </div>

    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Usuários" value={usuarios.count ?? 0} hint={`${novos.count ?? 0} novos nos últimos 30 dias`} />
      <Stat label="Assinantes ativos" value={subs.length} hint={`${subs.filter((s) => s.plan === 'solo').length} Solo · ${subs.filter((s) => s.plan === 'pro').length} Pro`} />
      <Stat label="Receita recorrente (MRR)" value={formatBRL(mrr)} hint="Assinantes ativos × preço atual" />
      <Stat label="Vendas no mês" value={formatBRL(receitaMes)} hint={`${formatBRL(receitaTotal)} no total · ${calcs.count ?? 0} cálculos em 30 dias`} />
    </section>
    <p className="-mt-4 text-xs text-slate-400">As vendas contam compras de créditos e a primeira mensalidade de cada assinatura. As renovações mensais aparecem no painel do Mercado Pago.</p>

    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold">Recebimento</h2>
        {!provider ? <p className="mt-2 text-sm text-red-700">Nenhum provedor de pagamento configurado na Vercel.</p>
          : provider === 'pagarme' ? <p className="mt-2 text-sm text-slate-600">Provedor ativo: <strong>Pagar.me</strong>.</p>
          : mp?.ok ? <div className="mt-2 space-y-1 text-sm text-slate-600">
            <p>Provedor ativo: <strong>Mercado Pago</strong></p>
            <p>Conta: <strong>{mp.nome}</strong>{mp.email ? ` (${mp.email})` : ''}</p>
            <p>Tipo: <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${mp.pj ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{mp.pj ? 'Pessoa jurídica (CNPJ)' : mp.doc ? `Pessoa física (${mp.doc})` : 'Não informado pelo Mercado Pago'}</span></p>
          </div>
          : <p className="mt-2 text-sm text-red-700">Não foi possível falar com o Mercado Pago. Confira o MP_ACCESS_TOKEN na Vercel.</p>}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold">Cobrança de teste</h2>
        <p className="mt-1 mb-4 text-sm text-slate-500">Gera um Pix de verdade para você pagar e conferir a baixa automática. Fica registrado em Pagamentos como “Teste” e não entra nas vendas.</p>
        <TestPixButton />
      </div>
    </section>

    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Últimas compras</h2>
        <Link href="/admin/pagamentos" className="text-sm font-medium text-amber-700 hover:underline">Ver todas</Link>
      </div>
      <PaymentsTable payments={recentes.data ?? []} emails={emails} />
    </section>
  </div>
}
