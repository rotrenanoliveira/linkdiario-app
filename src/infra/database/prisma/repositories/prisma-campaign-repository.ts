import {
  CampaignCreateInput,
  CampaignFindBySlugAndCompanyIdArgs,
  CampaignFindBySlugAndCompanySlugArgs,
} from '@/core/types'
import { CampaignCounter, CampaignToCustomer, CampaignUpdateInput } from '@/core/types/campaign'
import prisma from '@/lib/prisma'
import { CacheRepository } from '@/infra/cache/redis-cache-repository'
import { PrismaCampaignMapper } from '../mapper/campaign-mapper'

export const PrismaCampaignsRepository = {
  async findById(id: string) {
    const campaignOnRedis = await CacheRepository.get<CampaignToCustomer>(`not-published-campaign:${id}:details`)

    if (campaignOnRedis) {
      return campaignOnRedis
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        attachments: {
          select: {
            name: true,
            key: true,
          },
        },
        company: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (!campaign) {
      return null
    }

    if (campaign.status === 'NOT_PUBLISHED') {
      await CacheRepository.set(
        `not-published-campaign:${id}:details`,
        JSON.stringify(PrismaCampaignMapper.toCache(campaign)),
        60 * 60, // 1 hour
      )
    }

    return PrismaCampaignMapper.toCustomer(campaign)
  },
  async findByCampaignAndCompanySlug({ campaignSlug, companySlug }: CampaignFindBySlugAndCompanySlugArgs) {
    const campaign = await prisma.campaign.findFirst({
      where: {
        slug: campaignSlug,
        company: {
          slug: companySlug,
        },
      },
      include: {
        attachments: {
          select: {
            name: true,
            key: true,
          },
        },
        company: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (!campaign) {
      return null
    }

    return PrismaCampaignMapper.toCustomer(campaign)
  },
  async findManyByCompanyId(companyId: string) {
    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId,
      },
      include: {
        attachments: {
          select: {
            name: true,
            key: true,
          },
        },
        company: {
          select: {
            slug: true,
          },
        },
        analyticsInicial: {
          select: {
            pageView: true,
            clickCta: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return campaigns.map(PrismaCampaignMapper.toDashboard)
  },
  async findBySlugAndCompanyId({ companyId, slug }: CampaignFindBySlugAndCompanyIdArgs) {
    const campaign = await prisma.campaign.findFirst({
      where: {
        slug,
        companyId,
      },
      include: {
        attachments: {
          select: {
            name: true,
            key: true,
          },
        },
        company: {
          select: {
            slug: true,
          },
        },
        analyticsInicial: {
          select: {
            pageView: true,
            clickCta: true,
          },
        },
      },
    })

    if (!campaign) {
      return null
    }

    return PrismaCampaignMapper.toDashboard(campaign)
  },

  async counter(companyId: string, toControl: boolean | undefined = false) {
    const cachedCounters = await CacheRepository.get<CampaignCounter>(`campaigns-counter:${companyId}`)

    if (cachedCounters && !toControl) {
      return cachedCounters
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId,
      },
      select: {
        status: true,
      },
    })

    const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'ACTIVE').length
    const removedCampaigns = campaigns.filter((campaign) => campaign.status === 'REMOVED').length
    const pausedCampaigns = campaigns.filter((campaign) => campaign.status === 'PAUSED').length
    const totalCampaigns = campaigns.length

    const counters: CampaignCounter = {
      active: activeCampaigns,
      removed: removedCampaigns,
      paused: pausedCampaigns,
      total: totalCampaigns,
    }

    await CacheRepository.set(`campaigns-counter:${companyId}`, JSON.stringify(counters))

    return counters
  },

  async getCompanyAndCampaignSlugById(id: string) {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id,
      },
      select: {
        slug: true,
        company: {
          select: {
            slug: true,
          },
        },
      },
    })

    if (!campaign) {
      return null
    }

    return {
      companySlug: campaign.company.slug,
      campaignSlug: campaign.slug,
    }
  },
  async create(data: CampaignCreateInput): Promise<void> {
    const quiz = data.quiz ? JSON.stringify(data.quiz) : null

    await Promise.allSettled([
      CacheRepository.delete(`campaigns-counter:${data.companyId}`),
      prisma.campaign.create({
        data: {
          ...data,
          quiz,
        },
      }),
    ])

    // await
  },
  async save(id: string, data: CampaignUpdateInput): Promise<void> {
    const existingCampaign = await prisma.campaign.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        quiz: true,
        companyId: true,
      },
    })

    const quiz = data.quiz ? JSON.stringify(data.quiz) : existingCampaign.quiz

    const counterCacheKey = `campaigns-counter:${existingCampaign.companyId}`
    const notPublishedKey = `not-published-campaign:${id}:details`

    await Promise.all([
      CacheRepository.delete([notPublishedKey, counterCacheKey]),
      prisma.campaign.update({
        where: {
          id,
        },
        data: {
          ...data,
          quiz,
        },
      }),
    ])
  },
}
