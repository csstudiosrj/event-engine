'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, CheckCircle2, Copy, Loader2, QrCode, X } from 'lucide-react'
import { withBase } from '@/lib/config'
import { formatBRL } from '@/lib/plans'

export async function adminCall<T = Record<string, unknown>>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(withBase('/api/admin'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error ?? 'Não foi possível concluir.')
  return json as T
}

// Executa uma ação do admin, mostra o erro e atualiza a página ao terminar
export function useAdminAction() {
  const router = useRouter()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const run = async (key: string, body: Record<string, unknown>, confirmText?: string) => {
    if (confirmText && !confirm(confirmText)) return false
    setBusy(key)
    setError(null)
    try {
      await adminCall(body)
      router.refresh()
      return true
    } catch (e) {
      setError((e as Error).message)
      return false
    } finally {
      setBusy(null)
    }
  }
  return { run, busy, error, setError }
}

export function ErrorNote({ error }: { error: string | null }) {
  if (!error) return null
  return <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
}

export const btn = 'inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50'
export const btnPrimary = `${btn} bg-[#0F1B33] text-white hover:bg-[#1b2b4c]`
export const btnSecondary = `${btn} border border-slate-200 bg-white text-slate-700 hover:bg-slate-50`
export const btnDanger = `${btn} border border-red-200 bg-white text-red-700 hover:bg-red-50`
export const field = 'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#0F1B33] focus:ring-2 focus:ring-[#0F1B33]/10'

type Pix = { paymentId: string; copia: string; qr: string | null; link: string | null; expira: string | null; valor: number }

// Pix no próprio painel: QR Code + copia e cola. Confere o pagamento a cada
// poucos segundos e mostra quando a baixa automática acontecer.
export function PixModal({ request, titulo, onClose }: { request: Record<string, unknown>; titulo: string; onClose: () => void }) {
  const router = useRouter()
  const [pix, setPix] = useState<Pix | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [copiado, setCopiado] = useState<'pix' | 'link' | null>(null)
  const [pago, setPago] = useState(false)

  useEffect(() => {
    adminCall<Pix>(request).then(setPix, (e: Error) => setErro(e.message))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pix || pago) return
    const t = setInterval(() => {
      adminCall<{ status: string }>({ acao: 'pagamento_situacao', paymentId: pix.paymentId }).then((r) => {
        if (r.status === 'paid') { setPago(true); router.refresh() }
      }, () => {})
    }, 4000)
    return () => clearInterval(t)
  }, [pix, pago, router])

  const copiar = (texto: string, qual: 'pix' | 'link') => { void navigator.clipboard.writeText(texto); setCopiado(qual) }
  const fechar = () => { router.refresh(); onClose() }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0F1B33]/60 p-4" onClick={fechar}>
      <div role="dialog" aria-label="Pagar com Pix" onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div className="flex items-start justify-between gap-3 text-left">
          <div>
            <h2 className="flex items-center gap-2 font-semibold"><QrCode className="size-[18px] text-amber-600" /> Pix</h2>
            <p className="mt-0.5 text-xs text-slate-500">{titulo}</p>
          </div>
          <button type="button" onClick={fechar} aria-label="Fechar" className="text-slate-400 hover:text-slate-700"><X className="size-[18px]" /></button>
        </div>
        {pix && <p className="text-3xl font-bold">{formatBRL(pix.valor)}</p>}
        {pago ? (
          <div className="space-y-2 py-6">
            <CheckCircle2 className="mx-auto size-11 text-emerald-600" />
            <p className="font-semibold text-emerald-700">Pagamento confirmado</p>
            <p className="text-xs text-slate-500">A baixa foi feita automaticamente.</p>
          </div>
        ) : erro ? (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</p>
        ) : !pix ? (
          <Loader2 className="mx-auto my-16 animate-spin text-amber-600" />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {pix.qr && <img src={`data:image/png;base64,${pix.qr}`} alt="QR Code Pix" width={232} height={232} className="mx-auto rounded-xl border border-slate-100 p-2" />}
            <button type="button" onClick={() => copiar(pix.copia, 'pix')} className={`${btnPrimary} h-11 w-full`}>
              {copiado === 'pix' ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado === 'pix' ? 'Código copiado' : 'Copiar código Pix (copia e cola)'}
            </button>
            {pix.link && <button type="button" onClick={() => copiar(pix.link!, 'link')} className={`${btnSecondary} w-full`}>
              {copiado === 'link' ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado === 'link' ? 'Link copiado' : 'Copiar link de pagamento'}
            </button>}
            <p className="flex items-center justify-center gap-2 text-xs text-slate-500"><Loader2 className="size-3 animate-spin" /> Aguardando o pagamento. A confirmação aparece aqui sozinha.</p>
            {pix.expira && <p className="text-[11px] text-slate-400">Válido até {new Date(pix.expira).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}.</p>}
          </>
        )}
      </div>
    </div>
  )
}

export function TestPixButton() {
  const [valor, setValor] = useState('0,01')
  const [aberto, setAberto] = useState<number | null>(null)
  const cents = Math.round(Number(valor.replace(/\./g, '').replace(',', '.')) * 100)
  return (
    <div className="flex flex-wrap items-end gap-2">
      <label className="text-xs font-medium text-slate-600">Valor (R$)
        <input className={`${field} mt-1 max-w-[7rem]`} value={valor} onChange={(e) => setValor(e.target.value)} inputMode="decimal" />
      </label>
      <button type="button" className={btnPrimary} disabled={!(cents >= 1)} onClick={() => setAberto(cents)}><QrCode className="size-4" /> Gerar Pix de teste</button>
      {aberto !== null && <PixModal request={{ acao: 'pix_teste', amountCents: aberto }} titulo="Cobrança de teste do Normato" onClose={() => setAberto(null)} />}
    </div>
  )
}
