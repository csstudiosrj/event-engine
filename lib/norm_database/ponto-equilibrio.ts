import type { Calculadora } from "./types";

export const pontoEquilibrio: Calculadora = {
  slug: "ponto-equilibrio",
  titulo: "Ponto de Equilíbrio Financeiro",
  descricao: "Cálculo do ponto de equilíbrio contábil e financeiro para eventos",
  regras: [
    {
      id: "ponto-equilibrio-contabil-formula",
      descricao:
        "Ponto de Equilíbrio Contábil = Custos Fixos Totais ÷ Margem de Contribuição Unitária. Indica o número mínimo de ingressos a vender para cobrir todos os custos.",
      fonte: "Contabilidade gerencial – fórmula padronizada",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
      nota_auditoria:
        "CORRIGIDO: referência anterior citava artigo do CONGENTI sobre microempresa de confecções, não sobre eventos. Fórmula é contábil padrão; usar fonte acadêmica de gestão de eventos ou material didático IFPR/Proedu.",
    },
    {
      id: "ponto-equilibrio-financeiro-formula",
      descricao:
        "Ponto de Equilíbrio Financeiro = (Custos Fixos – Depreciação) ÷ Margem de Contribuição Unitária. Mais conservador que o contábil; considera apenas desembolsos efetivos.",
      fonte: "Contabilidade gerencial – fórmula padronizada",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "margem-contribuicao-unitaria-formula",
      descricao:
        "Margem de Contribuição Unitária = Preço de Venda do Ingresso – Custos e Despesas Variáveis por Participante (alimentação, segurança por pessoa, material, etc.).",
      fonte: "Contabilidade gerencial – fórmula padronizada",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "custos-fixos-variaveis-evento",
      descricao:
        "Custos fixos são despesas que não variam com o porte ou público do evento (aluguel do espaço, cachê artístico, estrutura de palco). Custos variáveis aumentam com o número de participantes (alimentação, segurança por pessoa, brindes).",
      fonte: "Gestão Financeira para Eventos – Proedu/IFPR",
      tipo_fonte: "estudo",
      url_oficial:
        "https://proedu.rnp.br/bitstream/handle/123456789/1346/Gestao%20Financeira%20para%20Eventos.pdf",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "tributos-evento-competencias",
      descricao:
        "Tributos sobre eventos: ISS (municipal, sobre serviços), ICMS (estadual, sobre mercadorias vendidas), PIS/COFINS (federal, sobre receita bruta). Cada tributo tem competência distinta; o planejamento tributário deve considerar os três níveis.",
      fonte: "Constituição Federal/88 – arts. 153, 155 e 156",
      tipo_fonte: "lei_federal",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO: versão anterior listava ISS, ICMS e PIS/COFINS todos como 'municipais'. ISS é municipal; ICMS é estadual; PIS/COFINS são federais.",
    },
    {
      id: "ponto-equilibrio-sem-parametro-normativo",
      descricao:
        "Não existe parâmetro normativo federal de ponto de equilíbrio por pessoa ou por ingresso em eventos. O cálculo depende da estrutura de custos de cada evento.",
      fonte: "Ausência de norma federal",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default pontoEquilibrio;
