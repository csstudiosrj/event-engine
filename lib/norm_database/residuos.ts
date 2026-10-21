import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const residuos: Calculadora = {
  slug: "residuos",
  titulo: "Resíduos Sólidos",
  descricao: "Gerenciamento de resíduos sólidos em eventos",
  regras: [
    {
      id: "pnrs-art20",
      descricao:
        "Estão sujeitos a plano de gerenciamento de resíduos sólidos (PGRS) os estabelecimentos comerciais e de serviços que gerem resíduos perigosos ou resíduos que, por natureza, composição ou volume, não sejam equiparados aos domiciliares pelo poder público municipal. Na prática, o enquadramento do evento como grande gerador é definido pela lei do município.",
      fonte: "Lei 12.305/2010 (Política Nacional de Resíduos Sólidos)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 20, II",
      url_oficial: URL.lei12305,
      veredito: "confirmado",
      nota_auditoria: "Não existe limite federal de litros por dia; os valores de grande gerador (ex.: 120 L/dia, 200 L/dia) variam por município.",
    },
    {
      id: "conama275-cores",
      descricao: "Coleta seletiva com o código de cores: azul (papel), vermelho (plástico), verde (vidro), amarelo (metal), preto (madeira), laranja (perigosos), branco (saúde), roxo (radioativos), marrom (orgânicos) e cinza (não reciclável).",
      fonte: "Resolução CONAMA 275/2001",
      tipo_fonte: "resolucao_conama",
      veredito: "confirmado",
      nota_auditoria: "Conferido em fontes secundárias; texto amplamente reproduzido.",
    },
    {
      id: "rio-dec55648-limpeza",
      descricao: "Município do Rio de Janeiro: o organizador declara a responsabilidade pela limpeza da área e pela coleta, manuseio e retirada do lixo e resíduos durante e após o evento.",
      fonte: "Decreto Rio nº 55.648/2025",
      tipo_fonte: "decreto_municipal",
      dispositivo: "Anexos IV e V",
      url_oficial: URL.rioDec55648,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "residuos-estimativa",
      descricao:
        "Não há parâmetro normativo de quilos de resíduo por pessoa em eventos. Referências: geração urbana média de 1,04 kg por habitante por dia no Brasil (ABREMA, 2022) e estudo de casamentos com cerca de 1,1 kg por convidado (Instituto Federal de Brasília).",
      fonte: "ABREMA (2024) e Revista Eixo / IFB (2025)",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default residuos;
