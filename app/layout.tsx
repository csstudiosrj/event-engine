import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Normato — Calcule seu evento",
  description:
    "Dimensione brigada de incêndio, equipe médica, sanitários, saídas de emergência e muito mais. Cálculos técnicos baseados nas normas estaduais para eventos no Brasil.",
  keywords: [
    "dimensionamento evento",
    "brigada de incêndio evento",
    "equipe médica evento",
    "sanitários evento norma",
    "saída de emergência evento",
    "CBMERJ NT 5-04",
    "IT 12 CBPMESP",
    "calculadora técnica evento",
    "alvará evento",
    "memorial descritivo evento",
  ],
  authors: [{ name: "Normato", url: "https://normato.com.br" }],
  creator: "Normato — ARXUM group",
  metadataBase: new URL("https://normato.com.br"),
  alternates: {
    canonical: "https://normato.com.br",
  },
  openGraph: {
    title: "Normato — Calcule seu evento",
    description:
      "A auditoria técnica do seu evento. Cálculos de brigada, equipe médica, sanitários e saídas de emergência em segundos.",
    url: "https://normato.com.br",
    siteName: "Normato",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Normato — Calcule seu evento",
    description:
      "A auditoria técnica do seu evento. Cálculos técnicos baseados nas normas estaduais em segundos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
