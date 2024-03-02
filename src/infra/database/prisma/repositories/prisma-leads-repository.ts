import prisma from '@/lib/prisma'

import { Lead, LeadDetails } from '@/core/types/leads'

export const PrismaLeadsRepository = {
  async findManyByCampaignId(campaignId: string): Promise<LeadDetails[]> {
    const leads = await prisma.leads.findMany({
      where: {
        campaignId,
      },
    })
    return leads
  },

  async create(data: Lead): Promise<LeadDetails> {
    const lead = await prisma.leads.create({
      data,
    })
    return lead
  },
}
