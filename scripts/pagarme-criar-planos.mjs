// Cria no Pagar.me os planos mensais Solo e Pro e imprime os IDs.
// Uso (uma única vez por conta/ambiente):
//   PAGARME_SECRET_KEY=sk_... node scripts/pagarme-criar-planos.mjs

const key = process.env.PAGARME_SECRET_KEY
if (!key) {
  console.error('Defina PAGARME_SECRET_KEY antes de rodar.')
  process.exit(1)
}

const planos = [
  { env: 'PAGARME_PLAN_SOLO_ID', name: 'Normato Solo', price: 2990 },
  { env: 'PAGARME_PLAN_PRO_ID', name: 'Normato Pro', price: 4990 },
]

for (const plano of planos) {
  const res = await fetch('https://api.pagar.me/core/v5/plans', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${key}:`).toString('base64'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: plano.name,
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      payment_methods: ['credit_card'],
      installments: [1],
      statement_descriptor: 'NORMATO',
      items: [{ name: plano.name, quantity: 1, pricing_scheme: { price: plano.price } }],
    }),
  })
  const body = await res.json()
  if (!res.ok) {
    console.error(`Erro ao criar ${plano.name}:`, JSON.stringify(body))
    process.exit(1)
  }
  console.log(`${plano.env}=${body.id}`)
}
