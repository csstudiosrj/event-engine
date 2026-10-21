import type { Calculadora } from "./types";

export const bebidas: Calculadora = {
  slug: "bebidas",
  titulo: "Bebidas e Álcool",
  descricao: "Regras para venda e consumo de bebidas alcoólicas em eventos",
  regras: [
    {
      id: "rdc216-2004-manipulacao-bebidas",
      descricao:
        "Bebidas e alimentos em eventos devem seguir boas práticas de manipulação: higiene pessoal dos manipuladores, controle de temperatura, proteção contra contaminação e rastreabilidade dos insumos.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Itens 4.1 a 4.8",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
    {
      id: "rdc656-2022-bebidas-eventos-massa",
      descricao:
        "Eventos com mais de 1.000 pessoas por dia que comercializem bebidas devem seguir a RDC 656/2022: controle de temperatura, identificação de fornecedores, armazenamento adequado e descarte de embalagens.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Arts. 1º e 2º",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-publica-norma-para-eventos-de-massa",
      veredito: "confirmado",
    },
    {
      id: "rdc717-2022-bebidas-alcoolicas",
      descricao:
        "Bebidas alcoólicas devem ter registro na ANVISA e obedecer aos padrões de identidade e qualidade estabelecidos pela RDC 717/2022.",
      fonte: "RDC 717/2022",
      tipo_fonte: "resolucao_anvisa",
      veredito: "confirmado",
    },
    {
      id: "eca-alcool-menores",
      descricao:
        "É proibida a venda de bebidas alcoólicas a menores de 18 anos. O organizador do evento é responsável pelo controle de acesso ao espaço de vendas e pelo treinamento de colaboradores.",
      fonte: "Lei 8.069/1990 (ECA)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 81, II",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
      veredito: "confirmado",
    },
    {
      id: "lei14597-2023-bebidas-eventos-esportivos",
      descricao:
        "A Lei Geral do Esporte proíbe a venda de bebidas alcoólicas durante a realização de eventos esportivos em estádios e arenas, salvo exceções previstas em regulamentos específicos.",
      fonte: "Lei 14.597/2023",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14597.htm",
      veredito: "confirmado",
    },
  ],
};

export default bebidas;
