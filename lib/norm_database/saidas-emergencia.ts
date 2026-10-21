import type { Calculadora } from "./types";

export const saidasEmergencia: Calculadora = {
  slug: "saidas-emergencia",
  titulo: "Saídas de Emergência",
  descricao: "Dimensionamento de saídas de emergência para eventos",
  regras: [
    {
      id: "nbr9077-saidas-emergencia",
      descricao:
        "A largura mínima de saídas de emergência é de 1,20 m (unidade de passagem = 0,60 m). O número de saídas e a largura são calculados pela capacidade da edificação dividida pela capacidade por unidade de passagem (60 pessoas por UP).",
      fonte: "ABNT NBR 9077:2001",
      tipo_fonte: "norma_abnt",
      dispositivo: "Item 5.3",
      veredito: "confirmado",
    },
    {
      id: "nbr9077-distancia-percurso",
      descricao:
        "A distância máxima de percurso até uma saída de emergência é de 30 m (sem chuveiros automáticos) ou 45 m (com chuveiros automáticos) para locais de reunião.",
      fonte: "ABNT NBR 9077:2001",
      tipo_fonte: "norma_abnt",
      dispositivo: "Tabela 5",
      veredito: "confirmado",
    },
    {
      id: "it-11-saidas-emergencia-sp",
      descricao:
        "São Paulo: a IT 11 do CBPMESP regulamenta saídas de emergência em edificações, exigindo projeto técnico aprovado para eventos temporários acima de 250 pessoas.",
      fonte: "IT 11 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      ufs: ["SP"],
      veredito: "confirmado",
    },
    {
      id: "it-saidas-emergencia-rj",
      descricao:
        "Rio de Janeiro: as saídas de emergência em eventos devem seguir as Instruções Técnicas do CBMERJ, com largura mínima de 1,20 m por 500 pessoas.",
      fonte: "IT – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "saidas-emergencia-proporcao-estimativa",
      descricao:
        "Referência operacional: 1 saída de 1,20 m para cada 500 pessoas, com no mínimo 2 saídas independentes para qualquer evento. Cada UF tem ITs próprias; consultar o CBPMEUF local.",
      fonte: "ABNT NBR 9077:2001 + referência operacional",
      tipo_fonte: "norma_abnt",
      veredito: "confirmado",
      estimativa_operacional: false,
    },
  ],
};

export default saidasEmergencia;
