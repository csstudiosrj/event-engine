'use client'

import { useState } from 'react'
import { ArrowRight, Check, CreditCard, LockKeyhole, MessageCircle, Sparkles, Star, WalletCards, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function Logo() {
  return <a href="/" className="flex items-center gap-2" aria-label="Voltar ao catálogo Event Engine">
    <svg viewBox="0 0 200 200" className="size-9" role="img" aria-label="Logo Event Engine"><rect x="20" y="20" width="160" height="160" rx="38" fill="#0F1B33" /><rect x="55" y="52" width="22" height="96" rx="11" fill="#FFFFFF" /><rect x="55" y="52" width="92" height="22" rx="11" fill="#FFFFFF" /><rect x="55" y="89" width="60" height="22" rx="11" fill="#FFFFFF" /><rect x="55" y="126" width="92" height="22" rx="11" fill="#FFFFFF" /><circle cx="140" cy="100" r="12" fill="#F59E0B" /></svg>
    <span className="text-lg font-bold tracking-tight text-[#0F1B33]">event <span className="text-[#F59E0B]">engine</span></span>
  </a>
}

const plans = [
  { name: 'Grátis', price: 'R$ 0', detail: 'para começar', description: 'Teste a experiência antes de escolher.', features: ['1 cálculo de teste', 'Acesso ao catálogo'], cta: 'Fazer cálculo grátis', muted: true },
  { name: 'Créditos', price: 'R$ 4,90', detail: 'por 5 créditos', description: 'Flexibilidade para usar calculadoras Essenciais.', features: ['Valem para qualquer calculadora Essencial', 'Pagamento via Pix ou cartão', 'Sem assinatura'], cta: 'Comprar créditos' },
  { name: 'Solo', price: 'R$ 29,90', detail: '/mês', description: 'O essencial para organizar um evento com confiança.', features: ['1 evento ativo', 'Painel de acompanhamento', 'Calculadoras Essenciais e Estratégicas', 'PDF com memória de cálculo'], cta: 'Escolher Solo', recommended: true },
  { name: 'Pro', price: 'R$ 49,90', detail: '/mês', description: 'Mais contexto para quem gerencia vários eventos.', features: ['Vários eventos ativos', 'Comparação de cenários', 'Histórico completo', 'Tudo do plano Solo'], cta: 'Escolher Pro' },
]

const eventPackages = [
  ['Até 500 pessoas', 'R$ 149'], ['501 a 1.000', 'R$ 299'], ['1.001 a 2.500', 'R$ 590'], ['2.501 a 5.000', 'R$ 990'],
]

const faqs = [
  ['Posso recalcular?', 'Sim. Você pode recalcular sempre que precisar. Cada novo cálculo Essencial consome um crédito, e os planos mensais incluem o acesso previsto na assinatura.'],
  ['Os créditos expiram?', 'Não. Os créditos comprados ficam disponíveis para você usar quando precisar, em qualquer calculadora Essencial.'],
  ['O cálculo substitui um engenheiro?', 'Não. As calculadoras oferecem estimativas e referências para apoiar decisões. Projetos, laudos e responsabilidades técnicas devem ser conduzidos por profissionais habilitados.'],
  ['Posso trocar de plano?', 'Sim. Você pode mudar de plano quando fizer sentido para o seu momento e manter o histórico da sua conta.'],
]

export default function PricingPage() {
  const [contactOpen, setContactOpen] = useState(false)
  return <div className="min-h-screen bg-[#F7F8FA] text-[#0F1B33]">
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"><Logo /><div className="flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:inline">Já tem conta?</span><Button variant="outline" size="sm" asChild><a href="/">Voltar ao catálogo</a></Button></div></div></header>
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 lg:px-8 lg:pt-14">
      <section className="mx-auto mb-12 max-w-3xl text-center"><Badge className="mb-4 gap-1.5 bg-amber-100 text-amber-800 hover:bg-amber-100"><Sparkles data-icon="inline-start" /> Escolha o seu ritmo</Badge><h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Planeje melhor. Pague pelo que faz sentido.</h1><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Comece com um cálculo grátis, compre créditos quando precisar ou escolha um plano para acompanhar seus eventos de ponta a ponta.</p></section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Planos e opções de compra">{plans.map((plan) => <Card key={plan.name} className={`relative flex flex-col border-slate-200 bg-white ${plan.recommended ? 'border-2 border-[#F59E0B] shadow-lg shadow-amber-100' : ''}`}>{plan.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="gap-1 bg-[#F59E0B] text-[#0F1B33] hover:bg-[#F59E0B]"><Star data-icon="inline-start" /> Recomendado</Badge></div>}<CardHeader className={plan.recommended ? 'pt-7' : ''}><CardTitle className="flex items-center justify-between">{plan.name}{plan.name === 'Créditos' && <CreditCard className="text-amber-600" />}</CardTitle><CardDescription>{plan.description}</CardDescription><div className="pt-3"><span className="text-3xl font-bold">{plan.price}</span><span className="ml-1 text-sm text-slate-500">{plan.detail}</span></div></CardHeader><CardContent className="flex flex-1 flex-col gap-3"><div className="flex flex-col gap-3">{plan.features.map((feature) => <div key={feature} className="flex gap-2 text-sm text-slate-700"><Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />{feature}</div>)}</div></CardContent><CardFooter><Button className={`w-full ${plan.recommended ? 'bg-[#0F1B33] hover:bg-[#1b2b4c]' : ''}`} variant={plan.recommended ? 'default' : plan.muted ? 'outline' : 'secondary'}>{plan.cta}<ArrowRight data-icon="inline-end" /></Button></CardFooter></Card>)}</section>
      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start"><div><div className="mb-6"><p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Para eventos pontuais</p><h2 className="mt-2 text-2xl font-bold">Pacote por evento</h2><p className="mt-2 text-slate-600">Pagamento único, válido por 60 dias. Ideal para contratar o planejamento completo de uma edição.</p></div><Card className="overflow-hidden border-slate-200"><div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"><span>Tamanho do público</span><span>Valor</span></div>{eventPackages.map(([audience, price]) => <div key={audience} className="grid grid-cols-[1fr_auto] items-center border-b border-slate-100 px-5 py-4 last:border-0"><span className="text-sm font-medium">{audience} pessoas</span><span className="font-bold">{price}</span></div>)}</Card></div><Card className="border-[#0F1B33] bg-[#0F1B33] text-white"><CardHeader><div className="flex size-10 items-center justify-center rounded-xl bg-amber-400 text-[#0F1B33]"><MessageCircle /></div><CardTitle className="mt-2 text-white">Mais de 5.000 pessoas?</CardTitle><CardDescription className="text-slate-300">Para festivais e grandes eventos, montamos uma proposta sob medida.</CardDescription></CardHeader><CardContent><Button onClick={() => setContactOpen(true)} className="w-full bg-white text-[#0F1B33] hover:bg-slate-100">Fale com a gente <ArrowRight data-icon="inline-end" /></Button></CardContent></Card></section>
      <section className="mx-auto mt-16 max-w-3xl"><div className="mb-6 text-center"><p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Dúvidas frequentes</p><h2 className="mt-2 text-2xl font-bold">Tudo claro antes de escolher</h2></div><Card className="border-slate-200 bg-white p-5 sm:p-7"><Accordion className="w-full">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="py-5 text-base">{question}</AccordionTrigger><AccordionContent className="pb-4 leading-6 text-slate-600">{answer}</AccordionContent></AccordionItem>)}</Accordion></Card></section>
    </main>
    {contactOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1B33]/50 p-4" role="dialog" aria-modal="true" aria-labelledby="contact-title"><Card className="w-full max-w-md border-slate-200"><CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle id="contact-title">Vamos conversar sobre o seu evento</CardTitle><CardDescription className="mt-2">Preencha os dados e nossa equipe entra em contato.</CardDescription></div><Button variant="ghost" size="icon" onClick={() => setContactOpen(false)} aria-label="Fechar formulário"><X /></Button></div></CardHeader><CardContent className="flex flex-col gap-4"><label className="flex flex-col gap-2 text-sm font-semibold">Nome<Input placeholder="Seu nome" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Evento<Input placeholder="Nome do evento" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Público estimado<Input type="number" placeholder="Ex.: 8000" /></label><label className="flex flex-col gap-2 text-sm font-semibold">WhatsApp<Input placeholder="(00) 00000-0000" /></label><Button className="mt-2 bg-[#0F1B33] hover:bg-[#1b2b4c]">Enviar contato <ArrowRight data-icon="inline-end" /></Button></CardContent></Card></div>}
  </div>
}
