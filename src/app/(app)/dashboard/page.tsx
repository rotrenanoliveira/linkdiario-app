import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { Services } from '@/infra/services'

export async function generateMetadata(): Promise<Metadata> {
  const company = await Services.getCompany()

  return {
    title: `Dashboard | ${company?.name} - linkdiario`,
    icons: '/favicon.ico',
  }
}

export default async function DashboardPage() {
  const company = await Services.getCompany()

  if (company === null) {
    redirect('/dashboard/company')
  }

  return <div>Dashboard</div>
}
