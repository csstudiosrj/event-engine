import type { Calculadora } from "./types";

export const orcamento: Calculadora = {
  slug: "orcamento",
  titulo: "Orçamento Consolidado",
  descricao: "Estrutura de orçamento consolidado para eventos",
  regras: [
    {
      id: "orcamento-consolidado-formula",
      descricao:
        "Orçamento Consolidado = Soma de todos os Custos Fixos + Soma de todos os Custos Variáveis + Margem de Lucro desejada. Deve incluir reserva de contingência de 10–20% do total.",
      fonte: "Gestão Financeira para Eventos – Proedu/IFPR",
      tipo_fonte: "estudo",
      url_oficial:
        "https://proedu.rnp.br/bitstream/handle/123456789/1346/Gestao%20Financeira%20para%20Eventos.pdf",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "custos-fixos-variaveis-orcamento",
      descricao:
        "Custos fixos típicos de eventos: espaço/venue, palco e estrutura, som e luz, cachê artístico, produção executiva. Custos variáveis típicos: alimentação por pessoa, segurança por pessoa, material gráfico por participante, recarga de brindes.",
      fonte: "Referência operacional de mercado",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "tributos-orcamento-competencias",
      descricao:
        "O orçamento deve prever: ISS (municipal, alíquota 2–5% sobre serviços), ICMS (estadual, sobre mercadorias), PIS/COFINS (federal, 3,65% no Simples ou 9,25% no Lucro Real). Alíquotas variam; consultar contador.",
      fonte: "Constituição Federal/88 – arts. 153, 155 e 156",
      tipo_fonte: "lei_federal",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO: versão anterior tratava ISS, ICMS e PIS/COFINS como todos municipais. Cada tributo tem ente federativo específico.",
    },
    {
      id: "orcamento-sem-parametro-normativo",
      descricao:
        "Não existe parâmetro normativo federal de orçamento por pessoa ou por ingresso em eventos. O cálculo depende da estrutura de custos de cada evento.",
      fonte: "Ausência de norma federal",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default orcamento;
