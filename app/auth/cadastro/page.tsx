'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AuthCard, authButtonClass, authErrorClass, authInputClass } from '@/components/auth-card'
import { SITE_URL } from '@/lib/config'

function CadastroForm() {
  const searchParams = useSearchParams()
  const requested = searchParams.get('redirectTo') ?? '/painel'
  const redirectTo = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/painel'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aceite, setAceite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aceite) { setError('Para criar a conta, aceite os Termos de Uso e a Política de Privacidade.'); return }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, accepted_terms_at: new Date().toISOString() },
        emailRedirectTo: `${SITE_URL}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (error) {
      setError(/already registered/i.test(error.message)
        ? 'Este e-mail já está cadastrado. Faça login.'
        : /password/i.test(error.message)
          ? 'Senha fraca: use pelo menos 8 caracteres, misturando letras e números.'
          : 'Erro ao criar conta. Tente novamente.')
      setLoading(false)
      return
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <AuthCard title="Confirme seu e-mail">
        <p className="mt-4 text-sm text-[#8ba4bc]">
          Enviamos um link de confirmação para <strong className="text-white">{email}</strong>. Abra o e-mail e clique no link para ativar a conta e receber seu crédito grátis.
        </p>
        <p className="mt-4 text-xs text-[#8ba4bc]">Não chegou? Confira a caixa de spam ou promoções.</p>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Criar conta grátis"
      subtitle={<>Já tem conta? <Link href={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`} className="text-[#E8A020] hover:underline">Entrar</Link></>}
    >
      <form onSubmit={handleCadastro} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">Nome</label>
          <input id="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={authInputClass} placeholder="Seu nome" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">E-mail</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClass} placeholder="seu@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">Senha</label>
          <input id="password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClass} placeholder="Mínimo 8 caracteres" />
        </div>
        <label className="flex items-start gap-3 text-sm text-[#8ba4bc]">
          <input type="checkbox" checked={aceite} onChange={(e) => setAceite(e.target.checked)} className="mt-1 accent-[#E8A020]" />
          <span>Li e aceito os <Link href="/termos" target="_blank" className="text-[#E8A020] hover:underline">Termos de Uso</Link> e a <Link href="/privacidade" target="_blank" className="text-[#E8A020] hover:underline">Política de Privacidade</Link>.</span>
        </label>

        {error && <div className={authErrorClass}>{error}</div>}

        <button type="submit" disabled={loading} className={authButtonClass}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
        <p className="text-center text-xs text-[#8ba4bc]">Novas contas ganham 1 crédito grátis.</p>
      </form>
    </AuthCard>
  )
}

export default function CadastroPage() {
  return <Suspense><CadastroForm /></Suspense>
}
