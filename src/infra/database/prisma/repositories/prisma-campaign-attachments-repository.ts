import { CarouselImageCreateInput } from '@/core/types'
import { env } from '@/env'
import prisma from '@/lib/prisma'

export const PrismaCampaignAttachmentsRepository = {
  async findManyByCampaignId(campaignId: string) {
    const attachments = await prisma.campaignAttachments.findMany({
      where: {
        campaignId,
      },
    })

    const carouselImages = attachments.map((attachment) => {
      return {
        file: attachment.name,
        url: `${env.ASSETS_URL}/${attachment.key}`,
      }
    })

    return carouselImages
  },
  async create(data: CarouselImageCreateInput): Promise<void> {
    await prisma.campaignAttachments.create({
      data: {
        campaignId: data.campaignId,
        name: data.name,
        key: data.key,
      },
    })
  },
  async deleteMany(campaignId: string): Promise<void> {
    await prisma.campaignAttachments.deleteMany({
      where: {
        campaignId,
      },
    })
  },
}
