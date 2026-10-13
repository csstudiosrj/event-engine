import { Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 text-center text-xs text-slate-400 lg:px-8">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          <Zap className="size-3 text-amber-500" />
          Event Engine
        </span>
        <span>
          Todos os direitos reservados à{' '}
          <a
            href="https://arxum.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-500 underline-offset-2 hover:text-[#0F1B33] hover:underline"
          >
            ARXUM group
          </a>
        </span>
      </div>
    </footer>
  )
}
