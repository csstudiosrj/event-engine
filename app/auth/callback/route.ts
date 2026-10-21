import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const next = request.nextUrl.searchParams.get('next') ?? '/painel'

  // nextUrl.clone() mantém o basePath /normato no redirecionamento
  const url = request.nextUrl.clone()
  url.search = ''

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      url.pathname = next.startsWith('/') && !next.startsWith('//') ? next : '/painel'
      return NextResponse.redirect(url)
    }
  }

  url.pathname = '/auth/login'
  url.searchParams.set('error', 'link_invalido')
  return NextResponse.redirect(url)
}
