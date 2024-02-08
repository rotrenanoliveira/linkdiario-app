import { NextRequest } from 'next/server'
import { updateSession } from './infra/auth'

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
