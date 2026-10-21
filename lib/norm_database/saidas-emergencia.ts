import type { Calculadora } from "./types";
import { URL } from "./fontes";

export const saidasEmergencia: Calculadora = {
  slug: "saidas-emergencia",
  titulo: "Saídas de Emergência",
  descricao: "Dimensionamento de saídas de emergência para eventos",
  regras: [
    {
      id: "sp-it11-up",
      descricao:
        "São Paulo (até 2.500 pessoas): N = P ÷ C, com unidade de passagem de 0,55 m. Para locais de reunião (grupo F) a capacidade é de 100 pessoas por unidade em acessos, descargas e portas, e 75 em escadas e rampas. População de 2 pessoas por m² em F-3, F-6, F-7 e F-9. Largura mínima de 1,20 m.",
      fonte: "IT 11/2025 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 4.4 e 4.5; Tabela 1 (Anexo A)",
      url_oficial: URL.spIt11,
      ufs: ["SP"],
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a unidade de passagem é 0,55 m (não 0,60 m) e a capacidade em portas e acessos é 100 pessoas (não 60).",
    },
    {
      id: "sp-it11-distancias",
      descricao:
        "São Paulo: distância máxima a percorrer no piso de saída para o grupo F: 40 m (saída única) ou 50 m (mais de uma saída) sem chuveiros automáticos nem detecção; com chuveiros automáticos, 55 m e 75 m. Sem leiaute em planta, reduzir 30%.",
      fonte: "IT 11/2025 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Tabela 2 (Anexo B), nota b",
      url_oficial: URL.spIt11,
      ufs: ["SP"],
      veredito: "confirmado",
    },
    {
      id: "sp-it12-ocupacoes-temporarias",
      descricao:
        "São Paulo (ocupações temporárias acima de 2.500 pessoas): densidade máxima de 4 pessoas/m² para público em pé; taxa de fluxo de 83 pessoas/min/m em saídas horizontais e 66 em escadas; tempo máximo de saída de 5 min em gramado, campo ou pista, 8 min em arquibancada externa, 6 min em local coberto e 2,5 min se as estruturas não forem retardantes ao fogo. Mínimo de 2 saídas em lados distintos por setor, setores de até 10.000 pessoas (recomendado), saídas de pelo menos 1,20 m e distância máxima de 60 m (120 m em evento descoberto).",
      fonte: "IT 12/2025 – CBPMESP",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 3.1.1.3, 3.2.1.7, 3.2.5.6, 3.3, 3.4 e 3.5",
      url_oficial: URL.spIt12,
      ufs: ["SP"],
      veredito: "confirmado",
    },
    {
      id: "rj-nt504-escape",
      descricao:
        "Rio de Janeiro: densidade de 3 pessoas/m² (público em pé com saídas distintas) ou 2,5 pessoas/m² (saída única). Taxas de fluxo: 66 pessoas/min/m em estruturas temporárias fechadas e cobertas; 79 em edificações permanentes fechadas e cobertas; 83 em estruturas permanentes descobertas; 109 em estruturas temporárias descobertas. Tempo máximo de saída de 8 min com materiais retardantes ou incombustíveis, 2,5 min sem eles, e 5 min em gramado, campo ou pista. Largura mínima de 1,20 m. Distância máxima de 35 m em local fechado e coberto e 60 m em estruturas térreas.",
      fonte: "NT 5-04 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Itens 6.3.5, 6.3.6, 6.4.6 a 6.4.9",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
      nota_auditoria: "Corrigido: a regra antiga de '1,20 m por 500 pessoas' não consta da NT. O público inclui a força de trabalho (item 6.3.9).",
    },
    {
      id: "rj-nt504-barricadas",
      descricao: "Rio de Janeiro: onde houver palco, barricadas entre o público e o palco devem ter passagens livres de no mínimo 2 m para uso em emergência.",
      fonte: "NT 5-04 – CBMERJ",
      tipo_fonte: "instrucao_tecnica",
      dispositivo: "Item 7.1.7",
      url_oficial: URL.rjNt504,
      ufs: ["RJ"],
      veredito: "confirmado",
    },
  ],
};

export default saidasEmergencia;
