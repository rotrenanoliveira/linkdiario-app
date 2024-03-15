'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ActionStateResponse } from '@/core/types'
import { CacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'
import { Services } from '@/infra/services'
import { uploadCampaignAttachment } from '@/infra/storage/campaign-attachment'
import { ActionResponseError } from '@/utils/action-response-error'
import { mapper } from '@/utils/mapper/not-publish-campaign-mapper'
import { Slug } from '@/utils/slug'

type PrevState = ActionStateResponse | null

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const saveCampaignSchema = z.object({
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

export async function actionSaveCampaign(prevState: PrevState, data: FormData) {
  try {
    // Validation
    const parseResult = saveCampaignSchema.parse({
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
    // GET counter and account to validate limit
    const [counter, account] = await Promise.all([
      CampaignsRepository.counter(parseResult.companyId, true),
      Services.getAccount(),
    ])
    // limit
    const MAX_CAMPAIGNS_PER_COMPANY = account?.license === 'PRO' ? 250 : 100
    // Validate limit
    if (counter.total - counter.removed >= MAX_CAMPAIGNS_PER_COMPANY) {
      throw new Error('Limite de campanhas atingido.')
    }

    // Validate if slug is already in use
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
        throw new Error('Especifique pelo menos duas respostas.')
      }
    }

    const quiz =
      parseResult.type === 'QUIZ'
        ? {
            question: question ?? '',
            answers: answers ? answersArray : [],
          }
        : null

    const campaignInput = {
      id: randomUUID(),
      ...parseResult,
      description: description ?? null,
      quiz: quiz ?? null,
    }

    // Validate if campaign image is provided
    const file = data.get('campaign-carousel-image')
    if (!file) {
      throw new Error('Por favor, insira uma imagem para o carrossel.')
    }

    // const attachment = await uploadCampaignImage(campaignInput.id, file as File)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, attachment] = await Promise.all([
      // Save campaign on database
      CampaignsRepository.create({
        id: campaignInput.id,
        companyId: campaignInput.companyId,
        title: campaignInput.title,
        subtitle: campaignInput.subtitle,
        name: campaignInput.name,
        slug: campaignInput.slug,
        affiliateUrl: campaignInput.affiliateUrl,
        ctaText: campaignInput.ctaText,
        ctaColor: campaignInput.ctaColor,
        type: campaignInput.type,
        status: campaignInput.status,
        startedAt: campaignInput.startedAt,
        description: campaignInput.description,
        quiz: campaignInput.quiz,
      }),
      // Upload campaign attachment
      uploadCampaignAttachment(campaignInput.id, file as File),
    ])

    // Save not published campaign on cache
    const notPublishedCampaign = mapper.notPublishCampaign(campaignInput, attachment)
    await CacheRepository.set(
      `not-published-campaign:${campaignInput.id}:details`,
      JSON.stringify(notPublishedCampaign),
    )

    revalidatePath('/dashboard/campaigns')

    return {
      success: true,
      title: campaignInput.id.toString(),
      message: 'Campanha criada com sucesso.',
    }
  } catch (error) {
    return ActionResponseError(error)
  }
}
