import { getAccount } from './account'
import { getCampaignById, getCampaignBySlug, getCampaignsByCompany } from './campaign'
import { getCompany } from './company'

export const Services = {
  getCompany,
  getAccount,
  getCampaignById,
  getCampaignBySlug,
  getCampaignsByCompany,
}
