import { noindex } from '@/lib/seo'

// Área logada e telas de acesso: fora do índice do Google
export const metadata = noindex

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
