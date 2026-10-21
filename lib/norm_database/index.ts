/**
 * Normato – Banco de Regras Normativas
 *
 * Cada calculadora exporta um objeto `Calculadora` com suas regras.
 * Todas as regras foram auditadas por DeepSeek em outubro/2026
 * com base em pesquisa Perplexity das fontes oficiais.
 *
 * Correções aplicadas estão documentadas em `nota_auditoria` de cada regra.
 */

export type { Calculadora, Regra, Veredito, TipoFonte } from "./types";

export { sanitarios } from "./sanitarios";
export { brigada } from "./brigada";
export { equipeMedica } from "./equipe-medica";
export { saidasEmergencia } from "./saidas-emergencia";
export { ingressos } from "./ingressos";
export { bebidas } from "./bebidas";
export { residuos } from "./residuos";
export { acessibilidade } from "./acessibilidade";
export { alimentacao } from "./alimentacao";
export { agua } from "./agua";
export { sonorizacao } from "./sonorizacao";
export { geradores } from "./geradores";
export { segurancaPatrimonial } from "./seguranca-patrimonial";
export { credenciamento } from "./credenciamento";
export { pontoEquilibrio } from "./ponto-equilibrio";
export { orcamento } from "./orcamento";

import { sanitarios } from "./sanitarios";
import { brigada } from "./brigada";
import { equipeMedica } from "./equipe-medica";
import { saidasEmergencia } from "./saidas-emergencia";
import { ingressos } from "./ingressos";
import { bebidas } from "./bebidas";
import { residuos } from "./residuos";
import { acessibilidade } from "./acessibilidade";
import { alimentacao } from "./alimentacao";
import { agua } from "./agua";
import { sonorizacao } from "./sonorizacao";
import { geradores } from "./geradores";
import { segurancaPatrimonial } from "./seguranca-patrimonial";
import { credenciamento } from "./credenciamento";
import { pontoEquilibrio } from "./ponto-equilibrio";
import { orcamento } from "./orcamento";
import type { Calculadora } from "./types";

/** Mapa slug → Calculadora para lookup em /calculadoras/[slug] */
export const normDatabase: Record<string, Calculadora> = {
  sanitarios,
  brigada,
  "equipe-medica": equipeMedica,
  "saidas-emergencia": saidasEmergencia,
  ingressos,
  bebidas,
  residuos,
  acessibilidade,
  alimentacao,
  agua,
  sonorizacao,
  geradores,
  "seguranca-patrimonial": segurancaPatrimonial,
  credenciamento,
  "ponto-equilibrio": pontoEquilibrio,
  orcamento,
};

export default normDatabase;
