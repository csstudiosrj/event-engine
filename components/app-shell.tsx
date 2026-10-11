'use client'

import { createContext, useContext, useState } from 'react'

const CreditsContext = createContext({ credits: 3, spendCredit: () => false, addCredits: (amount: number) => {} })

export function AppShell({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(3)
  const spendCredit = () => { if (credits < 1) return false; setCredits((value) => value - 1); return true }
  const addCredits = (amount: number) => setCredits((value) => value + amount)
  return <CreditsContext.Provider value={{ credits, spendCredit, addCredits }}>{children}</CreditsContext.Provider>
}

export function useCredits() { return useContext(CreditsContext) }
