import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const segurancaPatrimonial: Calculadora = {
  slug: "seguranca-patrimonial",
  titulo: "Segurança Patrimonial",
  descricao: "Requisitos de segurança privada para eventos",
  regras: [
    {
      id: "lei14967-eventos",
      descricao:
        "Segurança de eventos é serviço de segurança privada e depende de autorização prévia da Polícia Federal. Em eventos de grande magnitude, a empresa contratada apresenta projeto de segurança à autoridade local. O mesmo profissional não pode exercer vigilância e combate a incêndio ao mesmo tempo.",
      fonte: "Lei 14.967/2024 (Estatuto da Segurança Privada)",
      tipo_fonte: "lei_federal",
      dispositivo: "Arts. 4º, 5º (II), 8º e 10",
      url_oficial: URL.lei14967,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a lei é o Estatuto da Segurança Privada, e não uma lei sobre organização de eventos.",
    },
    {
      id: "dec13012-art22",
      descricao:
        "Eventos com público estimado acima de 1.000 pessoas: a empresa de vigilância apresenta previamente projeto de segurança à autoridade local, com público estimado, quantidade e disposição dos vigilantes e análise de risco. Os vigilantes precisam do curso de aperfeiçoamento em segurança de eventos. A revista pessoal só é lícita mediante adesão voluntária.",
      fonte: "Decreto 13.012/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Arts. 21, § 2º, e 22",
      url_oficial: URL.dec13012,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: o decreto não fixa prazo de 30 dias para comunicação à polícia.",
    },
    {
      id: "hsg195-stewards",
      descricao:
        "Não existe fórmula fixa de seguranças por pessoa: o número sai da análise de risco, com postos em barreiras, área do palco, corredores, entradas e saídas. Cada supervisor coordena normalmente de 6 a 10 seguranças.",
      fonte: "HSE – The Event Safety Guide (HSG195), 2ª ed.",
      tipo_fonte: "manual",
      dispositivo: "Parágrafos 312 a 315",
      url_oficial: URL.hsg195,
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "saidas-monitoradas",
      descricao: "São Paulo: as saídas finais devem ser monitoradas pessoalmente pela segurança enquanto houver público, e portas e portões sem barra antipânico devem ser controlados presencialmente pela brigada ou pela segurança.",
      fonte: "IT 12/2025 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 3.2.1.17 e 3.2.1.19",
      url_oficial: URL.spIt12,
      ufs: ["SP"],
      veredito: "confirmado",
    },
    {
      id: "rio-dec55648-seguranca",
      descricao: "Município do Rio de Janeiro: o evento autorizado deve usar vigilância patrimonial prestada por empresa autorizada pela Polícia Federal e obter o 'nada a opor' das Polícias Militar e Civil quando exigido.",
      fonte: "Decreto Rio nº 55.648/2025",
      tipo_fonte: "decreto_municipal",
      dispositivo: "Anexos VII e VIII",
      url_oficial: URL.rioDec55648,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
  ],
};

export default segurancaPatrimonial;
