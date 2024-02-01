'use server'

import { PrismaAccountsRepository } from '@/lib/prisma/repositories/prisma-accounts-repository'
import { ActionResponse } from '@/core/types/actions'
import { prisma } from '@/lib/prisma/client'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { Account } from '@/core/types/accounts'
import { revalidatePath } from 'next/cache'

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

  const accountsRepository = new PrismaAccountsRepository(prisma)

  const isEmailAlreadyInUse = !!(await accountsRepository.findByEmail(account.email))

  if (isEmailAlreadyInUse) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'E-mail já em uso.',
    }
  }

  try {
    await Promise.all([accountsRepository.create(account), accountsRepository.disconnect()])

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
