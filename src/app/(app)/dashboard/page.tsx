import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Services } from '@/infra/services'
import { CounterActiveCampaigns } from './_components/counter-active-campaigns'
import { LoaderCounter } from './_components/loader-counter'
import { CounterTotalCampaigns } from './_components/counter-total-campaigns'

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

  return (
    <div className="w-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          {/* counter total campaigns */}
          <Suspense fallback={<LoaderCounter />}>
            <CounterTotalCampaigns />
          </Suspense>
          {/* counter active campaigns */}
          <Suspense fallback={<LoaderCounter />}>
            <CounterActiveCampaigns />
          </Suspense>
        </div>
        {/*  */}
        <div />
        {/*  */}
        <div />
      </div>
    </div>
  )
}
