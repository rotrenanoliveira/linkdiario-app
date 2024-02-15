import { CarouselImageCreateInput } from '@/core/types'
import prisma from '@/lib/prisma'

export const PrismaCampaignAttachmentsRepository = {
  async create(data: CarouselImageCreateInput): Promise<void> {
    await prisma.campaignAttachments.create({
      data: {
        campaignId: data.campaignId,
        name: data.name,
        key: data.key,
      },
    })
  },
}
