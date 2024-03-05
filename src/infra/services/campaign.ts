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

export async function getCampaignsByCompany(companyId: string): Promise<CampaignToDashboard[]> {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const campaigns = await CampaignsRepository.findManyByCompanyId(companyId)

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
