import Link from 'next/link'
import { requireAdmin } from '@/lib/admin'
import { PaymentsTable, emailsFor } from '@/components/admin/payments-table'

type Props = { searchParams: Promise<{ status?: string }> }

const FILTROS = [
  { v: '', label: 'Todas' },
  { v: 'pending', label: 'Pendentes' },
  { v: 'paid', label: 'Pagas' },
  { v: 'refunded', label: 'Estornadas' },
  { v: 'canceled', label: 'Canceladas' },
  { v: 'test', label: 'Testes' },
]

export default async function AdminPayments({ searchParams }: Props) {
  const { admin } = (await requireAdmin())!
  const { status = '' } = await searchParams
  let query = admin.from('payments').select('*').order('created_at', { ascending: false }).limit(200)
  if (status === 'test') query = query.eq('kind', 'test')
  else if (status) query = query.eq('status', status as 'pending' | 'paid' | 'canceled' | 'refunded')
  const { data: payments } = await query
  const emails = await emailsFor(admin, (payments ?? []).map((p) => p.user_id))

  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Pagamentos</h1>
      <p className="mt-1 text-sm text-slate-500">Compras pendentes podem receber um Pix novo para enviar ao cliente, ser marcadas como pagas ou canceladas. Compras pagas podem ser estornadas.</p>
    </div>
    <nav className="flex flex-wrap gap-2">{FILTROS.map((f) => <Link key={f.v} href={f.v ? `/admin/pagamentos?status=${f.v}` : '/admin/pagamentos'} className={`rounded-full px-3 py-1.5 text-sm font-medium ${status === f.v ? 'bg-[#0F1B33] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{f.label}</Link>)}</nav>
    <div className="rounded-xl border border-slate-200 bg-white p-5"><PaymentsTable payments={payments ?? []} emails={emails} /></div>
  </div>
}
