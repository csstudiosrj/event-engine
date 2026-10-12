'use client'

import { useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CadastroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (error) {
      setError(error.message === 'User already registered'
        ? 'Este e-mail já está cadastrado. Faça login.'
        : 'Erro ao criar conta. Tente novamente.')
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] p-4">
        <Card className="w-full max-w-md border-emerald-200 text-center">
          <CardContent className="flex flex-col items-center gap-4 py-10">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">✓</div>
            <h1 className="text-2xl font-bold text-[#0F1B33]">Conta criada!</h1>
            <p className="text-slate-600">
              Enviamos um link de confirmação para <strong>{email}</strong>.
              Confirme o e-mail para ativar sua conta.
            </p>
            <a href="/auth/login" className="text-sm font-semibold text-amber-700 hover:underline">
              Ir para o login →
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <a href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 200 200" className="size-9">
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
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-slate-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Criar conta grátis</CardTitle>
            <CardDescription>
              Já tem conta?{' '}
              <a href="/auth/login" className="font-semibold text-amber-700 hover:underline">
                Entrar
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleCadastro} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

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
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 bg-[#0F1B33] hover:bg-[#1b2b4c]"
              >
                {loading ? 'Criando conta...' : <>Criar conta <ArrowRight data-icon="inline-end" /></>}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Ao criar uma conta, você ganha 1 crédito grátis para testar.
              </p>
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
