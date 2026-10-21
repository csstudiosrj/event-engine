import { ImageResponse } from 'next/og'

// Imagem exibida ao compartilhar o site (WhatsApp, LinkedIn, redes sociais)
export const alt = 'Normato — calculadoras para dimensionar eventos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0B1F3A', padding: 72, color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 88, height: 88, borderRadius: 18, background: '#0B1F3A', border: '2px solid #1a2f4a', display: 'flex', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 15, top: 15, width: 13, height: 58, background: '#fff', borderRadius: 3 }} />
            <div style={{ position: 'absolute', right: 15, top: 15, width: 13, height: 58, background: '#fff', borderRadius: 3 }} />
            <div style={{ position: 'absolute', left: 38, top: 10, width: 13, height: 68, background: '#E8A020', borderRadius: 6, transform: 'rotate(-28deg)' }} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 700 }}>Normato</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>Dimensione seu evento com base nas normas</div>
          <div style={{ fontSize: 32, color: '#8ba4bc' }}>Brigada · Saídas de emergência · Sanitários · Equipe médica · Acessibilidade</div>
        </div>
        <div style={{ fontSize: 28, color: '#E8A020' }}>arxum.com.br/normato</div>
      </div>
    ),
    size,
  )
}
