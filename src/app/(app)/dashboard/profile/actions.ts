'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ActionResponse } from '@/core/types'
import { AccountsRepository } from '@/infra/database/db'
import { ActionResponseError } from '@/utils/action-response-error'

type PrevState = ActionResponse | null

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Por favor, insira seu nome.' })
    .transform((value) => value.toLowerCase()),
  id: z.string().uuid({ message: 'ID inválido.' }),
})

export async function actionUpdateProfile(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  try {
    const result = updateProfileSchema.parse({
      name: data.get('account-full-name'),
      id: data.get('account-id'),
    })

    const { name, id } = result

    await AccountsRepository.save(id, {
      fullName: name,
    })

    revalidatePath('/dashboard/profile')

    return {
      success: true,
      title: 'Sucesso!',
      message: 'Seu perfil foi atualizado.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
