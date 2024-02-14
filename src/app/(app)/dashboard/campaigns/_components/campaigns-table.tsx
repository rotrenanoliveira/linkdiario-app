import { DataTable } from '../data-table'
import { dashboardCampaignsColumns as columns } from '../columns'
import { Services } from '@/infra/services'
import { redirect } from 'next/navigation'

export async function DashboardCampaignsTable() {
  const company = await Services.getCompany()

  if (!company) {
    return redirect('/auth/sign-in')
  }

  const campaigns = await Services.getCampaignsByCompany(company.id)

  return <DataTable columns={columns} data={campaigns} />
}

// import { Payment, columns } from "./columns"
// import { DataTable } from "./data-table"

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

// export default async function DemoPage() {
//   const data = await getData()

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   )
// }
