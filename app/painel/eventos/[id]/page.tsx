import { redirect } from 'next/navigation'

// Links antigos para /painel/eventos/<id> abrem o evento no painel
export default async function EventRedirect({ params }: { params: Promise<{ id: string }> }) {
  redirect(`/painel?evento=${(await params).id}`)
}
