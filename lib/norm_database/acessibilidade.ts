import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const acessibilidade: Calculadora = {
  slug: "acessibilidade",
  titulo: "Acessibilidade",
  descricao: "Requisitos de acessibilidade para eventos",
  regras: [
    {
      id: "dec5296-art23",
      descricao:
        "Teatros, estádios, ginásios, locais de espetáculos e similares: até 1.000 lugares, 2% de espaços para cadeira de rodas (mínimo 1) e 2% de assentos para pessoas com deficiência ou mobilidade reduzida (mínimo 1). Acima de 1.000 lugares, 20 espaços mais 1% do que exceder 1.000, e 20 assentos mais 1% do que exceder 1.000. Metade dos assentos reservados deve servir a pessoas obesas. Todos com lugar para acompanhante ao lado.",
      fonte: "Decreto 5.296/2004, art. 23 (redação do Decreto 9.404/2018), regulamentando a Lei 13.146/2015, art. 44",
      tipo_fonte: "decreto_federal",
      dispositivo: "Art. 23, § 1º, I e II, §§ 2º e 3º",
      url_oficial: URL.dec5296,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: o Decreto 9.404/2018 trata destes percentuais, e não de meia-entrada.",
    },
    {
      id: "lei13146-art44-rotas",
      descricao: "Os espaços reservados devem ficar distribuídos em locais de boa visibilidade, próximos aos corredores, sem segregação, e o local deve ter rotas de fuga e saídas de emergência acessíveis.",
      fonte: "Lei 13.146/2015 (LBI)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 44, §§ 1º e 4º",
      url_oficial: URL.lei13146,
      veredito: "confirmado",
    },
    {
      id: "lei13146-art47-vagas",
      descricao: "Estacionamentos abertos ao público: 2% das vagas para veículos que transportem pessoa com deficiência com mobilidade comprometida, com no mínimo 1 vaga sinalizada, próxima aos acessos.",
      fonte: "Lei 13.146/2015 (LBI)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 47, § 1º",
      url_oficial: URL.lei13146,
      veredito: "confirmado",
    },
    {
      id: "lei10741-art41-vagas",
      descricao: "Reserva de 5% das vagas de estacionamentos públicos e privados para pessoas idosas, nos termos da lei local.",
      fonte: "Lei 10.741/2003 (Estatuto da Pessoa Idosa)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 41",
      url_oficial: URL.lei10741,
      veredito: "confirmado",
    },
    {
      id: "nbr9050-rampas-sanitarios",
      descricao: "Rampas com inclinação máxima de 8,33% e sanitários acessíveis em 5% do total de cada peça (mínimo 1).",
      fonte: "ABNT NBR 9050:2020",
      tipo_fonte: "norma_abnt",
      veredito: "duvidoso",
      nota_auditoria: "Norma paga; valores conferidos em fontes secundárias. Nas saídas de emergência de eventos em SP, a IT 12/2025 admite rampas de até 10%.",
    },
  ],
};

export default acessibilidade;
