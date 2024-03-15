'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ActionResponse } from '@/core/types'
import { CompaniesRepository } from '@/infra/database/db'
import { Services } from '@/infra/services'
import { uploadCompanyLogo } from '@/infra/storage/company-logo'
import { ActionResponseError } from '@/utils/action-response-error'

type PrevState = ActionResponse | null

const registerCompanySchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira o nome da empresa.' }),
  slug: z.string().min(1, { message: 'Por favor, insira o slug da empresa.' }),
  description: z.string().min(1, { message: 'Por favor, insira uma descrição da empresa.' }),
  logoUrl: z.any().transform((file) => {
    return {
      file: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }
  }),
})

const updateCompanySchema = z.object({
  name: z.string().min(1, { message: 'Por favor, insira o nome da empresa.' }),
  slug: z.string().min(1, { message: 'Por favor, insira o slug da empresa.' }),
  description: z.string().min(1, { message: 'Por favor, insira uma descrição da empresa.' }),
  id: z.string().uuid({ message: 'ID inválido.' }),
  logoUrl: z.any().transform((file) => {
    return {
      file: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }
  }),
})

/**
 * Registers a new company based on the provided data, performs validation, and returns success or error messages.
 *
 * @param {PrevState} prevState - the previous state of the application
 * @param {FormData} data - the form data containing company information
 * @return {Promise<ActionResponse>} an object containing success flag, title, and message
 */
export async function actionRegisterCompany(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  try {
    // Zod validation
    const parseResult = registerCompanySchema.parse({
      name: data.get('company-name'),
      slug: data.get('company-slug'),
      description: data.get('company-description'),
      logoUrl: data.get('company-logo'),
    })

    // GET data
    const [isSlugAlreadyInUse, account] = await Promise.all([
      CompaniesRepository.findBySlug(parseResult.slug),
      Services.getAccount(),
    ])
    // Slug validation
    if (isSlugAlreadyInUse) {
      return {
        success: false,
        title: 'Slug ja em uso',
        message: 'Por favor, escolha outro slug.',
      }
    }
    // Account validation
    if (!account) {
      return {
        success: false,
        title: 'Algo deu errado!',
        message: 'Conta inválida.',
      }
    }
    // Upload logo
    const file = data.get('company-logo')
    // Upload logo to storage
    const companyLogo = await uploadCompanyLogo(file as File)
    // Create company
    await CompaniesRepository.create({
      ...parseResult,
      contactId: account.id,
      logoUrl: companyLogo.file,
    })
    // Revalidate page
    revalidatePath('/dashboard/company')
    revalidatePath('/dashboard/', 'layout')

    return {
      success: true,
      title: 'Sucesso!',
      message: 'Empresa registrada com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
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
  try {
    // Zod validation
    const parseResult = updateCompanySchema.parse({
      name: data.get('company-name'),
      slug: data.get('company-slug'),
      description: data.get('company-description'),
      logoUrl: data.get('company-logo'),
      id: data.get('company-id'),
    })

    const companyId = parseResult.id

    // Validate if slug is already in use
    const isSlugAlreadyInUse = await CompaniesRepository.findBySlug(parseResult.slug)
    if (isSlugAlreadyInUse && isSlugAlreadyInUse.id !== companyId) {
      return {
        success: false,
        title: 'Slug ja em uso',
        message: 'Por favor, escolha outro slug.',
      }
    }

    let url: string | undefined

    const file = data.get('company-logo')

    if (file && file instanceof File && file.size > 0) {
      const uploadedLogo = await uploadCompanyLogo(file as File)

      url = uploadedLogo.file
    }

    // Update company
    await CompaniesRepository.save(companyId, {
      ...parseResult,
      logoUrl: url,
    })

    revalidatePath('/dashboard/company')
    revalidatePath('/dashboard/', 'layout')

    return {
      success: true,
      title: 'Sucesso!',
      message: 'Empresa atualizada com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
