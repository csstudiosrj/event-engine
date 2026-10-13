'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error'

type ToastItem = {
  id: number
  message: string
  type: ToastType
}

let addToastFn: ((message: string, type: ToastType) => void) | null = null

export function toast(message: string, type: ToastType = 'success') {
  addToastFn?.(message, type)
}

export function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    addToastFn = (message, type) => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    }
    return () => { addToastFn = null }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2 lg:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all ${
            t.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          {t.type === 'success'
            ? <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            : <XCircle className="mt-0.5 size-4 shrink-0 text-red-600" />}
          <p className="text-sm font-medium">{t.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((i) => i.id !== t.id))}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
