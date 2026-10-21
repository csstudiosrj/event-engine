'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { AuthCard, authButtonClass, authErrorClass, authInputClass } from '@/components/auth-card'
import { SITE_URL } from '@/lib/config'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/auth/callback?next=/auth/nova-senha`,
    })
    setLoading(false)
    if (error) { setError('Não foi possível enviar o e-mail. Tente novamente em alguns minutos.'); return }
    setSent(true)
  }

  if (sent) {
    return (
      <AuthCard title="Verifique seu e-mail">
        <p className="mt-4 text-sm text-[#8ba4bc]">Se existir uma conta com <strong className="text-white">{email}</strong>, você vai receber um link para criar uma nova senha.</p>
        <Link href="/auth/login" className="mt-6 inline-block text-sm text-[#E8A020] hover:underline">Voltar para o login</Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Recuperar senha" subtitle="Informe o e-mail da conta para receber o link de redefinição.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">E-mail</label>
          <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={authInputClass} placeholder="seu@email.com" />
        </div>
        {error && <div className={authErrorClass}>{error}</div>}
        <button type="submit" disabled={loading} className={authButtonClass}>{loading ? 'Enviando...' : 'Enviar link'}</button>
        <Link href="/auth/login" className="text-center text-sm text-[#8ba4bc] hover:text-[#E8A020]">Voltar para o login</Link>
      </form>
    </AuthCard>
  )
}
