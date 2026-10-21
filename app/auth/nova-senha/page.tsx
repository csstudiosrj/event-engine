'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AuthCard, authButtonClass, authErrorClass, authInputClass } from '@/components/auth-card'

export default function NovaSenhaPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('As senhas não conferem.'); return }
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) { setError('Não foi possível trocar a senha. Peça um novo link de recuperação.'); return }
    router.push('/painel')
  }

  return (
    <AuthCard title="Criar nova senha" subtitle="Escolha uma senha com pelo menos 8 caracteres.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">Nova senha</label>
          <input id="password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={authInputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="confirm">Confirmar senha</label>
          <input id="confirm" type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={authInputClass} />
        </div>
        {error && <div className={authErrorClass}>{error}</div>}
        <button type="submit" disabled={loading} className={authButtonClass}>{loading ? 'Salvando...' : 'Salvar nova senha'}</button>
      </form>
    </AuthCard>
  )
}
