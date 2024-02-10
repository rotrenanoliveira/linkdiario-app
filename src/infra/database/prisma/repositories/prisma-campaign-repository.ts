import { CampaignCreateInput, CampaignFindBySlugAndCompanyIdArgs } from '@/core/types'
import prisma from '@/lib/prisma'
import { PrismaCampaignMapper } from '../mapper/campaign-mapper'

export const PrismaCampaignsRepository = {
  async findManyByCompanyId(companyId: string) {
    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId,
      },
      include: {
        attachments: {
          select: {
            file: true,
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
            file: true,
            url: true,
          },
        },
      },
    })

    if (!campaign) {
      return null
    }

    return PrismaCampaignMapper.toDashboard(campaign)
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
}
