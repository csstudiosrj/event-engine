import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const sanitarios: Calculadora = {
  slug: "sanitarios",
  titulo: "Sanitários",
  descricao: "Dimensionamento de instalações sanitárias para eventos",
  regras: [
    {
      id: "rio-dec55648-banheiros-quimicos",
      descricao:
        "Município do Rio de Janeiro: o organizador declara a instalação de, no mínimo, 1 módulo masculino e 1 módulo feminino para cada 150 pessoas, com pelo menos 10% dos módulos adaptados para cadeira de rodas ou mobilidade reduzida.",
      fonte: "Decreto Rio nº 55.648/2025",
      tipo_fonte: "decreto_municipal",
      dispositivo: "Anexo VI (autodeclaração)",
      url_oficial: URL.rioDec55648,
      ufs: ["RJ"],
      veredito: "confirmado",
      nota_auditoria: "Vale para eventos autorizados pela Prefeitura do Rio de Janeiro (capital). Conferido no texto publicado no DO Rio.",
    },
    {
      id: "rj-lei5705-banheiros-adaptados",
      descricao:
        "Estado do Rio de Janeiro: eventos públicos ou privados que ofereçam banheiros químicos devem ter no mínimo 10% de unidades acessíveis, com lavatório, e ao menos 1 unidade acessível mesmo quando o cálculo der fração menor que 1.",
      fonte: "Lei Estadual RJ nº 5.705/2010, alterada pela Lei nº 11.169/2026",
      tipo_fonte: "lei_estadual",
      ufs: ["RJ"],
      veredito: "duvidoso",
      nota_auditoria: "Redação de 2026 conferida apenas em fontes secundárias (LegisWeb); confirmar no DOERJ de 29/04/2026.",
    },
    {
      id: "nr24-trabalhadores",
      descricao:
        "Equipe de trabalho: 1 instalação sanitária (bacia e lavatório) para cada grupo de 20 trabalhadores ou fração, separadas por sexo. Em trabalho temporário em logradouro público podem ser usados banheiros químicos com higienização diária.",
      fonte: "NR-24 (Portaria SEPRT 1.066/2019)",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Itens 24.2.2 e Anexo II, item 2.1",
      url_oficial: URL.nr24,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: o lavatório para cada 10 trabalhadores (24.2.2.1) só se aplica a atividades com material infectante, tóxico ou poeira.",
    },
    {
      id: "hsg195-proporcao-publico",
      descricao:
        "Referência técnica (HSE, Reino Unido) para eventos musicais: com abertura de portões de 6 h ou mais, 1 sanitário para cada 100 mulheres e, para homens, 1 sanitário para cada 500 mais 1 mictório para cada 150. Com menos de 6 h: 1 para cada 120 mulheres; 1 para cada 600 homens mais 1 mictório para cada 175. Sem dados do público, considerar 50% de cada sexo.",
      fonte: "HSE – The Event Safety Guide (HSG195), 2ª ed.",
      tipo_fonte: "manual",
      dispositivo: "Parágrafos 515 a 518",
      url_oficial: URL.hsg195,
      veredito: "confirmado",
      estimativa_operacional: true,
      nota_auditoria: "Não há proporção federal no Brasil. Usada quando não existe regra municipal. O guia avisa que os números podem ser baixos para eventos com alto consumo de bebidas.",
    },
    {
      id: "hsg195-lavatorios",
      descricao: "Lavatórios na proporção de 1 para cada 5 sanitários, e nunca menos de 1 para cada 10 sanitários.",
      fonte: "HSE – The Event Safety Guide (HSG195), 2ª ed.",
      tipo_fonte: "manual",
      dispositivo: "Parágrafo 519",
      url_oficial: URL.hsg195,
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "nbr9050-sanitarios-acessiveis",
      descricao:
        "Sanitários acessíveis: 5% do total de cada peça sanitária, com no mínimo 1, divididos por sexo quando houver separação.",
      fonte: "ABNT NBR 9050:2020",
      tipo_fonte: "norma_abnt",
      dispositivo: "Seção 7 (sanitários)",
      veredito: "duvidoso",
      nota_auditoria: "Norma paga; percentual conferido em fontes secundárias. Aplicado fora do RJ, onde vale a lei estadual de 10%.",
    },
  ],
};

export default sanitarios;
