import { redirect } from 'next/navigation'

import { Services } from '@/services'

export default async function DashboardPage() {
  const company = await Services.getCompany()

  if (company === null) {
    redirect('/dashboard/company')
  }

  return <div>Dashboard</div>
}
