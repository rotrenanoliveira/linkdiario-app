'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'

import { ActionResponse, CampaignQuiz } from '@/core/types'
import { CampaignAttachmentsRepository, CampaignsRepository } from '@/infra/database/db'
import { uploadCampaignImage } from '@/infra/storage/upload-campaign-image'
import { Slug } from '@/utils/slug'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'

type PrevState = ActionResponse | null

// const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function actionUpdateCampaign(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
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
    // carouselImages: z
    //   .any()
    //   .nullable()
    //   .transform((file) => (file.size === 0 ? null : file))
    //   // .refine((file) => !!file, 'Por favor, insira uma imagem para o carrossel.')
    //   .refine(
    //     (file) => file && file.size > 0 && file.size <= MAX_FILE_SIZE,
    //     `O tamanho do arquivo deve ser menor que 2MB.`,
    //   )
    //   .refine(
    //     (file) => file && file.size > 0 && ACCEPTED_IMAGE_TYPES.includes(file.type),
    //     '.jpg, .jpeg, .png and .webp images são permitidas.',
    //   )
    //   .transform((file) => {
    //     return {
    //       file: file.name,
    //       type: file.type,
    //       url: URL.createObjectURL(file),
    //     }
    //   }),
    type: z.enum(['PRESELL', 'QUIZ']),
    status: z.enum(['NOT_PUBLISHED', 'ACTIVE', 'PAUSED', 'REMOVED', 'ENDED']).default('NOT_PUBLISHED'),
    startedAt: z.date().default(new Date()),
  })

  //=
  const result = saveCampaignSchema.safeParse({
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

  //= Validation
  if (result.success === false) {
    const zodError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: zodError.toString(),
    }
  }

  const campaignData = {
    ...result.data,
    description: null as string | null,
    quiz: null as CampaignQuiz | null,
  }

  const campaignWithSameSlug = await CampaignsRepository.findBySlugAndCompanyId({
    companyId: campaignData.companyId,
    slug: campaignData.slug,
  })

  if (campaignWithSameSlug && campaignWithSameSlug.id !== campaignData.id) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Ja existe um produto com esse slug.',
    }
  }

  const description = data.get('campaign-description')?.toString()

  const question = data.get('campaign-quiz-question')?.toString()
  const answers = data.get('campaign-quiz-answers')?.toString()

  let answersArray = [] as Array<string>

  if (question && answers) {
    const parsedAnswers = JSON.parse(answers) as Array<{ id: string; answer: string }>
    answersArray = parsedAnswers.map((answer) => answer.answer)

    if (answersArray.length < 2) {
      return {
        success: false,
        title: 'Algo deu errado!',
        message: 'O quiz deve ter pelo menos 2 respostas.',
      }
    }
  }

  const quiz =
    campaignData.type === 'QUIZ'
      ? {
          question: question ?? '',
          answers: answers ? answersArray : [],
        }
      : null

  const campaign = {
    ...campaignData,
    description,
    quiz,
  }

  await Promise.all([
    CampaignsRepository.save(campaignData.id, {
      title: campaign.title,
      subtitle: campaign.subtitle,
      name: campaign.name,
      slug: campaign.slug,
      affiliateUrl: campaign.affiliateUrl,
      ctaText: campaign.ctaText,
      ctaColor: campaign.ctaColor,
      type: campaign.type,
      status: campaign.status,
      startedAt: campaign.startedAt,
      description: campaign.description,
      quiz: campaign.quiz,
    }),
    RedisCacheRepository.delete(`not-published-campaign:${campaign.id}:details`),
  ])

  const file = data.get('campaign-carousel-image')

  if (file && file instanceof File && file.size > 0) {
    await CampaignAttachmentsRepository.deleteMany(campaign.id)

    const attachment = await uploadCampaignImage(campaign.id, file as File)

    if (!attachment) {
      return {
        success: false,
        title: 'Algo deu errado!',
        message: 'Falha ao salvar imagem.',
      }
    }
  }

  const slugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaign.id)

  revalidatePath('/dashboard/campaigns')
  revalidatePath(`/${slugs?.companySlug}/${campaign.slug}`)

  redirect(`/preview/${campaign.id}`)
}

export async function actionUpdateCampaignStatus(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  const updateCampaignStatusSchema = z.object({
    id: z.string(),
    status: z.enum(['NOT_PUBLISHED', 'ACTIVE', 'PAUSED', 'REMOVED', 'ENDED']),
  })

  const result = updateCampaignStatusSchema.safeParse({
    id: data.get('campaign-id'),
    status: data.get('campaign-status'),
  })

  if (result.success === false) {
    const zodError = fromZodError(result.error)

    return {
      success: false,
      title: 'Algo deu errado!',
      message: zodError.toString(),
    }
  }

  const campaign = result.data
  // console.log(formData)
  const currentCampaign = await CampaignsRepository.findById(campaign.id)
  if (!currentCampaign) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Campanha inválida.',
    }
  }

  if (currentCampaign.status === 'REMOVED') {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Esta campanha não pode ser alterada.',
    }
  }

  await Promise.all([
    RedisCacheRepository.delete(`not-published-campaign:${campaign.id}:details`),
    CampaignsRepository.save(campaign.id, {
      status: campaign.status,
    }),
  ])

  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaign.id)

  revalidatePath(`/dashboard/campaigns/`)
  revalidatePath(`/preview/${campaign.id}/`)
  revalidatePath(`/${campaignSlugs?.companySlug}/${campaignSlugs?.campaignSlug}`)

  return {
    success: true,
    title: 'Campanha atualizada!',
    message: 'Campanha atualizada com sucesso.',
  }
}

export async function actionRemoveCampaign(campaignId: string) {
  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaignId)

  await Promise.all([
    RedisCacheRepository.delete(`not-published-campaign:${campaignId}:details`),
    await CampaignsRepository.save(campaignId, {
      status: 'REMOVED',
      endedAt: new Date(),
    }),
  ])

  revalidatePath(`/dashboard/campaigns/`)
  revalidatePath(`/preview/${campaignId}/`)
  revalidatePath(`/${campaignSlugs?.companySlug}/${campaignSlugs?.campaignSlug}`)
}
