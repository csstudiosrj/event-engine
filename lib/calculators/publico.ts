import type { Calculator } from './types'
import { brl, duracaoField, n, num, publicoField, str, up } from './helpers'

// ─── Ingressos ──────────────────────────────────────────────────────────────

export const ingressos: Calculator = {
  slug: 'ingressos',
  titulo: 'Ingressos e meia-entrada',
  sub: 'Cota de meia-entrada e receita bruta',
  categoria: 'essencial',
  normSlug: 'ingressos',
  campos: [
    { key: 'lotacao', label: 'Ingressos à venda', type: 'number', default: 1000, min: 1, max: 500000 },
    { key: 'preco', label: 'Preço da inteira', type: 'number', default: 100, min: 0, max: 100000, step: 0.01, unit: 'R$' },
    { key: 'meia', label: 'Meias-entradas esperadas', type: 'number', default: 40, min: 0, max: 100, unit: '%', help: 'A lei reserva 40% dos ingressos para meia-entrada. Para planejar a receita com segurança, use 40% ou mais.' },
    { key: 'cortesias', label: 'Cortesias e promocionais', type: 'number', default: 0, min: 0, max: 500000, help: 'Ingressos promocionais não contam para a cota de 40%.' },
  ],
  calcular(i) {
    const lotacao = num(i, 'lotacao')
    const preco = Math.round(num(i, 'preco') * 100)
    const cortesias = Math.min(num(i, 'cortesias'), lotacao)
    const pagantes = lotacao - cortesias
    const reservaMeia = up(pagantes * 0.4)
    const meias = Math.round(pagantes * num(i, 'meia') / 100)
    const inteiras = pagantes - meias
    const precoMeia = Math.round(preco / 2)
    const receita = inteiras * preco + meias * precoMeia
    const ticketMedio = pagantes > 0 ? receita / pagantes : 0
    return {
      destaques: [
        { label: 'Reserva de meia-entrada', value: n(reservaMeia), unit: 'ingressos' },
        { label: 'Receita bruta estimada', value: brl(receita) },
        { label: 'Ticket médio', value: brl(ticketMedio) },
      ],
      detalhes: [
        ['Inteiras', n(inteiras)],
        ['Meias-entradas', n(meias)],
        ['Cortesias e promocionais', n(cortesias)],
        ['Preço da meia', brl(precoMeia)],
      ],
      memoria: [
        `Ingressos à venda ao público: ${n(lotacao)} − ${n(cortesias)} cortesias/promocionais = ${n(pagantes)}.`,
        `Cota de meia-entrada: 40% dos ingressos disponíveis (Lei 12.933/2013, art. 1º, § 10; Decreto 8.537/2015, art. 9º) → ${n(reservaMeia)}, reservados até 48 h antes do evento.`,
        `Receita: ${n(inteiras)} × ${brl(preco)} + ${n(meias)} × ${brl(precoMeia)} = ${brl(receita)}.`,
      ],
      alertas: [
        'Têm direito à meia-entrada: estudantes com Carteira de Identificação Estudantil, pessoas com deficiência e acompanhante quando necessário, e jovens de 15 a 29 anos de baixa renda (CadÚnico). Pessoas com 60 anos ou mais têm desconto de pelo menos 50% (Estatuto da Pessoa Idosa, art. 23).',
        'Informe o preço total com as taxas discriminadas e a quantidade de ingressos, inclusive de meia; taxas devem ser proporcionais ao preço; em até 30 dias após o evento, divulgue o percentual vendido como meia (Decreto 13.108/2026).',
        'Compras on-line têm direito de arrependimento. Com música, há recolhimento ao ECAD sobre a receita. A receita aqui é bruta, antes de taxas, impostos e ECAD.',
      ],
      estimativa: false,
    }
  },
}

// ─── Credenciamento e acesso ────────────────────────────────────────────────

export const credenciamento: Calculator = {
  slug: 'credenciamento',
  titulo: 'Credenciamento e acesso',
  sub: 'Catracas, pontos de credenciamento e equipe',
  categoria: 'essencial',
  normSlug: 'credenciamento',
  campos: [
    publicoField,
    { key: 'janela', label: 'Tempo para todo o público entrar', type: 'number', default: 60, min: 10, max: 600, unit: 'minutos', help: 'Em SP e no RJ as catracas devem permitir a entrada de todos em no máximo 1 hora.' },
    { key: 'modo', label: 'Tipo de verificação', type: 'select', default: 'qr', options: [{ value: 'qr', label: 'Ingresso com QR code na catraca' }, { value: 'pulseira', label: 'Troca por pulseira (≈20 s por pessoa)' }, { value: 'credencial', label: 'Credenciamento com documento (≈60 s por pessoa)' }] },
    { key: 'revista', label: 'Haverá revista na entrada?', type: 'select', default: 'sim', options: [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }] },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const janela = num(i, 'janela')
    const modo = str(i, 'modo')
    const revista = str(i, 'revista') === 'sim'
    const janelaLegal = Math.min(janela, 60)
    const catracas = Math.max(1, up(publico / (660 * janelaLegal / 60)))
    const segundos = modo === 'credencial' ? 60 : modo === 'pulseira' ? 20 : 0
    const postos = segundos > 0 ? Math.max(1, up((publico * 1.5) / ((janela * 60) / segundos))) : 0
    const revistadores = revista ? Math.max(2, up((publico * 1.5) / ((janela * 60) / 15))) : 0
    const orientadores = Math.max(1, up((catracas + postos) / 4))
    const memoria = [
      `Catracas: capacidade máxima de 660 pessoas por catraca por hora, com todo o público entrando em até 1 hora (IT 12/2025-SP, item 3.2.1.24; NT 5-04-RJ, item 6.2.7).`,
      `${n(publico)} ÷ (660 × ${n(janelaLegal)} min ÷ 60) = ${catracas} catraca(s)${janela > 60 ? ' (tempo limitado a 60 min, como exigem as normas)' : ''}.`,
    ]
    if (postos > 0) memoria.push(`Postos de ${modo === 'credencial' ? 'credenciamento' : 'troca por pulseira'}: ${segundos} s por pessoa, com pico de chegada 50% acima da média (referência de mercado) → ${postos}.`)
    memoria.push(revista ? `Revista: cerca de 15 s por pessoa, mínimo 2 profissionais (referência de mercado) → ${revistadores}.` : 'Sem revista.', `1 orientador de fila a cada 4 pontos de entrada → ${orientadores}.`)
    const alertas = [
      'As catracas devem ser reversíveis e não contam como saída de emergência. Prever área de acúmulo para filas antes delas.',
      'Revista pessoal só com adesão voluntária, feita por vigilante de empresa autorizada (Decreto 13.012/2026, art. 21, § 2º).',
      'Dados pessoais do credenciamento seguem a LGPD: informe a finalidade, colete o mínimo e guarde com segurança.',
    ]
    if (ctx.uf === 'RJ') alertas.unshift('No RJ, eventos em local fechado são obrigados a ter controle de acesso para garantir a lotação, e a placa de lotação é obrigatória (NT 5-04, itens 6.1.10 e 6.2.5).')
    return {
      destaques: [
        { label: 'Catracas', value: n(catracas) },
        { label: 'Postos de credenciamento', value: n(postos) },
        { label: 'Revistadores', value: n(revistadores) },
        { label: 'Orientadores de fila', value: n(orientadores) },
      ],
      memoria,
      alertas,
      estimativa: false,
    }
  },
}

// ─── Acessibilidade ─────────────────────────────────────────────────────────

// Decreto 5.296/2004, art. 23, § 1º (redação do Decreto 9.404/2018)
function reservaDec5296(lugares: number) {
  if (lugares <= 0) return 0
  if (lugares <= 1000) return Math.max(1, up(lugares * 0.02))
  return 20 + up((lugares - 1000) * 0.01)
}

export const acessibilidade: Calculator = {
  slug: 'acessibilidade',
  titulo: 'Acessibilidade',
  sub: 'Espaços, assentos, vagas, sanitários e rampas',
  categoria: 'essencial',
  normSlug: 'acessibilidade',
  campos: [
    { key: 'lugares', label: 'Lotação do local (assentos ou público em pé)', type: 'number', default: 1000, min: 1, max: 500000 },
    { key: 'sentado', label: 'O público fica sentado?', type: 'select', default: 'nao', options: [{ value: 'nao', label: 'Não, em pé' }, { value: 'sim', label: 'Sim, com assentos' }] },
    { key: 'vagas', label: 'Vagas de estacionamento (0 se não houver)', type: 'number', default: 100, min: 0, max: 100000 },
    { key: 'sanitarios', label: 'Total de sanitários previstos', type: 'number', default: 15, min: 0, max: 10000 },
    { key: 'desnivel', label: 'Maior desnível a vencer com rampa', type: 'number', default: 0.5, min: 0, max: 10, step: 0.01, unit: 'm' },
  ],
  calcular(i, ctx) {
    const lugares = num(i, 'lugares')
    const sentado = str(i, 'sentado') === 'sim'
    const vagas = num(i, 'vagas')
    const sanit = num(i, 'sanitarios')
    const desnivel = num(i, 'desnivel')
    const cadeirantes = reservaDec5296(lugares)
    const assentosPmr = sentado ? reservaDec5296(lugares) : 0
    const obesos = sentado ? Math.max(1, up(assentosPmr / 2)) : 0
    const vagasPcd = vagas > 0 ? Math.max(1, up(vagas * 0.02)) : 0
    const vagasIdosos = vagas > 0 ? up(vagas * 0.05) : 0
    const pctSanit = ctx.uf === 'RJ' ? 0.1 : 0.05
    const sanitAcess = sanit > 0 ? Math.max(1, up(sanit * pctSanit)) : 1
    const rampa = desnivel / 0.0833
    const regra = lugares <= 1000 ? '2% da lotação, mínimo 1' : '20 + 1% do que exceder 1.000'
    const alertas = [
      'Distribua os espaços reservados em setores diferentes, com boa visibilidade, perto dos corredores e com lugar para acompanhante ao lado (Lei 13.146/2015, art. 44).',
      'Rotas de fuga e saídas de emergência precisam ser acessíveis. Garanta rota contínua da entrada até palco, bares e sanitários, com piso firme.',
    ]
    if (rampa > 0) alertas.push('Em rotas de saída de eventos em SP, a IT 12/2025 admite rampas de até 10%, com patamar a cada 10 m; para uso geral, a NBR 9050 limita a 8,33%.')
    return {
      destaques: [
        { label: 'Espaços para cadeira de rodas', value: n(cadeirantes) },
        { label: 'Assentos para PcD e mobilidade reduzida', value: sentado ? n(assentosPmr) : '—' },
        { label: 'Vagas PcD', value: n(vagasPcd) },
        { label: 'Vagas para idosos', value: n(vagasIdosos) },
        { label: 'Sanitários acessíveis', value: n(sanitAcess) },
        { label: 'Comprimento da rampa (8,33%)', value: n(rampa, 2), unit: 'm' },
      ],
      detalhes: sentado ? [['Assentos para pessoas obesas (metade dos reservados)', n(obesos)]] : undefined,
      memoria: [
        `Decreto 5.296/2004, art. 23 (redação do Decreto 9.404/2018): ${regra} → ${cadeirantes} espaços para cadeira de rodas${sentado ? ` e ${assentosPmr} assentos para pessoas com deficiência ou mobilidade reduzida, metade adequada a pessoas obesas (${obesos})` : ''}.`,
        vagas > 0 ? `Vagas: 2% para PcD, mínimo 1 (Lei 13.146/2015, art. 47) → ${vagasPcd}; 5% para idosos (Lei 10.741/2003, art. 41) → ${vagasIdosos}.` : 'Sem estacionamento informado.',
        ctx.uf === 'RJ' ? `Sanitários: 10% acessíveis, mínimo 1 (Lei estadual RJ 5.705/2010) → ${sanitAcess}.` : `Sanitários: 5% acessíveis, mínimo 1 (NBR 9050) → ${sanitAcess}.`,
        `Rampa a 8,33%: ${n(desnivel, 2)} m ÷ 0,0833 = ${n(rampa, 2)} m.`,
      ],
      alertas,
      estimativa: false,
    }
  },
}

// ─── Alimentação ────────────────────────────────────────────────────────────

export const alimentacao: Calculator = {
  slug: 'alimentacao',
  titulo: 'Alimentação',
  sub: 'Pontos de venda, refeições e regras sanitárias',
  categoria: 'essencial',
  normSlug: 'alimentacao',
  campos: [
    publicoField,
    duracaoField,
    { key: 'tipo', label: 'Tipo de serviço', type: 'select', default: 'venda', options: [{ value: 'venda', label: 'Venda em barracas ou food trucks' }, { value: 'buffet', label: 'Buffet ou refeição servida' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const buffet = str(i, 'tipo') === 'buffet'
    const refeicoesPessoa = duracao >= 8 ? 2 : duracao >= 4 ? 1 : 0.5
    const refeicoes = up(publico * refeicoesPessoa * (buffet ? 1 : 0.6))
    const pontos = buffet ? Math.max(1, up(publico / 100)) : Math.max(1, up(publico / 250))
    const manipuladores = buffet ? up(publico / 25) : pontos * 3
    const alertas = [
      'Alimentos quentes: acima de 60 °C por no máximo 6 horas; reaquecimento a pelo menos 70 °C em todas as partes (RDC 216/2004, item 4.8.15).',
      'Alimentos refrigerados: abaixo de 5 °C, ou congelados a -18 °C ou menos (RDC 216/2004, item 4.8.19).',
      'Manipuladores com asseio, cabelos protegidos e sem adornos; água corrente potável em cada barraca para mãos e utensílios.',
    ]
    if (publico > 1000) alertas.unshift('Mais de 1.000 pessoas por dia: a RDC 656/2022 se aplica. Protocole na vigilância sanitária local, até 30 dias antes, o formulário de avaliação prévia (Anexo I). Organizador e fornecedores respondem solidariamente por danos à saúde.')
    return {
      destaques: [
        { label: buffet ? 'Estações de buffet' : 'Pontos de venda', value: n(pontos) },
        { label: 'Refeições estimadas', value: n(refeicoes) },
        { label: 'Manipuladores de alimentos', value: n(manipuladores) },
      ],
      memoria: [
        'Não há norma que fixe pontos de venda por pessoa: os números são referências de mercado.',
        `Refeições por pessoa pela duração (${duracao} h): ${refeicoesPessoa}${buffet ? '' : ', com 60% do público comprando'} → ${n(refeicoes)}.`,
        buffet ? `1 estação de buffet a cada 100 pessoas → ${pontos}; 1 manipulador a cada 25 convidados → ${manipuladores}.` : `1 ponto de venda a cada 250 pessoas → ${pontos}; 3 manipuladores por ponto → ${manipuladores}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

// ─── Bebidas ────────────────────────────────────────────────────────────────

export const bebidas: Calculator = {
  slug: 'bebidas',
  titulo: 'Bebidas',
  sub: 'Volume, gelo e regras de venda',
  categoria: 'essencial',
  normSlug: 'bebidas',
  campos: [
    publicoField,
    duracaoField,
    { key: 'alcool', label: 'Consumo de bebida alcoólica', type: 'select', default: 'medio', options: [{ value: 'nenhum', label: 'Sem bebida alcoólica' }, { value: 'baixo', label: 'Baixo' }, { value: 'medio', label: 'Médio' }, { value: 'alto', label: 'Alto (open bar, festival)' }] },
    { key: 'esportivo', label: 'É evento esportivo em estádio ou arena?', type: 'select', default: 'nao', options: [{ value: 'nao', label: 'Não' }, { value: 'sim', label: 'Sim' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const alcool = str(i, 'alcool')
    const esportivo = str(i, 'esportivo') === 'sim'
    const lAlcoolHora = { nenhum: 0, baixo: 0.15, medio: 0.3, alto: 0.5 }[alcool] ?? 0.3
    const alcoolicas = publico * duracao * lAlcoolHora * 0.7
    const naoAlcoolicas = publico * duracao * 0.25
    const gelo = (alcoolicas + naoAlcoolicas) * 0.5
    const bares = Math.max(1, up(publico / 300))
    const alertas = [
      'É proibido vender, fornecer ou servir bebida alcoólica, mesmo de graça, a menores de 18 anos. É crime, com pena de 2 a 4 anos de detenção (ECA, arts. 81 e 243). Treine a equipe para pedir documento.',
      'O gelo deve ser feito com água potável e guardado separado das bebidas.',
    ]
    if (esportivo) alertas.push('Em estádios e arenas, a venda de álcool depende de lei estadual ou municipal (há lugares que proíbem). Confirme antes de planejar os bares.')
    if (publico > 1000) alertas.push('Mais de 1.000 pessoas por dia: siga a RDC 656/2022 (avaliação prévia na vigilância sanitária até 30 dias antes).')
    return {
      destaques: [
        { label: 'Bebidas alcoólicas', value: n(alcoolicas), unit: 'litros' },
        { label: 'Bebidas não alcoólicas', value: n(naoAlcoolicas), unit: 'litros' },
        { label: 'Gelo', value: n(gelo), unit: 'kg' },
        { label: 'Bares', value: n(bares) },
      ],
      detalhes: [
        ['Equivalente em latas de 350 ml (alcoólicas)', n(up(alcoolicas / 0.35))],
        ['Equivalente em garrafas de 500 ml (não alcoólicas)', n(up(naoAlcoolicas / 0.5))],
      ],
      memoria: [
        'Não há norma de consumo por pessoa: os volumes são referências de mercado para planejar compras.',
        `Alcoólicas: ${lAlcoolHora} L/h × 70% do público × ${duracao} h = ${n(alcoolicas)} L.`,
        `Não alcoólicas: 0,25 L/h × ${n(publico)} × ${duracao} h = ${n(naoAlcoolicas)} L.`,
        `Gelo: 0,5 kg por litro servido → ${n(gelo)} kg. 1 bar a cada 300 pessoas → ${bares}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}
