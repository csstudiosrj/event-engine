import type { Calculadora } from "./types";

export const acessibilidade: Calculadora = {
  slug: "acessibilidade",
  titulo: "Acessibilidade",
  descricao: "Requisitos de acessibilidade para eventos",
  regras: [
    {
      id: "lei13146-2015-acessibilidade-eventos",
      descricao:
        "Eventos devem garantir acessibilidade plena a pessoas com deficiência: acesso, circulação, comunicação e participação em igualdade de condições.",
      fonte: "Lei 13.146/2015 (LBI – Lei Brasileira de Inclusão)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 42 a 54",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
      veredito: "confirmado",
      nota_auditoria:
        "ATENÇÃO: o art. 63 da LBI trata de acessibilidade à internet, NÃO de sanitários. Nunca citar art. 63 como base para sanitários acessíveis.",
    },
    {
      id: "lei10098-2000-acessibilidade-logradouros",
      descricao:
        "Espaços de uso público devem garantir acesso e circulação a pessoas com deficiência ou mobilidade reduzida, incluindo rampas, corrimãos, piso tátil e sinalização.",
      fonte: "Lei 10.098/2000",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 11 e 12",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/leis/l10098.htm",
      veredito: "confirmado",
      nota_auditoria:
        "Corrigido: referência anterior listava arts. 2º, 13 e 17 (genéricos). Arts. 11 e 12 são os dispositivos específicos para acessibilidade em espaços e vias públicas.",
    },
    {
      id: "nbr9050-2020-acessibilidade-eventos",
      descricao:
        "A NBR 9050:2020 regulamenta as condições de acessibilidade: rampas (inclinação máxima 8,33%), corrimãos, sanitários acessíveis (5% dos boxes, mínimo 1), vagas de estacionamento (2% do total, mínimo 1), assentos reservados (2% das poltronas, mínimo 1), espaços para cadeirantes e área de fuga.",
      fonte: "ABNT NBR 9050:2020",
      tipo_fonte: "norma_abnt",
      veredito: "confirmado",
    },
    {
      id: "manual-mdh-acessibilidade-eventos",
      descricao:
        "O Manual de Acessibilidade do MDH orienta sobre intérpretes de Libras, audiodescrição, materiais em braille e outras adaptações para eventos culturais.",
      fonte: "Manual de Acessibilidade – MDH",
      tipo_fonte: "manual",
      url_oficial:
        "https://www.gov.br/mdh/pt-br/navegue-por-temas/pessoa-com-deficiencia/publicacoes/",
      veredito: "confirmado",
    },
    {
      id: "acessibilidade-vagas-estacionamento",
      descricao:
        "2% das vagas de estacionamento devem ser reservadas para PcD, com mínimo de 1 vaga, próximas às entradas, com sinalização horizontal e vertical.",
      fonte: "ABNT NBR 9050:2020 + Lei 13.146/2015",
      tipo_fonte: "norma_abnt",
      veredito: "confirmado",
    },
  ],
};

export default acessibilidade;
