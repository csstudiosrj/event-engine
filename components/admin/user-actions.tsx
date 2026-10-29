'use client'

import { useState } from 'react'
import { ErrorNote, btnDanger, btnPrimary, btnSecondary, field, useAdminAction } from '@/components/admin/admin-client'

type U = { id: string; plan: string; planExpiresAt: string | null; renova: boolean; isAdmin: boolean; isSelf: boolean }

function emUmMes() {
  const d = new Date(Date.now() + 30 * 86400000)
  return d.toISOString().slice(0, 10)
}

export function UserActions({ user }: { user: U }) {
  const { run, busy, error } = useAdminAction()
  const [qtd, setQtd] = useState('5')
  const [motivo, setMotivo] = useState('')
  const [plano, setPlano] = useState(user.plan)
  const [validade, setValidade] = useState(user.planExpiresAt ? user.planExpiresAt.slice(0, 10) : emUmMes())
  const n = Number.parseInt(qtd, 10)

  return <section className="grid gap-4 lg:grid-cols-3">
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">Créditos</h2>
      <p className="mb-3 mt-1 text-xs text-slate-500">Dê créditos de cortesia ou retire créditos (o saldo nunca fica negativo).</p>
      <div className="space-y-2">
        <input className={field} type="number" min={1} value={qtd} onChange={(e) => setQtd(e.target.value)} aria-label="Quantidade" />
        <input className={field} value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Motivo (opcional)" />
        <div className="flex gap-2">
          <button type="button" className={btnPrimary} disabled={!(n > 0) || !!busy} onClick={() => run('add', { acao: 'creditos', userId: user.id, delta: n, motivo })}>Adicionar</button>
          <button type="button" className={btnDanger} disabled={!(n > 0) || !!busy} onClick={() => run('sub', { acao: 'creditos', userId: user.id, delta: -n, motivo }, `Retirar ${n} créditos?`)}>Retirar</button>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">Plano</h2>
      <p className="mb-3 mt-1 text-xs text-slate-500">Libere um plano de cortesia ou corrija a validade. Não gera cobrança.</p>
      <div className="space-y-2">
        <select className={field} value={plano} onChange={(e) => setPlano(e.target.value)}>
          <option value="free">Grátis (sem plano)</option>
          <option value="solo">Solo</option>
          <option value="pro">Pro</option>
        </select>
        {plano !== 'free' && <label className="block text-xs text-slate-600">Válido até<input className={`${field} mt-1`} type="date" value={validade} onChange={(e) => setValidade(e.target.value)} /></label>}
        <button type="button" className={btnPrimary} disabled={!!busy} onClick={() => run('plano', { acao: 'plano', userId: user.id, plan: plano, expiresAt: validade }, plano === 'free' ? 'Remover o plano deste usuário agora?' : undefined)}>Salvar plano</button>
      </div>
    </div>

    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">Assinatura e acesso</h2>
      <div className="mt-3 space-y-2">
        {user.renova ? <>
          <button type="button" className={`${btnSecondary} w-full`} disabled={!!busy} onClick={() => run('cancel', { acao: 'cancelar_assinatura', userId: user.id }, 'Cancelar a renovação automática? O usuário mantém o acesso até o fim do período pago.')}>Cancelar renovação</button>
          <button type="button" className={`${btnDanger} w-full`} disabled={!!busy} onClick={() => run('cancelNow', { acao: 'cancelar_assinatura', userId: user.id, encerrarAgora: true }, 'Cancelar a renovação e encerrar o acesso agora? Para devolver dinheiro, estorne a cobrança no Mercado Pago.')}>Cancelar e encerrar acesso</button>
        </> : <p className="text-sm text-slate-500">Sem renovação automática ativa.</p>}
        {!user.isSelf && <button type="button" className={`${btnSecondary} w-full`} disabled={!!busy} onClick={() => run('admin', { acao: 'admin', userId: user.id, value: !user.isAdmin }, user.isAdmin ? 'Remover o acesso de super admin?' : 'Dar acesso de super admin? A pessoa poderá ver e alterar tudo.')}>{user.isAdmin ? 'Remover super admin' : 'Tornar super admin'}</button>}
      </div>
    </div>
    <div className="lg:col-span-3"><ErrorNote error={error} /></div>
  </section>
}
