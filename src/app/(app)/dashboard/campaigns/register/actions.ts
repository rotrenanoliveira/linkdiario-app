'use server'

import { randomUUID } from 'node:crypto'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'

import { ActionResponse, CampaignQuiz } from '@/core/types'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'
import { uploadCampaignImage } from '@/infra/storage/upload-campaign-image'
import { Slug } from '@/utils/slug'

type PrevState = ActionResponse | null

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function actionSaveCampaign(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
  const saveCampaignSchema = z.object({
    companyId: z.string().uuid({ message: 'ID inválido.' }),
    affiliateUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' }),
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
    carouselImages: z
      .any()
      .refine((file) => !!file, 'Por favor, insira uma imagem para o carrossel.')
      .refine((file) => file.size <= MAX_FILE_SIZE, `O tamanho do arquivo deve ser menor que 2MB.`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png and .webp images são permitidas.')
      .transform((file) => {
        return {
          file: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
        }
      }),
    type: z.enum(['PRESELL', 'QUIZ']),
    status: z.enum(['NOT_PUBLISHED', 'ACTIVE', 'PAUSED', 'REMOVED', 'ENDED']).default('NOT_PUBLISHED'),
    startedAt: z.date().default(new Date()),
  })

  //=
  const result = saveCampaignSchema.safeParse({
    companyId: data.get('company-id'),
    title: data.get('campaign-title'),
    subtitle: data.get('campaign-subtitle'),
    name: data.get('campaign-name'),
    slug: data.get('campaign-slug'),
    affiliateUrl: data.get('campaign-affiliate-url'),
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

  if (campaignWithSameSlug) {
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
    id: randomUUID(),
    ...campaignData,
    description,
    quiz,
  }

  await CampaignsRepository.create({
    id: campaign.id,
    companyId: campaign.companyId,
    title: campaign.title,
    subtitle: campaign.subtitle,
    name: campaign.name,
    slug: campaign.slug,
    affiliateUrl: campaign.affiliateUrl,
    type: campaign.type,
    status: campaign.status,
    startedAt: campaign.startedAt,
    description: campaign.description,
    quiz: campaign.quiz,
  })

  const file = data.get('campaign-carousel-image')
  const attachment = await uploadCampaignImage(campaign.id, file as File)

  if (!attachment) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Falha ao salvar imagem.',
    }
  }

  const notPublishedCampaign = {
    id: campaign.id,
    title: campaign.title,
    subtitle: campaign.subtitle,
    slug: campaign.slug,
    affiliateUrl: campaign.affiliateUrl,
    type: campaign.type,
    carouselImages: [attachment],
    description: campaign.description,
    quiz: campaign.quiz,
  }

  await RedisCacheRepository.set(`not-published-campaign:${campaign.id}:details`, JSON.stringify(notPublishedCampaign))

  revalidatePath('/dashboard/campaigns')

  redirect(`/preview/${campaign.id}`)
}
