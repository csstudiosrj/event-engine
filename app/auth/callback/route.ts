import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { publicUrl } from '@/lib/config'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = request.nextUrl.searchParams.get('next') ?? '/painel'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const destino = next.startsWith('/') && !next.startsWith('//') ? next : '/painel'
      return NextResponse.redirect(publicUrl(destino))
    }
  }

  return NextResponse.redirect(publicUrl('/auth/login', new URLSearchParams({ error: 'link_invalido' })))
}
