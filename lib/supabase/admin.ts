import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Cliente com a service role: ignora RLS. Usar só em rotas de servidor que
// não dependem do usuário logado (webhook de pagamento).
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}
