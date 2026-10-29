import { getActivePlans, getSignupCredits } from '@/lib/catalogo'
import { PricingClient } from './precos-client'

// Preços vêm do super admin; ao salvar, ele revalida esta página na hora
export const revalidate = 300

export default async function PricingPage() {
  const [plans, signupCredits] = await Promise.all([getActivePlans(), getSignupCredits()])
  return <PricingClient plans={plans} signupCredits={signupCredits} />
}
