'use client'

import { useState } from 'react'
import { ErrorNote, PixModal, btnDanger, btnSecondary, useAdminAction } from '@/components/admin/admin-client'

type P = { id: string; status: string; kind: 'credits' | 'subscription' | 'test'; description: string; credits: number }

// Ações de uma compra na lista de pagamentos
export function PaymentActions({ p }: { p: P }) {
  const { run, busy, error } = useAdminAction()
  const [pix, setPix] = useState(false)

  if (p.kind === 'subscription') return <span className="text-xs text-slate-400">Pelo Mercado Pago</span>

  return <div className="flex flex-col items-end gap-2">
    <div className="flex flex-wrap justify-end gap-1.5">
      {p.status === 'pending' && <>
        <button type="button" className={btnSecondary} onClick={() => setPix(true)}>Gerar Pix</button>
        <button type="button" className={btnSecondary} disabled={!!busy} onClick={() => run('pago', { acao: 'pagamento_pago', paymentId: p.id }, `Marcar como paga${p.kind === 'credits' ? ` e liberar ${p.credits} créditos` : ''}? Use só se o dinheiro já entrou.`)}>Marcar paga</button>
        <button type="button" className={btnDanger} disabled={!!busy} onClick={() => run('cancelar', { acao: 'pagamento_cancelar', paymentId: p.id }, 'Cancelar esta compra pendente?')}>Cancelar</button>
      </>}
      {p.status === 'paid' && <button type="button" className={btnDanger} disabled={!!busy} onClick={() => run('estornar', { acao: 'pagamento_estornar', paymentId: p.id, retirarCreditos: true }, `Estornar ${p.description}? O valor volta para quem pagou${p.kind === 'credits' ? ` e ${p.credits} créditos são retirados da conta (até o saldo disponível)` : ''}.`)}>{busy === 'estornar' ? 'Estornando...' : 'Estornar'}</button>}
    </div>
    <ErrorNote error={error} />
    {pix && <PixModal request={{ acao: 'pagamento_pix', paymentId: p.id }} titulo={`${p.description}. Envie o código ou o link para o cliente.`} onClose={() => setPix(false)} />}
  </div>
}
