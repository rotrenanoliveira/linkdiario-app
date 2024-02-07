import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.has('_linkdiario:token')

  if (!hasToken) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  NextResponse.next()
}
