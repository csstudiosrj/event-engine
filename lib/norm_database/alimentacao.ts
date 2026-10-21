import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const alimentacao: Calculadora = {
  slug: "alimentacao",
  titulo: "Alimentação",
  descricao: "Boas práticas e regras sanitárias para alimentação em eventos",
  regras: [
    {
      id: "rdc216-quente",
      descricao: "Alimentos preparados conservados a quente devem ficar acima de 60 °C por no máximo 6 horas. O reaquecimento deve levar todas as partes a pelo menos 70 °C.",
      fonte: "RDC ANVISA 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Item 4.8.15",
      veredito: "confirmado",
      nota_auditoria: "Conferido em decisões da ANVISA que citam o item; o site da BVS bloqueou o acesso ao texto.",
    },
    {
      id: "rdc216-frio",
      descricao: "Alimentos preparados refrigerados devem ficar abaixo de 5 °C, ou congelados a -18 °C ou menos. Sob refrigeração a 4 °C ou menos, o prazo máximo de consumo é de 5 dias.",
      fonte: "RDC ANVISA 216/2004",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Itens 4.8.17 e 4.8.19",
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a regra anterior ('até 10 °C; entre 10 e 21 °C por 2 h') não é da RDC 216.",
    },
    {
      id: "rdc656-eventos-massa",
      descricao:
        "Eventos com mais de 1.000 pessoas por dia com manipulação de alimentos (ou menores, se a vigilância local exigir): avaliação prévia pela vigilância sanitária, com formulário protocolado até 30 dias antes; água corrente potável em cada instalação; manipuladores com asseio, cabelos protegidos e sem adornos; responsabilidade solidária do organizador.",
      fonte: "RDC ANVISA 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Arts. 2º, 10, 12, 27 e 29",
      url_oficial: URL.rdc656,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: o responsável técnico não é obrigatório em todos os casos; a autoridade sanitária pode exigi-lo (art. 8º).",
    },
  ],
};

export default alimentacao;
