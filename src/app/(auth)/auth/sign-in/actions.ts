'use server'

import { z } from 'zod'
import { cookies } from 'next/headers'

import { ActionResponse, ActionStateResponse } from '@/core/types'
import * as Auth from '@/infra/auth'
import { ActionResponseError } from '@/utils/action-response-error'

type PrevState = ActionResponse | null

// export type ActionState = ActionStateResponse<{ userEmail: string }, null> | null

export async function requestAccessCode(prevState: PrevState, formData: FormData): Promise<PrevState> {
  try {
    const formSchema = z.object({
      email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
    })

    const { email } = formSchema.parse({
      email: formData.get('authenticate-email'),
    })

    await Auth.requestAccessCode(email)

    return {
      success: true,
      title: 'Código enviado',
      message: 'Um código de acesso foi enviado para o seu e-mail.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}

type ActionState = ActionStateResponse | null

export async function authenticate(prevState: ActionState, formData: FormData) {
  try {
    const subOnCookie = cookies().get('_linkdiario:sub')
    if (!subOnCookie) {
      throw new Error('Não foi possível encontrar o email!')
    }
    const userEmail = subOnCookie.value
    const accessCodeSchema = z.object({
      code: z
        .string()
        .refine((token) => token.length > 0, { message: 'Token inválido.' })
        .refine((token) => token.length <= 14, { message: 'Token inválido.' })
        .refine((token) => token.split('-').length === 3, { message: 'Token inválido.' }),
    })
    const { code } = accessCodeSchema.parse({
      code: formData.get('authenticate-token'),
    })

    await Auth.signIn({ userEmail, code })

    return {
      success: true,
      title: 'Autenticado',
      message: 'Autenticado com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
