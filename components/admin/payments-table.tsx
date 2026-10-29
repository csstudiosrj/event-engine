import Link from 'next/link'
import { dataHora } from '@/lib/admin'
import { formatBRL } from '@/lib/plans'
import { paymentCredits, paymentDescription, paymentKind } from '@/lib/fulfillment'
import type { Payment } from '@/lib/supabase/types'
import type { createAdminClient } from '@/lib/supabase/admin'
import { PaymentActions } from './payment-actions'

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Pendente', cls: 'bg-amber-50 text-amber-800' },
  paid: { label: 'Paga', cls: 'bg-emerald-50 text-emerald-700' },
  canceled: { label: 'Cancelada', cls: 'bg-slate-100 text-slate-500' },
  refunded: { label: 'Estornada', cls: 'bg-red-50 text-red-700' },
}

const TIPO = { credits: 'Créditos', subscription: 'Assinatura', test: 'Teste' }

export function PaymentsTable({ payments, emails, showUser = true }: { payments: Payment[]; emails?: Record<string, string>; showUser?: boolean }) {
  if (!payments.length) return <p className="py-6 text-center text-sm text-slate-500">Nenhuma compra.</p>
  return <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-sm">
      <thead><tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
        <th className="py-2 pr-3 font-medium">Data</th>
        {showUser && <th className="py-2 pr-3 font-medium">Usuário</th>}
        <th className="py-2 pr-3 font-medium">Item</th>
        <th className="py-2 pr-3 font-medium">Valor</th>
        <th className="py-2 pr-3 font-medium">Situação</th>
        <th className="py-2 text-right font-medium">Ações</th>
      </tr></thead>
      <tbody>{payments.map((p) => {
        const s = STATUS[p.status] ?? { label: p.status, cls: 'bg-slate-100' }
        const kind = paymentKind(p)
        return <tr key={p.id} className="border-b border-slate-100 align-top last:border-0">
          <td className="py-3 pr-3 whitespace-nowrap text-slate-600">{dataHora(p.created_at)}{p.paid_at && <div className="text-xs text-slate-400">paga {dataHora(p.paid_at)}</div>}</td>
          {showUser && <td className="py-3 pr-3"><Link href={`/admin/usuarios/${p.user_id}`} className="font-medium text-[#0F1B33] hover:underline">{emails?.[p.user_id] ?? p.user_id.slice(0, 8)}</Link></td>}
          <td className="py-3 pr-3">{paymentDescription(p)}<div className="text-xs text-slate-400">{TIPO[kind]} · {p.provider === 'pagarme' ? 'Pagar.me' : 'Mercado Pago'}</div></td>
          <td className="py-3 pr-3 whitespace-nowrap font-medium">{formatBRL(p.amount_cents)}</td>
          <td className="py-3 pr-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span></td>
          <td className="py-3 text-right"><PaymentActions p={{ id: p.id, status: p.status, kind, description: paymentDescription(p), credits: paymentCredits(p) }} /></td>
        </tr>
      })}</tbody>
    </table>
  </div>
}

export async function emailsFor(admin: ReturnType<typeof createAdminClient>, ids: string[]) {
  const unicos = [...new Set(ids)]
  if (!unicos.length) return {}
  const { data } = await admin.from('profiles').select('id, email').in('id', unicos)
  return Object.fromEntries((data ?? []).map((u) => [u.id, u.email])) as Record<string, string>
}
