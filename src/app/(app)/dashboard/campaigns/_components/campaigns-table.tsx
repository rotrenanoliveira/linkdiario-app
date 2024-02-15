import { redirect } from 'next/navigation'

import { dashboardCampaignsColumns as columns } from '../columns'
import { DataTable } from '../data-table'
import { Services } from '@/infra/services'

export async function DashboardCampaignsTable() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const campaigns = await Services.getCampaignsByCompany(company.id)

  return <DataTable columns={columns} data={campaigns} />
}
