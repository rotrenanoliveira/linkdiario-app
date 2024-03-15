import { CampaignCreateInput } from '@/core/types'
import { CarouselImage } from '@/core/types/campaign'

function notPublishCampaign(campaign: CampaignCreateInput, attachment: CarouselImage) {
  return {
    id: campaign.id,
    title: campaign.title,
    subtitle: campaign.subtitle,
    slug: campaign.slug,
    affiliateUrl: campaign.affiliateUrl,
    ctaText: campaign.ctaText,
    ctaColor: campaign.ctaColor,
    status: campaign.status,
    type: campaign.type,
    carouselImages: [attachment],
    description: campaign.description,
    quiz: campaign.quiz,
  }
}

export const mapper = {
  notPublishCampaign,
}
