import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CATALOG } from "@/lib/calculators/catalog"
import { CANONICAL_URL, pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Normato — Calculadoras para dimensionar eventos: brigada, saídas de emergência, sanitários",
  description: "Calcule brigada de incêndio, saídas de emergência, sanitários, equipe médica, acessibilidade e mais para o seu evento, com as normas do Corpo de Bombeiros de SP e RJ e a legislação federal. 1 cálculo grátis.",
  path: "/",
})

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
    a: "Todos os estados usam as regras federais. São Paulo e Rio de Janeiro têm as instruções técnicas do Corpo de Bombeiros cadastradas por completo (brigada, saídas de emergência, atendimento médico e acesso). Nos demais estados usamos o critério de São Paulo como referência e avisamos isso no resultado.",
  },
  {
    q: "Preciso saber alguma norma técnica para usar?",
    a: "Não. Você informa os dados do evento — público, área, data, local — e o Normato aplica as normas correspondentes automaticamente.",
  },
  {
    q: "O que é um crédito?",
    a: "Cada cálculo de uma calculadora Essencial consome 1 crédito. Toda conta nova ganha 1 crédito grátis, e você compra mais a partir de R$ 4,90 (5 créditos). Nos planos Solo e Pro os cálculos são ilimitados e incluem as calculadoras Estratégicas.",
  },
]

export default function Home() {

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#F7F8FA", color: "#0F1B33", minHeight: "100vh" }}>

      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", name: "Normato", url: CANONICAL_URL, inLanguage: "pt-BR" },
          { "@type": "Organization", name: "Normato", url: CANONICAL_URL, parentOrganization: { "@type": "Organization", name: "ARXUM group", url: "https://www.arxum.com.br" } },
          { "@type": "FAQPage", mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
        ],
      }) }} />

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
            <Link href="/#calculadoras" style={{ fontWeight: 600, fontSize: 15, background: "#E8A020", color: "#071628", padding: "14px 28px", borderRadius: 10, textDecoration: "none", display: "inline-block" }}>
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
            { n: "Federal + estaduais", d: "referências normativas" },
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
        <p style={{ color: "#7A96B0", fontSize: 15, margin: "0 0 40px" }}>16 calculadoras: 10 Essenciais (1 crédito por cálculo) e 6 Estratégicas (planos Solo e Pro).</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {CATALOG.map(({ titulo: label, sub, slug, categoria }) => (
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
                {categoria === "estrategica" && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#E8A020", background: "#FEF3C7", padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap", marginLeft: 8 }}>
                    Solo/Pro
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#7A96B0", margin: 0 }}>{sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section id="como-funciona" style={{ background: "#0B1F3A", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#fff", lineHeight: 1.5, margin: "0 0 20px" }}>
            Cada cálculo mostra de onde vem cada número.
          </p>
          <p style={{ fontSize: 16, color: "#7A96B0", lineHeight: 1.7, margin: 0 }}>
            Quando a norma fixa um número (NBRs, NRs, Resoluções ANVISA, legislação federal e estadual), aplicamos a norma. Quando não fixa, deixamos claro que é uma estimativa de mercado. A memória de cálculo vem junto, para você conferir.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 32px", letterSpacing: "-0.3px" }}>Perguntas frequentes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faq.map(({ q, a }) => (
            <details key={q} style={{ border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
              <summary style={{ padding: "16px 20px", cursor: "pointer", fontSize: 15, fontWeight: 600, color: "#0F1B33" }}>{q}</summary>
              <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#4A6580", lineHeight: 1.7, borderTop: "1px solid #F1F5F9" }}>{a}</div>
            </details>
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

      <Footer />
    </div>
  )
}
