'use server'

import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { fromZodError } from 'zod-validation-error'
import { compare, hash } from 'bcryptjs'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

import { ActionResponse } from '@/core/types/actions'
import { env } from '@/env'
import { genAccessCode } from '@/lib/access-code'
import { AccessCodeRepository, AccountsRepository } from '@/lib/db'

const requestAccessCodeSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
})

const signInSchema = z.object({
  token: z
    .string()
    .refine((token) => token.length > 0, { message: 'Token inválido.' })
    .refine((token) => token.length <= 14, { message: 'Token inválido.' })
    .refine((token) => token.split('-').length === 3, { message: 'Token inválido.' }),
})

type PrevState = ActionResponse | null

/**
 * Request access code for the user's email authentication.
 *
 * @param {PrevState} prevState - the previous state of the application
 * @param {FormData} formData - the form data containing user's email
 * @return {Promise<ActionResponse>} an object indicating the success status, title, and message
 */
export async function requestAccessCode(prevState: PrevState, formData: FormData) {
  const validationResult = requestAccessCodeSchema.safeParse({
    email: formData.get('authenticate-email'),
  })

  if (validationResult.success === false) {
    const validationError = fromZodError(validationResult.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  const { email } = validationResult.data

  const user = await AccountsRepository.findByEmail(email)

  if (!user) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Conta não encontrada.',
    }
  }

  const token = genAccessCode()
  console.log(token)
  const code = token.concat('&').concat(user.id)
  const hashedCode = await hash(code, 8)

  const accessCode = {
    id: randomUUID(),
    userId: user.id,
    code: hashedCode,
    expiresAt: new Date(Date.now() + 60 * 15 * 1000),
  }

  await AccessCodeRepository.create(accessCode)

  cookies().set({
    name: '_Host:linkdiario:access-code',
    value: user.id,
    path: '/auth',
    maxAge: 60 * 15, // 15 minutes
  })

  return {
    success: true,
    title: 'Código de verificação enviado!',
    message: 'Um código de acesso temporário foi enviado para seu e-mail.',
  }
}

/**
 * Function to sign in a user.
 *
 * @param {PrevState} prevState - the previous state of the user
 * @param {FormData} formData - the form data containing user input
 * @return {Promise<ActionResponse>} an object indicating the success of the sign-in and any related messages
 */
export async function signIn(prevState: PrevState, formData: FormData) {
  const validationResult = signInSchema.safeParse({
    token: formData.get('authenticate-token'),
  })

  if (validationResult.success === false) {
    const validationError = fromZodError(validationResult.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  const cookie = cookies().get('_Host:linkdiario:access-code')

  if (!cookie) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Token inválido.',
    }
  }

  const { token } = validationResult.data
  const userId = cookie.value

  const code = token.concat('&').concat(userId)

  const accessCode = await AccessCodeRepository.findByUserId(userId)
  if (!accessCode) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Token inválido.',
    }
  }

  const isTokenAlreadyUsed = accessCode.usedAt !== null

  if (isTokenAlreadyUsed) {
    return {
      success: false,
      title: 'Token inválido!',
      message: 'Por favor, solicite um novo código de acesso.',
    }
  }

  const isTokenExpired = Date.now() > accessCode.expiresAt.getTime()

  if (isTokenExpired) {
    return {
      success: false,
      title: 'Token expirado!',
      message: 'Por favor, solicite um novo código de acesso.',
    }
  }

  const isValid = await compare(code, accessCode.code)

  if (!isValid) {
    return {
      success: false,
      title: 'Token inválido!',
      message: 'Por favor, solicite um novo código de acesso.',
    }
  }

  await AccessCodeRepository.save(accessCode.id, {
    usedAt: new Date(),
  })

  cookies().set({
    name: '_Host:linkdiario:access-code',
    value: '',
    path: '/auth',
    maxAge: 0,
  })

  const jwtToken = jwt.sign({ userId }, Buffer.from(env.JWT_PRIVATE_KEY, 'base64'), {
    algorithm: 'RS256',
    expiresIn: '30d',
  })

  cookies().set({
    name: '_Host:linkdiario:token',
    value: jwtToken,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return {
    success: true,
    title: 'Login realizado com sucesso!',
    message: 'Bem vindo de volta!',
  }
}
