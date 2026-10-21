import type { Calculadora } from "./types";

export const residuos: Calculadora = {
  slug: "residuos",
  titulo: "Gestão de Resíduos",
  descricao: "Plano de gerenciamento de resíduos sólidos para eventos",
  regras: [
    {
      id: "lei12305-2010-pgrs-obrigatorio",
      descricao:
        "Geradores de resíduos sólidos sujeitos ao PGRS devem elaborar plano descrevendo o empreendimento, o diagnóstico de origem, volume e caracterização dos resíduos e os passivos ambientais.",
      fonte: "Lei 12.305/2010 (PNRS)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 20 e 21",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm",
      veredito: "confirmado",
    },
    {
      id: "decreto10936-2022-pgrs-coletivo",
      descricao:
        "O Decreto 10.936/2022 regulamenta a PNRS e prevê a possibilidade de apresentação coletiva e integrada do PGRS; o artigo exato deve ser verificado no texto integral do decreto.",
      fonte: "Decreto 10.936/2022",
      tipo_fonte: "decreto_federal",
      url_oficial:
        "http://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2022/Decreto/D10936.htm",
      veredito: "duvidoso",
      nota_auditoria:
        "Art. 57 não confirmado para PGRS coletivo/integrado; verificar artigos 60–70 do decreto para a referência correta.",
    },
    {
      id: "conama275-2001-coleta-seletiva-cores",
      descricao:
        "A coleta seletiva deve seguir o código de cores da CONAMA 275/2001: azul (papel/papelão), vermelho (plástico), verde (vidro), amarelo (metal), preto (madeira), laranja (perigosos), branco (serviços de saúde), roxo (radioativos), marrom (orgânicos), cinza (não reciclável).",
      fonte: "Resolução CONAMA 275/2001",
      tipo_fonte: "resolucao_conama",
      url_oficial:
        "https://www.gov.br/mma/pt-br/acesso-a-informacao/legislacao/resolucoes/resolucao-conama-no-275-de-25-de-abril-de-2001",
      veredito: "confirmado",
    },
    {
      id: "rdc222-2018-residuos-saude-evento",
      descricao:
        "Equipes médicas em eventos que gerem resíduos de serviços de saúde devem elaborar PGRSS, cobrindo geração, segregação, acondicionamento, coleta, armazenamento, transporte, tratamento e disposição final.",
      fonte: "RDC 222/2018",
      tipo_fonte: "resolucao_anvisa",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/servicosdesaude/gerenciamento-de-residuos",
      veredito: "confirmado",
    },
    {
      id: "grande-gerador-criterio-municipal",
      descricao:
        "O critério de 'grande gerador' (ex.: acima de 120 L/dia ou 600 L/semana) é definido por legislação municipal; não há resolução federal vinculante do CONAMA. Verifique a norma do município do evento.",
      fonte: "Legislação municipal (variável por cidade)",
      tipo_fonte: "lei_municipal",
      veredito: "duvidoso",
      nota_auditoria:
        "INCORRETO tratar como parâmetro federal. O critério aparece em tramitação do CONAMA e em leis municipais, mas não tem força de norma federal vigente.",
      estimativa_operacional: true,
    },
    {
      id: "geracao-residuos-por-pessoa-estimativa",
      descricao:
        "Não existe parâmetro normativo federal de kg ou litros de resíduo por pessoa em eventos. A literatura acadêmica varia de 0,02 a 3 kg/pessoa/dia dependendo do tipo de evento, duração e oferta de alimentação.",
      fonte: "Estimativa operacional (sem base normativa federal)",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
      nota_auditoria:
        "Qualquer valor usado na calculadora deve ser apresentado como estimativa operacional com premissas explícitas, nunca como requisito legal.",
    },
    {
      id: "pnrs-responsabilidade-compartilhada",
      descricao:
        "O organizador do evento é responsável pelo gerenciamento dos resíduos gerados (responsabilidade compartilhada pelo ciclo de vida dos produtos).",
      fonte: "Lei 12.305/2010 (PNRS)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 3º (V e XVI) e 25",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm",
      veredito: "confirmado",
    },
  ],
};

export default residuos;
