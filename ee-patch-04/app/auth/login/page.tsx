"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const redirectTo = searchParams.get("redirectTo") ?? "/painel"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createBrowserClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError("E-mail ou senha incorretos.")
        setLoading(false)
        return
      }

      router.push(redirectTo)
    } catch {
      setError("Erro inesperado. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="#0B1F3A" />
            <rect width="40" height="40" rx="8" stroke="#1a2f4a" strokeWidth="1" />
            <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            <line x1="13" y1="7" x2="27" y2="33" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span className="text-white font-semibold text-xl tracking-wide">Normato</span>
        </div>

        <div className="bg-[#0d2440] border border-[#1a2f4a] rounded-2xl p-8">
          <h1 className="text-xl font-semibold mb-1">Entrar na conta</h1>
          <p className="text-[#8ba4bc] text-sm mb-8">
            Ainda não tem conta?{" "}
            <Link href="/auth/cadastro" className="text-[#E8A020] hover:underline">
              Criar gratuitamente
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B1F3A] border border-[#1a2f4a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a6480] focus:outline-none focus:border-[#E8A020] transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Senha
                </label>
                <Link href="/auth/recuperar" className="text-xs text-[#8ba4bc] hover:text-[#E8A020] transition-colors">
                  Esqueci minha senha
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B1F3A] border border-[#1a2f4a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a6480] focus:outline-none focus:border-[#E8A020] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8A020] text-[#0B1F3A] font-semibold py-3 rounded-lg text-sm hover:bg-[#d4911c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E8A020] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
