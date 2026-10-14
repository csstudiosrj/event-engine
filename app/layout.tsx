import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/app-shell'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Event Engine — Calculadoras técnicas para eventos',
    template: '%s | Event Engine',
  },
  description:
    'Dimensione brigada, sanitários, equipe médica, saídas de emergência e mais 15 calculadoras para o seu evento. Normas por estado, memorial descritivo automático. Primeiro cálculo grátis.',
  keywords: [
    'calculadora para eventos',
    'dimensionamento de eventos',
    'brigada de incêndio evento',
    'sanitários para eventos',
    'alvará de evento',
    'corpo de bombeiros evento',
    'memorial descritivo evento',
    'normas para eventos',
    'planejamento de eventos',
    'licenciamento de eventos',
  ],
  authors: [{ name: 'ARXUM group', url: 'https://arxum.com.br' }],
  creator: 'ARXUM group',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://eventengine.csstudios.site',
    siteName: 'Event Engine',
    title: 'Event Engine — Calculadoras técnicas para eventos',
    description:
      'Dimensione brigada, sanitários, equipe médica e mais 15 calculadoras. Normas por estado, memorial descritivo automático. Primeiro cálculo grátis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Engine — Calculadoras técnicas para eventos',
    description:
      'Dimensione brigada, sanitários, equipe médica e mais 15 calculadoras. Normas por estado, memorial descritivo automático.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://eventengine.csstudios.site',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppShell>
          {children}
          <ToastProvider />
        </AppShell>
      </body>
    </html>
  )
}
