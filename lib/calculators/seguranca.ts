import type { Calculator, CalcContext } from './types'
import { n, num, outraUfAviso, publicoField, riscoField, str, up } from './helpers'

// ─── Brigada de incêndio ────────────────────────────────────────────────────

// IT 17/2025 – CBPMESP, item 4.11.2
function brigadaSP(publico: number) {
  if (publico <= 1000) return { qtd: 5, faixa: 'até 1.000 pessoas: mínimo 5' }
  if (publico <= 2500) return { qtd: 10, faixa: 'de 1.000 a 2.500 pessoas: mínimo 10' }
  if (publico <= 5000) return { qtd: 15, faixa: 'de 2.500 a 5.000 pessoas: mínimo 15' }
  if (publico <= 10000) return { qtd: 20, faixa: 'de 5.000 a 10.000 pessoas: mínimo 20' }
  const extra = up((publico - 10000) / 500)
  return { qtd: 20 + extra, faixa: `acima de 10.000 pessoas: 20 + 1 a cada 500 excedentes (${extra})` }
}

// NT 5-04 – CBMERJ, Tabela 1 (por área total construída)
function brigadaRJ(area: number, temporaria: boolean) {
  const base = temporaria
    ? area <= 200 ? 0 : area <= 500 ? 2 : 4
    : area <= 500 ? 0 : 2
  const extra = area > 2500 ? up((area - 2500) / 2500) : 0
  return base + extra
}

export const brigada: Calculator = {
  slug: 'brigada',
  titulo: 'Brigada de incêndio',
  sub: 'Brigadistas ou bombeiros civis exigidos',
  categoria: 'essencial',
  normSlug: 'brigada',
  campos: [
    publicoField,
    { key: 'area', label: 'Área total construída das estruturas (palcos, tendas, camarotes)', type: 'number', default: 500, min: 0, max: 1000000, unit: 'm²', help: 'No RJ a brigada é calculada pela área. Em SP, pela lotação.' },
    { key: 'estrutura', label: 'Tipo de local', type: 'select', default: 'temporaria', options: [{ value: 'temporaria', label: 'Estruturas temporárias (montadas para o evento)' }, { value: 'permanente', label: 'Edificação permanente (casa de show, salão, ginásio)' }] },
    { key: 'estruturas', label: 'Quantidade de estruturas temporárias montadas', type: 'number', default: 1, min: 0, max: 500 },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const area = num(i, 'area')
    const temporaria = str(i, 'estrutura') === 'temporaria'
    const estruturas = num(i, 'estruturas')

    if (ctx.uf === 'RJ') {
      const tabela = brigadaRJ(area, temporaria)
      // O mínimo de 1 BC por estrutura (item 6.1.6, d) só se aplica quando a Tabela 1 exige brigada
      const porEstrutura = temporaria && tabela > 0 ? estruturas : 0
      const bc = Math.max(tabela, porEstrutura)
      const extintores = up(area / 100)
      return {
        destaques: [
          { label: 'Bombeiros civis', value: n(bc) },
          { label: 'Extintores (pó ABC)', value: n(extintores) },
          { label: 'Distância máxima entre extintores', value: '10', unit: 'm' },
        ],
        memoria: [
          `NT 5-04 (CBMERJ), Tabela 1: ${temporaria ? 'estrutura temporária' : 'edificação permanente'} com ${n(area)} m² de área construída → ${tabela} bombeiro(s) civil(is)${area > 2500 ? ', incluindo 1 a cada 2.500 m² acima de 2.500 m²' : ''}.`,
          tabela === 0 ? 'Área dentro da faixa isenta da Tabela 1.' : temporaria ? `Mínimo de 1 bombeiro civil por estrutura temporária (${estruturas}). Um mesmo profissional pode cobrir 2 estruturas a até 60 m uma da outra, o que pode reduzir esse número.` : 'Edificação permanente: sem mínimo por estrutura.',
          `Adotado o maior valor: ${bc}.`,
          `Extintores: 1 a cada 100 m² de área construída (item 6.1.1) → ${extintores}, a no máximo 10 m entre si.`,
        ],
        alertas: [
          'No RJ a brigada é formada por bombeiros civis de empresa credenciada no CBMERJ. O contrato acompanha o pedido de autorização do evento.',
          'Os valores da Tabela 1 valem para estruturas térreas. Com mais de um pavimento, o bombeiro civil não pode percorrer mais de 30 m.',
          'Food trucks e trailers: 1 extintor por veículo, além do cálculo acima (item 6.1.3).',
        ],
        estimativa: false,
      }
    }

    const sp = brigadaSP(publico)
    const alertas = [
      'A brigada pode ser substituída por bombeiros civis contratados (IT 17, item 4.11.1). A relação nominal com certificados é apresentada na vistoria.',
      'O número pode ser calculado pela quantidade de ingressos efetivamente à venda (item 4.11.3), informada ao Corpo de Bombeiros e afixada na entrada.',
    ]
    if (ctx.uf !== 'SP') alertas.unshift(outraUfAviso(ctx))
    return {
      destaques: [
        { label: 'Brigadistas', value: n(sp.qtd) },
        { label: 'Público considerado', value: n(publico), unit: 'pessoas' },
      ],
      memoria: [
        `IT 17/2025 (CBPMESP), item 4.11.2: para ocupações temporárias e locais de reunião de público, o cálculo usa a lotação máxima.`,
        `Faixa aplicada: ${sp.faixa} → ${sp.qtd} brigadistas.`,
      ],
      alertas,
      estimativa: ctx.uf !== 'SP',
    }
  },
}

// ─── Saídas de emergência ───────────────────────────────────────────────────

const ambienteField = {
  key: 'ambiente', label: 'Onde fica o público', type: 'select' as const, default: 'aberto',
  options: [
    { value: 'aberto', label: 'Área aberta cercada (gramado, campo, praça, pista)' },
    { value: 'tenda', label: 'Estrutura temporária fechada e coberta (tenda, galpão montado)' },
    { value: 'edificacao', label: 'Edificação permanente fechada (casa de show, salão, ginásio)' },
    { value: 'arquibancada', label: 'Arquibancada externa' },
  ],
}

function saidasRJ(publico: number, ambiente: string, retardante: boolean) {
  const fluxo = ambiente === 'tenda' ? 66 : ambiente === 'edificacao' ? 79 : ambiente === 'arquibancada' ? 66 : 109
  const fluxoLabel = { tenda: 'estrutura temporária fechada e coberta', edificacao: 'edificação permanente fechada e coberta', arquibancada: 'arquibancada (fluxo de escadas)', aberto: 'estrutura temporária descoberta' }[ambiente] ?? ''
  const tempo = !retardante ? 2.5 : ambiente === 'aberto' ? 5 : 8
  return { fluxo, fluxoLabel, tempo }
}

function saidasSPGrande(ambiente: string, retardante: boolean) {
  const fluxo = ambiente === 'arquibancada' ? 66 : 83
  const tempo = !retardante ? 2.5 : ambiente === 'aberto' ? 5 : ambiente === 'arquibancada' ? 8 : 6
  return { fluxo, tempo }
}

export const saidasEmergencia: Calculator = {
  slug: 'saidas-emergencia',
  titulo: 'Saídas de emergência',
  sub: 'Largura total, número de saídas e lotação',
  categoria: 'essencial',
  normSlug: 'saidas-emergencia',
  campos: [
    publicoField,
    ambienteField,
    { key: 'area', label: 'Área útil para o público (0 se não souber)', type: 'number', default: 0, min: 0, max: 10000000, unit: 'm²', help: 'Usada para conferir a lotação máxima permitida.' },
    { key: 'retardante', label: 'Estruturas de material incombustível ou com tratamento retardante?', type: 'select', default: 'sim', options: [{ value: 'sim', label: 'Sim, com laudo' }, { value: 'nao', label: 'Não ou não sei' }] },
    { key: 'chuveiros', label: 'Há chuveiros automáticos (sprinklers)?', type: 'select', default: 'nao', options: [{ value: 'nao', label: 'Não' }, { value: 'sim', label: 'Sim' }] },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const ambiente = str(i, 'ambiente')
    const area = num(i, 'area')
    const retardante = str(i, 'retardante') === 'sim'
    const chuveiros = str(i, 'chuveiros') === 'sim'
    const memoria: string[] = []
    const alertas: string[] = []
    let largura: number
    let saidas: number
    let distancia: string
    let densidade: number

    if (ctx.uf === 'RJ') {
      const { fluxo, fluxoLabel, tempo } = saidasRJ(publico, ambiente, retardante)
      const capacidade = fluxo * tempo
      largura = Math.max(1.2, publico / capacidade)
      saidas = 2
      densidade = 3
      distancia = ambiente === 'tenda' || ambiente === 'edificacao' ? '35' : '60'
      memoria.push(
        `NT 5-04 (CBMERJ): taxa de fluxo para ${fluxoLabel} = ${fluxo} pessoas/min/m (item 6.4.9.1).`,
        `Tempo máximo de saída: ${tempo} min (${!retardante ? 'materiais não retardantes' : ambiente === 'aberto' ? 'gramado, campo ou pista' : 'materiais retardantes ou incombustíveis'}).`,
        `Capacidade por metro = ${fluxo} × ${n(tempo, 1)} = ${n(capacidade)} pessoas. Largura = ${n(publico)} ÷ ${n(capacidade)} = ${n(publico / capacidade, 2)} m (mínimo 1,20 m) → ${n(largura, 2)} m.`,
        `Distância máxima até uma saída: ${distancia} m (${distancia === '35' ? 'local fechado e coberto' : 'estrutura térrea'}).`,
      )
      if (ambiente === 'arquibancada') alertas.push('Arquibancadas no RJ seguem também a NT 5-01 (centros esportivos e de exibição).')
      alertas.push('No RJ o público inclui a força de trabalho do evento (item 6.3.9).', 'Onde houver palco, as barricadas precisam de passagens livres de no mínimo 2 m (item 7.1.7).')
    } else if (publico <= 2500) {
      const ups = up(publico / 100)
      largura = Math.max(1.2, ups * 0.55)
      saidas = 2
      densidade = 2
      const d = chuveiros ? 75 : 50
      distancia = `${d}`
      memoria.push(
        `IT 11/2025 (CBPMESP): N = P ÷ C, com capacidade de 100 pessoas por unidade de passagem em portas, acessos e descargas (grupo F).`,
        `N = ${n(publico)} ÷ 100 = ${ups} unidades × 0,55 m = ${n(ups * 0.55, 2)} m (mínimo 1,20 m) → ${n(largura, 2)} m.`,
        `Distância máxima no piso de saída, com mais de uma saída: ${d} m (${chuveiros ? 'com' : 'sem'} chuveiros automáticos, Tabela 2). Sem leiaute em planta, reduzir 30% (${n(d * 0.7)} m).`,
      )
      alertas.push('Com uma única saída a distância máxima cai para 40 m (55 m com chuveiros). Para usar os valores de mais de uma saída, elas precisam estar a pelo menos 10 m uma da outra.')
    } else {
      const { fluxo, tempo } = saidasSPGrande(ambiente, retardante)
      const capacidade = fluxo * tempo
      const setores = up(publico / 10000)
      largura = Math.max(1.2, publico / capacidade)
      saidas = 2 * setores
      densidade = 4
      distancia = ambiente === 'aberto' ? '120' : '60'
      memoria.push(
        `Acima de 2.500 pessoas vale a IT 12/2025 (CBPMESP): taxa de fluxo de ${fluxo} pessoas/min/m (${fluxo === 83 ? 'saídas horizontais' : 'escadas e degraus'}).`,
        `Tempo máximo de saída: ${tempo} min (${!retardante ? 'estruturas não retardantes' : ambiente === 'aberto' ? 'gramado, campo ou pista' : ambiente === 'arquibancada' ? 'arquibancada externa' : 'local coberto'}).`,
        `Capacidade por metro = ${fluxo} × ${n(tempo, 1)} = ${n(capacidade)} pessoas. Largura = ${n(publico)} ÷ ${n(capacidade)} = ${n(largura, 2)} m.`,
        `Setores recomendados de até 10.000 pessoas → ${setores} setor(es), cada um com no mínimo 2 saídas em lados distintos.`,
        `Distância máxima até local de segurança: ${distancia} m.`,
      )
      alertas.push('Público de 2.500 pessoas ou mais exige plano de emergência com o plano de abandono de cada setor (IT 12, item 3.2.1.10).')
      if (publico > 10000 && ambiente === 'aberto') alertas.push('Mais de 10.000 pessoas em pé: prever corredores de acesso para brigada e segurança com 2,50 m livres, perpendiculares ao palco (IT 12, item 3.1.3.3).')
    }

    if (ctx.uf !== 'SP' && ctx.uf !== 'RJ') alertas.unshift(outraUfAviso(ctx))
    const porSaida = Math.max(1.2, Math.ceil((largura / saidas) * 100) / 100)
    const destaques = [
      { label: 'Largura total mínima', value: n(largura, 2), unit: 'm' },
      { label: 'Saídas (mínimo)', value: n(saidas) },
      { label: 'Largura média por saída', value: n(porSaida, 2), unit: 'm' },
      { label: 'Distância máxima até a saída', value: distancia, unit: 'm' },
    ]
    if (area > 0) {
      const lotacao = Math.floor(area * densidade)
      destaques.push({ label: 'Lotação máxima pela área', value: n(lotacao), unit: 'pessoas' })
      memoria.push(`Lotação máxima: ${n(area)} m² × ${densidade} pessoas/m² = ${n(lotacao)} pessoas.`)
      if (publico > lotacao) alertas.unshift(`O público informado (${n(publico)}) passa da lotação máxima da área (${n(lotacao)}). Reduza o público ou amplie a área.`)
    }
    memoria.push(`A largura total pode ser dividida em mais saídas do que o mínimo, desde que cada uma tenha pelo menos 1,20 m e fiquem em lados distintos.`)
    alertas.push('As saídas devem abrir no sentido da fuga, sem travamento, com sinalização e iluminação de emergência. Catracas não contam como saída.')
    return { destaques, memoria, alertas, estimativa: ctx.uf !== 'SP' && ctx.uf !== 'RJ' }
  },
}

// ─── Equipe médica ──────────────────────────────────────────────────────────

// NT 5-05 – CBMERJ, Anexo C
const TABELA_RJ = [
  { ate: 4999, postos: 1, macas: 2, medicos: 1, enfermeiros: 1, tecnicos: 1, ambD: 1, ambB: 0 },
  { ate: 9999, postos: 2, macas: 4, medicos: 2, enfermeiros: 2, tecnicos: 2, ambD: 1, ambB: 1 },
  { ate: 14999, postos: 3, macas: 6, medicos: 3, enfermeiros: 3, tecnicos: 3, ambD: 1, ambB: 2 },
  { ate: 19999, postos: 4, macas: 8, medicos: 4, enfermeiros: 4, tecnicos: 4, ambD: 2, ambB: 2 },
  { ate: 29999, postos: 4, macas: 12, medicos: 6, enfermeiros: 4, tecnicos: 4, ambD: 2, ambB: 2 },
  { ate: Infinity, postos: 4, macas: 16, medicos: 8, enfermeiros: 4, tecnicos: 4, ambD: 2, ambB: 2 },
]

export const equipeMedica: Calculator = {
  slug: 'equipe-medica',
  titulo: 'Equipe médica',
  sub: 'Postos, médicos, enfermagem e ambulâncias',
  categoria: 'estrategica',
  normSlug: 'equipe-medica',
  campos: [
    publicoField,
    { key: 'esportivo', label: 'É evento esportivo com torcida?', type: 'select', default: 'nao', options: [{ value: 'nao', label: 'Não' }, { value: 'sim', label: 'Sim' }] },
  ],
  calcular(i, ctx: CalcContext) {
    const publico = num(i, 'publico')
    const esportivo = str(i, 'esportivo') === 'sim'
    const memoria: string[] = []
    const alertas: string[] = []

    if (publico < 1000 && !esportivo) {
      return {
        destaques: [{ label: 'Projeto médico obrigatório', value: 'Não' }, { label: 'Recomendação', value: 'Socorrista + plano de remoção' }],
        memoria: ['Abaixo de 1.000 pessoas a NT 5-05 (RJ) não exige projeto de atendimento médico, e a tabela de recursos começa em 1.000 pessoas.'],
        alertas: ['Mesmo sem exigência, mantenha kit de primeiros socorros, pessoa treinada e o contato do hospital mais próximo. Se houver serviço médico, ele deve estar inscrito no CRM (Resolução CFM 2.012/2013).'],
        estimativa: ctx.uf !== 'RJ',
      }
    }

    const linha = TABELA_RJ.find((l) => publico <= l.ate)!
    let { medicos, enfermeiros, ambD, ambB } = linha
    const enfermagem = enfermeiros + linha.tecnicos
    memoria.push(`NT 5-05 (CBMERJ), Anexo C, faixa até ${linha.ate === Infinity ? '40.000+' : n(linha.ate)} pessoas: ${linha.postos} posto(s), ${linha.macas} macas, ${linha.medicos} médico(s), ${linha.enfermeiros} enfermeiro(s), ${linha.tecnicos} técnico(s), ${linha.ambD} ambulância(s) tipo D e ${linha.ambB} tipo B.`)
    if (publico > 40000) alertas.push('Acima de 40.000 pessoas o CBMERJ define o dimensionamento em reunião prévia com a DSE. A tabela mostra o mínimo da última faixa.')

    if (esportivo) {
      const blocos = up(publico / 10000)
      const medLei = blocos
      const enfLei = 2 * blocos
      const ambLei = blocos
      memoria.push(`Lei 14.597/2023, art. 149: 1 médico, 2 profissionais de enfermagem e 1 ambulância a cada 10.000 torcedores → ${medLei} médico(s), ${enfLei} de enfermagem, ${ambLei} ambulância(s).`)
      if (medLei > medicos) medicos = medLei
      if (ambLei > ambD + ambB) ambB = ambLei - ambD
      if (enfLei > enfermagem) memoria.push(`Equipe de enfermagem ajustada para ${enfLei} profissionais.`)
    }
    const enfTotal = esportivo ? Math.max(enfermagem, 2 * up(publico / 10000)) : enfermagem
    const maqueiros = publico >= 1000 ? up(publico / 2000) : 0
    memoria.push(`Maqueiros: 1 dupla a cada 2.000 pessoas a partir de 1.000 (NT 5-05, item 5.1.4.1) → ${maqueiros} dupla(s).`)

    if (ctx.uf !== 'RJ') alertas.unshift(`${ctx.uf} não tem tabela cadastrada: o cálculo usa a tabela do Rio de Janeiro (NT 5-05) como referência técnica${esportivo ? ', somada à exigência federal da Lei Geral do Esporte' : ''}. Confirme as exigências da Secretaria de Saúde e do Corpo de Bombeiros locais.`)
    else alertas.push('No RJ o Projeto de Atendimento Médico é aprovado pela DSE/CBMERJ, pela empresa médica credenciada, com a FARE preenchida pelo médico responsável.')
    alertas.push('O serviço médico deve estar inscrito no CRM, com diretor técnico, e o número de equipes é informado ao CRM com 15 dias de antecedência (Resolução CFM 2.012/2013). Postos funcionando desde 2 horas antes da abertura.')

    return {
      destaques: [
        { label: 'Postos médicos', value: n(linha.postos) },
        { label: 'Macas', value: n(linha.macas) },
        { label: 'Médicos', value: n(medicos) },
        { label: 'Enfermeiros + técnicos', value: n(enfTotal) },
        { label: 'Ambulâncias UTI (tipo D)', value: n(ambD) },
        { label: 'Ambulâncias básicas (tipo B)', value: n(ambB) },
        { label: 'Duplas de maqueiros', value: n(maqueiros) },
      ],
      memoria,
      alertas,
      estimativa: ctx.uf !== 'RJ' && !esportivo,
    }
  },
}

// ─── Segurança patrimonial ──────────────────────────────────────────────────

export const segurancaPatrimonial: Calculator = {
  slug: 'seguranca-patrimonial',
  titulo: 'Segurança patrimonial',
  sub: 'Vigilantes por posto e supervisores',
  categoria: 'estrategica',
  normSlug: 'seguranca-patrimonial',
  campos: [
    publicoField,
    riscoField,
    { key: 'portoes', label: 'Portões de entrada com revista', type: 'number', default: 2, min: 0, max: 200 },
    { key: 'saidas', label: 'Saídas de emergência', type: 'number', default: 2, min: 0, max: 200 },
    { key: 'barricada', label: 'Frente de palco com barricada (0 se não houver)', type: 'number', default: 0, min: 0, max: 2000, unit: 'm' },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const risco = str(i, 'risco')
    const portoes = num(i, 'portoes')
    const saidas = num(i, 'saidas')
    const barricada = num(i, 'barricada')
    const porRonda = risco === 'alto' ? 100 : risco === 'medio' ? 150 : 250
    const postosPortao = portoes * 2
    const postosSaida = saidas
    const postosPalco = barricada > 0 ? up(barricada / 10) : 0
    const ronda = up(publico / porRonda)
    const vigilantes = postosPortao + postosSaida + postosPalco + ronda
    const supervisores = Math.max(1, up(vigilantes / 8))
    const alertas: string[] = []
    if (publico > 1000) alertas.push('Público acima de 1.000 pessoas: a empresa de vigilância apresenta antes o projeto de segurança à autoridade local, com público, quantidade e posição dos vigilantes e análise de risco (Decreto 13.012/2026, art. 22, § 1º).')
    alertas.push(
      'Contrate empresa autorizada pela Polícia Federal, com vigilantes que tenham o curso de segurança de eventos. Revista pessoal só com adesão voluntária do público.',
      'O mesmo profissional não pode fazer vigilância e combate a incêndio (Lei 14.967/2024, art. 10): seguranças e brigadistas são equipes separadas.',
    )
    if (ctx.uf === 'RJ') alertas.push('No RJ o evento precisa do "nada a opor" das Polícias Militar e Civil quando a legislação estadual exigir.')
    return {
      destaques: [
        { label: 'Vigilantes', value: n(vigilantes) },
        { label: 'Supervisores', value: n(supervisores) },
        { label: 'Equipe total', value: n(vigilantes + supervisores) },
      ],
      detalhes: [
        ['Revista nos portões', n(postosPortao)],
        ['Saídas de emergência', n(postosSaida)],
        ['Barricada de palco', n(postosPalco)],
        ['Ronda e áreas de público', n(ronda)],
      ],
      memoria: [
        'Não existe proporção legal de seguranças por pessoa no Brasil. O Normato soma postos fixos e ronda, como orienta o guia HSG195 (HSE, parágrafos 312–313).',
        `Portões: 2 por portão (revista feminina e masculina) → ${postosPortao}. Saídas: 1 por saída, monitoradas durante todo o evento (IT 12/2025, item 3.2.1.19) → ${postosSaida}.`,
        barricada > 0 ? `Barricada: 1 vigilante a cada 10 m de frente de palco (referência de mercado) → ${postosPalco}.` : 'Sem barricada de palco.',
        `Ronda: risco ${risco}, 1 a cada ${porRonda} pessoas (referência de mercado) → ${ronda}.`,
        `Supervisão: 1 supervisor a cada 8 vigilantes (o HSG195 indica de 6 a 10) → ${supervisores}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}
