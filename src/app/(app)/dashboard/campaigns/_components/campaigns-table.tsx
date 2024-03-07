import { redirect } from 'next/navigation'

import { dashboardCampaignsColumns as columns } from '../columns'
import { DataTable } from '../data-table'
import { Services } from '@/infra/services'

export async function DashboardCampaignsTable() {
  const [company, account] = await Promise.all([Services.getCompany(), Services.getAccount()])

  if (!company || !account) {
    return redirect('/auth/sign-in')
  }

  const campaigns = await Services.getCampaignsByCompany(company.id)

  if (account.license === 'STANDARD' && campaigns.length > 0) {
    campaigns.map((campaign) => {
      campaign.analytics = {
        impressions: 0,
        clicks: 0,
      }

      return campaign
    })
  }

  return <DataTable columns={columns} data={campaigns} />
}
