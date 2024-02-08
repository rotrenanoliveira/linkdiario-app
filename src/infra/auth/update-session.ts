import { decrypt, encrypt } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('_linkdiario:session')?.value

  if (!session) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  const parsed = await decrypt(session)

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now

  parsed.expires = expiresAt

  const res = NextResponse.next()

  res.cookies.set({
    name: '_linkdiario:session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: expiresAt,
  })

  return res
}
