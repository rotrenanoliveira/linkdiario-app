'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ActionStateResponse } from '@/core/types'
import { CampaignAttachmentsRepository, CampaignsRepository } from '@/infra/database/db'
import { uploadCampaignAttachment } from '@/infra/storage/campaign-attachment'
import { Slug } from '@/utils/slug'
import { ActionResponseError } from '@/utils/action-response-error'

type PrevState = ActionStateResponse | null

const saveCampaignSchema = z.object({
  id: z.string().uuid({ message: 'ID inválido.' }),
  companyId: z.string().uuid({ message: 'ID inválido.' }),
  affiliateUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' }),
  ctaText: z.string().min(1, { message: 'Por favor, insira o texto do botão.' }),
  ctaColor: z.string().min(1, { message: 'Por favor, insira uma cor para o botão.' }),
  title: z
    .string()
    .min(1, { message: 'Por favor, insira o título/produto da campanha.' })
    .transform((value) => value.toLowerCase()),
  subtitle: z
    .string()
    .min(1, { message: 'Por favor, insira o subtítulo da campanha.' })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(1, { message: 'Por favor, insira o nome da campanha.' })
    .transform((value) => value.toLowerCase()),
  slug: z
    .string()
    .min(1, { message: 'Por favor, insira o slug da campanha.' })
    .transform((value) => Slug.fromText(value)),
  type: z.enum(['PRESELL', 'QUIZ']),
  startedAt: z.date().default(new Date()),
})

const updateCampaignStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['NOT_PUBLISHED', 'ACTIVE', 'PAUSED', 'REMOVED', 'ENDED']),
})

export async function actionUpdateCampaign(prevState: PrevState, data: FormData) {
  try {
    // Validation
    //=
    const parseResult = saveCampaignSchema.parse({
      id: data.get('campaign-id'),
      companyId: data.get('company-id'),
      title: data.get('campaign-title'),
      subtitle: data.get('campaign-subtitle'),
      name: data.get('campaign-name'),
      slug: data.get('campaign-slug'),
      affiliateUrl: data.get('campaign-affiliate-url'),
      ctaText: data.get('campaign-call-to-action-description'),
      ctaColor: data.get('campaign-call-to-action-color'),
      carouselImages: data.get('campaign-carousel-image'),
      type: data.get('campaign-type'),
    })

    const campaignWithSameSlug = await CampaignsRepository.findBySlugAndCompanyId({
      companyId: parseResult.companyId,
      slug: parseResult.slug,
    })

    if (campaignWithSameSlug) {
      throw new Error('Uma campanha com esse slug ja existe.')
    }

    const description = data.get('campaign-description')?.toString()

    const question = data.get('campaign-quiz-question')?.toString()
    const answers = data.get('campaign-quiz-answers')?.toString()

    let answersArray = [] as Array<string>

    if (question && answers) {
      const parsedAnswers = JSON.parse(answers) as Array<{ id: string; answer: string }>
      answersArray = parsedAnswers.map((answer) => answer.answer)

      if (answersArray.length < 2) {
        throw new Error('Por favor, insira pelo menos duas respostas.')
      }
    }
    const quiz =
      parseResult.type === 'QUIZ'
        ? {
            question: question ?? '',
            answers: answers ? answersArray : [],
          }
        : null

    const campaignData = {
      ...parseResult,
      description: description ?? null,
      quiz: quiz ?? null,
    }

    const file = data.get('campaign-carousel-image')
    if (!file || !(file instanceof File) || file.size <= 0) {
      throw new Error('Por favor, insira pelo menos uma imagem.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_responseUpdate, _responseDelete, _responseUploadAttachment, slugs] = await Promise.all([
      // Update campaign
      CampaignsRepository.save(campaignData.id, {
        title: campaignData.title,
        subtitle: campaignData.subtitle,
        name: campaignData.name,
        slug: campaignData.slug,
        affiliateUrl: campaignData.affiliateUrl,
        ctaText: campaignData.ctaText,
        ctaColor: campaignData.ctaColor,
        type: campaignData.type,
        startedAt: campaignData.startedAt,
        description: campaignData.description,
        quiz: campaignData.quiz,
      }),
      // Delete old attachments
      CampaignAttachmentsRepository.deleteMany(campaignData.id),
      // Upload new attachments
      uploadCampaignAttachment(campaignData.id, file),
      // Get company and campaign slugs
      CampaignsRepository.getCompanyAndCampaignSlugById(campaignData.id),
    ])

    revalidatePath('/dashboard/campaigns')
    revalidatePath(`/${slugs?.companySlug}/${campaignData.slug}`)

    return {
      success: true,
      title: campaignData.id,
      message: 'Campanha salva com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}

export async function actionUpdateCampaignStatus(prevState: PrevState, data: FormData) {
  try {
    const campaignData = updateCampaignStatusSchema.parse({
      id: data.get('campaign-id'),
      status: data.get('campaign-status'),
    })

    const currentCampaign = await CampaignsRepository.findById(campaignData.id)
    if (!currentCampaign) {
      throw new Error('Campanha não encontrada.')
    }

    if (currentCampaign.status === 'REMOVED') {
      throw new Error('Esta campanha não pode ser alterada.')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_responseUpdate, campaignSlugs] = await Promise.all([
      CampaignsRepository.save(campaignData.id, {
        status: campaignData.status,
      }),
      CampaignsRepository.getCompanyAndCampaignSlugById(campaignData.id),
    ])

    revalidatePath(`/dashboard/campaigns/`)
    revalidatePath(`/preview/${campaignData.id}/`)
    revalidatePath(`/${campaignSlugs?.companySlug}/${campaignSlugs?.campaignSlug}`)

    return {
      success: true,
      title: 'Campanha atualizada!',
      message: 'Status da campanha atualizada com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}

export async function actionRemoveCampaign(campaignId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_responseUpdate, campaignSlugs] = await Promise.all([
      CampaignsRepository.save(campaignId, {
        status: 'REMOVED',
        endedAt: new Date(),
      }),
      CampaignsRepository.getCompanyAndCampaignSlugById(campaignId),
    ])

    revalidatePath(`/dashboard/campaigns/`)
    revalidatePath(`/preview/${campaignId}/`)
    revalidatePath(`/${campaignSlugs?.companySlug}/${campaignSlugs?.campaignSlug}`)

    return {
      success: true,
      title: 'Campanha excluída!',
      message: 'Campanha excluída com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
