import Link from 'next/link'
import React from 'react'
import { Blocks, LogOut } from 'lucide-react'

import { jetBrainsMono } from '@/app/fonts'
import { SidebarNav } from '@/components/sidebar-nav'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Services } from '@/services/company'

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
  const company = await Services.getCompany()

  return (
    <main className="2xl:max-w-[1440px] 2xl:mx-auto">
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Blocks size={48} className="text-yellow-400" />

            <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>
              {(company && company.name) || 'linkdiario'} - dashboard
            </h2>
          </div>

          <Link
            href={'/api/auth/sign-out'}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'font-light text-md justify-start flex items-center gap-3',
            )}
          >
            <LogOut strokeWidth={1} />
            Sair
          </Link>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-48 lg:max-w-[192px]">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1">{children}</div>
        </div>
      </div>
    </main>
  )
}
