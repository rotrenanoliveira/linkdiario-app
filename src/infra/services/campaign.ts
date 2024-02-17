import {
  CampaignToCustomer,
  CampaignToDashboard,
  PresellCampaignToCustomer,
  QuizCampaignToCustomer,
} from '@/core/types/campaign'
import { CampaignsRepository } from '../database/db'

export async function getCampaignsByCompany(companyId: string): Promise<CampaignToDashboard[]> {
  const campaigns = await CampaignsRepository.findManyByCompanyId(companyId)

  return campaigns
}

export async function getCampaignById(
  campaignId: string,
): Promise<CampaignToCustomer | PresellCampaignToCustomer | QuizCampaignToCustomer | null> {
  const campaign = await CampaignsRepository.findById(campaignId)

  return campaign
}
