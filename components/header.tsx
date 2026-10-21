"use client"

import Link from "next/link"
import { useState } from "react"
import { useApp } from "@/components/app-shell"
import { withBase } from "@/lib/config"
import { hasActivePlan, planLabel } from "@/lib/plans"

function NormatoSymbol({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Normato"
    >
      <rect width="40" height="40" rx="8" fill="#0B1F3A" />
      <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <line
        x1="13"
        y1="7"
        x2="27"
        y2="33"
        stroke="#E8A020"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Header() {
  const { profile } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a2f4a] bg-[#0B1F3A]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <NormatoSymbol size={32} />
          <span className="text-white font-semibold text-lg tracking-wide">
            Normato
          </span>
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#8ba4bc]">
          <Link href="/#como-funciona" className="hover:text-white transition-colors">
            Como funciona
          </Link>
          <Link href="/#calculadoras" className="hover:text-white transition-colors">
            Calculadoras
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {profile ? (
            <>
              {/* Credit badge */}
              <span className="hidden md:flex items-center gap-1.5 text-xs font-medium text-[#E8A020] bg-[#E8A020]/10 border border-[#E8A020]/20 px-3 py-1.5 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#E8A020" strokeWidth="1.5" />
                  <path d="M6 3v3l2 1" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {hasActivePlan(profile) ? `Plano ${planLabel(profile)}` : `${profile.credits ?? 0} créditos`}
              </span>

              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 rounded-full bg-[#1a2f4a] flex items-center justify-center text-white text-sm font-semibold border border-[#2a4060] hover:border-[#E8A020] transition-colors"
                  aria-label="Menu do usuário"
                >
                  {profile.name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || "U"}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#0d2440] border border-[#1a2f4a] rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#1a2f4a]">
                      <p className="text-white text-sm font-medium truncate">
                        {profile.name || "Usuário"}
                      </p>
                      <p className="text-[#8ba4bc] text-xs truncate mt-0.5">
                        {profile.email ?? ""}
                      </p>
                    </div>
                    <Link
                      href="/painel"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#8ba4bc] hover:text-white hover:bg-[#1a2f4a] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Painel
                    </Link>
                    <Link
                      href="/conta"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#8ba4bc] hover:text-white hover:bg-[#1a2f4a] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 7h12" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Plano e faturamento
                    </Link>
                    <form action={withBase("/auth/signout")} method="post">
                      <button
                        type="submit"
                        onClick={() => setMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#8ba4bc] hover:text-white hover:bg-[#1a2f4a] transition-colors border-t border-[#1a2f4a]"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M10 11l3-3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Sair da conta
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-[#8ba4bc] hover:text-white transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/auth/cadastro"
                className="text-sm font-medium bg-[#E8A020] text-[#0B1F3A] px-4 py-2 rounded-lg hover:bg-[#d4911c] transition-colors"
              >
                Começar grátis
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
