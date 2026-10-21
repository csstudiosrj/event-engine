'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

type AppShellContext = {
  profile: Profile | null
  loading: boolean
  spendCredit: (description: string) => Promise<boolean>
  refreshProfile: () => Promise<void>
}

const Context = createContext<AppShellContext>({
  profile: null,
  loading: true,
  spendCredit: async () => false,
  refreshProfile: async () => {},
})

export function AppShell({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setProfile(null); setLoading(false); return }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    setProfile(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile()
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile, supabase])

  const spendCredit = async (description: string): Promise<boolean> => {
    if (!profile) return false

    const { error } = await supabase.rpc('spend_credit', {
      p_user_id: profile.id,
      p_amount: 1,
    })

    if (error) return false

    // Atualiza créditos localmente sem refetch
    setProfile((prev) => prev ? { ...prev, credits: prev.credits - 1 } : null)
    return true
  }

  const refreshProfile = async () => { await fetchProfile() }

  return (
    <Context.Provider value={{ profile, loading, spendCredit, refreshProfile }}>
      {children}
    </Context.Provider>
  )
}

export function useApp() { return useContext(Context) }
// Mantém compatibilidade com código antigo que usava useCredits
export function useCredits() {
  const { profile, spendCredit } = useApp()
  return {
    credits: profile?.credits ?? 0,
    spendCredit: (description = 'Cálculo') => spendCredit(description),
  }
}
