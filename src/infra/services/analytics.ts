import { redirect } from 'next/navigation'
import { Services } from '.'
import { AnalyticsRepository } from '../database/db'

export async function getAnalyticsForRecentCampaign() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const analytic = await AnalyticsRepository.findRecentByCompanyId(company.id)

  return analytic
}

export async function getAnalyticsByCompany() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const analytics = await AnalyticsRepository.findManyByCompanyId(company.id)

  return analytics
}
