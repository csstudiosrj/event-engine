import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { publicUrl } from '@/lib/config'

export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(publicUrl('/'), { status: 303 })
}
