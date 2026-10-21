import Link from 'next/link'

// Moldura das telas de autenticação, no mesmo visual da página de login.
export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center px-6 py-10 text-white">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="#0B1F3A" />
            <rect width="40" height="40" rx="8" stroke="#1a2f4a" strokeWidth="1" />
            <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            <line x1="13" y1="7" x2="27" y2="33" stroke="#E8A020" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <span className="text-white font-semibold text-xl tracking-wide">Normato</span>
        </Link>
        <div className="bg-[#0d2440] border border-[#1a2f4a] rounded-2xl p-8">
          <h1 className="text-xl font-semibold mb-1">{title}</h1>
          {subtitle && <p className="text-[#8ba4bc] text-sm mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}

export const authInputClass = 'w-full bg-[#0B1F3A] border border-[#1a2f4a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a6480] focus:outline-none focus:border-[#E8A020] transition-colors'
export const authButtonClass = 'w-full bg-[#E8A020] text-[#0B1F3A] font-semibold py-3 rounded-lg text-sm hover:bg-[#d4911c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
export const authErrorClass = 'bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400'
