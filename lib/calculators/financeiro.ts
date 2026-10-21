import type { Calculator } from './types'
import { brl, n, num, up } from './helpers'

const reais = (key: string, label: string, def: number, help?: string) =>
  ({ key, label, type: 'number' as const, default: def, min: 0, max: 100000000, step: 0.01, unit: 'R$', help })

export const pontoEquilibrio: Calculator = {
  slug: 'ponto-equilibrio',
  titulo: 'Ponto de equilíbrio',
  sub: 'Quantos ingressos vender para pagar o evento',
  categoria: 'estrategica',
  normSlug: 'ponto-equilibrio',
  campos: [
    reais('fixos', 'Custos fixos totais', 50000, 'Espaço, palco, som e luz, cachês, produção.'),
    reais('depreciacao', 'Depreciação incluída nos custos fixos', 0, 'Parte dos custos fixos que não sai do caixa (equipamento próprio).'),
    reais('preco', 'Preço médio do ingresso', 80),
    reais('variavel', 'Custo variável por participante', 15, 'Alimentação, pulseira, segurança por pessoa etc.'),
    { key: 'taxas', label: 'Taxas e impostos sobre a venda', type: 'number', default: 15, min: 0, max: 90, unit: '%', help: 'Plataforma de venda, ISS, ECAD etc.' },
    { key: 'capacidade', label: 'Capacidade do evento', type: 'number', default: 1500, min: 1, max: 500000, unit: 'pessoas' },
  ],
  calcular(i) {
    const fixos = num(i, 'fixos')
    const dep = Math.min(num(i, 'depreciacao'), fixos)
    const preco = num(i, 'preco')
    const variavel = num(i, 'variavel')
    const taxas = num(i, 'taxas') / 100
    const capacidade = num(i, 'capacidade')
    const mcu = preco * (1 - taxas) - variavel
    if (mcu <= 0) {
      return {
        destaques: [{ label: 'Margem por ingresso', value: brl(mcu * 100) }, { label: 'Situação', value: 'Prejuízo a cada ingresso' }],
        memoria: [`Margem de contribuição: ${brl(preco * 100)} × (1 − ${n(taxas * 100)}%) − ${brl(variavel * 100)} = ${brl(mcu * 100)}.`],
        alertas: ['Cada ingresso vendido gera prejuízo: o preço líquido não cobre o custo variável. Aumente o preço ou reduza custos por participante.'],
        estimativa: true,
      }
    }
    const peContabil = up(fixos / mcu)
    const peFinanceiro = up((fixos - dep) / mcu)
    const ocupacao = (peContabil / capacidade) * 100
    const lucroMax = mcu * capacidade - fixos
    const alertas: string[] = []
    if (ocupacao > 100) alertas.push('O ponto de equilíbrio passa da capacidade: mesmo lotado, o evento dá prejuízo. Reveja preço, custos ou patrocínio.')
    else if (ocupacao > 70) alertas.push('É preciso vender mais de 70% da capacidade para não ter prejuízo: risco alto. Considere patrocínio ou pré-venda.')
    alertas.push('Cada tributo é de um ente diferente: ISS (municipal), ICMS (estadual), PIS/COFINS (federal). Confirme as alíquotas com seu contador.')
    return {
      destaques: [
        { label: 'Ponto de equilíbrio contábil', value: n(peContabil), unit: 'ingressos' },
        { label: 'Ponto de equilíbrio financeiro', value: n(peFinanceiro), unit: 'ingressos' },
        { label: 'Ocupação necessária', value: n(ocupacao, 1), unit: '%' },
        { label: 'Resultado com lotação máxima', value: brl(lucroMax * 100) },
      ],
      memoria: [
        `Margem de contribuição unitária: ${brl(preco * 100)} × (1 − ${n(taxas * 100)}%) − ${brl(variavel * 100)} = ${brl(mcu * 100)}.`,
        `PE contábil = custos fixos ÷ margem = ${brl(fixos * 100)} ÷ ${brl(mcu * 100)} = ${n(peContabil)} ingressos.`,
        `PE financeiro = (custos fixos − depreciação) ÷ margem = ${brl((fixos - dep) * 100)} ÷ ${brl(mcu * 100)} = ${n(peFinanceiro)} ingressos.`,
        `Ocupação: ${n(peContabil)} ÷ ${n(capacidade)} = ${n(ocupacao, 1)}%.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

export const orcamento: Calculator = {
  slug: 'orcamento',
  titulo: 'Orçamento consolidado',
  sub: 'Custo total e preço mínimo do ingresso',
  categoria: 'estrategica',
  normSlug: 'orcamento',
  campos: [
    { key: 'publico', label: 'Público pagante esperado', type: 'number', default: 1000, min: 1, max: 500000, unit: 'pessoas' },
    reais('espaco', 'Espaço / locação', 15000),
    reais('estrutura', 'Palco e estrutura', 12000),
    reais('somluz', 'Som, luz e vídeo', 10000),
    reais('artistas', 'Cachês artísticos', 20000),
    reais('producao', 'Produção, equipe e licenças', 8000),
    reais('outrosFixos', 'Outros custos fixos', 0),
    reais('alimPessoa', 'Alimentação por pessoa', 0),
    reais('segPessoa', 'Segurança e limpeza por pessoa', 5),
    reais('matPessoa', 'Material e brindes por pessoa', 2),
    { key: 'impostos', label: 'Impostos sobre a receita', type: 'number', default: 10, min: 0, max: 50, unit: '%', help: 'ISS, PIS/COFINS etc. Confirme com seu contador.' },
    { key: 'contingencia', label: 'Reserva de contingência', type: 'number', default: 15, min: 10, max: 30, unit: '%', help: 'Recomendado entre 10% e 20%.' },
    { key: 'margem', label: 'Margem de lucro desejada', type: 'number', default: 20, min: 0, max: 200, unit: '%' },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const fixosKeys = ['espaco', 'estrutura', 'somluz', 'artistas', 'producao', 'outrosFixos']
    const fixos = fixosKeys.reduce((s, k) => s + num(i, k), 0)
    const varPessoa = num(i, 'alimPessoa') + num(i, 'segPessoa') + num(i, 'matPessoa')
    const variaveis = varPessoa * publico
    const base = fixos + variaveis
    const contingencia = base * num(i, 'contingencia') / 100
    const custoTotal = base + contingencia
    const comMargem = custoTotal * (1 + num(i, 'margem') / 100)
    const impostos = num(i, 'impostos') / 100
    const receitaNecessaria = comMargem / (1 - impostos)
    const precoMinimo = receitaNecessaria / publico
    return {
      destaques: [
        { label: 'Custo total (com contingência)', value: brl(custoTotal * 100) },
        { label: 'Receita necessária', value: brl(receitaNecessaria * 100) },
        { label: 'Preço médio mínimo do ingresso', value: brl(precoMinimo * 100) },
      ],
      detalhes: [
        ['Custos fixos', brl(fixos * 100)],
        ['Custos variáveis', brl(variaveis * 100)],
        ['Contingência', brl(contingencia * 100)],
        ['Margem de lucro', brl((comMargem - custoTotal) * 100)],
        ['Impostos', brl((receitaNecessaria - comMargem) * 100)],
      ],
      memoria: [
        `Custos fixos: ${brl(fixos * 100)}. Variáveis: ${brl(varPessoa * 100)} × ${n(publico)} pessoas = ${brl(variaveis * 100)}.`,
        `Contingência de ${num(i, 'contingencia')}% sobre ${brl(base * 100)} = ${brl(contingencia * 100)} → custo total ${brl(custoTotal * 100)}.`,
        `Com margem de ${num(i, 'margem')}%: ${brl(comMargem * 100)}. Receita bruta para cobrir ${n(impostos * 100)}% de impostos: ${brl(comMargem * 100)} ÷ (1 − ${n(impostos, 2)}) = ${brl(receitaNecessaria * 100)}.`,
        `Preço médio mínimo: ${brl(receitaNecessaria * 100)} ÷ ${n(publico)} = ${brl(precoMinimo * 100)}.`,
      ],
      alertas: [
        'O preço é médio: com meia-entrada (mínimo 40% dos ingressos), a inteira precisa ser mais alta. Use a calculadora de Ingressos para ajustar.',
        'Alíquotas variam por município e regime tributário (Simples, Lucro Presumido, Lucro Real). Confirme com seu contador.',
      ],
      estimativa: true,
    }
  },
}
