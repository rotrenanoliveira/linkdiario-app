import { dashboardCampaignsColumns as columns } from '../columns'
import { DataTable } from '../data-table'
import { Services } from '@/infra/services'

export async function DashboardCampaignsTable() {
  const campaigns = await Services.getCampaignsByCompany()

  return <DataTable columns={columns} data={campaigns} />
}
