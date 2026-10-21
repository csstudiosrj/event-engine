import type { Metadata } from 'next'
import { BASE_PATH } from '@/lib/config'

// Endereço canônico das páginas (com www: o domínio sem www redireciona para cá).
// Separado de SITE_URL, que é usado nos redirecionamentos de login e pagamento.
export const CANONICAL_URL = (process.env.NEXT_PUBLIC_CANONICAL_ORIGIN ?? 'https://www.arxum.com.br').replace(/\/$/, '') + BASE_PATH

export function canonical(path: string) {
  return `${CANONICAL_URL}${path === '/' ? '' : path}`
}

// Gerada por app/opengraph-image.tsx; repetida aqui porque o openGraph de cada
// página substitui o do layout por inteiro
const OG_IMAGE = { url: `${CANONICAL_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Normato — calculadoras para dimensionar eventos' }

type PageMeta = { title: string; description: string; path: string; noindex?: boolean }

export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = canonical(path)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Normato', locale: 'pt_BR', type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}

export const noindex: Metadata = { robots: { index: false, follow: false } }
