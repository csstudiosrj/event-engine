'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Event Engine">
      <svg viewBox="0 0 200 200" className="size-9" role="img" aria-label="Logo Event Engine">
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

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/painel'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-slate-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>
              Não tem conta?{' '}
              <a href="/auth/cadastro" className="font-semibold text-amber-700 hover:underline">
                Cadastre-se grátis
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="text-xs text-slate-500 hover:text-slate-800">
                    Esqueci minha senha
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 bg-[#0F1B33] hover:bg-[#1b2b4c]"
              >
                {loading ? 'Entrando...' : <>Entrar <ArrowRight data-icon="inline-end" /></>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        <span className="flex items-center justify-center gap-1">
          <Zap className="size-3 text-amber-500" /> Event Engine
        </span>
      </footer>
    </div>
  )
}
