// Configurações globais do Normato.

// Mesmo valor de `basePath` em next.config.mjs. <Link> e router já aplicam o
// prefixo sozinhos; fetch(), <form action> e URLs absolutas precisam dele.
export const BASE_PATH = '/normato'

// URL pública do site (sem barra no final), usada em redirecionamentos externos
// (e-mail de confirmação, retorno do checkout).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arxum.com.br').replace(/\/$/, '') + BASE_PATH

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contato@arxum.com.br'

export function withBase(path: string) {
  return `${BASE_PATH}${path}`
}

// URL absoluta no domínio público. Redirecionamentos do servidor usam esta função
// porque o arxum.com.br repassa /normato para o domínio *.vercel.app: o host da
// requisição que chega ao Next não é o que o visitante vê.
export function publicUrl(path: string, search?: URLSearchParams) {
  const qs = search && [...search.keys()].length ? `?${search.toString()}` : ''
  return `${SITE_URL}${path}${qs}`
}

// Identificação do responsável pelo serviço (Termos e Política de Privacidade)
export const COMPANY = {
  nome: process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'ARXUM group',
  cnpj: process.env.NEXT_PUBLIC_COMPANY_CNPJ ?? '',
  cidade: process.env.NEXT_PUBLIC_COMPANY_CITY ?? '',
}
