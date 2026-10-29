import { notFound } from 'next/navigation'
import Link from 'next/link'
import { requireAdmin } from '@/lib/admin'
import { noindex } from '@/lib/seo'
import { AdminNav } from '@/components/admin/admin-nav'

export const metadata = { ...noindex, title: 'Super admin — Normato' }
export const dynamic = 'force-dynamic'

// Área do dono do Normato: só perfis com is_admin = true
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessao = await requireAdmin()
  if (!sessao) notFound()

  return <div className="min-h-screen bg-[#F7F8FA] text-[#0F1B33]">
    <header className="bg-[#0F1B33] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold">Normato</Link>
          <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-[#0F1B33]">Super admin</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <span className="hidden sm:inline">{sessao.profile.email}</span>
          <Link href="/painel" className="hover:text-white">Voltar ao site</Link>
        </div>
      </div>
      <AdminNav />
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">{children}</main>
  </div>
}
