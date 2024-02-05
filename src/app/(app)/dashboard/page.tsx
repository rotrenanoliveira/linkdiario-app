import { Services } from '@/services/company'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const company = await Services.getCompany()

  if (company === null) {
    redirect('/dashboard/company')
  }

  return <div>Dashboard</div>
}
