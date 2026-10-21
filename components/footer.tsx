import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1a2f4a] bg-[#0B1F3A] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Normato symbol + wordmark */}
        <div className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Normato"
          >
            {/* N shape — navy background square */}
            <rect width="40" height="40" rx="8" fill="#0B1F3A" />
            {/* Left vertical bar */}
            <rect x="7" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            {/* Right vertical bar */}
            <rect x="27" y="7" width="6" height="26" rx="1.5" fill="#FFFFFF" />
            {/* Diagonal amber stroke */}
            <line
              x1="13"
              y1="7"
              x2="27"
              y2="33"
              stroke="#E8A020"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-white font-semibold text-base tracking-wide">
            Normato
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#8ba4bc]">
          <Link href="/precos" className="hover:text-white transition-colors">Preços</Link>
          <Link href="/termos" className="hover:text-white transition-colors">Termos de uso</Link>
          <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
        </nav>

        {/* Legal */}
        <p className="text-sm text-[#8ba4bc] text-center md:text-right">
          © {year} Todos os direitos reservados à{" "}
          <a
            href="https://arxum.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8A020] hover:underline transition-colors"
          >
            ARXUM group
          </a>
        </p>
      </div>
    </footer>
  )
}
export default Footer
