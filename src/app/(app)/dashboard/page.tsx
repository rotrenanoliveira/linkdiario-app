import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Services } from '@/infra/services'
import { CounterActiveCampaigns } from './_components/counter-active-campaigns'
import { LoaderCounter } from './_components/loader-counter'
import { CounterTotalCampaigns } from './_components/counter-total-campaigns'
import { AnalyticsRecentCampaign } from './_components/analytics-recent-campaign'
import { AnalyticsTotalCampaigns } from './_components/analytics-all-campaign'

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
        <div className="flex flex-col gap-4">
          {/* counter total campaigns */}
          <Suspense fallback={<LoaderCounter />}>
            <AnalyticsRecentCampaign />
          </Suspense>
          {/* counter active campaigns */}
          <Suspense fallback={<LoaderCounter />}>
            <AnalyticsTotalCampaigns />
          </Suspense>
        </div>
        {/*  */}
        <div />
      </div>

      <p className="text-sm font-light text-foreground/65">
        As informações são atualizadas automaticamente a cada 1 hora.
      </p>
    </div>
  )
}
