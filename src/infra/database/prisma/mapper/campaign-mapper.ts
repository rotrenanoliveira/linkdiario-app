import { Campaign, PresellCampaign, QuizCampaign } from '@/core/types'
import { CampaignQuiz, CampaignToDashboard } from '@/core/types/campaign'
import { env } from '@/env'
import { Campaign as PrismaCampaign, CampaignAttachments } from '@prisma/client'

type PrismaCampaignWithAttachments = PrismaCampaign & {
  attachments: Pick<CampaignAttachments, 'file' | 'url'>[]
  company: {
    slug: string
  }
}

export class PrismaCampaignMapper {
  static toDomain(raw: PrismaCampaignWithAttachments): PresellCampaign | QuizCampaign {
    const campaign: Campaign = {
      id: raw.id,
      companyId: raw.companyId,
      status: raw.status,
      affiliateUrl: raw.affiliateUrl,
      title: raw.title,
      subtitle: raw.subtitle,
      slug: raw.slug,
      name: raw.name,
      carouselImages: raw.attachments,
      createdAt: raw.createdAt,
      startedAt: raw.startedAt,
      endedAt: raw.endedAt,
      updatedAt: raw.updatedAt,
    }

    if (raw.type === 'PRESELL' && raw.description) {
      return {
        ...campaign,
        type: 'PRESELL',
        description: raw.description,
      }
    }

    if (!raw.quiz) {
      throw new Error('Quiz not found')
    }

    const quiz = JSON.parse(raw.quiz) as CampaignQuiz

    return {
      ...campaign,
      type: 'QUIZ',
      quiz,
    }
  }

  static toDashboard(raw: PrismaCampaignWithAttachments): CampaignToDashboard {
    const campaignUrl = String(`${env.HOST}`).concat('/', raw.company.slug).concat('/', raw.slug)

    return {
      id: raw.id,
      companyId: raw.companyId,
      name: raw.name,
      status: raw.status,
      type: raw.type,
      startedAt: raw.startedAt,
      campaignUrl,
    }
  }
}
