import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { publicUrl } from '@/lib/config'

const PUBLIC_ROUTES = ['/', '/precos', '/termos', '/privacidade', '/auth/login', '/auth/cadastro', '/auth/callback', '/auth/recuperar', '/auth/signout', '/sitemap.xml', '/robots.txt', '/opengraph-image']
// Rotas que tratam autenticação por conta própria (ex.: webhook do Pagar.me)
const PUBLIC_PREFIXES = ['/calculadoras', '/api']
const AUTH_ROUTES = ['/auth/login', '/auth/cadastro']

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Redireciona sempre para o domínio público (ver publicUrl em lib/config.ts)
  if (user && AUTH_ROUTES.some((r) => path.startsWith(r))) {
    return NextResponse.redirect(publicUrl('/painel'))
  }

  const isPublic = PUBLIC_ROUTES.includes(path) || PUBLIC_PREFIXES.some((p) => path.startsWith(p))
  if (!user && !isPublic) {
    return NextResponse.redirect(publicUrl('/auth/login', new URLSearchParams({ redirectTo: path + request.nextUrl.search })))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
