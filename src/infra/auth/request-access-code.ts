import { hash } from 'bcryptjs'
import { cookies } from 'next/headers'
import axios from 'axios'

import { AccessCodeRepository, AccountsRepository } from '../database/db'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { genAccessCode } from '@/lib/access-code'

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

  const response = await axios.post('https://hermodr.vercel.app/api/send-mail', {
    mailto: email,
    accessCode: code,
  })

  if (response.status !== 200) {
    throw new Error(response.data.message)
  }
}
