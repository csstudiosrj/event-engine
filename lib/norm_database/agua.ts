import type { Calculadora } from "./types";

export const agua: Calculadora = {
  slug: "agua",
  titulo: "Água Potável",
  descricao: "Requisitos de água potável para eventos",
  regras: [
    {
      id: "portaria888-2021-potabilidade",
      descricao:
        "A água fornecida para consumo humano em eventos deve atender aos padrões de potabilidade da Portaria GM/MS 888/2021: cloro residual livre entre 0,2 e 5 mg/L, turbidez máxima de 5 NTU e pH entre 6,0 e 9,5.",
      fonte: "Portaria GM/MS 888/2021",
      tipo_fonte: "portaria",
      url_oficial:
        "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2021/prt0888_04_05_2021.html",
      veredito: "confirmado",
    },
    {
      id: "rdc656-2022-agua-eventos-massa",
      descricao:
        "Eventos com mais de 1.000 pessoas por dia devem garantir o fornecimento de água potável em quantidade suficiente, com pontos de distribuição identificados e acessíveis.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Art. 12, § 6º",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-publica-norma-para-eventos-de-massa",
      veredito: "confirmado",
      nota_auditoria:
        "Corrigido: referência anterior citava 'Art. 1º, § 6º' (não existe); o dispositivo correto é art. 12, § 6º.",
    },
    {
      id: "rdc656-2022-reservatorio-higienizacao",
      descricao:
        "Reservatórios de água em eventos de massa devem ser higienizados antes do evento e inspecionados durante o evento.",
      fonte: "RDC 656/2022",
      tipo_fonte: "resolucao_anvisa",
      dispositivo: "Art. 28",
      url_oficial:
        "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2022/anvisa-publica-norma-para-eventos-de-massa",
      veredito: "confirmado",
    },
    {
      id: "agua-por-pessoa-estimativa",
      descricao:
        "Referência operacional: mínimo de 2 L de água potável por pessoa por hora de evento (consumo + higiene). Não há parâmetro normativo federal fixo; o valor depende da temperatura, tipo de evento e duração.",
      fonte: "Referência operacional de mercado",
      tipo_fonte: "estudo",
      veredito: "confirmado",
      estimativa_operacional: true,
    },
  ],
};

export default agua;
