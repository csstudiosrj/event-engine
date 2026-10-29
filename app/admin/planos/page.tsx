import { requireAdmin } from '@/lib/admin'
import { getPlans, getSignupCredits } from '@/lib/catalogo'
import { PlansEditor } from '@/components/admin/plans-editor'

export default async function AdminPlans() {
  const { admin } = (await requireAdmin())!
  const [plans, signupCredits, tabela] = await Promise.all([
    getPlans(),
    getSignupCredits(),
    admin.from('plans').select('id', { count: 'exact', head: true }),
  ])

  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold">Planos e preços</h1>
      <p className="mt-1 text-sm text-slate-500">O que você salvar aqui vale na hora para a página de preços e para o checkout.</p>
    </div>
    {tabela.error && <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">Rode o arquivo <code>supabase/migrations/20261029_super_admin.sql</code> no Supabase para liberar a edição. Até lá, o site usa os preços padrão abaixo.</p>}
    <PlansEditor plans={plans} signupCredits={signupCredits} />
  </div>
}
