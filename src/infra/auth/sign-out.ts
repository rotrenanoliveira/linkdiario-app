'use server'

import { cookies } from 'next/headers'

export async function signOut() {
  cookies().set('_linkdiario:session', '', {
    path: '/',
    maxAge: 0,
  })
}
