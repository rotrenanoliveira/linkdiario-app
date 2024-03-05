'use server'

import { revalidatePath } from 'next/cache'

import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { CampaignsRepository } from '@/infra/database/db'
import { Services } from '@/infra/services'

export async function publishCampaign(campaignId: string) {
  const campaignSlugs = await CampaignsRepository.getCompanyAndCampaignSlugById(campaignId)

  const [account, company] = await Promise.all([Services.getAccount(), Services.getCompany()])

  if (!campaignSlugs || !company) {
    throw new Error('Campaign not found')
  }

  const MAX_ACTIVE_CAMPAIGNS = account?.license === 'PRO' ? 100 : 50
  const counter = await CampaignsRepository.counter(company.id, true)

  if (counter.active >= MAX_ACTIVE_CAMPAIGNS) {
    throw new Error('O limite de campanhas ativas foi atingido')
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
