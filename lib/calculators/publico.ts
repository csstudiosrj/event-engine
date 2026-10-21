import type { Calculator } from './types'
import { brl, duracaoField, n, num, publicoField, str, up } from './helpers'

export const ingressos: Calculator = {
  slug: 'ingressos',
  titulo: 'Ingressos e meia-entrada',
  sub: 'Cota de meia-entrada e receita bruta',
  categoria: 'essencial',
  normSlug: 'ingressos',
  campos: [
    { key: 'lotacao', label: 'Ingressos à venda', type: 'number', default: 1000, min: 1, max: 500000 },
    { key: 'preco', label: 'Preço da inteira', type: 'number', default: 100, min: 0, max: 100000, step: 0.01, unit: 'R$' },
    { key: 'meia', label: 'Meias-entradas esperadas', type: 'number', default: 40, min: 0, max: 100, unit: '%', help: 'A lei reserva no mínimo 40% dos ingressos para meia-entrada. Para planejar a receita com segurança, use 40% ou mais.' },
    { key: 'cortesias', label: 'Cortesias', type: 'number', default: 0, min: 0, max: 500000 },
  ],
  calcular(i) {
    const lotacao = num(i, 'lotacao')
    const preco = Math.round(num(i, 'preco') * 100)
    const cortesias = Math.min(num(i, 'cortesias'), lotacao)
    const pagantes = lotacao - cortesias
    const reservaMeia = up(pagantes * 0.4)
    const meias = Math.round(pagantes * num(i, 'meia') / 100)
    const inteiras = pagantes - meias
    const receita = inteiras * preco + meias * Math.round(preco / 2)
    const ticketMedio = pagantes > 0 ? receita / pagantes : 0
    return {
      destaques: [
        { label: 'Reserva mínima de meia-entrada', value: n(reservaMeia), unit: 'ingressos' },
        { label: 'Receita bruta estimada', value: brl(receita) },
        { label: 'Ticket médio', value: brl(ticketMedio) },
      ],
      detalhes: [
        ['Inteiras', n(inteiras)],
        ['Meias-entradas', n(meias)],
        ['Cortesias', n(cortesias)],
        ['Preço da meia', brl(Math.round(preco / 2))],
      ],
      memoria: [
        `Ingressos pagantes: ${n(lotacao)} − ${n(cortesias)} cortesias = ${n(pagantes)}.`,
        `Reserva mínima de 40% para meia-entrada (Decreto 9.404/2018): ${n(pagantes)} × 40% = ${n(reservaMeia)}.`,
        `Receita: ${n(inteiras)} × ${brl(preco)} + ${n(meias)} × ${brl(Math.round(preco / 2))} = ${brl(receita)}.`,
      ],
      alertas: [
        'Têm direito à meia-entrada: estudantes com CIE, pessoas com deficiência e acompanhante, jovens de 15 a 29 anos de baixa renda (CadÚnico) e pessoas com 60 anos ou mais.',
        'Com música ao vivo ou mecânica, há recolhimento de direitos autorais ao ECAD, calculado sobre a receita bruta.',
        'A receita é bruta: taxas da plataforma de venda, impostos e ECAD ainda serão descontados.',
      ],
      estimativa: false,
    }
  },
}

export const credenciamento: Calculator = {
  slug: 'credenciamento',
  titulo: 'Credenciamento e acesso',
  sub: 'Pontos de entrada e equipe de recepção',
  categoria: 'essencial',
  normSlug: 'credenciamento',
  campos: [
    publicoField,
    { key: 'janela', label: 'Janela de chegada do público', type: 'number', default: 90, min: 10, max: 600, unit: 'minutos' },
    { key: 'modo', label: 'Tipo de verificação', type: 'select', default: 'qr', options: [{ value: 'qr', label: 'Leitura de QR code (≈10 s por pessoa)' }, { value: 'pulseira', label: 'Troca por pulseira (≈20 s)' }, { value: 'credencial', label: 'Credenciamento com documento (≈60 s)' }] },
    { key: 'revista', label: 'Revista pessoal na entrada?', type: 'select', default: 'sim', options: [{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const janela = num(i, 'janela')
    const modo = str(i, 'modo')
    const segundos = modo === 'credencial' ? 60 : modo === 'pulseira' ? 20 : 10
    const revista = str(i, 'revista') === 'sim'
    const pico = 1.5
    const capacidadePonto = (janela * 60) / segundos
    const pontos = Math.max(1, up((publico * pico) / capacidadePonto))
    const revistadores = revista ? Math.max(2, up((publico * pico) / ((janela * 60) / 15))) : 0
    const orientadores = Math.max(1, up(pontos / 4))
    return {
      destaques: [
        { label: 'Pontos de verificação', value: n(pontos) },
        { label: 'Revistadores', value: n(revistadores) },
        { label: 'Orientadores de fila', value: n(orientadores) },
        { label: 'Equipe total na entrada', value: n(pontos + revistadores + orientadores) },
      ],
      memoria: [
        `Cada ponto atende 1 pessoa a cada ${segundos} s → ${n(capacidadePonto)} pessoas em ${janela} min.`,
        `Considerando pico de chegada 50% acima da média: ${n(publico)} × 1,5 ÷ ${n(capacidadePonto)} = ${pontos} ponto(s).`,
        revista ? `Revista: ~15 s por pessoa, mínimo 2 revistadores (de preferência 1 homem e 1 mulher) → ${revistadores}.` : 'Sem revista pessoal.',
        `1 orientador de fila a cada 4 pontos → ${orientadores}.`,
      ],
      alertas: [
        'Dados pessoais coletados no credenciamento (nome, CPF, e-mail) seguem a LGPD: informe a finalidade, colete só o necessário e guarde com segurança.',
        'O organizador precisa saber quantas pessoas estão no evento a qualquer momento, para não ultrapassar a lotação aprovada.',
      ],
      estimativa: true,
    }
  },
}

export const acessibilidade: Calculator = {
  slug: 'acessibilidade',
  titulo: 'Acessibilidade',
  sub: 'Assentos, vagas, sanitários e rampas',
  categoria: 'essencial',
  normSlug: 'acessibilidade',
  campos: [
    publicoField,
    { key: 'assentos', label: 'Assentos (0 se o público fica em pé)', type: 'number', default: 0, min: 0, max: 500000 },
    { key: 'vagas', label: 'Vagas de estacionamento (0 se não houver)', type: 'number', default: 100, min: 0, max: 100000 },
    { key: 'sanitarios', label: 'Total de sanitários previstos', type: 'number', default: 15, min: 0, max: 10000 },
    { key: 'desnivel', label: 'Maior desnível a vencer com rampa (palco, acesso)', type: 'number', default: 0.5, min: 0, max: 10, step: 0.01, unit: 'm' },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const assentos = num(i, 'assentos')
    const vagas = num(i, 'vagas')
    const sanit = num(i, 'sanitarios')
    const desnivel = num(i, 'desnivel')
    const assentosPcd = assentos > 0 ? Math.max(1, up(assentos * 0.02)) : 0
    const espacosCadeira = assentos > 0 ? assentosPcd : Math.max(1, up(publico * 0.02))
    const vagasPcd = vagas > 0 ? Math.max(1, up(vagas * 0.02)) : 0
    const vagasIdosos = vagas > 0 ? Math.max(1, up(vagas * 0.05)) : 0
    const sanitPcd = Math.max(1, up(sanit * 0.05))
    const rampa = desnivel / 0.0833
    const alertas = [
      'Garanta rota acessível contínua da entrada até palco, bares, sanitários e saídas, com piso firme e sinalização.',
      'Para eventos culturais, avalie intérprete de Libras, audiodescrição e material em braille (Manual de Acessibilidade do MDH).',
    ]
    if (rampa > 0) alertas.push('Rampas com mais de 50 m de extensão precisam de patamares intermediários de descanso.')
    return {
      destaques: [
        { label: assentos > 0 ? 'Assentos reservados PcD' : 'Espaços para cadeira de rodas', value: n(espacosCadeira) },
        { label: 'Vagas PcD', value: n(vagasPcd) },
        { label: 'Vagas para idosos', value: n(vagasIdosos) },
        { label: 'Sanitários acessíveis', value: n(sanitPcd) },
        { label: 'Comprimento mínimo da rampa', value: n(rampa, 2), unit: 'm' },
      ],
      memoria: [
        assentos > 0 ? `Assentos: 2% de ${n(assentos)}, mínimo 1 → ${assentosPcd}.` : `Público em pé: área reservada para cadeira de rodas, referência de 2% de ${n(publico)} → ${espacosCadeira} espaços.`,
        vagas > 0 ? `Vagas PcD: 2% de ${n(vagas)}, mínimo 1 → ${vagasPcd}. Vagas para idosos: 5%, mínimo 1 → ${vagasIdosos} (Estatuto da Pessoa Idosa).` : 'Sem estacionamento informado.',
        `Sanitários acessíveis: 5% de ${n(sanit)}, mínimo 1 → ${sanitPcd}.`,
        `Rampa com inclinação máxima de 8,33%: ${n(desnivel, 2)} m ÷ 0,0833 = ${n(rampa, 2)} m.`,
      ],
      alertas,
      estimativa: false,
    }
  },
}

export const alimentacao: Calculator = {
  slug: 'alimentacao',
  titulo: 'Alimentação',
  sub: 'Pontos de venda, refeições e boas práticas',
  categoria: 'essencial',
  normSlug: 'alimentacao',
  campos: [
    publicoField,
    duracaoField,
    { key: 'tipo', label: 'Tipo de serviço', type: 'select', default: 'venda', options: [{ value: 'venda', label: 'Venda em barracas/food trucks' }, { value: 'buffet', label: 'Buffet ou refeição servida' }] },
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
      'Alimentos quentes: manter a 60 °C ou mais por até 6 h (acima de 65 °C sem limite). Abaixo de 60 °C, descartar (RDC 216/2004).',
      'Alimentos frios: até 10 °C. Entre 10 °C e 21 °C, no máximo 2 h de exposição.',
      'Manipuladores com higiene pessoal, uniforme e treinamento; insumos armazenados sobre paletes ou prateleiras, identificados e dentro da validade.',
    ]
    if (publico > 1000) alertas.push('Mais de 1.000 pessoas por dia: a RDC 656/2022 exige responsável técnico, rastreabilidade de insumos e plano de emergência sanitária.')
    return {
      destaques: [
        { label: buffet ? 'Estações de buffet' : 'Pontos de venda', value: n(pontos) },
        { label: 'Refeições estimadas', value: n(refeicoes) },
        { label: 'Manipuladores de alimentos', value: n(manipuladores) },
      ],
      memoria: [
        `Refeições por pessoa pela duração (${duracao} h): ${refeicoesPessoa}${buffet ? '' : ', com 60% do público comprando'} → ${n(refeicoes)}.`,
        buffet ? `1 estação de buffet a cada 100 pessoas → ${pontos}; 1 manipulador a cada 25 convidados → ${manipuladores}.` : `1 ponto de venda a cada 250 pessoas → ${pontos}; 3 manipuladores por ponto → ${manipuladores}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

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
    const lNaoAlcoolHora = 0.25
    const alcoolicas = publico * duracao * lAlcoolHora * 0.7 // ~70% do público consome álcool
    const naoAlcoolicas = publico * duracao * lNaoAlcoolHora
    const totalL = alcoolicas + naoAlcoolicas
    const gelo = totalL * 0.5
    const bares = Math.max(1, up(publico / 300))
    const alertas = [
      'É proibido vender ou servir bebida alcoólica a menores de 18 anos (ECA). Treine a equipe e controle o acesso aos bares.',
      'Bebidas alcoólicas precisam ter registro e seguir os padrões da ANVISA.',
    ]
    if (esportivo) alertas.push('Eventos esportivos em estádios e arenas têm restrição à venda de álcool (Lei Geral do Esporte e normas locais). Confirme com a federação e o município.')
    if (publico > 1000) alertas.push('Mais de 1.000 pessoas por dia: siga a RDC 656/2022 (controle de temperatura, fornecedores identificados, armazenamento e descarte).')
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
        `Alcoólicas: ${lAlcoolHora} L/h por consumidor × 70% do público × ${duracao} h = ${n(alcoolicas)} L.`,
        `Não alcoólicas (água, refrigerante): 0,25 L/h × ${n(publico)} × ${duracao} h = ${n(naoAlcoolicas)} L.`,
        `Gelo: 0,5 kg por litro servido → ${n(gelo)} kg. 1 bar a cada 300 pessoas → ${bares}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}
