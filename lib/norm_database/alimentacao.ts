import type { Calculadora } from "./types";

export const alimentacao: Calculadora = {
  slug: "alimentacao",
  titulo: "Alimentação",
  descricao: "Boas práticas e temperaturas para manipulação de alimentos em eventos",
  regras: [
    {
      id: "rdc216-2004-boas-praticas",
      descricao:
        "Serviços de alimentação em eventos devem seguir as Boas Práticas de Fabricação: higiene pessoal dos manipuladores, controle de pragas, limpeza de instalações e equipamentos, controle de temperatura e rastreabilidade.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Itens 4.1 a 4.11",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
    {
      id: "rdc216-2004-temperatura-quente",
      descricao:
        "Alimentos quentes devem ser mantidos a temperatura igual ou superior a 60°C por no máximo 6 horas; acima de 65°C sem limite de tempo. Abaixo de 60°C o alimento deve ser descartado.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Item 4.8.6",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
    {
      id: "rdc216-2004-temperatura-frio",
      descricao:
        "Alimentos frios devem ser mantidos a temperatura igual ou inferior a 10°C; se entre 10°C e 21°C, podem ficar expostos por no máximo 2 horas.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Item 4.8.6",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
    {
      id: "rdc656-2022-eventos-massa-alimentacao",
      descricao:
        "Eventos com mais de 1.000 pessoas por dia que comercializem alimentos devem cumprir a RDC 656/2022: responsável técnico designado, controle de temperatura, rastreabilidade de insumos e plano de emergência sanitária.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Arts. 1º a 15",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-publica-norma-para-eventos-de-massa",
      veredito: "confirmado",
    },
    {
      id: "rdc656-2022-reservatorio-agua",
      descricao:
        "Reservatórios de água em eventos de massa devem ser inspecionados e higienizados conforme a RDC 656/2022.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Art. 28",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-publica-norma-para-eventos-de-massa",
      veredito: "confirmado",
      nota_auditoria:
        "Corrigido: referência anterior citava 'art. 27 parágrafo'; o dispositivo correto é art. 28.",
    },
    {
      id: "rdc216-2004-selecao-fornecedores",
      descricao:
        "Os serviços de alimentação devem especificar critérios para seleção e avaliação de fornecedores de matérias-primas, ingredientes e embalagens.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Item 4.7.1",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
    {
      id: "rdc216-2004-armazenamento",
      descricao:
        "Insumos devem ser armazenados em local limpo e organizado, sobre paletes ou prateleiras, com espaçamento para ventilação, identificados e respeitando a validade.",
      fonte: "RDC 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Itens 4.7.5 e 4.7.6",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2004/res0216_15_09_2004.html",
      veredito: "confirmado",
    },
  ],
};

export default alimentacao;
