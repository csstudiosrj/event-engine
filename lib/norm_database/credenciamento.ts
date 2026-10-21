import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const credenciamento: Calculadora = {
  slug: "credenciamento",
  titulo: "Credenciamento e Acesso",
  descricao: "Controle de acesso, catracas e dados pessoais",
  regras: [
    {
      id: "sp-it12-catracas",
      descricao: "São Paulo: as catracas devem atender todo o público em no máximo 1 hora, considerando capacidade máxima de 660 pessoas por catraca por hora. Catracas devem ser reversíveis e não contam como saída de emergência.",
      fonte: "IT 12/2025 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 3.2.1.22 a 3.2.1.24",
      url_oficial: URL.spIt12,
      ufs: ["SP"],
      veredito: "confirmado",
    },
    {
      id: "rj-nt504-acesso",
      descricao: "Rio de Janeiro: eventos em local fechado devem ter controle de acesso (catracas reversíveis ou equivalente aprovado) para garantir a lotação. Catracas dimensionadas para todo o público em até 1 hora, a 660 pessoas por catraca por hora, sem contar como largura de saída. Placa informativa de lotação obrigatória.",
      fonte: "NT 5-04 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 6.1.10 e 6.2.5 a 6.2.7",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "dec13012-revista",
      descricao: "Seguranças privados não podem fazer busca pessoal; a revista na entrada de eventos é lícita apenas mediante solicitação e adesão voluntária.",
      fonte: "Decreto 13.012/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Art. 21, § 2º",
      url_oficial: URL.dec13012,
      veredito: "confirmado",
    },
    {
      id: "lgpd-credenciamento",
      descricao: "Dados coletados no credenciamento (nome, CPF, e-mail, foto) seguem a LGPD: finalidade informada, coleta do mínimo necessário, guarda segura e atendimento aos direitos do titular.",
      fonte: "Lei 13.709/2018 (LGPD)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 6º e 18",
      url_oficial: URL.lgpd,
      veredito: "confirmado",
    },
  ],
};

export default credenciamento;
