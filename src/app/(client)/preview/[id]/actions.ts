'use server'

import { revalidatePath } from 'next/cache'

import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'

export async function publishCampaign(campaignId: string) {
  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaignId)

  if (!campaignSlugs) {
    throw new Error('Campaign not found')
  }

  await Promise.all([
    RedisCacheRepository.delete(`not-published-campaign:${campaignId}:details`),
    CampaignsRepository.save(campaignId, {
      status: 'ACTIVE',
      startedAt: new Date(),
    }),
  ])

  revalidatePath(`/dashboard/campaigns/`)
  revalidatePath(`/${campaignSlugs.companySlug}/${campaignSlugs.campaignSlug}`)
}
