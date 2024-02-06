import React, { Suspense } from 'react'

import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import { DashboardHeader } from './_components/header'
import { LoadingHeader } from './_components/loading-header'
import LoadingChildren from '@/components/loading-children'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Campanhas',
    href: '/dashboard/campaigns',
  },
  {
    title: 'Sua empresa',
    href: '/dashboard/company',
  },
  {
    title: 'Sua Conta',
    href: '/dashboard/profile',
  },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="2xl:max-w-[1440px] 2xl:mx-auto">
      {/* <div className="space-y-6 p-10 pb-16 md:block"> */}
      <div className="p-10 pb-16 md:block">
        <Suspense fallback={<LoadingHeader />}>
          <DashboardHeader />
        </Suspense>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-48 lg:max-w-[192px]">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <Suspense fallback={<LoadingChildren />}>
            <div className="flex-1">{children}</div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}
