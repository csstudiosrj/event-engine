import type { Calculator } from './types'
import { duracaoField, n, num, publicoField, str, up } from './helpers'

const consumoAlcoolField = {
  key: 'alcool', label: 'Consumo de bebida alcoólica', type: 'select' as const, default: 'medio',
  options: [{ value: 'baixo', label: 'Baixo ou nenhum' }, { value: 'medio', label: 'Médio' }, { value: 'alto', label: 'Alto (open bar, festival)' }],
}

export const sanitarios: Calculator = {
  slug: 'sanitarios',
  titulo: 'Sanitários',
  sub: 'Cabines, mictórios e lavatórios',
  categoria: 'essencial',
  normSlug: 'sanitarios',
  campos: [
    publicoField,
    duracaoField,
    { key: 'mulheres', label: 'Mulheres no público', type: 'number', default: 50, min: 0, max: 100, unit: '%' },
    consumoAlcoolField,
    { key: 'equipe', label: 'Equipe de trabalho no evento', type: 'number', default: 50, min: 0, max: 50000, unit: 'pessoas' },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const w = num(i, 'mulheres') / 100
    const alcool = str(i, 'alcool')
    const equipe = num(i, 'equipe')

    const fDuracao = duracao <= 4 ? 1 : duracao <= 8 ? 1.25 : 1.5
    const fAlcool = alcool === 'alto' ? 1.3 : alcool === 'medio' ? 1.15 : 1
    const base = publico / 75
    const total = Math.max(2, up(base * fDuracao * fAlcool))
    // Mulheres levam mais tempo por uso: peso 1,5 na divisão das unidades
    const pesoF = w * 1.5
    const fem = w === 0 ? 0 : Math.max(1, Math.round((total * pesoF) / (pesoF + (1 - w))))
    const masc = Math.max(w === 1 ? 0 : 1, total - fem)
    const mictorios = Math.floor(masc / 2)
    const cabinesMasc = masc - mictorios
    const acessiveis = Math.max(1, up(total * 0.05))
    const lavatorios = up(total / 2)
    const equipeVasos = equipe > 0 ? up(equipe / 20) : 0
    const equipeLavatorios = equipe > 0 ? up(equipe / 10) : 0

    return {
      destaques: [
        { label: 'Unidades para o público', value: n(total) },
        { label: 'Femininas', value: n(fem) },
        { label: 'Masculinas (cabines + mictórios)', value: `${n(cabinesMasc)} + ${n(mictorios)}` },
        { label: 'Acessíveis (PcD)', value: n(acessiveis) },
        { label: 'Lavatórios', value: n(lavatorios) },
      ],
      detalhes: [
        ['Vasos exclusivos da equipe (NR-24)', n(equipeVasos)],
        ['Lavatórios exclusivos da equipe (NR-24)', n(equipeLavatorios)],
      ],
      memoria: [
        `Referência de mercado: 1 unidade a cada 50–100 pessoas por 4 horas. Adotado 1 a cada 75 → ${n(publico)} ÷ 75 = ${n(base, 1)}.`,
        `Fator de duração (${duracao} h): ×${n(fDuracao, 2)}. Fator de consumo de álcool (${alcool}): ×${n(fAlcool, 2)}.`,
        `Total: ${n(base, 1)} × ${n(fDuracao, 2)} × ${n(fAlcool, 2)} = ${total} unidades (mínimo 2).`,
        `Divisão por gênero com peso 1,5 para o público feminino (${n(w * 100)}%): ${fem} femininas e ${masc} masculinas, até metade das masculinas como mictórios.`,
        `Acessíveis: 5% do total, mínimo 1 (NBR 9050) → ${acessiveis}, contados dentro do total.`,
        `Equipe (NR-24): 1 vaso a cada 20 e 1 lavatório a cada 10 trabalhadores → ${equipeVasos} vasos e ${equipeLavatorios} lavatórios.`,
      ],
      alertas: [
        'Não existe lei federal que fixe a proporção de sanitários para o público em eventos: o número é uma estimativa. Confira se o município ou o Corpo de Bombeiros tem exigência própria.',
        'Sanitários acessíveis precisam de área de manobra e barras de apoio (Lei 10.098/2000 e NBR 9050).',
      ],
      estimativa: true,
    }
  },
}

export const agua: Calculator = {
  slug: 'agua',
  titulo: 'Água potável',
  sub: 'Volume e pontos de distribuição',
  categoria: 'essencial',
  normSlug: 'agua',
  campos: [
    publicoField,
    duracaoField,
    { key: 'clima', label: 'Clima esperado', type: 'select', default: 'ameno', options: [{ value: 'ameno', label: 'Ameno' }, { value: 'quente', label: 'Quente (acima de 30 °C)' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const quente = str(i, 'clima') === 'quente'
    const fator = quente ? 1.5 : 1
    const litros = publico * duracao * 2 * fator
    const pontos = Math.max(1, up(publico / 500))
    const reservatorio = litros / 1000
    const alertas = ['A água deve atender à Portaria GM/MS 888/2021: cloro residual livre entre 0,2 e 5 mg/L, turbidez até 5 NTU e pH entre 6,0 e 9,5.']
    if (publico > 1000) alertas.push('Mais de 1.000 pessoas por dia: a RDC 656/2022 exige pontos de água identificados e reservatórios higienizados antes e inspecionados durante o evento.')
    return {
      destaques: [
        { label: 'Volume total', value: n(litros), unit: 'litros' },
        { label: 'Reservatório equivalente', value: n(reservatorio, 1), unit: 'm³' },
        { label: 'Pontos de distribuição', value: n(pontos) },
      ],
      memoria: [
        `Referência: 2 L por pessoa por hora (consumo + higiene)${quente ? ', ×1,5 por clima quente' : ''}.`,
        `${n(publico)} pessoas × ${duracao} h × ${n(2 * fator, 1)} L = ${n(litros)} L.`,
        `1 ponto de distribuição a cada 500 pessoas → ${pontos}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

const GERADORES_KVA = [20, 40, 55, 81, 115, 150, 180, 260, 360, 450, 500, 750, 1000]

export const geradores: Calculator = {
  slug: 'geradores',
  titulo: 'Geradores e energia',
  sub: 'Potência e combustível pelo levantamento de cargas',
  categoria: 'estrategica',
  normSlug: 'geradores',
  campos: [
    { key: 'som', label: 'Som (PA, monitores)', type: 'number', default: 20, min: 0, max: 5000, unit: 'kW' },
    { key: 'luz', label: 'Iluminação cênica e geral', type: 'number', default: 30, min: 0, max: 5000, unit: 'kW' },
    { key: 'video', label: 'Vídeo e painéis de LED', type: 'number', default: 10, min: 0, max: 5000, unit: 'kW' },
    { key: 'cozinha', label: 'Cozinha, bares e refrigeração', type: 'number', default: 15, min: 0, max: 5000, unit: 'kW' },
    { key: 'clima', label: 'Climatização', type: 'number', default: 0, min: 0, max: 5000, unit: 'kW' },
    { key: 'outros', label: 'Outros (camarins, escritório, tomadas)', type: 'number', default: 5, min: 0, max: 5000, unit: 'kW' },
    duracaoField,
    { key: 'redundancia', label: 'Gerador reserva (N+1)?', type: 'select', default: 'sim', options: [{ value: 'sim', label: 'Sim, recomendado' }, { value: 'nao', label: 'Não' }] },
  ],
  calcular(i) {
    const cargas = ['som', 'luz', 'video', 'cozinha', 'clima', 'outros'].map((k) => num(i, k))
    const kw = cargas.reduce((a, b) => a + b, 0)
    const duracao = num(i, 'duracao')
    const simultaneidade = 0.8
    const fp = 0.8
    const reserva = 1.25
    const kva = (kw * simultaneidade / fp) * reserva
    const maior = GERADORES_KVA[GERADORES_KVA.length - 1]
    let unidades = 1
    let tamanho = GERADORES_KVA.find((g) => g >= kva) ?? maior
    if (kva > maior) { unidades = up(kva / maior); tamanho = maior }
    const reservaN1 = str(i, 'redundancia') === 'sim'
    const total = unidades + (reservaN1 ? 1 : 0)
    const litrosHora = kw * simultaneidade * 0.27
    const litros = litrosHora * duracao * 1.1
    return {
      destaques: [
        { label: 'Potência necessária', value: n(kva), unit: 'kVA' },
        { label: 'Gerador(es) sugerido(s)', value: `${total} × ${tamanho}`, unit: 'kVA' },
        { label: 'Diesel estimado', value: n(litros), unit: 'litros' },
      ],
      memoria: [
        `Carga instalada: ${cargas.map((c) => n(c)).join(' + ')} = ${n(kw)} kW.`,
        `Demanda: ${n(kw)} kW × ${simultaneidade} (simultaneidade) ÷ ${fp} (fator de potência) = ${n(kw * simultaneidade / fp, 1)} kVA.`,
        `Margem de 25% para partidas e picos → ${n(kva, 1)} kVA → ${unidades} × ${tamanho} kVA${reservaN1 ? ' + 1 reserva (N+1)' : ''}.`,
        `Diesel: ~0,27 L por kWh entregue × ${n(kw * simultaneidade, 1)} kW × ${duracao} h + 10% de margem = ${n(litros)} L.`,
      ],
      alertas: [
        'Não há parâmetro federal de kVA por pessoa: o dimensionamento depende do levantamento real das cargas com os fornecedores de som, luz e vídeo.',
        'Instalações temporárias devem atender à NR-10 e à NBR 5410, com aterramento e projeto/ART de profissional habilitado.',
      ],
      estimativa: true,
    }
  },
}

export const residuos: Calculator = {
  slug: 'residuos',
  titulo: 'Resíduos sólidos',
  sub: 'Volume, lixeiras e coleta seletiva',
  categoria: 'estrategica',
  normSlug: 'residuos',
  campos: [
    publicoField,
    duracaoField,
    { key: 'alimentacao', label: 'Oferta de alimentação', type: 'select', default: 'lanches', options: [{ value: 'nenhuma', label: 'Sem alimentação' }, { value: 'lanches', label: 'Lanches e bebidas' }, { value: 'refeicoes', label: 'Refeições completas' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const alim = str(i, 'alimentacao')
    const kgPessoa = alim === 'refeicoes' ? 0.6 : alim === 'lanches' ? 0.3 : 0.1
    const fDuracao = Math.max(0.5, Math.min(2, duracao / 6))
    const kg = publico * kgPessoa * fDuracao
    const litros = kg * 6.5
    const esvaziamentos = Math.max(1, Math.floor(duracao / 2))
    const lixeiras = Math.max(up(litros / (100 * esvaziamentos)), up(publico / 100))
    const alertas = [
      'Use o código de cores da CONAMA 275/2001 na coleta seletiva (azul papel, vermelho plástico, verde vidro, amarelo metal, marrom orgânico, cinza rejeito).',
      'O organizador responde pelo gerenciamento dos resíduos (Lei 12.305/2010). Contrate empresa licenciada para coleta e destinação.',
    ]
    if (litros > 120) alertas.push(`Volume acima de 120 L por dia: em muitos municípios o evento é enquadrado como grande gerador e precisa de plano de gerenciamento (PGRS). Confira a lei municipal.`)
    return {
      destaques: [
        { label: 'Resíduos estimados', value: n(kg), unit: 'kg' },
        { label: 'Volume', value: n(litros), unit: 'litros' },
        { label: 'Lixeiras de 100 L', value: n(lixeiras) },
      ],
      detalhes: [
        ['Orgânicos (~50%)', `${n(kg * 0.5)} kg`],
        ['Recicláveis (~35%)', `${n(kg * 0.35)} kg`],
        ['Rejeitos (~15%)', `${n(kg * 0.15)} kg`],
      ],
      memoria: [
        `Geração estimada: ${kgPessoa} kg por pessoa (${alim}), ajustada pela duração (×${n(fDuracao, 2)}) → ${n(kg)} kg.`,
        `Densidade média de resíduo de evento ~150 kg/m³ → ${n(litros)} L.`,
        `Lixeiras: volume ÷ (100 L × ${esvaziamentos} esvaziamento(s)), com mínimo de 1 a cada 100 pessoas → ${lixeiras}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

const LIMITES_RUIDO: Record<string, { diurno: number; noturno: number; label: string }> = {
  residencial: { diurno: 55, noturno: 50, label: 'Área estritamente residencial' },
  mista: { diurno: 65, noturno: 55, label: 'Área mista com comércio' },
}

export const sonorizacao: Calculator = {
  slug: 'sonorizacao',
  titulo: 'Ruído e sonorização',
  sub: 'Nível sonoro na vizinhança e limites',
  categoria: 'essencial',
  normSlug: 'sonorizacao',
  campos: [
    { key: 'nivel', label: 'Nível sonoro medido a 10 m do PA', type: 'number', default: 100, min: 40, max: 140, unit: 'dB(A)' },
    { key: 'distancia', label: 'Distância até a residência mais próxima', type: 'number', default: 200, min: 10, max: 10000, unit: 'm' },
    { key: 'zona', label: 'Tipo de área no entorno', type: 'select', default: 'mista', options: [{ value: 'residencial', label: 'Estritamente residencial' }, { value: 'mista', label: 'Mista, com comércio' }] },
    { key: 'periodo', label: 'Horário do evento', type: 'select', default: 'noturno', options: [{ value: 'diurno', label: 'Diurno' }, { value: 'noturno', label: 'Noturno (entra após 22 h na maioria das cidades)' }] },
  ],
  calcular(i) {
    const nivel = num(i, 'nivel')
    const distancia = num(i, 'distancia')
    const zona = LIMITES_RUIDO[str(i, 'zona')] ?? LIMITES_RUIDO.mista
    const periodo = str(i, 'periodo') === 'diurno' ? 'diurno' : 'noturno'
    const limite = zona[periodo]
    const noReceptor = nivel - 20 * Math.log10(distancia / 10)
    const conforme = noReceptor <= limite
    const distMin = 10 * Math.pow(10, (nivel - limite) / 20)
    const nivelMax = limite + 20 * Math.log10(distancia / 10)
    return {
      destaques: [
        { label: 'Nível estimado na vizinhança', value: n(noReceptor), unit: 'dB(A)' },
        { label: `Limite (${periodo})`, value: n(limite), unit: 'dB(A)' },
        { label: 'Situação', value: conforme ? 'Dentro do limite' : 'Acima do limite' },
        { label: 'Nível máximo a 10 m do PA', value: n(nivelMax), unit: 'dB(A)' },
      ],
      memoria: [
        `Atenuação pela distância (−6 dB a cada vez que a distância dobra): ${nivel} − 20 × log10(${n(distancia)} ÷ 10) = ${n(noReceptor, 1)} dB(A).`,
        `Limite NBR 10151 para ${zona.label.toLowerCase()}, período ${periodo}: ${limite} dB(A).`,
        `Para respeitar o limite, o PA precisaria estar a ${n(distMin)} m da residência ou operar a no máximo ${n(nivelMax, 1)} dB(A) medidos a 10 m.`,
      ],
      alertas: [
        'O cálculo considera campo livre: barreiras, vento e reflexões mudam o resultado. A medição oficial é feita no limite do imóvel vizinho, conforme a NBR 10151.',
        'Municípios podem ter limites mais restritivos e exigir alvará específico para som amplificado.',
      ],
      estimativa: true,
    }
  },
}
