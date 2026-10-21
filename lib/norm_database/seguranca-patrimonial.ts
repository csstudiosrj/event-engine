import type { Calculadora } from "./types";

export const segurancaPatrimonial: Calculadora = {
  slug: "seguranca-patrimonial",
  titulo: "Segurança Patrimonial",
  descricao: "Requisitos de segurança pública e patrimonial para eventos",
  regras: [
    {
      id: "lei14967-2024-seguranca-eventos",
      descricao:
        "A Lei 14.967/2024 regulamenta as atividades de organização de eventos, incluindo exigências de segurança, controle de acesso e responsabilidade do organizador.",
      fonte: "Lei 14.967/2024",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm",
      veredito: "confirmado",
    },
    {
      id: "decreto13012-2026-seguranca-grande-eventos",
      descricao:
        "Eventos com público superior a 1.000 pessoas devem elaborar Plano de Segurança e comunicar à autoridade policial competente com antecedência mínima de 30 dias.",
      fonte: "Decreto 13.012/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Art. 22, § 1º",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO (dois erros): (1) o limiar de 1.000 pessoas está no Decreto 13.012/2026 art. 22 §1º, NÃO na Lei 14.967/2024 art. 8º; (2) a referência correta é 'Art. 22' (não 'Item 22').",
    },
    {
      id: "lei13675-2018-seguranca-publica",
      descricao:
        "O Sistema Único de Segurança Pública (SUSP) coordena a atuação das forças de segurança em eventos de grande porte. O organizador deve solicitar policiamento ostensivo à Secretaria de Segurança Pública do estado.",
      fonte: "Lei 13.675/2018",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm",
      veredito: "confirmado",
    },
    {
      id: "seguranca-privada-proporcao-estimativa",
      descricao:
        "Referência operacional: 1 segurança para cada 100-200 pessoas (baixo risco) a 1 para cada 50-100 (alto risco). O número exato depende do tipo de evento, layout do espaço e exigência do órgão de segurança pública local.",
      fonte: "Referência operacional de mercado",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default segurancaPatrimonial;
