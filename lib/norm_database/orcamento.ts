import type { Calculadora } from "./types";

export const orcamento: Calculadora = {
  slug: "orcamento",
  titulo: "Orçamento Consolidado",
  descricao: "Estrutura de orçamento consolidado para eventos",
  regras: [
    {
      id: "orcamento-estrutura",
      descricao: "Orçamento = custos fixos + custos variáveis (por participante × público) + reserva de contingência + margem desejada; a receita necessária soma os impostos sobre a receita.",
      fonte: "Gestão financeira de eventos (prática de mercado)",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
      nota_auditoria: "A reserva de contingência de 10–20% é prática de mercado, não exigência legal.",
    },
    {
      id: "tributos-aliquotas",
      descricao:
        "Referências de alíquota: ISS de 2% a 5% conforme o município (LC 116/2003, art. 8º, e LC 157/2016); PIS/COFINS de 3,65% no regime cumulativo (Lucro Presumido) ou 9,25% no não cumulativo (Lucro Real). No Simples Nacional os tributos são recolhidos juntos pelo DAS, com alíquota por faixa de faturamento.",
      fonte: "Constituição Federal e legislação tributária",
      tipo_fonte: "lei_federal",
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a versão anterior aplicava 3,65% ao Simples Nacional, o que está errado.",
    },
  ],
};

export default orcamento;
