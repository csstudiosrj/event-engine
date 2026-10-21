import type { Calculadora } from "./types";

export const pontoEquilibrio: Calculadora = {
  slug: "ponto-equilibrio",
  titulo: "Ponto de Equilíbrio Financeiro",
  descricao: "Ponto de equilíbrio contábil e financeiro para eventos",
  regras: [
    {
      id: "pe-formulas",
      descricao:
        "Margem de contribuição unitária = preço líquido do ingresso (após taxas e impostos sobre a venda) − custo variável por participante. Ponto de equilíbrio contábil = custos fixos ÷ margem. Ponto de equilíbrio financeiro = (custos fixos − depreciação e demais custos que não saem do caixa) ÷ margem.",
      fonte: "Contabilidade gerencial (fórmulas padrão)",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "tributos-competencia",
      descricao: "Cada tributo é de um ente: ISS é municipal, ICMS é estadual e PIS/COFINS são federais. Alíquotas e regime (Simples Nacional, Lucro Presumido ou Lucro Real) devem ser confirmados com o contador.",
      fonte: "Constituição Federal, arts. 155, II, 156, III, e 195, I, b",
      tipo_fonte: "lei_federal",
      veredito: "confirmado",
    },
  ],
};

export default pontoEquilibrio;
