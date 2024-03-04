import prisma from '@/lib/prisma'

import { SaveAnalyticsInput } from '@/core/types/analytics'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'

export const PrismaCampaignAnalyticsRepository = {
  save: async ({ campaignId, operation }: SaveAnalyticsInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cacheRecent, cacheAnalytics, existingAnalytics] = await Promise.all([
      RedisCacheRepository.delete(`analytics-recent:${campaignId}:counters`),
      RedisCacheRepository.delete(`analytics:${campaignId}:counters`),
      prisma.campaignAnalyticsInitial.findUnique({
        where: {
          campaignId,
        },
      }),
    ])

    if (!existingAnalytics) {
      const data = {
        campaignId,
        pageView: operation === 'updatePageView' ? 1 : 0,
        clickCta: operation === 'updateCta' ? 1 : 0,
      }

      await prisma.campaignAnalyticsInitial.create({
        data,
      })

      return
    }

    switch (operation) {
      case 'updatePageView':
        await prisma.campaignAnalyticsInitial.update({
          where: { campaignId },
          data: { pageView: existingAnalytics.pageView + 1 },
        })
        break
      case 'updateCta':
        await prisma.campaignAnalyticsInitial.update({
          where: { campaignId },
          data: { clickCta: existingAnalytics.clickCta + 1 },
        })
        break

      default:
        break
    }
  },

  findRecentByCompanyId: async (companyId: string) => {
    const analyticsOnCache = await RedisCacheRepository.get<{ pageView: number; clickCta: number; campaign: string }>(
      `analytics-recent:${companyId}:counters`,
    )

    if (analyticsOnCache) {
      return analyticsOnCache
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        companyId,
        status: 'ACTIVE',
      },
      include: {
        analyticsInicial: {
          select: {
            pageView: true,
            clickCta: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!campaign) {
      return null
    }

    const pageView = campaign.analyticsInicial.reduce((total, current) => total + current.pageView, 0)
    const clickCta = campaign.analyticsInicial.reduce((total, current) => total + current.clickCta, 0)

    const analyticsRecentCampaign = {
      campaign: campaign.name,
      pageView,
      clickCta,
    }

    await RedisCacheRepository.set(
      `analytics-recent:${companyId}:counters`,
      JSON.stringify(analyticsRecentCampaign),
      60 * 60, // 1 hour
    )

    return analyticsRecentCampaign
  },

  findManyByCompanyId: async (companyId: string) => {
    const analyticsOnCache = await RedisCacheRepository.get<{ pageView: number; clickCta: number }>(
      `analytics:${companyId}:counters`,
    )

    if (analyticsOnCache) {
      return analyticsOnCache
    }

    const analytics = await prisma.campaignAnalyticsInitial.findMany({
      where: {
        campaign: {
          companyId,
        },
      },
    })

    const pageView = analytics.reduce((total, current) => total + current.pageView, 0)
    const clickCta = analytics.reduce((total, current) => total + current.clickCta, 0)

    const analyticsCounters = {
      pageView,
      clickCta,
    }

    await RedisCacheRepository.set(
      `analytics:${companyId}:counters`,
      JSON.stringify(analyticsCounters),
      60 * 60, // 1 hour
    )

    return analyticsCounters
  },
}
