import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const ingressos: Calculadora = {
  slug: "ingressos",
  titulo: "Ingressos e Meia-entrada",
  descricao: "Regras para venda de ingressos e concessão de meia-entrada",
  regras: [
    {
      id: "lei12933-40",
      descricao:
        "A meia-entrada é assegurada em 40% do total de ingressos disponíveis para venda ao público em cada evento. Têm direito estudantes com Carteira de Identificação Estudantil, pessoas com deficiência e acompanhante quando necessário, e jovens de 15 a 29 anos de baixa renda inscritos no CadÚnico.",
      fonte: "Lei 12.933/2013 e Decreto 8.537/2015",
      tipo_fonte: "lei_federal",
      dispositivo: "Lei 12.933, art. 1º, §§ 8º e 10; Decreto 8.537, art. 9º",
      url_oficial: URL.lei12933,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a fonte da cota de 40% é a Lei 12.933 e o Decreto 8.537, e não o Decreto 9.404/2018.",
    },
    {
      id: "dec8537-reserva-48h",
      descricao: "Os ingressos de meia-entrada ficam reservados aos beneficiários desde o início das vendas até 48 horas antes do evento, em todos os pontos de venda. Ingressos exclusivos de sócio-torcedor não entram na base de cálculo.",
      fonte: "Decreto 8.537/2015",
      tipo_fonte: "decreto_federal",
      dispositivo: "Arts. 9º, parágrafo único, e 10",
      url_oficial: URL.dec8537,
      veredito: "confirmado",
    },
    {
      id: "lei10741-art23",
      descricao: "Pessoas com 60 anos ou mais têm desconto de pelo menos 50% nos ingressos para eventos artísticos, culturais, esportivos e de lazer, e acesso preferencial.",
      fonte: "Lei 10.741/2003 (Estatuto da Pessoa Idosa)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 23",
      url_oficial: URL.lei10741,
      veredito: "confirmado",
    },
    {
      id: "dec13108-transparencia",
      descricao:
        "Venda de ingressos (exceto eventos esportivos): informar o preço total com todas as taxas discriminadas e a quantidade total de ingressos, inclusive os de meia-entrada; taxas proporcionais ao preço para não cercear a meia-entrada; ingressos promocionais não contam para os 40%; divulgar em até 30 dias após o evento o percentual vendido como meia-entrada; direito de arrependimento nas compras on-line.",
      fonte: "Decreto 13.108/2026",
      tipo_fonte: "decreto_federal",
      dispositivo: "Arts. 6º a 11 e 16",
      url_oficial: URL.dec13108,
      veredito: "confirmado",
    },
    {
      id: "eca-art75",
      descricao: "Crianças menores de 10 anos só podem entrar e permanecer em espetáculos acompanhadas dos pais ou responsável. O acesso segue a classificação indicativa do evento.",
      fonte: "Lei 8.069/1990 (ECA)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 75",
      url_oficial: URL.eca,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: o ECA não traz a regra de 'menores de 16 anos com autorização' citada antes.",
    },
    {
      id: "ecad",
      descricao: "Eventos com execução pública de música recolhem direitos autorais ao ECAD, conforme a tabela de preços do próprio ECAD.",
      fonte: "Lei 9.610/1998 (Lei de Direitos Autorais), art. 68",
      tipo_fonte: "lei_federal",
      veredito: "confirmado",
    },
  ],
};

export default ingressos;
