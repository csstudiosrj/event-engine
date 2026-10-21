// Escolhe o provedor de pagamento ativo. PAYMENT_PROVIDER força um deles;
// sem ele, vale o primeiro que tiver chave configurada.

export type Provider = 'mercadopago' | 'pagarme'

export function activeProvider(): Provider | null {
  const forced = process.env.PAYMENT_PROVIDER
  if (forced === 'mercadopago' && process.env.MP_ACCESS_TOKEN) return 'mercadopago'
  if (forced === 'pagarme' && process.env.PAGARME_SECRET_KEY) return 'pagarme'
  if (process.env.MP_ACCESS_TOKEN) return 'mercadopago'
  if (process.env.PAGARME_SECRET_KEY) return 'pagarme'
  return null
}
