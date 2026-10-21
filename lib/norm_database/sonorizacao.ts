import type { Calculadora } from "./types";

export const sonorizacao: Calculadora = {
  slug: "sonorizacao",
  titulo: "Ruído e Sonorização",
  descricao: "Limites de ruído e requisitos de sonorização para eventos",
  regras: [
    {
      id: "conama001-1990-ruido-areas-urbanas",
      descricao:
        "Atividades que gerem ruído em áreas urbanas devem observar: máximo de 55 dB(A) no período diurno e 50 dB(A) no período noturno para zona mista predominantemente residencial (ZR2).",
      fonte: "Resolução CONAMA 001/1990",
      tipo_fonte: "resolucao_conama",
      url_oficial:
        "https://www.gov.br/mma/pt-br/acesso-a-informacao/legislacao/resolucoes/resolucao-conama-no-001-de-08-de-marco-de-1990",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO: os limites de 70/60 dB(A) citados anteriormente são valores da NBR 10151 para ambientes industriais, não os limites da CONAMA 001/1990 para áreas urbanas residenciais. Usar 55/50 dB(A) para zona mista residencial.",
    },
    {
      id: "nbr10151-2019-ruido-vizinhanca",
      descricao:
        "A NBR 10151:2019 define os critérios de avaliação de ruído em comunidades: 65 dB(A) diurno e 55 dB(A) noturno para área mista com comércio; 55 dB(A) diurno e 50 dB(A) noturno para área estritamente residencial.",
      fonte: "ABNT NBR 10151:2019",
      tipo_fonte: "norma_abnt",
      veredito: "confirmado",
    },
    {
      id: "lei-municipal-ruido-eventos",
      descricao:
        "Municípios podem estabelecer limites de ruído mais restritivos que os federais e exigir alvará específico para eventos com sonorização amplificada. Verifique a legislação do município do evento.",
      fonte: "Legislação municipal (variável por cidade)",
      tipo_fonte: "lei_municipal",
      veredito: "confirmado",
      estimativa_operacional: false,
    },
    {
      id: "ruido-por-distancia-estimativa",
      descricao:
        "Referência operacional: a cada duplicação da distância da fonte sonora, o nível de pressão sonora reduz aproximadamente 6 dB(A). O responsável técnico deve dimensionar o sistema de PA considerando o perímetro do evento e os limites aplicáveis.",
      fonte: "Referência técnica / acústica",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default sonorizacao;
