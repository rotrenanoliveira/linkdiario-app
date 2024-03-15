import {
  CampaignFindBySlugAndCompanySlugArgs,
  CampaignToCustomer,
  CampaignToDashboard,
  PresellCampaignToCustomer,
  QuizCampaignToCustomer,
} from '@/core/types/campaign'
import { CampaignsRepository } from '../database/db'
import { redirect } from 'next/navigation'
import { Services } from '.'

export async function getCampaignsByCompany(): Promise<CampaignToDashboard[]> {
  const [company, account] = await Promise.all([Services.getCompany(), Services.getAccount()])

  if (!company || !account) {
    return redirect('/auth/sign-in')
  }

  const campaigns = await CampaignsRepository.findManyByCompanyId(company.id)

  if (account.license === 'STANDARD' && campaigns.length > 0) {
    campaigns.map((campaign) => {
      campaign.analytics = {
        impressions: 0,
        clicks: 0,
      }

      return campaign
    })
  }

  return campaigns
}

export async function getCampaignById(
  campaignId: string,
): Promise<CampaignToCustomer | PresellCampaignToCustomer | QuizCampaignToCustomer | null> {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const campaign = await CampaignsRepository.findById(campaignId)

  return campaign
}

export async function getCampaignBySlug(
  args: CampaignFindBySlugAndCompanySlugArgs,
): Promise<CampaignToCustomer | PresellCampaignToCustomer | QuizCampaignToCustomer | null> {
  const campaign = await CampaignsRepository.findByCampaignAndCompanySlug(args)

  return campaign
}

export async function getCampaignCounters() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const counter = await CampaignsRepository.counter(company.id)

  return counter
}
