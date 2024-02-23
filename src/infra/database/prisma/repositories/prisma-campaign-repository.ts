import {
  CampaignCreateInput,
  CampaignFindBySlugAndCompanyIdArgs,
  CampaignFindBySlugAndCompanySlugArgs,
} from '@/core/types'
import prisma from '@/lib/prisma'
import { PrismaCampaignMapper } from '../mapper/campaign-mapper'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignToCustomer, CampaignUpdateInput } from '@/core/types/campaign'

export const PrismaCampaignsRepository = {
  async findById(id: string) {
    const campaignOnRedis = await RedisCacheRepository.get<CampaignToCustomer>(`not-published-campaign:${id}:details`)

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

    const campaignToCache = PrismaCampaignMapper.toCache(campaign)

    await RedisCacheRepository.set(`not-published-campaign:${id}:details`, JSON.stringify(campaignToCache))

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
      },
    })

    if (!campaign) {
      return null
    }

    return PrismaCampaignMapper.toDashboard(campaign)
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
    const leads = data.leads ? JSON.stringify(data.leads) : null

    await prisma.campaign.create({
      data: {
        ...data,
        quiz,
        leads,
      },
    })
  },
  async save(id: string, data: CampaignUpdateInput): Promise<void> {
    const existingCampaign = await prisma.campaign.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        quiz: true,
        leads: true,
      },
    })

    const quiz = data.quiz ? JSON.stringify(data.quiz) : existingCampaign.quiz
    const leads = data.leads ? JSON.stringify(data.leads) : existingCampaign.leads

    await prisma.campaign.update({
      where: {
        id,
      },
      data: {
        ...data,
        quiz,
        leads,
      },
    })
  },
}
