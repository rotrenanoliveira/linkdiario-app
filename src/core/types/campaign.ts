import { Product } from '.'

export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'REMOVED' | 'ENDED' | 'NOT_PUBLISHED'

export interface Campaign {
  id: string
  productId: string
  companyId: string
  name: string
  affiliateUrl: string
  status: CampaignStatus
  createdAt: Date
  startedAt: Date
  endedAt?: Date | null
  updatedAt?: Date | null
}

export type CampaignWithProduct = {
  product: Product
} & Campaign
