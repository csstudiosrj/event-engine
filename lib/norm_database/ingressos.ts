import type { Calculadora } from "./types";

export const ingressos: Calculadora = {
  slug: "ingressos",
  titulo: "Ingressos e Meia-Entrada",
  descricao: "Regras para venda de ingressos e concessão de meia-entrada",
  regras: [
    {
      id: "lei12933-2013-meia-entrada",
      descricao:
        "A meia-entrada (50% do valor do ingresso) é assegurada a estudantes, pessoas com deficiência e seus acompanhantes, jovens de 15 a 29 anos de baixa renda (CadÚnico) e idosos acima de 60 anos.",
      fonte: "Lei 12.933/2013",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12933.htm",
      veredito: "confirmado",
    },
    {
      id: "decreto8537-2015-meia-entrada-estudante",
      descricao:
        "Para obter meia-entrada como estudante é necessário apresentar a Carteira de Identificação Estudantil (CIE) emitida pela ANPG, UNE, UBES ou entidade estudantil estadual/municipal reconhecida.",
      fonte: "Decreto 8.537/2015",
      tipo_fonte: "decreto_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/decreto/d8537.htm",
      veredito: "confirmado",
    },
    {
      id: "lei10741-2003-idoso-meia",
      descricao:
        "Pessoas com 60 anos ou mais têm direito à meia-entrada em eventos artísticos, culturais, esportivos e de lazer.",
      fonte: "Lei 10.741/2003 (Estatuto do Idoso)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 23",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm",
      veredito: "confirmado",
    },
    {
      id: "lei13146-2015-pcd-meia",
      descricao:
        "Pessoas com deficiência têm direito à meia-entrada em eventos culturais, esportivos, de lazer e entretenimento, extensível a um acompanhante quando necessário.",
      fonte: "Lei 13.146/2015 (LBI)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 48",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm",
      veredito: "confirmado",
      nota_auditoria:
        "Atenção: o art. 63 da Lei 13.146/2015 trata de acessibilidade à internet, NÃO de sanitários. A referência correta para meia-entrada de PcD é o art. 48.",
    },
    {
      id: "decreto9404-2018-meia-proporcao",
      descricao:
        "A meia-entrada é reservada para no mínimo 40% dos ingressos disponíveis por evento ou por setor.",
      fonte: "Decreto 9.404/2018",
      tipo_fonte: "decreto_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/D9404.htm",
      veredito: "confirmado",
    },
    {
      id: "eca-menores-espetaculos",
      descricao:
        "Menores de 16 anos só podem frequentar espetáculos e diversões públicas com autorização dos pais ou responsáveis; menores de 10 anos devem estar acompanhados. Eventos classificados como impróprios para menores exigem controle de acesso por faixa etária.",
      fonte: "Lei 8.069/1990 (ECA)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 74 a 80",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
      veredito: "confirmado",
    },
    {
      id: "ecad-direitos-autorais",
      descricao:
        "Eventos com execução pública de músicas devem recolher direitos autorais ao ECAD. O valor é calculado sobre a receita bruta do evento.",
      fonte: "Lei 9.610/1998 (Lei dos Direitos Autorais) + ECAD",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 68",
      url_oficial: "https://www.ecad.org.br/pt/eu-faco-musica/eventos/Paginas/default.aspx",
      veredito: "confirmado",
    },
    {
      id: "decreto13108-2026-ingressos-eventos",
      descricao:
        "Regulamenta a venda de ingressos para eventos de entretenimento, incluindo regras para plataformas digitais, limites de taxa de serviço e política de reembolso.",
      fonte: "Decreto 13.108/2026",
      tipo_fonte: "decreto_federal",
      veredito: "confirmado",
    },
  ],
};

export default ingressos;
