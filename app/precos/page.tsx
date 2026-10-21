'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, CreditCard, MessageCircle, Sparkles, Star } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useApp } from '@/components/app-shell'
import { CONTACT_EMAIL, withBase } from '@/lib/config'
import { hasActivePlan, type ProductId } from '@/lib/plans'

type Plan = { name: string; price: string; detail: string; description: string; features: string[]; cta: string; product: ProductId | null; recommended?: boolean }

const plans: Plan[] = [
  { name: 'Grátis', price: 'R$ 0', detail: 'para começar', description: 'Teste a experiência antes de escolher.', features: ['1 crédito ao criar a conta', 'Acesso ao catálogo', 'Memória de cálculo e fundamentação'], cta: 'Criar conta grátis', product: null },
  { name: 'Créditos', price: 'R$ 4,90', detail: 'por 5 créditos', description: 'Pague só quando usar as calculadoras Essenciais.', features: ['1 crédito por cálculo Essencial', 'Pix ou cartão', 'Créditos não expiram', 'Sem assinatura'], cta: 'Comprar créditos', product: 'creditos_5' },
  { name: 'Solo', price: 'R$ 29,90', detail: '/mês', description: 'Para organizar um evento com confiança.', features: ['Cálculos ilimitados', 'Calculadoras Essenciais e Estratégicas', '1 evento ativo no painel', 'Histórico de cálculos', 'Cancele quando quiser'], cta: 'Assinar Solo', product: 'solo', recommended: true },
  { name: 'Pro', price: 'R$ 49,90', detail: '/mês', description: 'Para quem gerencia vários eventos.', features: ['Tudo do plano Solo', 'Eventos ativos ilimitados', 'Histórico completo por evento', 'Cancele quando quiser'], cta: 'Assinar Pro', product: 'pro' },
]

const faqs = [
  ['O que são as calculadoras Essenciais e Estratégicas?', 'Essenciais: sanitários, brigada, saídas de emergência, acessibilidade, água, alimentação, bebidas, ingressos, credenciamento e ruído. Usam 1 crédito por cálculo. Estratégicas: equipe médica, segurança patrimonial, geradores, resíduos, ponto de equilíbrio e orçamento. Fazem parte dos planos Solo e Pro.'],
  ['Posso recalcular?', 'Sim. Cada novo cálculo Essencial consome 1 crédito. Nos planos Solo e Pro os cálculos são ilimitados.'],
  ['Os créditos expiram?', 'Não. Os créditos comprados ficam na sua conta até você usar.'],
  ['Como cancelo a assinatura?', 'Na página Minha conta, com um clique. O acesso continua até o fim do período já pago e não há nova cobrança.'],
  ['O cálculo substitui um engenheiro?', 'Não. As calculadoras dão estimativas e referências para planejar. Projetos, laudos e responsabilidade técnica são de profissionais habilitados, e a aprovação é dos órgãos competentes.'],
  ['Quais formas de pagamento?', 'Créditos: Pix ou cartão de crédito. Planos mensais: cartão de crédito, com renovação automática. O pagamento é processado pelo Pagar.me.'],
]

export default function PricingPage() {
  const router = useRouter()
  const { profile } = useApp()
  const [loading, setLoading] = useState<ProductId | null>(null)
  const [error, setError] = useState<string | null>(null)

  const buy = async (product: ProductId | null) => {
    setError(null)
    if (!profile) { router.push(`/auth/cadastro?redirectTo=${encodeURIComponent('/precos')}`); return }
    if (!product) { router.push('/#calculadoras'); return }
    setLoading(product)
    try {
      const res = await fetch(withBase('/api/checkout'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product }) })
      const body = await res.json()
      if (res.ok && body.url) { window.location.href = body.url; return }
      setError(body.error === 'plano_ativo' ? 'Você já tem uma assinatura ativa. Para trocar de plano, cancele a atual em Minha conta.' : 'Não foi possível abrir o pagamento agora. Tente novamente em instantes.')
    } catch {
      setError('Não foi possível abrir o pagamento agora. Tente novamente em instantes.')
    }
    setLoading(null)
  }

  const planoAtual = hasActivePlan(profile) ? profile!.plan : null

  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
    <Header />
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-10 lg:px-8 lg:pt-14">
      <section className="mx-auto mb-12 max-w-3xl text-center"><Badge className="mb-4 gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Sparkles data-icon="inline-start" /> Escolha o seu ritmo</Badge><h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Planeje melhor. Pague pelo que faz sentido.</h1><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Comece com um crédito grátis, compre créditos quando precisar ou assine um plano para usar todas as calculadoras sem limite.</p></section>
      {error && <p role="alert" className="mx-auto mb-6 max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-700">{error}</p>}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Planos e opções de compra">{plans.map((plan) => {
        const atual = plan.product !== null && plan.product === planoAtual
        return <Card key={plan.name} className={`relative flex flex-col border-slate-200 bg-white ${plan.recommended ? 'border-2 border-[#F59E0B] shadow-lg shadow-amber-100' : ''}`}>
          {plan.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="gap-1 bg-[#F59E0B] text-[#0F1B33] hover:bg-[#F59E0B]"><Star data-icon="inline-start" /> Recomendado</Badge></div>}
          <CardHeader className={plan.recommended ? 'pt-7' : ''}><CardTitle className="flex items-center justify-between">{plan.name}{plan.name === 'Créditos' && <CreditCard className="text-amber-600" />}</CardTitle><CardDescription>{plan.description}</CardDescription><div className="pt-3"><span className="text-3xl font-bold">{plan.price}</span><span className="ml-1 text-sm text-slate-500">{plan.detail}</span></div></CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3">{plan.features.map((feature) => <div key={feature} className="flex gap-2 text-sm text-slate-700"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />{feature}</div>)}</CardContent>
          <CardFooter><Button disabled={loading !== null || atual || (plan.product === null && !!profile)} onClick={() => buy(plan.product)} className={`h-10 w-full ${plan.recommended ? 'bg-[#0F1B33] text-white hover:bg-[#1b2b4c]' : ''}`} variant={plan.recommended ? 'default' : plan.product === null ? 'outline' : 'secondary'}>{atual ? 'Seu plano atual' : plan.product === null && profile ? 'Você já tem conta' : loading === plan.product && loading !== null ? 'Abrindo pagamento...' : <>{plan.cta}<ArrowRight data-icon="inline-end" /></>}</Button></CardFooter>
        </Card>
      })}</section>
      <p className="mt-4 text-center text-xs text-slate-500">Pagamento seguro processado pelo Pagar.me. Valores em reais.</p>

      <section className="mx-auto mt-16 max-w-3xl"><Card className="border-[#0F1B33] bg-[#0F1B33] text-white"><CardHeader><div className="flex size-10 items-center justify-center rounded-xl bg-amber-400 text-[#0F1B33]"><MessageCircle /></div><CardTitle className="mt-2 text-white">Festival ou evento acima de 5.000 pessoas?</CardTitle><CardDescription className="text-slate-300">Montamos uma proposta sob medida, com acompanhamento técnico.</CardDescription></CardHeader><CardContent><a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Normato — proposta para grande evento')}`} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-[#0F1B33] hover:bg-slate-100">Fale com a gente <ArrowRight className="size-4" /></a></CardContent></Card></section>

      <section className="mx-auto mt-16 max-w-3xl"><div className="mb-6 text-center"><p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Dúvidas frequentes</p><h2 className="mt-2 text-2xl font-bold">Tudo claro antes de escolher</h2></div><Card className="border-slate-200 bg-white p-5 sm:p-7"><Accordion className="w-full">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="py-5 text-base">{question}</AccordionTrigger><AccordionContent className="pb-4 leading-6 text-slate-600">{answer}</AccordionContent></AccordionItem>)}</Accordion></Card></section>
    </main>
    <Footer />
  </div>
}
