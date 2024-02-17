import { CampaignCreateInput, CampaignFindBySlugAndCompanyIdArgs } from '@/core/types'
import prisma from '@/lib/prisma'
import { PrismaCampaignMapper } from '../mapper/campaign-mapper'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignToCustomer } from '@/core/types/campaign'

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

    await prisma.campaign.create({
      data: {
        ...data,
        quiz,
      },
    })
  },
  async save(id: string, data: Partial<CampaignCreateInput>): Promise<void> {
    const quiz = data.quiz ? JSON.stringify(data.quiz) : null

    await prisma.campaign.update({
      where: {
        id,
      },
      data: {
        ...data,
        quiz,
      },
    })
  },
}
