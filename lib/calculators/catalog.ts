// Lista leve das calculadoras (sem fórmulas) para uso em páginas do navegador.

export type CatalogItem = { slug: string; titulo: string; sub: string; categoria: 'essencial' | 'estrategica' }

export const CATALOG: CatalogItem[] = [
  { slug: 'sanitarios', titulo: 'Sanitários', sub: 'Cabines, mictórios e lavatórios', categoria: 'essencial' },
  { slug: 'brigada', titulo: 'Brigada de incêndio', sub: 'Brigadistas ou bombeiros civis exigidos', categoria: 'essencial' },
  { slug: 'saidas-emergencia', titulo: 'Saídas de emergência', sub: 'Largura total, número de saídas e lotação', categoria: 'essencial' },
  { slug: 'acessibilidade', titulo: 'Acessibilidade', sub: 'Espaços, assentos, vagas, sanitários e rampas', categoria: 'essencial' },
  { slug: 'agua', titulo: 'Água potável', sub: 'Pontos de distribuição e volume para consumo', categoria: 'essencial' },
  { slug: 'alimentacao', titulo: 'Alimentação', sub: 'Pontos de venda, refeições e regras sanitárias', categoria: 'essencial' },
  { slug: 'bebidas', titulo: 'Bebidas', sub: 'Volume, gelo e regras de venda', categoria: 'essencial' },
  { slug: 'ingressos', titulo: 'Ingressos e meia-entrada', sub: 'Cota de meia-entrada e receita bruta', categoria: 'essencial' },
  { slug: 'credenciamento', titulo: 'Credenciamento e acesso', sub: 'Catracas, pontos de credenciamento e equipe', categoria: 'essencial' },
  { slug: 'sonorizacao', titulo: 'Ruído e sonorização', sub: 'Nível sonoro na vizinhança e limites', categoria: 'essencial' },
  { slug: 'equipe-medica', titulo: 'Equipe médica', sub: 'Postos, médicos, enfermagem e ambulâncias', categoria: 'estrategica' },
  { slug: 'seguranca-patrimonial', titulo: 'Segurança patrimonial', sub: 'Vigilantes por posto e supervisores', categoria: 'estrategica' },
  { slug: 'geradores', titulo: 'Geradores e energia', sub: 'Potência e combustível pelo levantamento de cargas', categoria: 'estrategica' },
  { slug: 'residuos', titulo: 'Resíduos sólidos', sub: 'Volume, lixeiras e coleta seletiva', categoria: 'estrategica' },
  { slug: 'ponto-equilibrio', titulo: 'Ponto de equilíbrio', sub: 'Quantos ingressos vender para pagar o evento', categoria: 'estrategica' },
  { slug: 'orcamento', titulo: 'Orçamento consolidado', sub: 'Custo total e preço mínimo do ingresso', categoria: 'estrategica' },
]

export function getCalculatorTitle(slug: string) {
  return CATALOG.find((c) => c.slug === slug)?.titulo ?? slug
}
