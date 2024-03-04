'use server'

import { revalidatePath } from 'next/cache'

import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'
import { Services } from '@/infra/services'

export async function publishCampaign(campaignId: string) {
  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaignId)
  const company = await Services.getCompany()

  if (!campaignSlugs || !company) {
    throw new Error('Campaign not found')
  }

  await Promise.allSettled([
    RedisCacheRepository.delete([
      `not-published-campaign:${campaignId}:details`,
      `analytics-recent:${company.id}:counters`,
    ]),

    CampaignsRepository.save(campaignId, {
      status: 'ACTIVE',
      startedAt: new Date(),
    }),
  ])

  revalidatePath(`/dashboard/campaigns/`)
  revalidatePath(`/preview/${campaignId}/`)
  revalidatePath(`/${campaignSlugs.companySlug}/${campaignSlugs.campaignSlug}`)
}
