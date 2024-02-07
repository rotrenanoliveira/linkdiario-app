import { env } from '@/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  cookies().set('_linkdiario:token', '', {
    path: '/',
    maxAge: 0,
  })

  return NextResponse.redirect(new URL('/', env.HOST))
}
