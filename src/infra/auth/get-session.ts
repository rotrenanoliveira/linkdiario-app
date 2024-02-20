import { cookies } from 'next/headers'

import { decrypt } from '@/lib/auth'

export async function getSession() {
  const session = cookies().get('_linkdiario:session')?.value
  if (!session) return null

  const payload = await decrypt(session)

  return payload
}
