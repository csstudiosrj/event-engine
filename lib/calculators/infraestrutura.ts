import type { Calculator } from './types'
import { duracaoField, isRioCapital, n, num, publicoField, str, up } from './helpers'

// ─── Sanitários ─────────────────────────────────────────────────────────────

export const sanitarios: Calculator = {
  slug: 'sanitarios',
  titulo: 'Sanitários',
  sub: 'Cabines, mictórios e lavatórios',
  categoria: 'essencial',
  normSlug: 'sanitarios',
  campos: [
    publicoField,
    duracaoField,
    { key: 'mulheres', label: 'Mulheres no público', type: 'number', default: 50, min: 0, max: 100, unit: '%', help: 'Sem dados, use 50%.' },
    { key: 'alcool', label: 'Consumo de bebidas', type: 'select', default: 'medio', options: [{ value: 'baixo', label: 'Baixo ou nenhum' }, { value: 'medio', label: 'Médio' }, { value: 'alto', label: 'Alto (open bar, festival)' }] },
    { key: 'equipe', label: 'Equipe de trabalho no evento', type: 'number', default: 50, min: 0, max: 50000, unit: 'pessoas' },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const w = num(i, 'mulheres') / 100
    const equipe = num(i, 'equipe')
    const mulheres = Math.round(publico * w)
    const homens = publico - mulheres
    const memoria: string[] = []
    const alertas: string[] = []
    let fem: number
    let mascCabines: number
    let mictorios: number
    let estimativa = true

    if (isRioCapital(ctx)) {
      const blocos = up(publico / 150)
      fem = blocos
      mascCabines = blocos
      mictorios = 0
      estimativa = false
      memoria.push(`Decreto Rio 55.648/2025, Anexo VI: no mínimo 1 módulo masculino e 1 feminino para cada 150 pessoas → ${n(publico)} ÷ 150 = ${blocos} de cada.`)
    } else {
      const longo = duracao >= 6
      const [porF, porM, porMic] = longo ? [100, 500, 150] : [120, 600, 175]
      fem = mulheres > 0 ? up(mulheres / porF) : 0
      mascCabines = homens > 0 ? up(homens / porM) : 0
      mictorios = homens > 0 ? up(homens / porMic) : 0
      memoria.push(
        'Não há proporção federal para o público de eventos. Usada a referência do guia HSG195 (HSE, Reino Unido), parágrafo 518.',
        `Evento ${longo ? 'com 6 horas ou mais' : 'com menos de 6 horas'}: 1 sanitário a cada ${porF} mulheres; para homens, 1 sanitário a cada ${porM} mais 1 mictório a cada ${porMic}.`,
        `Mulheres (${n(w * 100)}%): ${n(mulheres)} ÷ ${porF} = ${fem}. Homens: ${n(homens)} ÷ ${porM} = ${mascCabines} sanitários e ${n(homens)} ÷ ${porMic} = ${mictorios} mictórios.`,
      )
      if (str(i, 'alcool') === 'alto') alertas.push('Com consumo alto de bebidas, o próprio guia HSG195 avisa que estes números podem ser baixos. Considere ampliar e prever limpeza mais frequente.')
      if (ctx.uf === 'RJ') alertas.push('Fora da capital, confira se a prefeitura do município tem proporção própria (na capital vale 1 masculino + 1 feminino a cada 150 pessoas).')
    }

    const total = fem + mascCabines + mictorios
    const pctAcess = ctx.uf === 'RJ' ? 0.1 : 0.05
    const acessiveis = Math.max(1, up((fem + mascCabines) * pctAcess))
    const lavatorios = Math.max(1, up(total / 5))
    const equipeF = up((equipe * w) / 20)
    const equipeM = up((equipe * (1 - w)) / 20)
    memoria.push(
      ctx.uf === 'RJ'
        ? `Acessíveis: 10% das cabines, mínimo 1 (Lei estadual RJ 5.705/2010, com redação de 2026) → ${acessiveis}, dentro do total.`
        : `Acessíveis: 5% das cabines, mínimo 1 (NBR 9050) → ${acessiveis}, dentro do total.`,
      `Lavatórios: 1 a cada 5 sanitários (HSG195, parágrafo 519) → ${lavatorios}.`,
      equipe > 0 ? `Equipe (NR-24, item 24.2.2): 1 instalação com bacia e lavatório a cada 20 trabalhadores, por sexo → ${equipeF} feminina(s) e ${equipeM} masculina(s), separadas das do público.` : 'Sem equipe informada.',
    )
    alertas.push('Banheiros químicos acessíveis precisam de área de manobra, barras de apoio e acesso sem degraus, próximos às áreas reservadas a pessoas com deficiência.')

    return {
      destaques: [
        { label: 'Total para o público', value: n(total) },
        { label: 'Femininos', value: n(fem) },
        { label: 'Masculinos', value: mictorios > 0 ? `${n(mascCabines)} + ${n(mictorios)} mictórios` : n(mascCabines) },
        { label: 'Acessíveis (incluídos)', value: n(acessiveis) },
        { label: 'Lavatórios', value: n(lavatorios) },
      ],
      detalhes: [['Sanitários exclusivos da equipe (NR-24)', n(equipeF + equipeM)]],
      memoria,
      alertas,
      estimativa,
    }
  },
}

// ─── Água potável ───────────────────────────────────────────────────────────

export const agua: Calculator = {
  slug: 'agua',
  titulo: 'Água potável',
  sub: 'Pontos de distribuição e volume para consumo',
  categoria: 'essencial',
  normSlug: 'agua',
  campos: [
    publicoField,
    duracaoField,
    { key: 'clima', label: 'Clima esperado', type: 'select', default: 'ameno', options: [{ value: 'ameno', label: 'Ameno' }, { value: 'quente', label: 'Quente (acima de 30 °C) ou público dançando' }] },
    { key: 'operadores', label: 'Operadores de alimentação (barracas, food trucks)', type: 'number', default: 0, min: 0, max: 5000 },
  ],
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const quente = str(i, 'clima') === 'quente'
    const operadores = num(i, 'operadores')
    const litrosHora = quente ? 0.5 : 0.25
    const litros = up(publico * duracao * litrosHora)
    const pontosPublico = Math.max(1, up(publico / 3000))
    const pontosOperadores = operadores > 0 ? up(operadores / 10) : 0
    const alertas: string[] = []
    if (publico > 1000) alertas.push('Acima de 1.000 participantes é obrigatório oferecer água potável gratuita, em bebedouros ou embalagens individuais, em pontos de fácil acesso (Decreto 13.109/2026, art. 4º). Vender água não dispensa a obrigação.')
    alertas.push('O público pode entrar com garrafa de água de uso pessoal; restrições de material só por segurança e avisadas antes (Decreto 13.109/2026, art. 3º).')
    if (ctx.uf === 'RJ') alertas.push('Na capital do RJ, em dias de calor nível 4 ou 5, eventos externos acima de 2.000 pessoas precisam de água gratuita, sombra e áreas de resfriamento, ou podem ser cancelados.')
    alertas.push('Reservatórios temporários devem ser higienizados, tampados e continuamente abastecidos (RDC 656/2022, art. 27).')
    return {
      destaques: [
        { label: 'Pontos de água para o público', value: n(pontosPublico) },
        { label: 'Pontos para operadores de alimentação', value: n(pontosOperadores) },
        { label: 'Água para beber (estimativa)', value: n(litros), unit: 'litros' },
      ],
      memoria: [
        `Pontos: 1 a cada 3.000 pessoas e 1 a cada 10 operadores de alimentação (HSG195, parágrafo 472) → ${pontosPublico} + ${pontosOperadores}.`,
        `Consumo para beber (referência de mercado, sem norma): ${n(litrosHora, 2)} L por pessoa por hora (${quente ? 'calor ou atividade física' : 'clima ameno'}) × ${n(publico)} × ${duracao} h = ${n(litros)} L.`,
        'O volume não inclui água para limpeza, cozinhas e sanitários com descarga.',
      ],
      alertas,
      estimativa: true,
    }
  },
}

// ─── Geradores ──────────────────────────────────────────────────────────────

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
  calcular(i, ctx) {
    const cargas = ['som', 'luz', 'video', 'cozinha', 'clima', 'outros'].map((k) => num(i, k))
    const kw = cargas.reduce((a, b) => a + b, 0)
    const duracao = num(i, 'duracao')
    const simultaneidade = 0.8
    const fp = 0.8
    const kva = (kw * simultaneidade / fp) * 1.25
    const maior = GERADORES_KVA[GERADORES_KVA.length - 1]
    let unidades = 1
    let tamanho = GERADORES_KVA.find((g) => g >= kva) ?? maior
    if (kva > maior) { unidades = up(kva / maior); tamanho = maior }
    const reservaN1 = str(i, 'redundancia') === 'sim'
    const total = unidades + (reservaN1 ? 1 : 0)
    const kwh = kw * simultaneidade * duracao
    const litros = kwh * 0.28 * 1.1
    const carga = (kw * simultaneidade) / (tamanho * unidades * fp)
    const alertas = [
      'Instalações elétricas temporárias seguem a NR-10 e a NBR 5410, com aterramento e projeto e ART de profissional habilitado.',
      'O levantamento de cargas real vem dos fornecedores de som, luz, vídeo e cozinha; os valores sugeridos são só ponto de partida.',
    ]
    if (carga < 0.5) alertas.push(`O gerador vai operar com cerca de ${n(carga * 100)}% da capacidade. Abaixo de 50% o consumo por kWh sobe e o motor pode acumular resíduos: avalie um modelo menor ou dividir a carga.`)
    if (ctx.uf === 'RJ') alertas.push('No RJ, motogeradores seguem a NT 3-03 do CBMERJ (inclusive extintores) e não podem ficar sob arquibancadas ou camarotes.')
    return {
      destaques: [
        { label: 'Potência necessária', value: n(kva), unit: 'kVA' },
        { label: 'Gerador(es) sugerido(s)', value: `${total} × ${tamanho}`, unit: 'kVA' },
        { label: 'Diesel estimado', value: n(litros), unit: 'litros' },
      ],
      memoria: [
        `Carga instalada: ${cargas.map((c) => n(c)).join(' + ')} = ${n(kw)} kW.`,
        `Demanda: ${n(kw)} kW × ${simultaneidade} (simultaneidade) ÷ ${fp} (fator de potência) × 1,25 (margem para partidas e picos) = ${n(kva, 1)} kVA → ${unidades} × ${tamanho} kVA${reservaN1 ? ' + 1 reserva (N+1)' : ''}.`,
        `Energia: ${n(kw * simultaneidade, 1)} kW × ${duracao} h = ${n(kwh)} kWh. Diesel: 0,28 L/kWh (faixa típica de 0,25–0,30 a 75% de carga) + 10% de margem = ${n(litros)} L.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

// ─── Resíduos ───────────────────────────────────────────────────────────────

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
  calcular(i, ctx) {
    const publico = num(i, 'publico')
    const duracao = num(i, 'duracao')
    const alim = str(i, 'alimentacao')
    const kgPessoa = alim === 'refeicoes' ? 1.1 : alim === 'lanches' ? 0.5 : 0.25
    const fDuracao = Math.max(0.5, Math.min(2, duracao / 6))
    const kg = publico * kgPessoa * fDuracao
    const litros = (kg / 150) * 1000
    const esvaziamentos = Math.max(1, Math.floor(duracao / 2))
    const lixeiras = Math.max(up(litros / (100 * esvaziamentos)), up(publico / 100))
    const alertas = [
      'O enquadramento como grande gerador e a exigência de plano de gerenciamento (PGRS) dependem da lei do município (Lei 12.305/2010, art. 20). Contrate coleta e destinação licenciadas.',
      'Use o código de cores da CONAMA 275/2001 nos coletores (azul papel, vermelho plástico, verde vidro, amarelo metal, marrom orgânico, cinza rejeito).',
    ]
    if (ctx.uf === 'RJ') alertas.push('Na capital do RJ, o organizador declara a responsabilidade pela limpeza e retirada do lixo durante e após o evento (Decreto Rio 55.648/2025).')
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
        'Não há parâmetro normativo de resíduo por pessoa em eventos. Referências: 1,04 kg por habitante por dia no Brasil (ABREMA, 2022) e cerca de 1,1 kg por convidado em casamentos com refeição (estudo do IFB).',
        `Adotado ${n(kgPessoa, 2)} kg por pessoa para ${alim === 'refeicoes' ? 'refeições completas' : alim === 'lanches' ? 'lanches e bebidas' : 'evento sem alimentação'}, ajustado pela duração (×${n(fDuracao, 2)}) → ${n(kg)} kg.`,
        `Volume com densidade média de 150 kg/m³ → ${n(litros)} L.`,
        `Lixeiras: volume ÷ (100 L × ${esvaziamentos} esvaziamento(s) a cada 2 h), com mínimo de 1 a cada 100 pessoas → ${lixeiras}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

// ─── Ruído ──────────────────────────────────────────────────────────────────

// ABNT NBR 10151:2019, Tabela 3 (RLAeq, dB): [diurno, noturno]
const LIMITES_RUIDO: Record<string, { diurno: number; noturno: number; label: string }> = {
  rural: { diurno: 40, noturno: 35, label: 'área rural' },
  residencial: { diurno: 50, noturno: 45, label: 'área estritamente residencial, hospitais ou escolas' },
  mista_residencial: { diurno: 55, noturno: 50, label: 'área mista predominantemente residencial' },
  mista_comercial: { diurno: 60, noturno: 55, label: 'área mista com vocação comercial e administrativa' },
  mista_recreacional: { diurno: 65, noturno: 55, label: 'área mista com vocação recreacional' },
  industrial: { diurno: 70, noturno: 60, label: 'área predominantemente industrial' },
}

export const sonorizacao: Calculator = {
  slug: 'sonorizacao',
  titulo: 'Ruído e sonorização',
  sub: 'Nível sonoro na vizinhança e limites',
  categoria: 'essencial',
  normSlug: 'sonorizacao',
  campos: [
    { key: 'nivel', label: 'Nível sonoro medido a 10 m do PA', type: 'number', default: 100, min: 40, max: 140, unit: 'dB(A)' },
    { key: 'distancia', label: 'Distância até o imóvel vizinho mais próximo', type: 'number', default: 200, min: 10, max: 10000, unit: 'm' },
    { key: 'zona', label: 'Tipo de área do vizinho (pela lei de uso do solo)', type: 'select', default: 'mista_residencial', options: Object.entries(LIMITES_RUIDO).map(([value, z]) => ({ value, label: z.label[0].toUpperCase() + z.label.slice(1) })) },
    { key: 'periodo', label: 'Horário do evento', type: 'select', default: 'noturno', options: [{ value: 'diurno', label: 'Diurno' }, { value: 'noturno', label: 'Noturno' }] },
  ],
  calcular(i) {
    const nivel = num(i, 'nivel')
    const distancia = num(i, 'distancia')
    const zona = LIMITES_RUIDO[str(i, 'zona')] ?? LIMITES_RUIDO.mista_residencial
    const periodo = str(i, 'periodo') === 'diurno' ? 'diurno' : 'noturno'
    const limite = zona[periodo]
    const noReceptor = nivel - 20 * Math.log10(distancia / 10)
    const conforme = noReceptor <= limite
    const distMin = 10 * Math.pow(10, (nivel - limite) / 20)
    const nivelMax = limite + 20 * Math.log10(distancia / 10)
    return {
      destaques: [
        { label: 'Nível estimado no vizinho', value: n(noReceptor), unit: 'dB(A)' },
        { label: `Limite (${periodo})`, value: n(limite), unit: 'dB(A)' },
        { label: 'Situação', value: conforme ? 'Dentro do limite' : 'Acima do limite' },
        { label: 'Nível máximo a 10 m do PA', value: n(nivelMax), unit: 'dB(A)' },
      ],
      memoria: [
        `Atenuação em campo livre (−6 dB a cada vez que a distância dobra): ${nivel} − 20 × log10(${n(distancia)} ÷ 10) = ${n(noReceptor, 1)} dB(A).`,
        `Limite da NBR 10151:2019 (Tabela 3) para ${zona.label}, período ${periodo}: ${limite} dB(A).`,
        `Para respeitar o limite, o PA precisaria estar a ${n(distMin)} m do vizinho ou operar a no máximo ${n(nivelMax, 1)} dB(A) medidos a 10 m.`,
      ],
      alertas: [
        'O cálculo considera campo livre: vento, barreiras, reflexões e graves (que se propagam mais) mudam o resultado. A medição oficial é no imóvel afetado, conforme a NBR 10151.',
        'A classificação da área e o horário noturno vêm da lei municipal, que pode ser mais restritiva e exigir licença para som amplificado.',
      ],
      estimativa: true,
    }
  },
}
