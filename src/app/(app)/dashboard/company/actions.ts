'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

import { ActionResponse } from '@/core/types'
import { AccountsRepository, CompaniesRepository } from '@/infra/database/db'

type PrevState = ActionResponse | null

const registerCompanySchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira o nome da empresa.' }),
  slug: z.string().min(1, { message: 'Por favor, insira o slug da empresa.' }),
  description: z.string().min(1, { message: 'Por favor, insira uma descrição da empresa.' }),
})

const updateCompanySchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira o nome da empresa.' }),
  slug: z.string().min(1, { message: 'Por favor, insira o slug da empresa.' }),
  description: z.string().min(1, { message: 'Por favor, insira uma descrição da empresa.' }),
  id: z.string().uuid({ message: 'ID inválido.' }),
})

/**
 * Registers a new company based on the provided data, performs validation, and returns success or error messages.
 *
 * @param {PrevState} prevState - the previous state of the application
 * @param {FormData} data - the form data containing company information
 * @return {Promise<ActionResponse>} an object containing success flag, title, and message
 */
export async function actionRegisterCompany(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
  const result = registerCompanySchema.safeParse({
    name: data.get('company-name'),
    slug: data.get('company-slug'),
    description: data.get('company-description'),
  })

  if (result.success === false) {
    const validationError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  // Destructure data
  const { name, slug, description } = result.data

  // Validate if slug is already in use
  const isSlugAlreadyInUse = await CompaniesRepository.findBySlug(slug)
  if (isSlugAlreadyInUse) {
    return {
      success: false,
      title: 'Slug ja em uso',
      message: 'Por favor, escolha outro slug.',
    }
  }

  const token = cookies().get('_Host:linkdiario:token')
  if (!token) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Token inválido.',
    }
  }

  const sub = jwt.decode(token.value)
  if (!sub || !sub.sub) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Token inválido.',
    }
  }

  const userId = sub.sub?.toString()
  const user = await AccountsRepository.findById(userId)
  if (!user) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Usuário inválido.',
    }
  }

  await CompaniesRepository.create({
    contactId: user.id,
    name,
    slug,
    description,
  })

  revalidatePath('/dashboard/company')

  return {
    success: true,
    title: 'Sucesso!',
    message: 'Empresa registrada com sucesso.',
  }
}

/**
 * Updates a company with the provided data, performs validation, and returns success or error messages.
 *
 * @param {PrevState} prevState - the previous state of the company
 * @param {FormData} data - the data to update the company with
 * @return {Promise<ActionResponse>} an object indicating the success status and any messages
 */
export async function actionUpdateCompany(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
  const result = updateCompanySchema.safeParse({
    name: data.get('company-name'),
    slug: data.get('company-slug'),
    description: data.get('company-description'),
    id: data.get('company-id'),
  })

  if (result.success === false) {
    const validationError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: validationError.toString(),
    }
  }

  // Destructure data
  const { name, slug, description, id: companyId } = result.data

  // Validate if slug is already in use
  const isSlugAlreadyInUse = await CompaniesRepository.findBySlug(slug)
  if (isSlugAlreadyInUse && isSlugAlreadyInUse.id !== companyId) {
    return {
      success: false,
      title: 'Slug ja em uso',
      message: 'Por favor, escolha outro slug.',
    }
  }

  await CompaniesRepository.save(companyId, {
    name,
    slug,
    description,
  })

  revalidatePath('/dashboard/company')

  return {
    success: true,
    title: 'Sucesso!',
    message: 'Empresa atualizada com sucesso.',
  }
}
