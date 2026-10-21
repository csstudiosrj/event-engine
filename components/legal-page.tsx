import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1B33]">
    <Header />
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">Última atualização: {updated}</p>
      <div className="mt-8 flex flex-col gap-6 text-[15px] leading-7 text-slate-700 [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0F1B33] [&_li]:ml-5 [&_li]:list-disc [&_a]:text-amber-700 [&_a]:underline">
        {children}
      </div>
    </main>
    <Footer />
  </div>
}
