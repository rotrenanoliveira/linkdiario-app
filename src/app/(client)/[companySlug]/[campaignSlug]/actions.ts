'use server'

import { AnalyticsRepository } from '@/infra/database/db'

export async function updatePageViewCount(campaignId: string) {
  await AnalyticsRepository.save({
    campaignId,
    operation: 'updatePageView',
  })
}

export async function updateCtaCount(campaignId: string) {
  await AnalyticsRepository.save({
    campaignId,
    operation: 'updateCta',
  })
}
