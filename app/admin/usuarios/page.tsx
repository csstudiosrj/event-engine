import Link from 'next/link'
import { requireAdmin, data } from '@/lib/admin'
import { hasActivePlan, planLabel } from '@/lib/plans'
import { field, btnPrimary } from '@/components/admin/admin-client'

type Props = { searchParams: Promise<{ q?: string; filtro?: string }> }

export default async function AdminUsers({ searchParams }: Props) {
  const { admin } = (await requireAdmin())!
  const { q = '', filtro = '' } = await searchParams
  let query = admin.from('profiles').select('*').order('created_at', { ascending: false }).limit(100)
  const termo = q.trim().replace(/[%,()]/g, '')
  if (termo) query = query.or(`email.ilike.%${termo}%,name.ilike.%${termo}%`)
  if (filtro === 'assinantes') query = query.in('plan', ['solo', 'pro']).gt('plan_expires_at', new Date().toISOString())
  if (filtro === 'admins') query = query.eq('is_admin', true)
  const { data: users } = await query

  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Usuários</h1>
      <p className="mt-1 text-sm text-slate-500">Busque por e-mail ou nome. Clique no usuário para ajustar créditos, plano e acesso.</p>
    </div>
    <form className="flex flex-wrap gap-2" action="">
      <input name="q" defaultValue={q} placeholder="E-mail ou nome" className={`${field} max-w-sm`} />
      <select name="filtro" defaultValue={filtro} className={`${field} w-44`}>
        <option value="">Todos</option>
        <option value="assinantes">Assinantes ativos</option>
        <option value="admins">Admins</option>
      </select>
      <button className={btnPrimary}>Buscar</button>
    </form>
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[720px] text-sm">
        <thead><tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
          <th className="px-4 py-3 font-medium">Usuário</th><th className="px-4 py-3 font-medium">Plano</th><th className="px-4 py-3 font-medium">Créditos</th><th className="px-4 py-3 font-medium">Cadastro</th>
        </tr></thead>
        <tbody>{(users ?? []).map((u) => <tr key={u.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
          <td className="px-4 py-3"><Link href={`/admin/usuarios/${u.id}`} className="font-medium text-[#0F1B33] hover:underline">{u.email}</Link>{u.name && <div className="text-xs text-slate-500">{u.name}</div>}{u.is_admin && <span className="ml-0 mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">ADMIN</span>}</td>
          <td className="px-4 py-3">{planLabel(u)}{hasActivePlan(u) && <div className="text-xs text-slate-500">até {data(u.plan_expires_at)}{u.subscription_id ? ' · renova' : ' · não renova'}</div>}</td>
          <td className="px-4 py-3">{u.credits}</td>
          <td className="px-4 py-3 text-slate-600">{data(u.created_at)}</td>
        </tr>)}</tbody>
      </table>
      {!users?.length && <p className="py-8 text-center text-sm text-slate-500">Nenhum usuário encontrado.</p>}
    </div>
    {users?.length === 100 && <p className="text-xs text-slate-400">Mostrando os 100 mais recentes. Use a busca para achar outros.</p>}
  </div>
}
