'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type FlowStep = { label: string; shortLabel?: string }

export const CALCULATION_STEPS: FlowStep[] = [
  { label: 'Evento', shortLabel: 'Evento' },
  { label: 'Parâmetros', shortLabel: 'Parâmetros' },
  { label: 'Conferência', shortLabel: 'Conferência' },
  { label: 'Resultado', shortLabel: 'Resultado' },
]

export function FlowStepper({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Etapas do cálculo" className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {CALCULATION_STEPS.map((step, index) => {
          const complete = index < currentStep
          const active = index === currentStep
          return (
            <li key={step.label} className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold', complete && 'border-[#0F1B33] bg-[#0F1B33] text-white', active && 'border-amber-500 bg-amber-50 text-amber-700', !complete && !active && 'border-slate-200 bg-white text-slate-400')} aria-current={active ? 'step' : undefined}>
                  {complete ? <Check data-icon="inline-start" /> : index + 1}
                </span>
                <span className={cn('hidden truncate text-xs font-semibold sm:block', active ? 'text-[#0F1B33]' : complete ? 'text-slate-600' : 'text-slate-400')}>{step.shortLabel ?? step.label}</span>
              </div>
              {index < CALCULATION_STEPS.length - 1 && <span className={cn('h-px flex-1', index < currentStep ? 'bg-[#0F1B33]' : 'bg-slate-200')} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
