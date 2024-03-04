import { Campaign, PresellCampaign, QuizCampaign } from '@/core/types'
import {
  CampaignQuiz,
  CampaignToDashboard,
  PresellCampaignToCustomer,
  QuizCampaignToCustomer,
} from '@/core/types/campaign'
import { env } from '@/env'
import { Campaign as PrismaCampaign, CampaignAttachments } from '@prisma/client'

type PrismaCampaignWithAttachments = PrismaCampaign & {
  attachments: Pick<CampaignAttachments, 'name' | 'key'>[]
  company: {
    slug: string
  }
}

type PrismaCampaignWithAnalytics = PrismaCampaignWithAttachments & {
  analyticsInicial: Array<{
    pageView: number
    clickCta: number
  }>
}

export class PrismaCampaignMapper {
  static toDomain(raw: PrismaCampaignWithAttachments): PresellCampaign | QuizCampaign {
    const carouselImages = raw.attachments.map((attachment) => {
      return {
        file: attachment.name,
        url: `${env.ASSETS_URL}/${attachment.key}`,
      }
    })

    const campaign: Campaign = {
      id: raw.id,
      companyId: raw.companyId,
      status: raw.status,
      affiliateUrl: raw.affiliateUrl,
      ctaText: raw.ctaText,
      ctaColor: raw.ctaColor,
      title: raw.title,
      subtitle: raw.subtitle,
      slug: raw.slug,
      name: raw.name,
      createdAt: raw.createdAt,
      startedAt: raw.startedAt,
      endedAt: raw.endedAt,
      updatedAt: raw.updatedAt,
      carouselImages,
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

  static toDashboard(raw: PrismaCampaignWithAnalytics): CampaignToDashboard {
    const campaignUrl = String(`${env.APP_URL}`).concat('/', raw.company.slug).concat('/', raw.slug)

    const pageView = raw.analyticsInicial.reduce((total, current) => total + current.pageView, 0)
    const clickCta = raw.analyticsInicial.reduce((total, current) => total + current.clickCta, 0)

    return {
      id: raw.id,
      companyId: raw.companyId,
      name: raw.name,
      status: raw.status,
      type: raw.type,
      startedAt: raw.startedAt,
      analytics: {
        impressions: pageView,
        clicks: clickCta,
      },
      campaignUrl,
    }
  }

  static toCustomer(raw: PrismaCampaignWithAttachments): QuizCampaignToCustomer | PresellCampaignToCustomer {
    const carouselImages = raw.attachments.map((attachment) => {
      return {
        file: attachment.name,
        url: `${env.ASSETS_URL}/${attachment.key}`,
      }
    })

    const campaign = {
      id: raw.id,
      name: raw.name,
      status: raw.status,
      title: raw.title,
      subtitle: raw.subtitle,
      slug: raw.slug,
      affiliateUrl: raw.affiliateUrl,
      ctaText: raw.ctaText,
      ctaColor: raw.ctaColor,
      carouselImages,
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

  static toCache(raw: PrismaCampaignWithAttachments) {
    const campaign = this.toCustomer(raw)

    const notPublishedCampaign = {
      id: campaign.id,
      title: campaign.title,
      subtitle: campaign.subtitle,
      status: raw.status,
      slug: campaign.slug,
      affiliateUrl: campaign.affiliateUrl,
      ctaText: raw.ctaText,
      ctaColor: raw.ctaColor,
      type: campaign.type,
      description: campaign.description,
      quiz: campaign.quiz,
      carouselImages: campaign.carouselImages,
    }

    return notPublishedCampaign
  }
}
