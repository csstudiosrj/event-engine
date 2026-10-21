import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const geradores: Calculadora = {
  slug: "geradores",
  titulo: "Geradores e Instalações Elétricas",
  descricao: "Energia temporária para eventos",
  regras: [
    {
      id: "nr10-aplicacao",
      descricao: "Instalações elétricas temporárias e os serviços nelas executados seguem a NR-10, com medidas de controle do risco elétrico e trabalhadores autorizados.",
      fonte: "NR-10",
      tipo_fonte: "norma_regulamentadora",
      veredito: "confirmado",
    },
    {
      id: "nbr5410",
      descricao: "Instalações elétricas de baixa tensão seguem a ABNT NBR 5410:2004 (versão corrigida 2008), incluindo aterramento e proteção contra choques.",
      fonte: "ABNT NBR 5410:2004",
      tipo_fonte: "norma_abnt",
      veredito: "confirmado",
      nota_auditoria: "Norma paga; parâmetros numéricos não públicos.",
    },
    {
      id: "rj-nt504-eletrica",
      descricao: "Rio de Janeiro: o sistema elétrico de eventos temporários deve atender à NBR 5410, e motogeradores seguem a NT 3-03 do CBMERJ, inclusive quanto a extintores. Motogeradores não podem ficar sob arquibancadas e camarotes.",
      fonte: "NT 5-04 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 6.1.2, 6.1.5 e 6.3.8",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
    {
      id: "geradores-estimativa",
      descricao: "Não há parâmetro normativo de kVA por pessoa: a potência vem do levantamento das cargas. Consumo específico típico de grupos diesel modernos: 0,25 a 0,30 L por kWh entregue a 75% de carga; abaixo de 50% de carga a eficiência cai.",
      fonte: "Dados técnicos de fabricantes",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default geradores;
