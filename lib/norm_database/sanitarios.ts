import type { Calculadora } from "./types";

export const sanitarios: Calculadora = {
  slug: "sanitarios",
  titulo: "Sanitários",
  descricao: "Dimensionamento de instalações sanitárias para eventos",
  regras: [
    {
      id: "nr24-sanitarios-quantidade-minima",
      descricao:
        "1 vaso sanitário para cada 20 trabalhadores homens e 1 para cada 20 mulheres; 1 lavatório para cada 10 trabalhadores; 1 chuveiro para cada 10 trabalhadores em atividades insalubres.",
      fonte: "NR-24",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Item 24.1",
      url_oficial:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-24-nr-24",
      veredito: "confirmado",
    },
    {
      id: "nbr9050-sanitarios-acessibilidade",
      descricao:
        "Pelo menos 5% dos sanitários, com mínimo de um, devem ser acessíveis a pessoas com deficiência ou mobilidade reduzida.",
      fonte: "ABNT NBR 9050:2020",
      tipo_fonte: "norma_abnt",
      dispositivo: "Item 7.1",
      veredito: "confirmado",
    },
    {
      id: "lei10098-2000-sanitarios-acessibilidade",
      descricao:
        "Sanitários em locais de uso público devem garantir acessibilidade a pessoas com deficiência, com espaço de manobra e barras de apoio.",
      fonte: "Lei 10.098/2000",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 11 e 12",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/leis/l10098.htm",
      veredito: "confirmado",
      nota_auditoria:
        "Corrigido: referência anterior listava arts. 2º, 13 e 17 (genéricos); arts. 11 e 12 são os dispositivos específicos para sanitários em vias e espaços públicos.",
    },
    {
      id: "sanitarios-proporcao-publico-estimativa",
      descricao:
        "Referência operacional: 1 banheiro químico para cada 50-100 pessoas por 4 horas de evento. Não há parâmetro normativo federal fixo; o valor varia por tipo de evento e duração.",
      fonte: "Referência operacional de mercado",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
      nota_auditoria:
        "Não existe lei federal que fixe proporção sanitários/público em eventos. Valor deve ser apresentado como estimativa, não como exigência legal.",
    },
  ],
};

export default sanitarios;
