"use client"

import Link from "next/link"
import { useState } from "react"

/* ─── Brand symbol ────────────────────────────────────────────────── */
function NormatoSymbol({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Normato"
    >
      <rect width="40" height="40" rx="8" fill="#0B1F3A" />
      <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <line x1="13" y1="7" x2="27" y2="33" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function NormatoSymbolLight({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Normato"
    >
      <rect width="40" height="40" rx="8" fill="#FFFFFF" fillOpacity="0.1" />
      <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
      <line x1="13" y1="7" x2="27" y2="33" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

/* ─── Calculadoras ────────────────────────────────────────────────── */
const calculadoras = [
  { slug: "publico",         label: "Dimensionamento de público",      desc: "Capacidade máxima por m² e tipo de ambiente" },
  { slug: "brigada",         label: "Brigada de incêndio",             desc: "Composição mínima por área e nível de risco" },
  { slug: "saude",           label: "Equipe médica",                   desc: "Ambulâncias, médicos e enfermeiros exigidos" },
  { slug: "sanitarios",      label: "Sanitários",                      desc: "Quantidade de vasos, mictórios e lavatórios" },
  { slug: "saidas",          label: "Saídas de emergência",            desc: "Largura e número de saídas por fluxo de evacuação" },
  { slug: "extintores",      label: "Extintores",                      desc: "Quantidade e cobertura conforme NT estadual" },
  { slug: "evacuacao",       label: "Tempo de evacuação",              desc: "Simulação do esvaziamento em minutos" },
  { slug: "risco",           label: "Mapa de risco",                   desc: "Classificação por perfil de evento e público" },
  { slug: "estacionamento",  label: "Vagas de estacionamento",         desc: "Número mínimo de vagas por tipo de evento" },
]

/* ─── FAQ ─────────────────────────────────────────────────────────── */
const faq = [
  {
    q: "Para quais estados o Normato calcula?",
    a: "Atualmente cobrimos Rio de Janeiro (CBMERJ NT 5-04), São Paulo (CBPMESP IT 12) e um modo federal para os demais estados. A base normativa é atualizada conforme novas instruções técnicas são publicadas.",
  },
  {
    q: "Os resultados têm validade legal?",
    a: "O Normato gera a memória de cálculo embasada nas normas vigentes, que serve como base para elaboração do memorial descritivo. A responsabilidade técnica pela assinatura do documento é sempre do profissional habilitado (engenheiro ou arquiteto).",
  },
  {
    q: "Como funciona o sistema de créditos?",
    a: "Cada cálculo consome um crédito. No plano gratuito você recebe créditos mensais para testar a plataforma. Os planos pagos oferecem pacotes maiores e acesso às calculadoras avançadas.",
  },
  {
    q: "Posso usar o Normato para eventos em espaços abertos?",
    a: "Sim. O sistema diferencia ambientes fechados cobertos, fechados descobertos, arenas e áreas gramadas, aplicando as densidades e fluxos de evacuação corretos para cada tipo.",
  },
  {
    q: "O que é o Memorial Descritivo gerado pelo sistema?",
    a: "É um documento técnico estruturado com todos os dados do evento, os parâmetros normativos aplicados e os resultados dos dimensionamentos. Disponível nos planos PRO e NEURO para entrega direta ao corpo de bombeiros ou prefeitura.",
  },
  {
    q: "O sistema considera open bar, shows pirotécnicos e cozinha industrial?",
    a: "Sim. Esses fatores elevam o índice de risco e ajustam automaticamente o dimensionamento de brigada, equipe médica e extintores conforme as normas estaduais.",
  },
  {
    q: "Em quanto tempo tenho os resultados?",
    a: "Todos os cálculos são gerados em segundos após o cadastro do evento. Não é necessário aguardar análise humana.",
  },
  {
    q: "Posso cadastrar vários eventos diferentes?",
    a: "Sim. Cada evento é uma instância independente com seus próprios parâmetros. Você pode criar, comparar e arquivar quantos eventos precisar dentro do limite do seu plano.",
  },
]

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white">

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[#1a2f4a] bg-[#0B1F3A]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NormatoSymbol size={32} />
            <span className="font-semibold text-lg tracking-wide">Normato</span>
            <span className="hidden md:inline text-xs text-[#8ba4bc] border border-[#1a2f4a] px-2 py-0.5 rounded-full ml-1">
              Calcule seu evento
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#8ba4bc]">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
            <a href="#calculadoras" className="hover:text-white transition-colors">Calculadoras</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-[#8ba4bc] hover:text-white transition-colors">
              Entrar
            </Link>
            <Link
              href="/auth/cadastro"
              className="text-sm font-medium bg-[#E8A020] text-[#0B1F3A] px-4 py-2 rounded-lg hover:bg-[#d4911c] transition-colors"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#E8A020] bg-[#E8A020]/10 border border-[#E8A020]/20 px-3 py-1.5 rounded-full mb-8">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1.5 3H11l-2.75 2 1 3L6 7.5 2.75 9l1-3L1 4h3.5z" fill="#E8A020" />
          </svg>
          Baseado nas normas estaduais vigentes
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          A auditoria técnica{" "}
          <span className="text-[#E8A020]">do seu evento.</span>
        </h1>

        <p className="text-xl text-[#8ba4bc] max-w-2xl mx-auto mb-10 leading-relaxed">
          Dimensione brigada de incêndio, equipe médica, sanitários e saídas de emergência
          em segundos. Resultados baseados nas instruções técnicas do CBMERJ, CBPMESP
          e normas federais.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/cadastro"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8A020] text-[#0B1F3A] font-semibold px-8 py-4 rounded-xl text-base hover:bg-[#d4911c] transition-colors"
          >
            Calcular agora — é grátis
          </Link>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#8ba4bc] border border-[#1a2f4a] px-8 py-4 rounded-xl text-base hover:text-white hover:border-[#2a4060] transition-colors"
          >
            Ver como funciona
          </a>
        </div>
      </section>

      {/* ── Credibility bar ────────────────────────────────────────── */}
      <section className="border-y border-[#1a2f4a] bg-[#0d2440]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "16",    label: "calculadoras técnicas" },
            { n: "3",     label: "estados cobertos" },
            { n: "< 5s",  label: "para gerar o laudo" },
            { n: "100%",  label: "baseado em normas vigentes" },
          ].map(({ n, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#E8A020]">{n}</p>
              <p className="text-sm text-[#8ba4bc] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Como funciona ──────────────────────────────────────────── */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Como funciona
        </h2>
        <p className="text-[#8ba4bc] text-center mb-16 max-w-xl mx-auto">
          Do cadastro ao resultado técnico em três passos.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Cadastre o evento",
              desc: "Informe estado, município, data, público estimado, área em m², tipo de ambiente e características específicas como open bar, shows pirotécnicos e cozinha industrial.",
            },
            {
              step: "02",
              title: "O motor executa os cálculos",
              desc: "O Normato aplica os parâmetros das normas estaduais vigentes — NT 5-04, IT 12, Portaria 88/2024 e outras — e gera todos os dimensionamentos em segundos.",
            },
            {
              step: "03",
              title: "Receba o resultado técnico",
              desc: "Acesse os números exigidos por calculadora, com as referências normativas de cada item. Nos planos avançados, exporte o Memorial Descritivo completo.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-[#0d2440] border border-[#1a2f4a] rounded-2xl p-8">
              <span className="text-[#E8A020] font-mono text-sm font-medium">{step}</span>
              <h3 className="text-lg font-semibold mt-3 mb-3">{title}</h3>
              <p className="text-[#8ba4bc] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Calculadoras ───────────────────────────────────────────── */}
      <section id="calculadoras" className="bg-[#0d2440] border-y border-[#1a2f4a]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Calculadoras disponíveis
          </h2>
          <p className="text-[#8ba4bc] text-center mb-16 max-w-xl mx-auto">
            Cada calculadora aplica a norma correta para o estado do evento.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {calculadoras.map(({ label, desc }) => (
              <div
                key={label}
                className="bg-[#0B1F3A] border border-[#1a2f4a] rounded-xl p-5 hover:border-[#E8A020]/40 transition-colors group"
              >
                <h3 className="font-semibold text-sm mb-1 group-hover:text-[#E8A020] transition-colors">
                  {label}
                </h3>
                <p className="text-[#8ba4bc] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#8ba4bc]">
            + 7 calculadoras adicionais disponíveis após o cadastro
          </p>
        </div>
      </section>

      {/* ── Diferenciais ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Por que o Normato
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Normas estaduais, não genéricas",
              desc: "O sistema diferencia RJ, SP e os demais estados. Cada cálculo aplica a instrução técnica correta para o corpo de bombeiros responsável pelo alvará.",
            },
            {
              title: "Rastreabilidade completa",
              desc: "Cada resultado vem acompanhado da referência normativa exata — artigo, tabela e número da norma — para que o responsável técnico possa assinar com segurança.",
            },
            {
              title: "Resultado em segundos",
              desc: "Um event designer leva horas numa planilha para chegar nos mesmos números. O Normato entrega tudo em menos de cinco segundos, sem margem para erro de digitação.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-[#0d2440] border border-[#1a2f4a] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#E8A020]/10 border border-[#E8A020]/20 flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9l4 4 8-8" stroke="#E8A020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-semibold mb-3">{title}</h3>
              <p className="text-[#8ba4bc] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-[#0d2440] border-y border-[#1a2f4a]">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Perguntas frequentes
          </h2>

          <div className="flex flex-col gap-3">
            {faq.map(({ q, a }, i) => (
              <div key={i} className="border border-[#1a2f4a] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-medium hover:bg-[#0B1F3A]/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  >
                    <path d="M3 6l5 5 5-5" stroke="#8ba4bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-[#8ba4bc] leading-relaxed border-t border-[#1a2f4a] pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="flex justify-center mb-8">
          <NormatoSymbolLight size={56} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Calcule seu próximo evento
        </h2>
        <p className="text-[#8ba4bc] text-lg mb-10 max-w-xl mx-auto">
          Cadastro gratuito. Sem cartão de crédito. Resultados técnicos em segundos.
        </p>
        <Link
          href="/auth/cadastro"
          className="inline-flex items-center gap-2 bg-[#E8A020] text-[#0B1F3A] font-semibold px-10 py-4 rounded-xl text-base hover:bg-[#d4911c] transition-colors"
        >
          Criar conta gratuita
        </Link>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1a2f4a] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <NormatoSymbol size={28} />
            <span className="font-semibold tracking-wide">Normato</span>
          </div>
          <p className="text-sm text-[#8ba4bc] text-center md:text-right">
            © {new Date().getFullYear()} Todos os direitos reservados à{" "}
            <a
              href="https://arxum.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8A020] hover:underline"
            >
              ARXUM group
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
