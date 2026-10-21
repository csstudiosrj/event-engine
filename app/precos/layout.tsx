import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Preços — Normato | Créditos e planos para calcular seu evento',
  description: 'Comece com 1 cálculo grátis. Créditos a partir de R$ 4,90 ou planos Solo e Pro com cálculos ilimitados de brigada, saídas de emergência, sanitários, equipe médica e mais.',
  path: '/precos',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
