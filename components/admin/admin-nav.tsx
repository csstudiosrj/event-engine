'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/admin', label: 'Visão geral' },
  { href: '/admin/usuarios', label: 'Usuários' },
  { href: '/admin/pagamentos', label: 'Pagamentos' },
  { href: '/admin/planos', label: 'Planos e preços' },
]

export function AdminNav() {
  const path = usePathname()
  return <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 lg:px-8">
    {TABS.map((t) => {
      const ativo = t.href === '/admin' ? path === '/admin' : path.startsWith(t.href)
      return <Link key={t.href} href={t.href} className={`whitespace-nowrap border-b-2 px-3 pb-3 pt-1 text-sm font-medium transition ${ativo ? 'border-amber-400 text-white' : 'border-transparent text-slate-400 hover:text-white'}`}>{t.label}</Link>
    })}
  </nav>
}
