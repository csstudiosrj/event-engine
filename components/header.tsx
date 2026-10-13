'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell, LogOut, Settings, User, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useApp } from '@/components/app-shell'
import { createClient } from '@/lib/supabase/client'

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Event Engine">
      <svg viewBox="0 0 200 200" className="size-9" aria-hidden="true">
        <rect x="20" y="20" width="160" height="160" rx="38" fill="#0F1B33" />
        <rect x="55" y="52" width="22" height="96" rx="11" fill="#FFFFFF" />
        <rect x="55" y="52" width="92" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="89" width="60" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="126" width="92" height="22" rx="11" fill="#FFFFFF" />
        <circle cx="140" cy="100" r="12" fill="#F59E0B" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-[#0F1B33]">
        event <span className="text-[#F59E0B]">engine</span>
      </span>
    </a>
  )
}

export function Header() {
  const { profile, loading } = useApp()
  const router = useRouter()
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const initials = profile?.name
    ? profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2">
          {!loading && profile && (
            <Badge className="gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Zap className="size-3" />
              {profile.credits} crédito{profile.credits !== 1 ? 's' : ''}
            </Badge>
          )}

          <Button variant="ghost" size="icon" aria-label="Notificações">
            <Bell className="size-5" />
          </Button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full bg-[#0F1B33] text-sm font-bold text-white transition-opacity hover:opacity-80"
              aria-label="Menu do perfil"
              aria-expanded={menuOpen}
            >
              {initials}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-30 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate font-semibold text-sm text-[#0F1B33]">{profile?.name ?? 'Usuário'}</p>
                  <p className="truncate text-xs text-slate-500">{profile?.email}</p>
                </div>
                <div className="flex flex-col py-1">
                  <a
                    href="/conta"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User className="size-4 text-slate-400" />
                    Meu perfil
                  </a>
                  <a
                    href="/conta#plano"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="size-4 text-slate-400" />
                    Plano e faturamento
                  </a>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="size-4" />
                    Sair da conta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
