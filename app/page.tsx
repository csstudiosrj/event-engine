'use client'

import {
  ArrowRight,
  Bath,
  CheckCircle2,
  ChevronRight,
  Flame,
  KeyRound,
  LockKeyhole,
  MessageSquare,
  Shield,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/footer'

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="Event Engine">
      <svg viewBox="0 0 200 200" className="size-9" aria-hidden="true">
        <rect x="20" y="20" width="160" height="160" rx="38" fill="#0F1B33" />
        <rect x="55" y="52" width="22" height="96" rx="11" fill="#FFFFFF" />
        <rect x="55" y="52" width="92" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="89" width="60" height="22" rx="11" fill="#FFFFFF" />
        <rect x="55" y="126" width="92" height="22" rx="11" fill="#FFFFFF" />
        <circle cx="140" cy="100" r="12" fill="#F59E0B" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-[#0F1B33]">
        event <span className="text-[#F59E0B]">engine</span>
      </span>
    </a>
  )
}

const calculadoras = [
  { icon: Users,      name: 'Lotação e capacidade',   desc: 'Público máximo por m² conforme o estado' },
  { icon: Bath,       name: 'Sanitários',              desc: 'Cabines por público, gênero e duração' },
  { icon: Flame,      name: 'Brigada de incêndio',     desc: 'Brigadistas por área conforme NT/CBM' },
  { icon: KeyRound,   name: 'Saídas de emergência',    desc: 'Largura e tempo de escoamento' },
  { icon: Shield,     name: 'Equipe médica',           desc: 'Ambulâncias e postos por faixa de risco' },
  { icon: LockKeyhole,name: 'Segurança patrimonial',   desc: 'Vigilantes conforme Port. DPF 18045/23' },
]

const dores = [
  {
    icon: Timer,
    titulo: 'Horas de pesquisa para cada evento',
    texto: 'Produtores gastam em média 4 horas pesquisando normas do Corpo de Bombeiros, Vigilância Sanitária e DPF — para cada evento. O Event Engine entrega isso em minutos.',
  },
  {
    icon: MessageSquare,
    titulo: 'Insegurança na hora do alvará',
    texto: 'Sem saber se o dimensionamento está correto, o produtor fica refém do órgão. Com o Event Engine, você chega na vistoria com o memorial descritivo já fundamentado na norma certa.',
  },
  {
    icon: Zap,
    titulo: 'Consultoria cara para cada evento',
    texto: 'Contratar um engenheiro de segurança para dimensionar um evento de 500 pessoas custa de R$ 800 a R$ 3.000. O Event Engine faz isso por R$ 4,90.',
  },
]

const planos = [
  {
    nome: 'Créditos',
    preco: 'R$ 4,90',
    periodo: '5 créditos',
    descricao: 'Para quem organiza eventos esporadicamente e não quer assinatura.',
    items: ['Qualquer calculadora essencial', 'Resultado com fundamentação legal', 'Sem mensalidade'],
    cta: 'Comprar créditos',
    href: '/auth/cadastro',
    destaque: false,
  },
  {
    nome: 'Solo',
    preco: 'R$ 29,90',
    periodo: 'por mês',
    descricao: 'Para o produtor que tem pelo menos um evento ativo por vez.',
    items: ['1 evento ativo', 'Todas as calculadoras', 'Memorial descritivo em PDF', 'Fundamentação legal completa'],
    cta: 'Começar grátis',
    href: '/auth/cadastro',
    destaque: true,
  },
  {
    nome: 'Pro',
    preco: 'R$ 49,90',
    periodo: 'por mês',
    descricao: 'Para produtoras com múltiplos eventos simultâneos.',
    items: ['Eventos ilimitados', 'Comparação de cenários', 'Histórico completo', 'Exportar dossiê PDF'],
    cta: 'Assinar Pro',
    href: '/auth/cadastro',
    destaque: false,
  },
]

const faq = [
  {
    q: 'O resultado do Event Engine substitui um engenheiro ou consultor?',
    a: 'Não — e somos transparentes sobre isso. O Event Engine é uma ferramenta de planejamento que aplica as normas técnicas vigentes para gerar estimativas confiáveis. Para eventos que exigem ART ou projeto aprovado, um profissional habilitado continua sendo necessário. O que muda é que você chega a ele (e ao órgão) com o trabalho inicial já feito.',
  },
  {
    q: 'As normas variam por estado. Como o sistema lida com isso?',
    a: 'O Event Engine é jurisdição-aware: você informa o estado e o sistema aplica a norma correta (CBMERJ para RJ, CBPMESP para SP, etc.). Quando não há norma estadual mapeada, usa a NBR Federal como fallback — e exibe um selo de alerta para que você confirme com o órgão local.',
  },
  {
    q: 'O que é o Memorial Descritivo e por que preciso dele?',
    a: 'É o documento técnico com todos os dimensionamentos do evento, fundamentado nas normas legais. Muitos municípios e o próprio Corpo de Bombeiros exigem esse documento para emitir o alvará. O Event Engine gera automaticamente nos planos Solo e Pro.',
  },
  {
    q: 'Posso usar sem assinar?',
    a: 'Sim. Seu primeiro cálculo é gratuito. Depois disso, você pode comprar pacotes de 5 créditos por R$ 4,90 sem precisar de assinatura.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B33]">

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <a href="/precos" className="hidden text-sm font-medium text-slate-600 hover:text-[#0F1B33] sm:block">
              Preços
            </a>
            <a href="/auth/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </a>
            <a href="/auth/cadastro">
              <Button size="sm" className="bg-[#0F1B33] hover:bg-[#1b2b4c]">
                Começar grátis <ArrowRight className="ml-1.5 size-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0F1B33] px-4 py-20 text-white lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#F59E0B22,_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge className="mb-6 gap-1.5 border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/10">
            <Sparkles className="size-3" /> Primeiro cálculo grátis
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
            Tudo que o Corpo de Bombeiros vai exigir do seu evento —{' '}
            <span className="text-[#F59E0B]">em minutos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 lg:text-xl">
            O Event Engine aplica as normas técnicas vigentes — por estado — e entrega o dimensionamento
            correto de brigada, sanitários, equipe médica, saídas de emergência e mais 15 calculadoras.
            Sem pesquisa. Sem dúvida. Sem susto na vistoria.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="/auth/cadastro">
              <Button size="lg" className="w-full bg-[#F59E0B] text-[#0F1B33] hover:bg-amber-400 sm:w-auto">
                Calcular meu evento agora <ArrowRight className="ml-2 size-4" />
              </Button>
            </a>
            <a href="/precos">
              <Button size="lg" variant="ghost" className="w-full border border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Ver planos e preços
              </Button>
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            Sem cartão de crédito. Primeiro cálculo gratuito.
          </p>
        </div>
      </section>

      {/* ── DORES ───────────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">O problema</p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Produzir eventos no Brasil é burocrático por natureza
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Normas que mudam por estado, órgãos diferentes pedindo documentos diferentes, e nenhuma
              ferramenta que centralize tudo isso. Até agora.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {dores.map(({ icon: Icon, titulo, texto }) => (
              <Card key={titulo} className="border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mb-2 font-bold">{titulo}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{texto}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ───────────────────────────────── */}
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">Como funciona</p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">Três passos. Um evento seguro.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { n: '01', titulo: 'Cadastre seu evento', texto: 'Informe nome, data, cidade, público esperado e características do espaço. Esses dados alimentam todas as calculadoras de uma vez.' },
              { n: '02', titulo: 'Escolha a calculadora', texto: 'Selecione o que precisa dimensionar — brigada, sanitários, equipe médica, saídas, segurança. O sistema aplica a norma do seu estado automaticamente.' },
              { n: '03', titulo: 'Use o resultado', texto: 'Receba o dimensionamento fundamentado na lei. Salve, compartilhe ou baixe o Memorial Descritivo em PDF para apresentar ao órgão.' },
            ].map(({ n, titulo, texto }) => (
              <div key={n} className="flex gap-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0F1B33] text-lg font-bold text-[#F59E0B]">
                  {n}
                </div>
                <div>
                  <h3 className="mb-2 font-bold">{titulo}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULADORAS ────────────────────────────────── */}
      <section className="bg-slate-50 px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">O que calculamos</p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              20 calculadoras. Uma plataforma.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Cada calculadora aplica a norma correta para o seu estado — do CBMERJ ao CBPMESP,
              da Portaria federal às regras municipais.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculadoras.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0F1B33] text-white">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-4">
              <p className="text-sm font-medium text-slate-500">
                + 14 calculadoras disponíveis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ────────────────────────────────── */}
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">Por que o Event Engine</p>
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Base legal auditada. Resultado que você pode apresentar.
              </h2>
              <p className="mt-4 text-slate-600">
                Cada parâmetro de cálculo tem rastreabilidade até a fonte oficial —
                número da norma, artigo, data de vigência. Você não recebe um número solto:
                recebe o número e a lei que o sustenta.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {[
                  'Normas por estado: RJ, SP, PE e fallback federal',
                  'Memorial Descritivo gerado automaticamente',
                  'Alertas de recálculo quando o público muda',
                  'Checklist de licenciamento por etapa',
                  'Resultado compartilhável via link ou PDF',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/auth/cadastro" className="mt-8 inline-block">
                <Button className="bg-[#0F1B33] hover:bg-[#1b2b4c]">
                  Começar agora <ArrowRight className="ml-2 size-4" />
                </Button>
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, titulo: 'Base legal verificada', texto: 'Normas auditadas por IA especializada antes de entrar no sistema.' },
                { icon: Timer,       titulo: 'Minutos, não horas',    texto: 'O que levava horas de pesquisa agora leva menos de 5 minutos.' },
                { icon: Zap,         titulo: 'Sempre atualizado',     texto: 'Quando uma norma muda, o sistema atualiza — não a sua planilha.' },
                { icon: Users,       titulo: 'Para todo produtor',    texto: 'Do evento de 200 pessoas ao festival de 50 mil. A mesma ferramenta.' },
              ].map(({ icon: Icon, titulo, texto }) => (
                <Card key={titulo} className="border-slate-200">
                  <CardContent className="p-5">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                      <Icon className="size-5" />
                    </div>
                    <p className="font-semibold">{titulo}</p>
                    <p className="mt-1 text-sm text-slate-500">{texto}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANOS ──────────────────────────────────────── */}
      <section id="precos" className="bg-slate-50 px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">Planos</p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Comece grátis. Pague só quando precisar.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {planos.map((plano) => (
              <Card
                key={plano.nome}
                className={`relative border-2 ${plano.destaque ? 'border-[#0F1B33] shadow-xl' : 'border-slate-200'}`}
              >
                {plano.destaque && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white hover:bg-amber-500">Mais escolhido</Badge>
                  </div>
                )}
                <CardContent className="flex flex-col gap-6 p-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{plano.nome}</p>
                    <div className="mt-2 flex items-end gap-1">
                      <span className="text-4xl font-bold">{plano.preco}</span>
                      <span className="mb-1 text-sm text-slate-500">/{plano.periodo}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{plano.descricao}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {plano.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={plano.href}>
                    <Button
                      className={`w-full ${plano.destaque ? 'bg-[#0F1B33] hover:bg-[#1b2b4c]' : ''}`}
                      variant={plano.destaque ? 'default' : 'outline'}
                    >
                      {plano.cta} <ChevronRight className="ml-1 size-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">Dúvidas frequentes</p>
            <h2 className="text-3xl font-bold tracking-tight">Perguntas e respostas</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faq.map(({ q, a }) => (
              <Card key={q} className="border-slate-200">
                <CardContent className="p-6">
                  <p className="font-semibold">{q}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section className="bg-[#0F1B33] px-4 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Seu próximo evento começa com o dimensionamento certo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Cadastre-se gratuitamente e faça seu primeiro cálculo agora.
            Sem cartão de crédito. Sem burocracia.
          </p>
          <a href="/auth/cadastro" className="mt-8 inline-block">
            <Button size="lg" className="bg-[#F59E0B] text-[#0F1B33] hover:bg-amber-400">
              Criar conta grátis <ArrowRight className="ml-2 size-4" />
            </Button>
          </a>
          <p className="mt-4 text-sm text-slate-400">
            Primeiro cálculo gratuito. Cancele quando quiser.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
