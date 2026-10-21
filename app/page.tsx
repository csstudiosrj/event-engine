"use client"
import Link from "next/link"
import { useState } from "react"

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

const calculadoras = [
  { label: "Público máximo",          sub: "Capacidade por m² e ambiente",         slug: "publico-maximo",          free: true  },
  { label: "Brigada de incêndio",      sub: "Composição mínima exigida",             slug: "brigada",                 free: true  },
  { label: "Equipe médica",            sub: "Ambulâncias, médicos, enfermeiros",     slug: "equipe-medica",           free: false },
  { label: "Sanitários",               sub: "Vasos, mictórios e lavatórios",         slug: "sanitarios",              free: true  },
  { label: "Saídas de emergência",     sub: "Largura e quantidade de saídas",        slug: "saidas-emergencia",       free: true  },
  { label: "Extintores",               sub: "Quantidade e cobertura por área",       slug: "extintores",              free: true  },
  { label: "Tempo de evacuação",       sub: "Esvaziamento em minutos",               slug: "tempo-evacuacao",         free: true  },
  { label: "Mapa de risco",            sub: "Classificação por perfil e público",    slug: "mapa-de-risco",           free: true  },
  { label: "Estacionamento",           sub: "Vagas mínimas por tipo de evento",      slug: "estacionamento",          free: true  },
  { label: "Vigilância",               sub: "Equipe de segurança patrimonial",       slug: "seguranca-patrimonial",   free: false },
  { label: "Plano de evacuação",       sub: "Rotas e pontos de encontro",            slug: "plano-de-evacuacao",      free: true  },
  { label: "Alvará de funcionamento",  sub: "Documentação e prazos",                slug: "alvara",                  free: true  },
  { label: "Orçamento de segurança",   sub: "Estimativa de custos obrigatórios",    slug: "orcamento-seguranca",     free: false },
  { label: "Memorial descritivo",      sub: "Documento técnico completo",            slug: "memorial-descritivo",     free: false },
  { label: "Capacidade máxima",        sub: "Limite absoluto por área e uso",        slug: "capacidade-maxima",       free: true  },
  { label: "Dimensionamento geral",    sub: "Visão consolidada do evento",           slug: "dimensionamento-geral",   free: false },
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
    q: "O que é um crédito?",
    a: "Cada cálculo consome um crédito. O plano gratuito inclui créditos mensais para você testar as calculadoras mais usadas. Planos pagos têm créditos ilimitados ou em volume maior.",
  },
]

export default function Home() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F7F8FA", color: "#0F1B33", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ background: "#0B1F3A", borderBottom: "1px solid #162F4A", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <NormatoMark size={28} />
            <span style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-0.3px" }}>Normato</span>
          </Link>
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

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 56px" }}>
        <div style={{ maxWidth: 620 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#E8A020", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
            Dimensionamento de eventos
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 20px" }}>
            Quantos banheiros<br />seu evento precisa?
          </h1>
          <p style={{ fontSize: 18, color: "#4A6580", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 480 }}>
            Calcule brigada, equipe médica, saídas de emergência e mais — com base nas normas técnicas do seu estado.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/auth/cadastro" style={{ fontWeight: 600, fontSize: 15, background: "#E8A020", color: "#071628", padding: "14px 28px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>
              Calcular agora
            </Link>
            <a href="#calculadoras" style={{ fontWeight: 500, fontSize: 15, color: "#7A96B0", padding: "14px 28px", borderRadius: 10, border: "1px solid #162F4A", textDecoration: "none", display: "inline-block" }}>
              Ver as calculadoras
            </a>
          </div>
        </div>
      </section>

      {/* Numbers bar */}
      <section style={{ background: "#0B1F3A", borderTop: "1px solid #162F4A", borderBottom: "1px solid #162F4A" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 24px", display: "flex", gap: 40, flexWrap: "wrap" }}>
          {[
            { n: "16", d: "calculadoras" },
            { n: "RJ · SP · Federal", d: "coberturas normativas" },
            { n: "< 5s", d: "por cálculo" },
            { n: "grátis", d: "para começar" },
          ].map(({ n, d }) => (
            <div key={d}>
              <p style={{ fontWeight: 700, fontSize: 18, color: "#E8A020", margin: 0 }}>{n}</p>
              <p style={{ fontSize: 12, color: "#7A96B0", margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid de calculadoras */}
      <section id="calculadoras" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Calculadoras</h2>
        <p style={{ color: "#7A96B0", fontSize: 15, margin: "0 0 40px" }}>16 calculadoras. Todos os estados. Qualquer porte de evento.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {calculadoras.map(({ label, sub, slug, free }) => (
            <Link
              key={slug}
              href={`/calculadoras/${slug}`}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 10,
                padding: "18px 20px",
                textDecoration: "none",
                color: "inherit",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <p style={{ fontWeight: 700, fontSize: 15, margin: 0, color: "#0F1B33" }}>{label}</p>
                {!free && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#E8A020", background: "#FEF3C7", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: 8 }}>
                    Pro
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#7A96B0", margin: 0 }}>{sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section style={{ background: "#0B1F3A", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#fff", lineHeight: 1.5, margin: "0 0 20px" }}>
            Cada cálculo cita a norma, o artigo e a edição vigente.
          </p>
          <p style={{ fontSize: 16, color: "#7A96B0", lineHeight: 1.7, margin: 0 }}>
            Não inventamos os números. Aplicamos NBRs, NRs, Resoluções ANVISA e legislação estadual — e mostramos a memória de cálculo para você conferir.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 32px", letterSpacing: "-0.3px" }}>Perguntas frequentes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faq.map(({ q, a }, i) => (
            <div key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, fontWeight: 600, color: "#0F1B33" }}
              >
                {q}
                <span style={{ fontSize: 18, color: "#7A96B0", marginLeft: 12, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#4A6580", lineHeight: 1.7, borderTop: "1px solid #F1F5F9" }}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#E8A020", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#071628", margin: "0 0 12px", letterSpacing: "-0.5px" }}>
          Qual é o seu próximo evento?
        </h2>
        <p style={{ fontSize: 16, color: "#3D2800", margin: "0 0 28px" }}>
          Comece pelo dimensionamento. Grátis, sem instalar nada.
        </p>
        <Link href="/auth/cadastro" style={{ fontWeight: 700, fontSize: 16, background: "#0B1F3A", color: "#fff", padding: "16px 32px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>
          Criar conta grátis
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0B1F3A", borderTop: "1px solid #162F4A", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NormatoMark size={24} />
            <span style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>Normato</span>
          </div>
          <p style={{ fontSize: 12, color: "#4A6580", margin: 0 }}>
            © 2026 Normato · Desenvolvido por{" "}
            <a href="https://arxum.com.br" target="_blank" rel="noopener noreferrer" style={{ color: "#E8A020", textDecoration: "none" }}>
              Arxum
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
