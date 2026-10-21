import type { Calculator } from './types'
import { n, num, publicoField, riscoField, str, up } from './helpers'

export const brigada: Calculator = {
  slug: 'brigada',
  titulo: 'Brigada de incêndio',
  sub: 'Número mínimo de brigadistas',
  categoria: 'essencial',
  normSlug: 'brigada',
  campos: [publicoField, riscoField],
  calcular(i) {
    const publico = num(i, 'publico')
    const risco = str(i, 'risco')
    const porBrigadista = risco === 'alto' ? 200 : risco === 'medio' ? 350 : 500
    const brigadistas = Math.max(2, up(publico / porBrigadista))
    const lideres = Math.max(1, up(brigadistas / 10))
    const alertas: string[] = []
    if (publico > 250) alertas.push('Público acima de 250 pessoas: a maioria dos Corpos de Bombeiros exige brigada formal e projeto aprovado para evento temporário.')
    alertas.push('Brigadistas precisam de treinamento teórico e prático (NBR 14276) com reciclagem anual. Confira a instrução técnica do Corpo de Bombeiros do seu estado.')
    return {
      destaques: [
        { label: 'Brigadistas', value: n(brigadistas) },
        { label: 'Líderes de brigada', value: n(lideres) },
        { label: 'Pessoas por brigadista', value: n(porBrigadista) },
      ],
      memoria: [
        `Perfil de risco ${risco}: referência de 1 brigadista a cada ${porBrigadista} pessoas (de 1/500 no risco baixo a 1/200 no alto).`,
        `${n(publico)} ÷ ${porBrigadista} = ${n(publico / porBrigadista, 1)}, arredondado para cima, com mínimo de 2 brigadistas → ${brigadistas}.`,
        `1 líder para cada 10 brigadistas → ${lideres}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

export const saidasEmergencia: Calculator = {
  slug: 'saidas-emergencia',
  titulo: 'Saídas de emergência',
  sub: 'Largura e quantidade de saídas',
  categoria: 'essencial',
  normSlug: 'saidas-emergencia',
  campos: [
    publicoField,
    { key: 'chuveiros', label: 'O local tem chuveiros automáticos (sprinklers)?', type: 'select', default: 'nao', options: [{ value: 'nao', label: 'Não' }, { value: 'sim', label: 'Sim' }] },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const chuveiros = str(i, 'chuveiros') === 'sim'
    // NBR 9077 (regra cadastrada): unidade de passagem de 0,60 m para 60 pessoas
    const ups = up(publico / 60)
    const larguraNorma = ups * 0.6
    // Referência operacional: 1 saída de 1,20 m a cada 500 pessoas, mínimo 2
    const saidasRef = Math.max(2, up(publico / 500))
    const larguraRef = saidasRef * 1.2
    const larguraTotal = Math.max(larguraNorma, larguraRef, 2.4)
    const saidas = Math.max(2, saidasRef, up(larguraTotal / 2.4))
    const larguraPorSaida = Math.max(1.2, Math.ceil((larguraTotal / saidas) * 10) / 10)
    const distancia = chuveiros ? 45 : 30
    return {
      destaques: [
        { label: 'Saídas independentes', value: n(saidas) },
        { label: 'Largura total mínima', value: n(larguraTotal, 2), unit: 'm' },
        { label: 'Largura por saída', value: n(larguraPorSaida, 2), unit: 'm' },
        { label: 'Percurso máximo até a saída', value: n(distancia), unit: 'm' },
      ],
      memoria: [
        `Unidades de passagem (NBR 9077): ${n(publico)} ÷ 60 = ${ups} UP × 0,60 m = ${n(larguraNorma, 2)} m.`,
        `Referência operacional: 1 saída de 1,20 m a cada 500 pessoas (mínimo 2) → ${saidasRef} saídas = ${n(larguraRef, 2)} m.`,
        `Adotado o maior valor (mais seguro): ${n(larguraTotal, 2)} m, distribuídos em ${saidas} saídas de pelo menos ${n(larguraPorSaida, 2)} m (mínimo de 1,20 m cada).`,
        `Distância máxima de percurso para locais de reunião: ${distancia} m (${chuveiros ? 'com' : 'sem'} chuveiros automáticos).`,
      ],
      alertas: [
        'As saídas devem ficar em lados opostos ou afastadas entre si, para que um único bloqueio não impeça a evacuação.',
        'Cada estado tem instrução técnica própria (ex.: IT 11 em SP, ITs do CBMERJ no RJ). O projeto deve ser aprovado pelo Corpo de Bombeiros.',
      ],
      estimativa: false,
    }
  },
}

export const equipeMedica: Calculator = {
  slug: 'equipe-medica',
  titulo: 'Equipe médica',
  sub: 'Médicos, socorristas e ambulâncias',
  categoria: 'estrategica',
  normSlug: 'equipe-medica',
  campos: [publicoField, riscoField],
  calcular(i) {
    const publico = num(i, 'publico')
    const risco = str(i, 'risco')
    const blocos = Math.max(1, up(publico / 5000))
    const fator = risco === 'alto' ? 1.5 : 1
    const medicos = up(blocos * fator)
    const socorristas = medicos * 2
    const ambBasica = publico >= 1000 ? 1 + Math.floor(publico / 10000) : 0
    const ambAvancada = publico > 10000 ? up(publico / 20000) : 0
    const postos = Math.max(1, up(publico / 10000))
    const alertas: string[] = []
    if (publico > 1000) alertas.push('Público acima de 1.000 pessoas: a Resolução CFM 2.012/2013 exige assistência médica organizada, com médico responsável técnico.')
    else alertas.push('Mesmo abaixo de 1.000 pessoas, é recomendável ter ao menos um socorrista e um plano de remoção para o hospital mais próximo.')
    alertas.push('Confirme com o Conselho Regional de Medicina do estado se há credenciamento prévio da equipe (no RJ, exigido pelo CREMERJ).')
    return {
      destaques: [
        { label: 'Médicos', value: n(medicos) },
        { label: 'Socorristas', value: n(socorristas) },
        { label: 'Ambulâncias de suporte básico', value: n(ambBasica) },
        { label: 'Ambulâncias UTI (suporte avançado)', value: n(ambAvancada) },
        { label: 'Postos de atendimento', value: n(postos) },
      ],
      memoria: [
        `Referência: 1 médico + 2 socorristas para cada bloco de até 5.000 pessoas → ${blocos} bloco(s).`,
        risco === 'alto' ? `Risco alto: equipe multiplicada por 1,5 → ${medicos} médicos.` : `Risco ${risco}: sem acréscimo.`,
        `Ambulância de suporte básico a partir de 1.000 pessoas, mais 1 a cada 10.000 → ${ambBasica}.`,
        `Ambulância de suporte avançado (UTI) acima de 10.000 pessoas, 1 a cada 20.000 → ${ambAvancada}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}

export const segurancaPatrimonial: Calculator = {
  slug: 'seguranca-patrimonial',
  titulo: 'Segurança patrimonial',
  sub: 'Vigilantes e supervisores',
  categoria: 'estrategica',
  normSlug: 'seguranca-patrimonial',
  campos: [
    publicoField,
    riscoField,
    { key: 'acessos', label: 'Pontos de acesso (portões)', type: 'number', default: 2, min: 1, max: 100 },
  ],
  calcular(i) {
    const publico = num(i, 'publico')
    const risco = str(i, 'risco')
    const acessos = num(i, 'acessos')
    const porVigilante = risco === 'alto' ? 75 : risco === 'medio' ? 120 : 175
    const area = up(publico / porVigilante)
    const portoes = acessos * 2
    const vigilantes = Math.max(2, area + portoes)
    const supervisores = Math.max(1, up(vigilantes / 15))
    const alertas: string[] = []
    if (publico > 1000) alertas.push('Público acima de 1.000 pessoas: elabore o Plano de Segurança e comunique a autoridade policial com antecedência (regra cadastrada indica 30 dias).')
    alertas.push('Solicite policiamento ostensivo à Secretaria de Segurança Pública do estado para eventos de grande porte.')
    return {
      destaques: [
        { label: 'Vigilantes', value: n(vigilantes) },
        { label: 'Supervisores', value: n(supervisores) },
        { label: 'Equipe total', value: n(vigilantes + supervisores) },
      ],
      memoria: [
        `Risco ${risco}: referência de 1 vigilante a cada ${porVigilante} pessoas na área → ${n(publico)} ÷ ${porVigilante} = ${area}.`,
        `Controle de acesso: 2 vigilantes por portão × ${acessos} = ${portoes}.`,
        `Total de vigilantes: ${area} + ${portoes} = ${vigilantes} (mínimo 2). 1 supervisor a cada 15 vigilantes → ${supervisores}.`,
      ],
      alertas,
      estimativa: true,
    }
  },
}
