'use server'

import { ActionResponse } from '@/core/types'
import { AccountsRepository } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

type PrevState = ActionResponse | null

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Por favor, insira seu nome.' })
    .transform((value) => value.toLowerCase()),
  id: z.string().uuid({ message: 'ID inválido.' }),
})

export async function actionUpdateProfile(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
  const result = updateProfileSchema.safeParse({
    name: data.get('account-full-name'),
    id: data.get('account-id'),
  })

  if (result.success === false) {
    const validationError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  const { name, id } = result.data

  const account = await AccountsRepository.findById(id)
  if (!account) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Conta inválida.',
    }
  }

  await AccountsRepository.save(id, {
    fullName: name,
  })

  revalidatePath('/dashboard/profile')

  return {
    success: true,
    title: 'Sucesso!',
    message: 'Seu perfil foi atualizado.',
  }
}
