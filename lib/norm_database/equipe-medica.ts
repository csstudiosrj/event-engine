import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const equipeMedica: Calculadora = {
  slug: "equipe-medica",
  titulo: "Equipe Médica",
  descricao: "Dimensionamento de equipe médica e ambulâncias para eventos",
  regras: [
    {
      id: "rj-nt505-anexo-c",
      descricao:
        "Rio de Janeiro: eventos com 1.000 pessoas ou mais precisam de Projeto de Atendimento Médico aprovado. Tabela de recursos: 1.000–4.999 pessoas: 1 posto, 2 macas, 1 médico, 1 enfermeiro, 1 técnico, 1 ambulância tipo D; 5.000–9.999: 2 postos, 4 macas, 2 médicos, 2 enfermeiros, 2 técnicos, 1 ambulância D e 1 tipo B; 10.000–14.999: 3 postos, 6 macas, 3 médicos, 3 enfermeiros, 3 técnicos, 1 D e 2 B; 15.000–19.999: 4 postos, 8 macas, 4 médicos, 4 enfermeiros, 4 técnicos, 2 D e 2 B; 20.000–29.999: 4 postos, 12 macas, 6 médicos, 4 enfermeiros, 4 técnicos, 2 D e 2 B; 30.000–40.000: 4 postos, 16 macas, 8 médicos, 4 enfermeiros, 4 técnicos, 2 D e 2 B.",
      fonte: "NT 5-05 – CBMERJ (Portaria 1071/2019)",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Item 5.1 e Anexo C",
      url_oficial: URL.rjNt505,
      ufs: ["RJ"],
      veredito: "confirmado",
      nota_auditoria: "Acima de 40.000 pessoas, o dimensionamento é definido em reunião com a DSE/CBMERJ (item 5.2.7).",
    },
    {
      id: "rj-nt505-maqueiros",
      descricao: "Rio de Janeiro: no mínimo 1 dupla de maqueiros para cada 2.000 pessoas ou fração, em eventos acima de 1.000 pessoas. Os postos médicos devem funcionar desde 2 horas antes do início.",
      fonte: "NT 5-05 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 5.1.4.1 e 6.2",
      url_oficial: URL.rjNt505,
      ufs: ["RJ"],
      veredito: "confirmado",
      nota_auditoria: "Texto literal: '01 dupla para cada 2.000 ou fração que exceda à 1.000 pessoas'. O Normato interpreta como 1 dupla a cada 2.000 pessoas (arredondado para cima) a partir de 1.000.",
    },
    {
      id: "lei14597-art149",
      descricao:
        "Eventos esportivos: disponibilizar 1 médico e 2 profissionais de enfermagem, registrados nos conselhos, e 1 ambulância para cada 10.000 torcedores presentes, comunicando previamente a autoridade de saúde.",
      fonte: "Lei 14.597/2023 (Lei Geral do Esporte)",
      tipo_fonte: "lei_federal",
      dispositivo: "Art. 149, IV, V e § 1º",
      url_oficial: URL.lei14597,
      veredito: "confirmado",
      nota_auditoria: "Substituiu o art. 16 do Estatuto do Torcedor (Lei 10.671/2003, revogada pelo art. 217 da Lei 14.597).",
    },
    {
      id: "cfm-2012-2013",
      descricao:
        "O organizador que ofereça assistência médica deve ter serviço médico próprio ou terceirizado inscrito no CRM, com diretor técnico. A assistência ao público inclui posto médico, macas e ambulância de suporte avançado (USA). O número de equipes é informado ao CRM com 15 dias de antecedência, com base nos ingressos colocados à disposição do público.",
      fonte: "Resolução CFM nº 2.012/2013",
      tipo_fonte: "resolucao_cfm",
      dispositivo: "Arts. 1º e 6º",
      url_oficial: URL.cfm2012,
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a resolução não fixa o limite de 1.000 pessoas. Esse limite é do RJ (NT 5-05).",
    },
  ],
};

export default equipeMedica;
