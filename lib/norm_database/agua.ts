import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const agua: Calculadora = {
  slug: "agua",
  titulo: "Água Potável",
  descricao: "Requisitos de água potável para eventos",
  regras: [
    {
      id: "dec13109-agua-gratis",
      descricao:
        "Eventos abertos ao público devem permitir a entrada com garrafas de água de uso pessoal. Acima de 1.000 participantes previstos, é obrigatório oferecer água potável gratuita (bebedouros ou embalagens individuais) em pontos de fácil acesso, dimensionados pela estrutura do local e pelo público. Vender água não afasta a obrigação.",
      fonte: "Decreto 13.109/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Arts. 3º, 4º e 5º",
      url_oficial: URL.dec13109,
      veredito: "confirmado",
    },
    {
      id: "hsg195-pontos",
      descricao: "Referência técnica para eventos ao ar livre de um dia: 1 ponto de água para cada 3.000 pessoas, mais 1 para cada 10 operadores de alimentação na mesma área.",
      fonte: "HSE – The Event Safety Guide (HSG195), 2ª ed.",
      tipo_fonte: "manual",
      dispositivo: "Parágrafo 472",
      url_oficial: URL.hsg195,
      veredito: "confirmado",
      estimativa_operacional: true,
    },
    {
      id: "portaria888-potabilidade",
      descricao: "Água para consumo humano: cloro residual livre entre 0,2 e 5 mg/L, turbidez até 5 uT e pH recomendado entre 6,0 e 9,0.",
      fonte: "Portaria GM/MS 888/2021 (Anexo XX da Portaria de Consolidação nº 5/2017)",
      tipo_fonte: "portaria",
      veredito: "duvidoso",
      nota_auditoria: "Valores conferidos em relatórios oficiais de qualidade da água; há divergência sobre o pH (alguns citam 6,0–9,5).",
    },
    {
      id: "rdc656-reservatorios",
      descricao: "Em eventos de massa, reservatórios de água potável devem ser de material adequado, higienizados, tampados e continuamente abastecidos.",
      fonte: "RDC ANVISA 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Art. 27, parágrafo único",
      url_oficial: URL.rdc656,
      veredito: "confirmado",
    },
    {
      id: "rio-calor-extremo",
      descricao: "Município do Rio de Janeiro: nos níveis de calor 4 e 5, eventos externos acima de 2.000 pessoas podem ser cancelados se não adotarem medidas como água potável gratuita, sombra e áreas de resfriamento.",
      fonte: "Decreto Rio nº 55.648/2025 (Anexo X) e Decreto Rio nº 54.740/2024",
      tipo_fonte: "decreto_municipal",
      url_oficial: URL.rioDec55648,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
  ],
};

export default agua;
