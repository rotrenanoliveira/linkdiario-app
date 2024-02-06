import prisma from '../client'

import { Campaign, Optional } from '@/core/types'

export const PrismaCampaignsRepository = {
  async findManyByCompanyId(companyId: string): Promise<Campaign[]> {
    const campaigns = await prisma.campaign.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return campaigns
  },
  async create(data: Optional<Campaign, 'createdAt'>): Promise<void> {
    await prisma.campaign.create({
      data,
    })
  },
  async save(id: string, data: Partial<Campaign>): Promise<void> {
    await prisma.campaign.update({
      where: {
        id,
      },
      data,
    })
  },
}
