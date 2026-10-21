import type { Calculadora } from "./types";

export const credenciamento: Calculadora = {
  slug: "credenciamento",
  titulo: "Credenciamento e Recepção",
  descricao: "Requisitos de credenciamento, controle de acesso e proteção de dados para eventos",
  regras: [
    {
      id: "lgpd-credenciamento-dados-pessoais",
      descricao:
        "O credenciamento de participantes envolve coleta de dados pessoais (nome, CPF, e-mail) e deve cumprir a LGPD: obter consentimento informado, coletar apenas dados necessários, armazená-los com segurança e garantir o direito de acesso, correção e exclusão.",
      fonte: "Lei 13.709/2018 (LGPD)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 7º, 9º e 18",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      veredito: "confirmado",
    },
    {
      id: "lei14967-2024-controle-acesso",
      descricao:
        "O organizador é responsável pelo controle de acesso ao evento, devendo garantir que apenas pessoas autorizadas ingressem e que o público máximo aprovado não seja ultrapassado.",
      fonte: "Lei 14.967/2024",
      tipo_fonte: "lei_federal",
      url_oficial:
        "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm",
      veredito: "confirmado",
    },
    {
      id: "decreto13012-2026-credenciamento",
      descricao:
        "O Decreto 13.012/2026 exige que o organizador mantenha registro atualizado do número de pessoas no evento a qualquer momento, para fins de controle de capacidade e segurança.",
      fonte: "Decreto 13.012/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Art. 22",
      veredito: "confirmado",
    },
    {
      id: "rdc656-2022-identificacao-participantes",
      descricao:
        "Em eventos de massa com serviços de alimentação, os responsáveis pelo credenciamento devem estar identificados e ter acesso a informações sobre alergênicos para atendimento de emergências sanitárias.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      veredito: "confirmado",
    },
  ],
};

export default credenciamento;
