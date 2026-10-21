import type { CalcContext, Field, Inputs } from './types'

export const n = (value: number, digits = 0) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits })

export const brl = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const up = Math.ceil

export const num = (inputs: Inputs, key: string) => Number(inputs[key]) || 0
export const str = (inputs: Inputs, key: string) => String(inputs[key] ?? '')

// Campos repetidos em várias calculadoras
export const publicoField: Field = { key: 'publico', label: 'Público esperado', type: 'number', default: 1000, min: 1, max: 500000, unit: 'pessoas' }
export const duracaoField: Field = { key: 'duracao', label: 'Duração do evento', type: 'number', default: 6, min: 1, max: 72, unit: 'horas' }
export const riscoField: Field = {
  key: 'risco', label: 'Perfil de risco do evento', type: 'select', default: 'medio',
  options: [
    { value: 'baixo', label: 'Baixo (corporativo, casamento, feira)' },
    { value: 'medio', label: 'Médio (show, festa, evento esportivo amador)' },
    { value: 'alto', label: 'Alto (festival, bloco, torcida, open bar)' },
  ],
  help: 'Considere consumo de álcool, aglomeração em pé e histórico de ocorrências.',
}

// Normaliza as entradas vindas do navegador: números dentro dos limites e
// selects restritos às opções declaradas. Campos desconhecidos são descartados.
export function sanitize(fields: Field[], raw: Record<string, unknown>): Inputs {
  const clean: Inputs = {}
  for (const field of fields) {
    const value = raw[field.key]
    if (field.type === 'number') {
      let v = Number(value)
      if (!Number.isFinite(v)) v = field.default
      if (field.min !== undefined) v = Math.max(field.min, v)
      if (field.max !== undefined) v = Math.min(field.max, v)
      clean[field.key] = v
    } else {
      clean[field.key] = field.options.some((o) => o.value === value) ? String(value) : field.default
    }
  }
  return clean
}

const semAcento = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

// Capital fluminense: algumas regras valem só para eventos autorizados pela Prefeitura do Rio
export function isRioCapital(ctx: CalcContext) {
  return ctx.uf === 'RJ' && ['rio de janeiro', 'rio', 'rj'].includes(semAcento(ctx.cidade))
}

export const outraUfAviso = (ctx: CalcContext) =>
  `Não há regra cadastrada para ${ctx.uf}: o cálculo usa o critério de São Paulo como referência. Confira a instrução técnica do Corpo de Bombeiros do seu estado.`
