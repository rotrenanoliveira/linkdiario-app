import { CampaignToDashboard } from '@/core/types/campaign'
import { CampaignsRepository } from '../database/db'

export async function getCampaignsByCompany(companyId: string): Promise<CampaignToDashboard[]> {
  const campaigns = await CampaignsRepository.findManyByCompanyId(companyId)

  return campaigns
}
