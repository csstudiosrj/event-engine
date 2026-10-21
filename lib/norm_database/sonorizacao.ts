import type { Calculadora } from "./types";

export const sonorizacao: Calculadora = {
  slug: "sonorizacao",
  titulo: "Ruído e Sonorização",
  descricao: "Limites de ruído para eventos com som",
  regras: [
    {
      id: "nbr10151-2019-tabela3",
      descricao:
        "Limites de nível sonoro (RLAeq) medidos no imóvel afetado, diurno/noturno: área rural 40/35 dB; estritamente residencial urbana, hospitais e escolas 50/45; mista predominantemente residencial 55/50; mista com vocação comercial e administrativa 60/55; mista com vocação recreacional 65/55; predominantemente industrial 70/60.",
      fonte: "ABNT NBR 10151:2019",
      tipo_fonte: "norma_abnt",
      dispositivo: "Tabela 3",
      veredito: "confirmado",
      nota_auditoria: "Corrigido: os limites antigos (55/50 e 65/55) estavam incompletos e atribuídos à CONAMA. Norma paga; tabela conferida em várias fontes técnicas. A classificação da área é da lei municipal de uso do solo.",
    },
    {
      id: "conama-1-1990",
      descricao: "Ruídos de atividades sociais e recreativas acima dos níveis aceitáveis pela NBR 10151 são prejudiciais à saúde e ao sossego público; as medições seguem essa norma.",
      fonte: "Resolução CONAMA 1/1990",
      tipo_fonte: "resolucao_conama",
      veredito: "confirmado",
      nota_auditoria: "A resolução não fixa números próprios: remete à NBR 10151.",
    },
    {
      id: "ruido-municipal",
      descricao: "Municípios podem ter limites e horários próprios e exigir licença específica para som amplificado em eventos. Confira a lei de ruído e o órgão ambiental da cidade.",
      fonte: "Legislação municipal",
      tipo_fonte: "lei_municipal",
      veredito: "nao_verificavel",
    },
    {
      id: "atenuacao-distancia",
      descricao: "Em campo livre, o nível sonoro de uma fonte pontual cai cerca de 6 dB cada vez que a distância dobra (lei do inverso do quadrado).",
      fonte: "Princípio de acústica física",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default sonorizacao;
