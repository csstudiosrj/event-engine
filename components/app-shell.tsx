'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

type AppShellContext = {
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const Context = createContext<AppShellContext>({
  profile: null,
  loading: true,
  refreshProfile: async () => {},
})

export function AppShell({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase] = useState(() => createClient())

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

  return (
    <Context.Provider value={{ profile, loading, refreshProfile: fetchProfile }}>
      {children}
    </Context.Provider>
  )
}

export function useApp() { return useContext(Context) }
