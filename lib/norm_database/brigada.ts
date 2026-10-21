import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const brigada: Calculadora = {
  slug: "brigada",
  titulo: "Brigada de Incêndio",
  descricao: "Dimensionamento da brigada de incêndio para eventos",
  regras: [
    {
      id: "sp-it17-4-11-2",
      descricao:
        "São Paulo: em ocupações temporárias (F-7) e locais de reunião de público (F-2, F-3, F-5, F-6, F-8, F-11), o número de brigadistas considera a população máxima: até 1.000 pessoas, no mínimo 5; de 1.000 a 2.500, no mínimo 10; de 2.500 a 5.000, no mínimo 15; de 5.000 a 10.000, no mínimo 20; acima de 10.000, acrescentar 1 brigadista para cada grupo de 500 pessoas.",
      fonte: "IT 17/2025 – CBPMESP (Portaria CCB-003/800/25)",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Item 4.11.2",
      url_oficial: URL.spIt17,
      ufs: ["SP"],
      veredito: "confirmado",
      nota_auditoria: "Conferido no texto integral. Pode ser calculado pelos ingressos efetivamente à venda (item 4.11.3) e substituído por bombeiros civis contratados (item 4.11.1).",
    },
    {
      id: "rj-nt504-tabela1",
      descricao:
        "Rio de Janeiro: a brigada é composta por bombeiros civis e dimensionada pela área total construída (ATC) das estruturas do evento. Estrutura temporária: até 200 m² isento; 201 a 500 m², 2 BC; 501 a 2.500 m², 4 BC; acima disso, +1 BC para cada 2.500 m² acrescidos. Edificação permanente: até 500 m² isento; 501 a 2.500 m², 2 BC. No mínimo 1 BC por estrutura temporária (um BC pode atender 2 estruturas a até 60 m entre si).",
      fonte: "NT 5-04 – CBMERJ (Portaria 1071/2019, alterada pela 1167/2022)",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Item 6.1.6 e Tabela 1",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "rj-nt504-extintores",
      descricao: "Rio de Janeiro: estruturas temporárias devem ter 1 extintor para cada 100 m² de área total construída, com distância máxima de 10 m entre extintores, preferencialmente de pó ABC.",
      fonte: "NT 5-04 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Item 6.1.1",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "brigada-outras-ufs",
      descricao:
        "Cada estado tem instrução técnica própria para brigada em eventos (ex.: IT 33 em MG, NT 09 no DF, NTCB 06 em MT, IT 03 em AL). Para estados sem regra cadastrada, o Normato usa o critério da IT 17/2025 de São Paulo como referência.",
      fonte: "Corpos de Bombeiros estaduais",
      tipo_fonte: "instrucao_tecnica",
      veredito: "nao_verificavel",
      estimativa_operacional: true,
    },
  ],
};

export default brigada;
