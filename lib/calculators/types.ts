// Tipos do motor de cálculo. Cada calculadora declara seus campos e uma função
// pura `calcular`, executada no servidor (/api/calcular) e nunca no navegador.

import type { Regra } from '@/lib/norm_database'

export type FieldOption = { value: string; label: string }

export type Field =
  | { key: string; label: string; type: 'number'; default: number; min?: number; max?: number; step?: number; unit?: string; help?: string }
  | { key: string; label: string; type: 'select'; default: string; options: FieldOption[]; help?: string }

export type Inputs = Record<string, number | string>

export type Destaque = { label: string; value: string; unit?: string }

export type CalcOutput = {
  destaques: Destaque[]
  // Tabela detalhada (opcional): linhas de [rótulo, valor]
  detalhes?: [string, string][]
  memoria: string[]
  alertas: string[]
  // true quando o resultado se apoia só em referência de mercado, sem número fixado em norma
  estimativa: boolean
}

export type Categoria = 'essencial' | 'estrategica'

// Local do evento: define quais regras estaduais e municipais se aplicam
export type CalcContext = { uf: string; cidade: string }

export type Calculator = {
  slug: string
  titulo: string
  sub: string
  categoria: Categoria
  // Slug no lib/norm_database com as regras citadas no resultado
  normSlug: string
  campos: Field[]
  calcular: (inputs: Inputs, ctx: CalcContext) => CalcOutput
}

export type CalcResponse = CalcOutput & {
  slug: string
  regras: Regra[]
  creditsLeft: number | null
  resultId: string | null
}
