'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'

import { Account, ActionResponse } from '@/core/types'
import { AccountsRepository } from '@/infra/database/db'

type PrevState = ActionResponse | null

const registerAccountSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  fullName: z
    .string()
    .min(10, { message: 'Nome completo deve ter pelo menos 10 caracteres.' })
    .transform((value) => value.toLowerCase()),
})

export async function actionRegisterAccount(prevState: PrevState, data: FormData) {
  // Validation
  const result = registerAccountSchema.safeParse({
    email: data.get('account-email'),
    fullName: data.get('account-full-name'),
  })

  if (result.success === false) {
    const validationError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  const { email, fullName } = result.data
  const account: Account = {
    id: randomUUID(),
    email,
    fullName,
    status: 'ACTIVE',
  }

  const isEmailAlreadyInUse = !!(await AccountsRepository.findByEmail(account.email))

  if (isEmailAlreadyInUse) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'E-mail já em uso.',
    }
  }

  try {
    await AccountsRepository.create(account)

    revalidatePath('/admin/accounts')

    return {
      success: true,
      title: '',
      message: 'Conta criada com sucesso!',
    }
  } catch (error) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Ocorreu um erro ao criar a conta.',
    }
  }
}
