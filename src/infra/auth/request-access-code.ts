import { hash } from 'bcryptjs'

import { AccessCodeRepository, AccountsRepository } from '../database/db'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { genAccessCode } from '@/lib/access-code'
import { cookies } from 'next/headers'

export async function requestAccessCode(email: string): Promise<void> {
  const user = await AccountsRepository.findByEmail(email)

  if (!user) {
    throw new InvalidCredentialsError()
  }

  const code = genAccessCode()
  console.log(code)
  const accessCode = code.concat('&').concat(user.id)
  const hashedCode = await hash(accessCode, 8)

  const expiresAt = new Date(Date.now() + 60 * 15 * 1000) // 15 minutes from now

  cookies().set('_linkdiario:sub', email, {
    expires: expiresAt,
    httpOnly: true,
  })

  await AccessCodeRepository.create({
    userId: user.id,
    code: hashedCode,
    expiresAt,
  })
}
