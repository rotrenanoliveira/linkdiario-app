'use server'

import { cookies } from 'next/headers'
import { compare } from 'bcryptjs'

import { AccessCodeRepository, AccountsRepository } from '../database/db'
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { encrypt } from '@/lib/auth'

interface SignInArgs {
  code: string
  userEmail: string
}

export async function signIn(args: SignInArgs) {
  const user = await AccountsRepository.findByEmail(args.userEmail)
  if (!user) {
    throw new InvalidCredentialsError()
  }

  const accessCode = args.code.concat('&').concat(user.id)

  const accessCodeOnDatabase = await AccessCodeRepository.findByUserId(user.id)

  const isCodeAlreadyUsed = accessCodeOnDatabase.usedAt !== null
  if (isCodeAlreadyUsed) {
    throw new InvalidCredentialsError()
  }

  const isCodeExpired = Date.now() > accessCodeOnDatabase.expiresAt.getTime()
  if (isCodeExpired) {
    throw new InvalidCredentialsError()
  }

  const isAccessCodeValid = await compare(accessCode, accessCodeOnDatabase.code)
  if (!isAccessCodeValid) {
    throw new InvalidCredentialsError()
  }

  await AccessCodeRepository.save(accessCodeOnDatabase.id, {
    usedAt: new Date(),
  })

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  const session = await encrypt({
    user: user.id,
    license: user.license,
    expires: expiresAt,
  })

  cookies().set('_linkdiario:session', session, {
    expires: expiresAt,
    httpOnly: true,
  })

  cookies().set('_linkdiario:sub', '', {
    expires: new Date(0),
  })
}
