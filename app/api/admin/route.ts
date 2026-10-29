import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin'
import { cancelMercadoPagoSubscription, createMercadoPagoPix, mercadopago, refundMercadoPagoPayment } from '@/lib/mercadopago'
import { pagarme } from '@/lib/pagarme'
import { fulfillPayment, paymentCredits, paymentKind } from '@/lib/fulfillment'
import type { createAdminClient } from '@/lib/supabase/admin'
import type { Payment } from '@/lib/supabase/types'

// Ações do super admin. Toda chamada confere profiles.is_admin no servidor.

type Admin = ReturnType<typeof createAdminClient>
type Body = Record<string, unknown>

class Falha extends Error {}
const falha = (msg: string) => { throw new Falha(msg) }

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const int = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) ? v : Number.NaN)

// E-mail de pagador da cobrança de teste. Não pode ser o da própria conta Mercado
// Pago (o MP recusa quem paga a si mesmo), então usamos um endereço fixo.
const PAGADOR_TESTE = 'pagamento.teste@arxum.com.br'

async function pagamento(admin: Admin, id: string) {
  const { data } = await admin.from('payments').select('*').eq('id', id).maybeSingle()
  return data ?? falha('Compra não encontrada.')
}

async function ajustarCreditos(admin: Admin, userId: string, delta: number, motivo: string) {
  if (!delta) return
  if (delta > 0) {
    const { error } = await admin.rpc('grant_credits', { p_user_id: userId, p_amount: delta, p_type: 'bonus', p_description: motivo })
    if (error) falha('Não foi possível ajustar os créditos.')
    return
  }
  const { data: perfil } = await admin.from('profiles').select('credits').eq('id', userId).single()
  const novo = Math.max(0, (perfil?.credits ?? 0) + delta)
  await admin.from('profiles').update({ credits: novo, updated_at: new Date().toISOString() }).eq('id', userId)
  await admin.from('credit_transactions').insert({ user_id: userId, amount: (perfil?.credits ?? 0) - novo, type: 'spend', description: motivo })
}

// Pix com QR Code para a compra: cobrança de teste ou reenvio ao cliente
async function gerarPix(admin: Admin, p: Payment) {
  if (p.status !== 'pending') falha('Só é possível gerar Pix para compra pendente.')
  if (paymentKind(p) === 'subscription') falha('Assinaturas são cobradas no cartão pelo Mercado Pago.')
  if (!process.env.MP_ACCESS_TOKEN) falha('O Mercado Pago não está configurado (MP_ACCESS_TOKEN).')

  let email = PAGADOR_TESTE
  if (paymentKind(p) !== 'test') {
    const { data: cliente } = await admin.from('profiles').select('email').eq('id', p.user_id).single()
    email = cliente?.email ?? PAGADOR_TESTE
  }
  const pix = await createMercadoPagoPix({ paymentId: p.id, amountCents: p.amount_cents, description: p.description ?? 'Normato', payerEmail: email, attempt: Date.now() })
  const td = pix.point_of_interaction?.transaction_data
  if (!td?.qr_code) falha('O Mercado Pago não devolveu o Pix. Confira se a conta tem chave Pix cadastrada.')
  await admin.from('payments').update({ external_id: String(pix.id), provider: 'mercadopago', pix_qr_code: td!.qr_code! }).eq('id', p.id)
  return { paymentId: p.id, copia: td!.qr_code!, qr: td!.qr_code_base64 ?? null, link: td!.ticket_url ?? null, expira: pix.date_of_expiration ?? null, valor: p.amount_cents }
}

// Consulta o Mercado Pago e dá baixa se o Pix já foi pago (mesmo sem o webhook)
async function situacao(admin: Admin, p: Payment) {
  if (p.status === 'pending' && p.provider === 'mercadopago' && p.external_id && /^\d+$/.test(p.external_id)) {
    const mp = await mercadopago(`/v1/payments/${p.external_id}`).catch(() => null)
    if (mp?.status === 'approved' && Math.round(Number(mp.transaction_amount) * 100) >= p.amount_cents) {
      await fulfillPayment(admin, p, { external_id: String(mp.id) })
      return 'paid'
    }
  }
  return p.status
}

async function estornar(admin: Admin, p: Payment, retirarCreditos: boolean) {
  if (p.status !== 'paid') falha('Só compras pagas podem ser estornadas.')
  if (paymentKind(p) === 'subscription') falha('Estorne cobranças de assinatura direto no painel do Mercado Pago.')
  if (p.provider === 'mercadopago') {
    if (!p.external_id || !/^\d+$/.test(p.external_id)) falha('Esta compra não tem o número do pagamento no Mercado Pago. Estorne pelo painel do Mercado Pago.')
    await refundMercadoPagoPayment(p.external_id!, `refund-${p.id}`)
  } else if (p.provider === 'pagarme') {
    if (!p.pagarme_order_id) falha('Compra sem pedido do Pagar.me.')
    const order = await pagarme(`/orders/${p.pagarme_order_id}`)
    const chargeId = order.charges?.[0]?.id
    if (!chargeId) falha('Cobrança do Pagar.me não encontrada.')
    await pagarme(`/charges/${chargeId}`, { method: 'DELETE' })
  }
  await admin.from('payments').update({ status: 'refunded', refunded_at: new Date().toISOString() }).eq('id', p.id)
  if (retirarCreditos && paymentKind(p) === 'credits') await ajustarCreditos(admin, p.user_id, -paymentCredits(p), `Estorno: ${p.description ?? p.product}`)
}

async function salvarPlano(admin: Admin, b: Body) {
  const id = str(b.id).toLowerCase()
  const kind = b.kind === 'subscription' ? 'subscription' : 'credits'
  if (!/^[a-z0-9_]{2,40}$/.test(id)) falha('Código do plano inválido: use letras minúsculas, números e _.')
  if (kind === 'subscription' && id !== 'solo' && id !== 'pro') falha('Só existem as assinaturas Solo e Pro.')
  const name = str(b.name)
  if (!name) falha('Informe o nome.')
  const amount = int(b.amount_cents)
  if (!(amount >= 1 && amount <= 10_000_000)) falha('Preço inválido.')
  const credits = kind === 'credits' ? int(b.credits) : null
  if (kind === 'credits' && !(credits! >= 1 && credits! <= 100_000)) falha('Quantidade de créditos inválida.')
  const features = Array.isArray(b.features) ? b.features.map(str).filter(Boolean).slice(0, 12) : []

  const { data: existente } = await admin.from('plans').select('kind').eq('id', id).maybeSingle()
  if (existente && existente.kind !== kind) falha('Não é possível trocar o tipo de um plano existente.')
  if (!existente && b.novo !== true) falha('Plano não encontrado.')
  if (existente && b.novo === true) falha('Já existe um plano com esse código.')

  const dados = {
    name, description: str(b.description), amount_cents: amount, credits, features,
    highlight: b.highlight === true, active: b.active !== false, sort: Number.isFinite(int(b.sort)) ? int(b.sort) : 100,
    updated_at: new Date().toISOString(),
  }
  const { error } = existente
    ? await admin.from('plans').update(dados).eq('id', id)
    : await admin.from('plans').insert({ id, kind, ...dados })
  if (error) falha(error.message.includes('relation') ? 'Rode o SQL do super admin no Supabase antes de editar planos.' : 'Não foi possível salvar o plano.')
}

function revalidarVitrine() {
  revalidatePath('/precos')
  revalidatePath('/')
}

export async function POST(request: Request) {
  const sessao = await requireAdmin()
  if (!sessao) return NextResponse.json({ error: 'Acesso restrito.' }, { status: 403 })
  const { admin, profile } = sessao
  const b = ((await request.json().catch(() => null)) ?? {}) as Body

  try {
    switch (b.acao) {
      case 'creditos': {
        const delta = int(b.delta)
        if (!Number.isFinite(delta) || delta === 0 || Math.abs(delta) > 100_000) falha('Informe uma quantidade válida.')
        await ajustarCreditos(admin, str(b.userId), delta, `Ajuste do admin${str(b.motivo) ? `: ${str(b.motivo)}` : ''}`)
        return NextResponse.json({ ok: true })
      }

      case 'plano': {
        const plano = b.plan === 'solo' || b.plan === 'pro' ? b.plan : 'free'
        const expira = plano === 'free' ? null : new Date(`${str(b.expiresAt)}T23:59:59-03:00`)
        if (expira && Number.isNaN(expira.getTime())) falha('Informe a data de validade do plano.')
        await admin.from('profiles').update({ plan: plano, plan_expires_at: expira?.toISOString() ?? null, updated_at: new Date().toISOString() }).eq('id', str(b.userId))
        return NextResponse.json({ ok: true })
      }

      case 'cancelar_assinatura': {
        const { data: u } = await admin.from('profiles').select('subscription_id, subscription_provider').eq('id', str(b.userId)).single()
        if (!u?.subscription_id) falha('Este usuário não tem assinatura com renovação ativa.')
        if (u!.subscription_provider === 'mercadopago') await cancelMercadoPagoSubscription(u!.subscription_id!)
        else await pagarme(`/subscriptions/${u!.subscription_id}`, { method: 'DELETE', body: { cancel_pending_invoices: true } })
        await admin.from('profiles').update({
          subscription_id: null, pagarme_subscription_id: null,
          ...(b.encerrarAgora === true ? { plan_expires_at: new Date().toISOString() } : {}),
        }).eq('id', str(b.userId))
        return NextResponse.json({ ok: true })
      }

      case 'admin': {
        if (str(b.userId) === profile.id) falha('Você não pode remover o seu próprio acesso.')
        await admin.from('profiles').update({ is_admin: b.value === true }).eq('id', str(b.userId))
        return NextResponse.json({ ok: true })
      }

      case 'pagamento_pago': {
        const p = await pagamento(admin, str(b.paymentId))
        if (p.status !== 'pending') falha('Só compras pendentes podem ser marcadas como pagas.')
        if (paymentKind(p) === 'subscription') falha('Para liberar um plano, use “Plano” na página do usuário.')
        await fulfillPayment(admin, p)
        return NextResponse.json({ ok: true })
      }

      case 'pagamento_cancelar': {
        await admin.from('payments').update({ status: 'canceled' }).eq('id', str(b.paymentId)).eq('status', 'pending')
        return NextResponse.json({ ok: true })
      }

      case 'pagamento_estornar': {
        await estornar(admin, await pagamento(admin, str(b.paymentId)), b.retirarCreditos !== false)
        return NextResponse.json({ ok: true })
      }

      case 'pagamento_pix':
        return NextResponse.json(await gerarPix(admin, await pagamento(admin, str(b.paymentId))))

      case 'pagamento_situacao':
        return NextResponse.json({ status: await situacao(admin, await pagamento(admin, str(b.paymentId))) })

      case 'pix_teste': {
        const valor = int(b.amountCents)
        if (!(valor >= 1 && valor <= 100_000)) falha('Valor entre R$ 0,01 e R$ 1.000,00.')
        const { data: p, error } = await admin.from('payments').insert({
          user_id: profile.id, product: 'teste', kind: 'test', amount_cents: valor, provider: 'mercadopago', description: 'Cobrança de teste do Normato',
        }).select('*').single()
        if (error || !p) falha('Não foi possível registrar a cobrança. Rode o SQL do super admin no Supabase.')
        return NextResponse.json(await gerarPix(admin, p!))
      }

      case 'plano_salvar':
        await salvarPlano(admin, b)
        revalidarVitrine()
        return NextResponse.json({ ok: true })

      case 'plano_excluir': {
        const id = str(b.id)
        if (id === 'solo' || id === 'pro') falha('As assinaturas Solo e Pro podem ser desativadas, mas não excluídas.')
        await admin.from('plans').delete().eq('id', id).eq('kind', 'credits')
        revalidarVitrine()
        return NextResponse.json({ ok: true })
      }

      case 'config_salvar': {
        const n = int(b.signupCredits)
        if (!(n >= 0 && n <= 1000)) falha('Créditos de boas-vindas entre 0 e 1000.')
        const { error } = await admin.from('app_settings').upsert({ key: 'signup_credits', value: n, updated_at: new Date().toISOString() })
        if (error) falha('Rode o SQL do super admin no Supabase antes de salvar.')
        revalidarVitrine()
        return NextResponse.json({ ok: true })
      }

      default:
        return NextResponse.json({ error: 'Ação desconhecida.' }, { status: 400 })
    }
  } catch (e) {
    if (e instanceof Falha) return NextResponse.json({ error: e.message }, { status: 400 })
    console.error('[admin]', b.acao, e)
    const detalhe = e instanceof Error ? e.message.slice(0, 300) : ''
    return NextResponse.json({ error: `O provedor de pagamento recusou a operação. ${detalhe}` }, { status: 502 })
  }
}

