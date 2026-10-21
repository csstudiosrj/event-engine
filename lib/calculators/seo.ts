// Conteúdo das landings das calculadoras (renderizado no servidor, para o Google).
// Os fatos citados seguem as fontes registradas em FONTES.md.

export type CalculatorSeo = {
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  faq: [string, string][]
}

export const CALCULATOR_SEO: Record<string, CalculatorSeo> = {
  sanitarios: {
    metaTitle: 'Quantos banheiros químicos por pessoa? Calculadora de sanitários para eventos',
    metaDescription: 'Calcule quantos banheiros químicos, mictórios, lavatórios e sanitários acessíveis seu evento precisa, pelo público, duração e regras do Rio de Janeiro e referências técnicas.',
    h1: 'Calculadora de sanitários para eventos',
    intro: [
      'Não existe uma lei federal que diga quantos banheiros um evento precisa. Por isso o número varia de cidade para cidade, e muita gente erra para menos. O Normato aplica a regra do município quando ela existe e, quando não existe, a referência técnica mais usada em eventos de música.',
      'Na capital do Rio de Janeiro, o decreto de autorização de eventos exige no mínimo 1 módulo masculino e 1 feminino para cada 150 pessoas, com pelo menos 10% adaptados para pessoas com deficiência. Nas demais cidades, o cálculo segue o guia de segurança em eventos do HSE (Reino Unido), que separa mulheres, homens e mictórios conforme a duração do evento. A equipe de trabalho tem sanitários próprios pela NR-24.',
    ],
    faq: [
      ['Quantos banheiros químicos por pessoa em um evento?', 'Na capital do RJ, no mínimo 1 masculino e 1 feminino a cada 150 pessoas. Fora dela, a referência do HSE para eventos de 6 horas ou mais é 1 sanitário a cada 100 mulheres e, para homens, 1 a cada 500 mais 1 mictório a cada 150.'],
      ['Quantos banheiros acessíveis são necessários?', 'No estado do Rio de Janeiro, pelo menos 10% dos banheiros químicos devem ser acessíveis, com no mínimo 1. Nas demais localidades, a referência é 5% do total, com no mínimo 1 (NBR 9050).'],
      ['A equipe pode usar os banheiros do público?', 'O ideal é ter sanitários separados. A NR-24 exige 1 instalação com bacia e lavatório para cada 20 trabalhadores, separadas por sexo, e admite banheiros químicos em trabalho temporário.'],
    ],
  },
  brigada: {
    metaTitle: 'Quantos brigadistas um evento precisa? Calculadora de brigada de incêndio (IT 17 SP e NT 5-04 RJ)',
    metaDescription: 'Calcule o número mínimo de brigadistas ou bombeiros civis para o seu evento pelas regras do Corpo de Bombeiros de São Paulo (IT 17/2025) e do Rio de Janeiro (NT 5-04), com extintores.',
    h1: 'Calculadora de brigada de incêndio para eventos',
    intro: [
      'Cada Corpo de Bombeiros tem a sua regra para brigada em eventos, e elas usam critérios diferentes. Em São Paulo, a IT 17/2025 calcula pela lotação máxima do evento. No Rio de Janeiro, a NT 5-04 calcula pela área construída das estruturas montadas, como palcos, tendas e camarotes.',
      'O Normato aplica a regra do estado escolhido e mostra a memória de cálculo com a faixa usada. No RJ, a calculadora também dimensiona os extintores exigidos para as estruturas temporárias.',
    ],
    faq: [
      ['Quantos brigadistas são necessários para um evento de 1.000 pessoas em SP?', 'Pela IT 17/2025 do Corpo de Bombeiros de São Paulo, locais com lotação até 1.000 pessoas precisam de no mínimo 5 brigadistas. De 1.000 a 2.500 pessoas, no mínimo 10.'],
      ['Como é calculada a brigada de eventos no Rio de Janeiro?', 'A NT 5-04 do CBMERJ usa a área total construída. Estruturas temporárias até 200 m² são isentas; de 201 a 500 m² exigem 2 bombeiros civis; de 501 a 2.500 m², 4; e acima disso mais 1 a cada 2.500 m².'],
      ['Posso contratar bombeiros civis no lugar de treinar a equipe?', 'Sim. Em SP a IT 17 permite substituir a brigada da equipe por brigadistas ou bombeiros civis contratados. No RJ a brigada de eventos é formada por bombeiros civis de empresa credenciada.'],
    ],
  },
  'saidas-emergencia': {
    metaTitle: 'Calculadora de saídas de emergência para eventos — largura e lotação (IT 11, IT 12 e NT 5-04)',
    metaDescription: 'Descubra a largura total das saídas de emergência, o número mínimo de saídas e a lotação máxima do seu evento pelas instruções técnicas dos Bombeiros de SP e RJ.',
    h1: 'Calculadora de saídas de emergência para eventos',
    intro: [
      'A largura das saídas de emergência depende do público, do tipo de local e do tempo máximo que as pessoas podem levar para sair. Em São Paulo, eventos até 2.500 pessoas seguem a IT 11 (unidades de passagem de 0,55 m) e eventos maiores seguem a IT 12, que usa taxa de fluxo e tempo de saída. No Rio de Janeiro vale a NT 5-04.',
      'Informe a área disponível para o público e o Normato também calcula a lotação máxima permitida, para você saber se o espaço comporta o público esperado antes de vender ingressos.',
    ],
    faq: [
      ['Qual a largura mínima de uma saída de emergência em evento?', 'A largura mínima é de 1,20 m, tanto nas instruções técnicas de São Paulo (IT 11 e IT 12) quanto na NT 5-04 do Rio de Janeiro.'],
      ['Quantas pessoas por metro quadrado em evento com público em pé?', 'Em São Paulo, a IT 12 admite até 4 pessoas por m² em eventos temporários acima de 2.500 pessoas. No Rio de Janeiro, a NT 5-04 usa 3 pessoas por m² com saídas distintas e 2,5 com saída única.'],
      ['Quantas saídas de emergência um evento precisa?', 'No mínimo duas, em lados distintos. Em eventos grandes em SP, o público deve ser dividido em setores de até 10.000 pessoas, cada um com pelo menos duas saídas.'],
    ],
  },
  acessibilidade: {
    metaTitle: 'Acessibilidade em eventos: calculadora de espaços para cadeira de rodas, vagas e rampas',
    metaDescription: 'Calcule espaços para cadeira de rodas, assentos reservados, vagas para PcD e idosos, sanitários acessíveis e comprimento de rampas conforme o Decreto 5.296, a LBI e a NBR 9050.',
    h1: 'Calculadora de acessibilidade para eventos',
    intro: [
      'A Lei Brasileira de Inclusão obriga locais de espetáculos, estádios e similares a reservar espaços e assentos para pessoas com deficiência, e o Decreto 5.296/2004 define quantos: 2% da lotação até 1.000 lugares e, acima disso, 20 mais 1% do que exceder 1.000.',
      'O Normato calcula também as vagas de estacionamento (2% para pessoas com deficiência e 5% para idosos), os sanitários acessíveis e o comprimento mínimo das rampas, com a memória de cálculo e a lei de cada número.',
    ],
    faq: [
      ['Quantos lugares para cadeira de rodas em um evento?', 'Até 1.000 lugares, 2% da lotação, com no mínimo 1. Acima de 1.000, 20 espaços mais 1% do que exceder 1.000 (Decreto 5.296/2004, art. 23).'],
      ['Quantas vagas de estacionamento para PcD e idosos?', '2% das vagas para veículos de pessoas com deficiência, com no mínimo 1 (Lei 13.146/2015, art. 47), e 5% para pessoas idosas (Lei 10.741/2003, art. 41).'],
      ['Qual a inclinação máxima de uma rampa acessível?', 'A NBR 9050 limita a 8,33%. Nas rotas de saída de eventos em SP, a IT 12 admite até 10%, com patamar a cada 10 m.'],
    ],
  },
  agua: {
    metaTitle: 'Água potável em eventos: é obrigatório oferecer água grátis? Calculadora de pontos de água',
    metaDescription: 'Eventos acima de 1.000 pessoas devem oferecer água potável gratuita (Decreto 13.109/2026). Calcule pontos de distribuição e volume de água para o seu evento.',
    h1: 'Calculadora de água potável para eventos',
    intro: [
      'Desde o Decreto 13.109/2026, eventos abertos ao público com previsão de mais de 1.000 participantes são obrigados a oferecer água potável gratuita, em bebedouros ou embalagens individuais, e todo evento deve permitir a entrada com garrafa de água de uso pessoal.',
      'O Normato calcula quantos pontos de água distribuir, pela referência técnica de 1 ponto a cada 3.000 pessoas, e estima o volume para consumo conforme o clima e a duração.',
    ],
    faq: [
      ['É obrigatório dar água de graça em evento?', 'Sim, para eventos abertos ao público com previsão de mais de 1.000 participantes (Decreto 13.109/2026, art. 4º). Vender água não dispensa a obrigação.'],
      ['O público pode entrar com garrafa de água?', 'Sim. O organizador deve permitir garrafas de uso pessoal com água, podendo restringir apenas o material por segurança, com aviso prévio.'],
      ['Quantos pontos de água colocar no evento?', 'A referência do guia de segurança em eventos do HSE é 1 ponto a cada 3.000 pessoas, mais 1 a cada 10 operadores de alimentação.'],
    ],
  },
  alimentacao: {
    metaTitle: 'Alimentação em eventos: RDC 656/2022, pontos de venda e temperaturas — calculadora',
    metaDescription: 'Estime pontos de venda, refeições e manipuladores para o seu evento e confira as exigências da ANVISA para eventos de massa (RDC 656/2022) e de temperatura (RDC 216/2004).',
    h1: 'Calculadora de alimentação para eventos',
    intro: [
      'Eventos com mais de 1.000 pessoas por dia que vendem ou servem comida seguem a RDC 656/2022 da ANVISA: o formulário de avaliação prévia vai para a vigilância sanitária local até 30 dias antes, e organizador e fornecedores respondem juntos por problemas de saúde.',
      'O Normato estima pontos de venda, refeições e equipe de manipuladores, e lembra as temperaturas exigidas pela RDC 216/2004 para alimentos quentes e refrigerados.',
    ],
    faq: [
      ['Quando a RDC 656/2022 se aplica a um evento?', 'Em eventos públicos ou privados com mais de 1.000 pessoas por dia em que haja manipulação ou venda de alimentos. A vigilância local pode aplicá-la também a eventos menores.'],
      ['Qual a temperatura dos alimentos quentes em evento?', 'Acima de 60 °C por no máximo 6 horas (RDC 216/2004, item 4.8.15). Refrigerados devem ficar abaixo de 5 °C.'],
      ['Precisa de responsável técnico para alimentação em evento?', 'Não em todos os casos: a RDC 656/2022 permite que a autoridade sanitária local exija um profissional habilitado conforme a natureza e a complexidade do evento.'],
    ],
  },
  bebidas: {
    metaTitle: 'Quanto de bebida e gelo comprar para um evento? Calculadora de bebidas',
    metaDescription: 'Estime litros de bebidas alcoólicas e não alcoólicas, gelo e número de bares para o seu evento, com as regras de venda de álcool e da ANVISA.',
    h1: 'Calculadora de bebidas para eventos',
    intro: [
      'Comprar bebida de menos derruba a experiência do público; comprar demais vira prejuízo. O Normato estima o volume de bebidas alcoólicas e não alcoólicas, o gelo e o número de bares a partir do público, da duração e do perfil de consumo.',
      'O resultado também lembra as regras: é proibido vender ou servir álcool a menores de 18 anos (crime previsto no ECA), e eventos com mais de 1.000 pessoas por dia seguem a RDC 656/2022 da ANVISA.',
    ],
    faq: [
      ['Quantos litros de cerveja por pessoa em um evento?', 'Não existe norma: o Normato usa referências de mercado, de 0,15 a 0,5 L por hora por consumidor conforme o perfil, considerando que cerca de 70% do público consome álcool.'],
      ['Quanto gelo comprar para um evento?', 'Uma referência prática é 0,5 kg de gelo por litro de bebida servida. O gelo deve ser feito com água potável.'],
      ['Vender bebida alcoólica para menor é crime?', 'Sim. Vender, fornecer ou servir bebida alcoólica a menores de 18 anos, mesmo de graça, é crime com pena de 2 a 4 anos de detenção (ECA, art. 243).'],
    ],
  },
  ingressos: {
    metaTitle: 'Meia-entrada: quantos ingressos reservar? Calculadora de cota de 40% e receita',
    metaDescription: 'Calcule a cota obrigatória de 40% de meia-entrada, o preço da meia, a receita bruta e o ticket médio do seu evento, conforme a Lei 12.933/2013 e o Decreto 13.108/2026.',
    h1: 'Calculadora de ingressos e meia-entrada',
    intro: [
      'A Lei 12.933/2013 garante meia-entrada em 40% dos ingressos disponíveis para venda em cada evento. Esses ingressos ficam reservados aos beneficiários do início das vendas até 48 horas antes do evento.',
      'O Normato calcula a cota obrigatória, o preço da meia, a receita bruta e o ticket médio, e lembra as regras de transparência do Decreto 13.108/2026, como informar o preço total com as taxas e divulgar o percentual de meias vendidas.',
    ],
    faq: [
      ['Qual a porcentagem obrigatória de meia-entrada?', '40% do total de ingressos disponíveis para venda ao público em cada evento (Lei 12.933/2013 e Decreto 8.537/2015).'],
      ['Quem tem direito à meia-entrada?', 'Estudantes com Carteira de Identificação Estudantil, pessoas com deficiência e acompanhante quando necessário, e jovens de 15 a 29 anos de baixa renda inscritos no CadÚnico. Pessoas com 60 anos ou mais têm desconto de pelo menos 50% pelo Estatuto da Pessoa Idosa.'],
      ['Cortesias contam na cota de meia-entrada?', 'Não. Pelo Decreto 13.108/2026, ingressos promocionais não contam para cumprir o percentual de meia-entrada.'],
    ],
  },
  credenciamento: {
    metaTitle: 'Quantas catracas para um evento? Calculadora de credenciamento e acesso',
    metaDescription: 'Calcule catracas, postos de credenciamento, revistadores e orientadores de fila pela regra de 660 pessoas por catraca por hora dos Bombeiros de SP e RJ.',
    h1: 'Calculadora de credenciamento e controle de acesso',
    intro: [
      'As instruções técnicas dos Bombeiros de São Paulo (IT 12) e do Rio de Janeiro (NT 5-04) exigem que as catracas permitam a entrada de todo o público em no máximo 1 hora, considerando 660 pessoas por catraca por hora.',
      'O Normato calcula as catracas obrigatórias e estima os postos de credenciamento, a equipe de revista e os orientadores de fila conforme o tipo de verificação na entrada.',
    ],
    faq: [
      ['Quantas pessoas passam por uma catraca por hora?', 'As normas de SP e RJ consideram capacidade máxima de 660 pessoas por catraca por hora, e todo o público deve entrar em até 1 hora.'],
      ['Catraca conta como saída de emergência?', 'Não. As catracas devem ser reversíveis para permitir a saída em emergência, mas a largura delas não entra no cálculo das saídas.'],
      ['A revista na entrada é obrigatória para o público?', 'A revista feita por segurança privada só é lícita com adesão voluntária do público (Decreto 13.012/2026, art. 21).'],
    ],
  },
  sonorizacao: {
    metaTitle: 'Limite de ruído para eventos (NBR 10151): calculadora de nível sonoro na vizinhança',
    metaDescription: 'Estime o nível de som que chega ao vizinho do seu evento e compare com os limites da NBR 10151:2019 por tipo de área, de dia e à noite.',
    h1: 'Calculadora de ruído e sonorização para eventos',
    intro: [
      'O limite de ruído de um evento é medido no imóvel do vizinho e depende do tipo de área: a NBR 10151:2019 vai de 35 dB à noite em área rural até 70 dB de dia em área industrial. A Resolução CONAMA 1/1990 manda medir pela NBR, e o município pode ser ainda mais restritivo.',
      'Com o nível medido perto do PA e a distância até o vizinho, o Normato estima quanto som chega lá, compara com o limite e calcula o volume máximo ou a distância mínima para ficar dentro da norma.',
    ],
    faq: [
      ['Qual o limite de barulho permitido à noite em área residencial?', 'Pela NBR 10151:2019, 45 dB em área estritamente residencial e 50 dB em área mista predominantemente residencial, medidos no imóvel afetado.'],
      ['Quanto o som diminui com a distância?', 'Em campo livre, cerca de 6 dB cada vez que a distância dobra. Vento, barreiras e graves mudam esse valor na prática.'],
      ['Quem define se a área é residencial ou mista?', 'A lei de uso e ocupação do solo do município. Ela também pode fixar horários e limites mais restritivos e exigir licença para som amplificado.'],
    ],
  },
  'equipe-medica': {
    metaTitle: 'Quantas ambulâncias e médicos um evento precisa? Calculadora de equipe médica (NT 5-05 RJ)',
    metaDescription: 'Calcule postos médicos, médicos, enfermagem, ambulâncias e maqueiros pela tabela oficial do CBMERJ (NT 5-05) e pela Lei Geral do Esporte para eventos esportivos.',
    h1: 'Calculadora de equipe médica para eventos',
    intro: [
      'No Rio de Janeiro, todo evento com 1.000 pessoas ou mais precisa de Projeto de Atendimento Médico aprovado, e a NT 5-05 do CBMERJ traz uma tabela oficial de postos, macas, médicos, enfermeiros, técnicos e ambulâncias por faixa de público. Em eventos esportivos, a Lei Geral do Esporte exige 1 médico, 2 profissionais de enfermagem e 1 ambulância a cada 10.000 torcedores.',
      'O Normato aplica essas regras e, nos demais estados, usa a tabela do RJ como referência técnica, avisando no resultado. O serviço médico deve estar inscrito no CRM, conforme a Resolução CFM 2.012/2013.',
    ],
    faq: [
      ['Quantas ambulâncias para um evento de 10.000 pessoas?', 'Pela tabela da NT 5-05 (RJ), de 10.000 a 14.999 pessoas: 1 ambulância de suporte avançado (tipo D) e 2 de suporte básico (tipo B), com 3 postos médicos e 3 médicos.'],
      ['Evento esportivo precisa de ambulância?', 'Sim. A Lei 14.597/2023 (Lei Geral do Esporte), art. 149, exige 1 ambulância, 1 médico e 2 profissionais de enfermagem para cada 10.000 torcedores presentes.'],
      ['A partir de quantas pessoas é obrigatório ter atendimento médico?', 'No Rio de Janeiro, a partir de 1.000 pessoas o evento precisa de Projeto de Atendimento Médico aprovado (NT 5-05). Nos demais estados, consulte a Secretaria de Saúde e o Corpo de Bombeiros locais.'],
    ],
  },
  'seguranca-patrimonial': {
    metaTitle: 'Quantos seguranças um evento precisa? Calculadora de segurança patrimonial',
    metaDescription: 'Dimensione vigilantes por portão, saída, barricada e ronda, e supervisores, conforme o Estatuto da Segurança Privada e o Decreto 13.012/2026 para eventos.',
    h1: 'Calculadora de segurança patrimonial para eventos',
    intro: [
      'Não existe proporção legal de seguranças por pessoa no Brasil. O que a lei exige é que a segurança de eventos seja feita por empresa autorizada pela Polícia Federal, com vigilantes que tenham curso de segurança de eventos, e que eventos acima de 1.000 pessoas apresentem projeto de segurança à autoridade local (Decreto 13.012/2026).',
      'Por isso o Normato dimensiona a equipe por postos, como recomenda o guia de segurança em eventos do HSE: revista nos portões, saídas de emergência monitoradas, frente de palco e ronda, mais supervisores.',
    ],
    faq: [
      ['Quantos seguranças por pessoa em um evento?', 'Não há número fixado em lei. O dimensionamento parte dos postos fixos (portões, saídas, palco) e de uma referência de ronda que varia com o risco do evento.'],
      ['Evento precisa de projeto de segurança?', 'Sim, acima de 1.000 pessoas: a empresa de vigilância apresenta o projeto à autoridade local com público, quantidade e posição dos vigilantes e análise de risco (Decreto 13.012/2026, art. 22).'],
      ['O segurança pode ser também o brigadista?', 'Não. O Estatuto da Segurança Privada (Lei 14.967/2024, art. 10) proíbe o mesmo profissional de exercer vigilância e combate a incêndio ao mesmo tempo.'],
    ],
  },
  geradores: {
    metaTitle: 'Qual gerador alugar para um evento? Calculadora de kVA e consumo de diesel',
    metaDescription: 'Calcule a potência do gerador em kVA a partir das cargas de som, luz, vídeo e cozinha do seu evento, com gerador reserva e estimativa de diesel.',
    h1: 'Calculadora de geradores e energia para eventos',
    intro: [
      'Não existe um número de kVA por pessoa: o gerador certo vem do levantamento das cargas de som, iluminação, vídeo, cozinha e climatização. O Normato soma as cargas, aplica fator de simultaneidade e de potência, acrescenta margem para partidas e sugere o tamanho comercial do gerador.',
      'O resultado inclui o gerador reserva (N+1), a estimativa de diesel e um alerta quando o gerador vai operar com carga baixa demais, o que aumenta o consumo.',
    ],
    faq: [
      ['Como calcular o gerador para um evento?', 'Some as potências dos equipamentos em kW, multiplique pela simultaneidade de uso, divida pelo fator de potência para obter kVA e acrescente uma margem de cerca de 25% para partidas e picos.'],
      ['Quanto diesel um gerador consome?', 'Grupos geradores modernos consomem em torno de 0,25 a 0,30 litro por kWh entregue quando operam perto de 75% da carga.'],
      ['Precisa de gerador reserva?', 'É recomendado em eventos em que falta de energia afeta segurança ou o espetáculo. A configuração N+1 mantém um gerador extra pronto para assumir a carga.'],
    ],
  },
  residuos: {
    metaTitle: 'Quanto lixo um evento gera? Calculadora de resíduos e lixeiras',
    metaDescription: 'Estime quilos e litros de resíduos, número de lixeiras e a separação para coleta seletiva do seu evento, com as regras da PNRS e da CONAMA 275.',
    h1: 'Calculadora de resíduos sólidos para eventos',
    intro: [
      'O organizador responde pelo lixo do evento, e em muitos municípios eventos grandes são enquadrados como grandes geradores, com plano de gerenciamento de resíduos obrigatório. O limite é definido pela lei de cada cidade.',
      'O Normato estima o volume de resíduos conforme o público, a duração e a oferta de alimentação, calcula as lixeiras e a divisão entre orgânicos, recicláveis e rejeitos, e lembra o código de cores da coleta seletiva.',
    ],
    faq: [
      ['Quanto lixo uma pessoa gera em um evento?', 'Não há número em norma. Como referência, cada brasileiro gera em média 1,04 kg de resíduos por dia (ABREMA), e estudos de casamentos com refeição indicam cerca de 1,1 kg por convidado.'],
      ['Evento precisa de plano de gerenciamento de resíduos?', 'Depende do município: a Lei 12.305/2010 exige PGRS de quem gera resíduos não equiparados aos domiciliares pelo poder público municipal, e cada cidade define esse limite.'],
      ['Quais as cores das lixeiras da coleta seletiva?', 'Azul para papel, vermelho para plástico, verde para vidro, amarelo para metal, marrom para orgânicos e cinza para rejeitos, entre outras (CONAMA 275/2001).'],
    ],
  },
  'ponto-equilibrio': {
    metaTitle: 'Ponto de equilíbrio de evento: quantos ingressos vender para não ter prejuízo?',
    metaDescription: 'Calcule o ponto de equilíbrio contábil e financeiro do seu evento, a ocupação mínima e o resultado com lotação máxima, considerando taxas e custos por participante.',
    h1: 'Calculadora de ponto de equilíbrio para eventos',
    intro: [
      'O ponto de equilíbrio mostra quantos ingressos é preciso vender para pagar todos os custos do evento. Ele divide os custos fixos pela margem de cada ingresso, que é o preço líquido de taxas menos o custo por participante.',
      'O Normato calcula o ponto de equilíbrio contábil e o financeiro, a ocupação necessária da lotação e o resultado se o evento lotar, com alertas quando o risco de prejuízo é alto.',
    ],
    faq: [
      ['Como calcular o ponto de equilíbrio de um evento?', 'Divida os custos fixos (espaço, palco, cachês, produção) pela margem de contribuição de cada ingresso, que é o preço líquido de taxas e impostos menos o custo variável por participante.'],
      ['Qual a diferença entre ponto de equilíbrio contábil e financeiro?', 'O financeiro desconta dos custos fixos o que não sai do caixa, como a depreciação de equipamento próprio, e por isso costuma ser menor.'],
      ['Qual ocupação é arriscada para um evento?', 'Se é preciso vender mais de 70% da capacidade só para empatar, o risco é alto. Patrocínio e pré-venda ajudam a reduzir esse número.'],
    ],
  },
  orcamento: {
    metaTitle: 'Orçamento de evento: calculadora de custo total e preço mínimo do ingresso',
    metaDescription: 'Monte o orçamento do seu evento com custos fixos, variáveis, contingência, margem e impostos, e descubra o preço médio mínimo do ingresso.',
    h1: 'Calculadora de orçamento consolidado para eventos',
    intro: [
      'Um orçamento de evento junta custos fixos (espaço, estrutura, som e luz, cachês, produção), custos por participante, uma reserva para imprevistos, a margem desejada e os impostos sobre a receita.',
      'O Normato consolida tudo e calcula a receita necessária e o preço médio mínimo do ingresso, lembrando que, com a meia-entrada obrigatória, a inteira precisa ser mais alta que a média.',
    ],
    faq: [
      ['Quanto reservar para imprevistos no orçamento de um evento?', 'A prática de mercado é uma contingência de 10% a 20% sobre os custos. Não é exigência legal, mas protege o caixa.'],
      ['Quais impostos incidem sobre um evento?', 'ISS (municipal, de 2% a 5%), ICMS (estadual, sobre mercadorias) e PIS/COFINS (federais). No Simples Nacional, eles são recolhidos juntos no DAS. Confirme com seu contador.'],
      ['Como chegar ao preço do ingresso?', 'Some custos, contingência e margem, acrescente os impostos sobre a receita e divida pelo público pagante. Depois ajuste a inteira considerando a cota de 40% de meia-entrada.'],
    ],
  },
}
