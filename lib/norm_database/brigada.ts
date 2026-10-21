import type { Calculadora } from "./types";

export const brigada: Calculadora = {
  slug: "brigada",
  titulo: "Brigada de Incêndio",
  descricao: "Dimensionamento da brigada de incêndio para eventos",
  regras: [
    {
      id: "nbr14276-brigada-composicao",
      descricao:
        "A brigada de incêndio deve ser dimensionada conforme a classificação da edificação por risco e ocupação. O número mínimo de brigadistas é determinado por tabela da norma, considerando o número de pavimentos, área e população.",
      fonte: "ABNT NBR 14276:2006",
      tipo_fonte: "norma_abnt",
      dispositivo: "Item 5",
      veredito: "confirmado",
    },
    {
      id: "nbr14276-brigadista-treinamento",
      descricao:
        "Brigadistas devem possuir treinamento teórico e prático em prevenção e combate a incêndio, primeiros socorros e abandono de área, com reciclagem anual.",
      fonte: "ABNT NBR 14276:2006",
      tipo_fonte: "norma_abnt",
      dispositivo: "Item 6",
      veredito: "confirmado",
    },
    {
      id: "it-17-cbpmg-brigada-eventos",
      descricao:
        "Eventos temporários com público acima de 250 pessoas exigem brigada de incêndio com pelo menos um brigadista a cada 500 pessoas, com mínimo de 2 brigadistas.",
      fonte: "IT 17 – CBPMG (Instrução Técnica do Corpo de Bombeiros de MG)",
      tipo_fonte: "instrucao_tecnica",
      ufs: ["MG"],
      veredito: "confirmado",
    },
    {
      id: "npt017-cbmpr-brigada-eventos",
      descricao:
        "Paraná: a brigada de incêndio em eventos deve seguir a NPT 017 do CBMPR, com dimensionamento por faixa de público e risco da atividade.",
      fonte: "NPT 017 – CBMPR",
      tipo_fonte: "instrucao_tecnica",
      ufs: ["PR"],
      veredito: "confirmado",
    },
    {
      id: "rt01-2025-cbrn-brigada",
      descricao:
        "Rio Grande do Norte: RT 01/2025 do CBRN regulamenta brigada de incêndio em eventos temporários.",
      fonte: "RT 01/2025 – CBRN",
      tipo_fonte: "instrucao_tecnica",
      ufs: ["RN"],
      veredito: "confirmado",
    },
    {
      id: "brigada-proporcao-estimativa",
      descricao:
        "Referência operacional geral: 1 brigadista para cada 500 pessoas (eventos de baixo risco) a 1 para cada 200 (eventos de alto risco). Cada UF tem norma própria; consultar o CBPMEUF local.",
      fonte: "Referência operacional de mercado",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default brigada;
