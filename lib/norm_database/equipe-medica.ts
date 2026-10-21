import type { Calculadora } from "./types";

export const equipeMedica: Calculadora = {
  slug: "equipe-medica",
  titulo: "Equipe Médica",
  descricao: "Dimensionamento de suporte médico e primeiros socorros para eventos",
  regras: [
    {
      id: "cfm2012-2013-equipe-medica-eventos",
      descricao:
        "Eventos com público superior a 1.000 pessoas devem ter assistência médica organizada, com médico responsável e infraestrutura de atendimento de urgência.",
      fonte: "Resolução CFM 2.012/2013",
      tipo_fonte: "resolucao_cfm",
      dispositivo: "Art. 1º",
      url_oficial:
        "https://www.cfm.org.br/normas/visualizar/resolucoes/BR/2013/2012",
      veredito: "confirmado",
    },
    {
      id: "lei14597-2023-seguranca-eventos",
      descricao:
        "A Lei Geral do Esporte estabelece obrigatoriedade de equipe médica e de segurança em eventos esportivos, aplicável por analogia a eventos de grande porte.",
      fonte: "Lei 14.597/2023",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14597.htm",
      veredito: "confirmado",
    },
    {
      id: "cremerj-equipe-medica-rj",
      descricao:
        "Rio de Janeiro: o CREMERJ exige credenciamento prévio da equipe médica para eventos e fiscaliza o cumprimento da Resolução CFM 2.012/2013.",
      fonte: "CREMERJ",
      tipo_fonte: "resolucao_cfm",
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "equipe-medica-proporcao-estimativa",
      descricao:
        "Referência operacional: 1 médico + 2 socorristas para até 5.000 pessoas; adicionar 1 médico e 2 socorristas a cada 5.000 pessoas adicionais. Ambulância de suporte avançado para eventos acima de 10.000 pessoas.",
      fonte: "Referência operacional de mercado / CFM 2.012/2013",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default equipeMedica;
