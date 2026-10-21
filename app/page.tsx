"use client"

import Link from "next/link"
import { useState } from "react"

const calculadoras = [
  { label: "Público máximo",        sub: "Capacidade por m² e ambiente" },
  { label: "Brigada de incêndio",   sub: "Composição mínima exigida" },
  { label: "Equipe médica",         sub: "Ambulâncias, médicos, enfermeiros" },
  { label: "Sanitários",            sub: "Vasos, mictórios e lavatórios" },
  { label: "Saídas de emergência",  sub: "Largura e quantidade de saídas" },
  { label: "Extintores",            sub: "Quantidade e cobertura por área" },
  { label: "Tempo de evacuação",    sub: "Esvaziamento em minutos" },
  { label: "Mapa de risco",         sub: "Classificação por perfil e público" },
  { label: "Estacionamento",        sub: "Vagas mínimas por tipo de evento" },
  { label: "Vigilância",            sub: "Equipe de segurança patrimonial" },
  { label: "Plano de evacuação",    sub: "Rotas e pontos de encontro" },
  { label: "Alvará de funcionamento", sub: "Documentação e prazos" },
  { label: "Orçamento de segurança", sub: "Estimativa de custos obrigatórios" },
  { label: "Memorial descritivo",   sub: "Documento técnico completo" },
  { label: "Capacidade máxima",     sub: "Limite absoluto por área e uso" },
  { label: "Dimensionamento geral", sub: "Visão consolidada do evento" },
]

const faq = [
  {
    q: "Funciona para qualquer tamanho de evento?",
    a: "Sim. O Normato calcula desde um casamento com 80 convidados até um festival com 50 mil pessoas. Os parâmetros mudam automaticamente conforme o porte, o tipo de ambiente e o estado onde o evento acontece.",
  },
  {
    q: "Os resultados valem para o corpo de bombeiros?",
    a: "O Normato gera a memória de cálculo com as referências normativas aplicadas. Esse documento serve como base para o memorial descritivo que vai para o alvará. A assinatura técnica é responsabilidade do profissional habilitado.",
  },
  {
    q: "Quais estados estão disponíveis?",
    a: "Rio de Janeiro, São Paulo e um modo federal para os demais estados. A cobertura está em expansão.",
  },
  {
    q: "Preciso saber alguma norma técnica para usar?",
    a: "Não. Você informa os dados do evento — público, área, data, local — e o Normato aplica as normas correspondentes automaticamente.",
  },
  {
    q: "Posso usar para vários eventos ao mesmo tempo?",
    a: "Sim. Cada evento fica salvo separadamente com todos os seus cálculos. Você pode criar, comparar e exportar quantos precisar dentro do seu plano.",
  },
  {
    q: "O que é o Memorial Descritivo?",
    a: "Um documento técnico estruturado com todos os dimensionamentos do evento, referências normativas e dados do local. Disponível nos planos avançados para entrega direta ao órgão responsável.",
  },
]

function NormatoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="7" fill="#0B1F3A" />
      <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#fff" />
      <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#fff" />
      <line x1="13" y1="7" x2="27" y2="33" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen" style={{ background: "#071628", color: "#F0F4F8", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #162F4A", position: "sticky", top: 0, zIndex: 50, background: "rgba(7,22,40,0.92)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <NormatoMark size={30} />
            <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em" }}>Normato</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/auth/login" style={{ fontSize: 14, color: "#7A96B0", padding: "8px 14px", textDecoration: "none" }}>
              Entrar
            </Link>
            <Link href="/auth/cadastro" style={{ fontSize: 14, fontWeight: 600, background: "#E8A020", color: "#071628", padding: "8px 18px", borderRadius: 8, textDecoration: "none" }}>
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 24px 80px" }}>
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#E8A020", marginBottom: 24, letterSpacing: "0.02em" }}>
            Para casamentos, festas, shows e festivais
          </p>
          <h1 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 28px" }}>
            Quantos banheiros<br />seu evento precisa?
          </h1>
          <p style={{ fontSize: 18, color: "#7A96B0", lineHeight: 1.65, maxWidth: 520, margin: "0 0 40px" }}>
            Informe os dados do evento. O Normato calcula tudo que é obrigatório — sanitários, brigada, equipe médica, saídas de emergência — e gera a documentação para o alvará.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/auth/cadastro" style={{ fontWeight: 600, fontSize: 15, background: "#E8A020", color: "#071628", padding: "14px 28px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>
              Calcular meu evento
            </Link>
            <a href="#calculadoras" style={{ fontWeight: 500, fontSize: 15, color: "#7A96B0", padding: "14px 28px", borderRadius: 10, border: "1px solid #162F4A", textDecoration: "none", display: "inline-block" }}>
              Ver as calculadoras
            </a>
          </div>
        </div>
      </section>

      {/* NUMBERS BAR */}
      <div style={{ borderTop: "1px solid #162F4A", borderBottom: "1px solid #162F4A", background: "#0E2444" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {[
            { n: "16", d: "calculadoras" },
            { n: "RJ · SP · Federal", d: "cobertura normativa" },
            { n: "< 5s", d: "para gerar os números" },
            { n: "gratuito", d: "para começar" },
          ].map(({ n, d }) => (
            <div key={d}>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#F0F4F8", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{n}</p>
              <p style={{ fontSize: 13, color: "#7A96B0", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CALCULADORAS */}
      <section id="calculadoras" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px" }}>O que o Normato dimensiona</h2>
        <p style={{ color: "#7A96B0", fontSize: 15, margin: "0 0 40px" }}>16 calculadoras. Todos os estados. Qualquer porte de evento.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 1, background: "#162F4A", borderRadius: 12, overflow: "hidden" }}>
          {calculadoras.map(({ label, sub }) => (
            <div key={label} style={{ background: "#071628", padding: "20px 22px" }}>
              <p style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px", color: "#F0F4F8" }}>{label}</p>
              <p style={{ fontSize: 12, color: "#7A96B0", margin: 0, lineHeight: 1.5 }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER STATEMENT */}
      <div style={{ borderTop: "1px solid #162F4A", borderBottom: "1px solid #162F4A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
          <p style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3, maxWidth: 680, margin: 0, color: "#F0F4F8" }}>
            Cada número que o Normato entrega tem uma referência normativa. Você sabe exatamente de onde veio e o que apresentar na vistoria.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 40px" }}>Dúvidas frequentes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: i === 0 ? "1px solid #162F4A" : "none", borderBottom: "1px solid #162F4A" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", color: "#F0F4F8", textAlign: "left", fontSize: 15, fontWeight: 500, gap: 16 }}
              >
                <span>{q}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path d="M3 6l5 5 5-5" stroke="#7A96B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {open === i && (
                <p style={{ fontSize: 14, color: "#7A96B0", lineHeight: 1.7, paddingBottom: 20, margin: 0, maxWidth: 620 }}>{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ borderTop: "1px solid #162F4A", background: "#0E2444" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0, maxWidth: 520 }}>
            Qual é o seu próximo evento?
          </h2>
          <Link href="/auth/cadastro" style={{ fontWeight: 600, fontSize: 15, background: "#E8A020", color: "#071628", padding: "14px 28px", borderRadius: 10, textDecoration: "none" }}>
            Criar conta gratuita
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #162F4A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <NormatoMark size={24} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Normato</span>
          </div>
          <p style={{ fontSize: 13, color: "#7A96B0", margin: 0 }}>
            © {new Date().getFullYear()} Todos os direitos reservados à{" "}
            <a href="https://arxum.com.br" target="_blank" rel="noopener noreferrer" style={{ color: "#E8A020", textDecoration: "none" }}>
              ARXUM group
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
