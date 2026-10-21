import type { Calculadora } from "./types";

export const geradores: Calculadora = {
  slug: "geradores",
  titulo: "Geradores e Instalações Elétricas",
  descricao: "Requisitos elétricos para eventos: geradores, aterramento e segurança",
  regras: [
    {
      id: "nr10-aplicacao-instalacoes-eletricas",
      descricao:
        "Todas as instalações elétricas em eventos, incluindo geradores, quadros, cabos e tomadas temporárias, devem atender à NR-10, com medidas preventivas de controle do risco elétrico.",
      fonte: "NR-10",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Itens 10.1.1 e 10.2.1",
      url_oficial:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10",
      veredito: "confirmado",
    },
    {
      id: "nr10-aterramento",
      descricao:
        "O aterramento das instalações elétricas deve ser executado conforme regulamentação dos órgãos competentes e, na ausência desta, conforme normas internacionais vigentes.",
      fonte: "NR-10",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Item 10.2.8.3",
      url_oficial:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10",
      veredito: "confirmado",
    },
    {
      id: "nr10-desenergizacao-vigente",
      descricao:
        "Os procedimentos de desenergização de instalações elétricas devem seguir o item 10.5.1 da NR-10 (versão vigente até 31/05/2027).",
      fonte: "NR-10",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Item 10.5.1",
      url_oficial:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO: referência anterior citava item 10.13.1, que pertence à nova redação da NR-10 (Portaria MTE 737/2026) com vigência apenas a partir de 01/06/2027. O dispositivo vigente é o item 10.5.1.",
    },
    {
      id: "nr12-aterramento-maquinas",
      descricao:
        "Máquinas e equipamentos elétricos em eventos devem ter aterramento conforme a NR-12, que exige ligação equipotencial de partes metálicas.",
      fonte: "NR-12",
      tipo_fonte: "norma_regulamentadora",
      dispositivo: "Item 12.15",
      url_oficial:
        "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/arquivos/normas-regulamentadoras/nr-12-atualizada-2022-1.pdf",
      veredito: "confirmado",
      nota_auditoria:
        "CORRIGIDO: referência anterior citava item 12.1.1 (princípios gerais); o aterramento de máquinas e equipamentos está no item 12.15.",
    },
    {
      id: "nbr5410-instalacoes-baixa-tensao",
      descricao:
        "Instalações elétricas de baixa tensão em eventos devem seguir a ABNT NBR 5410:2004 (Versão Corrigida 2008, reconfirmada 2018), que define os requisitos para projetos, execução e manutenção.",
      fonte: "ABNT NBR 5410:2004 (VC2008)",
      tipo_fonte: "norma_abnt",
      veredito: "duvidoso",
      nota_auditoria:
        "A edição vigente é a de 2004 (VC2008, reconfirmada 2018). Não existe edição de 2026. A norma é paga; parâmetros numéricos não são públicos.",
    },
    {
      id: "gerador-potencia-estimativa",
      descricao:
        "Não existe parâmetro normativo federal de kVA por pessoa para eventos. O dimensionamento do gerador deve ser feito por levantamento de cargas: som, iluminação, vídeo, climatização, cozinha, etc.",
      fonte: "Referência técnica (sem base normativa federal)",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default geradores;
