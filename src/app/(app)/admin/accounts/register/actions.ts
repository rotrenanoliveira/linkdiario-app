'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ActionStateResponse } from '@/core/types'
import { AccountsRepository } from '@/infra/database/db'
import { ActionResponseError } from '@/utils/action-response-error'

type PrevState = ActionStateResponse | null

const registerAccountSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  fullName: z
    .string()
    .min(10, { message: 'Nome completo deve ter pelo menos 10 caracteres.' })
    .transform((value) => value.toLowerCase()),
  license: z.enum(['STANDARD', 'PRO']),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
})

export async function actionRegisterAccount(prevState: PrevState, data: FormData) {
  try {
    const parseResult = registerAccountSchema.parse({
      email: data.get('account-email'),
      fullName: data.get('account-full-name'),
      license: data.get('account-license'),
    })

    const isEmailAlreadyInUse = !!(await AccountsRepository.findByEmail(parseResult.email))

    if (isEmailAlreadyInUse) {
      return {
        success: false,
        title: 'Algo deu errado!',
        message: 'E-mail já em uso.',
      }
    }

    await AccountsRepository.create({
      id: randomUUID(),
      ...parseResult,
    })

    revalidatePath('/admin/accounts')

    return {
      success: true,
      title: '',
      message: 'Conta criada com sucesso!',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
