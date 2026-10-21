// Registro das 16 calculadoras do Normato.

import normDatabase, { type Regra } from '@/lib/norm_database'
import type { Calculator } from './types'
import { brigada, equipeMedica, saidasEmergencia, segurancaPatrimonial } from './seguranca'
import { agua, geradores, residuos, sanitarios, sonorizacao } from './infraestrutura'
import { acessibilidade, alimentacao, bebidas, credenciamento, ingressos } from './publico'
import { orcamento, pontoEquilibrio } from './financeiro'

export const CALCULATORS: Calculator[] = [
  sanitarios,
  brigada,
  saidasEmergencia,
  acessibilidade,
  agua,
  alimentacao,
  bebidas,
  ingressos,
  credenciamento,
  sonorizacao,
  equipeMedica,
  segurancaPatrimonial,
  geradores,
  residuos,
  pontoEquilibrio,
  orcamento,
]

const bySlug = new Map(CALCULATORS.map((c) => [c.slug, c]))

export function getCalculator(slug: string) {
  return bySlug.get(slug)
}

// Regras normativas aplicáveis: federais + as da UF do evento
export function regrasAplicaveis(calc: Calculator, uf: string): Regra[] {
  const regras = normDatabase[calc.normSlug]?.regras ?? []
  return regras.filter((r) => !r.ufs || r.ufs.includes(uf))
}

export { UFS } from './ufs'

export type { Calculator } from './types'
