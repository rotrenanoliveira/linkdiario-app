import { SidebarNav } from '@/components/sidebar-nav'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

const sidebarNavItems = [
  {
    title: 'Home',
    href: '/admin',
  },
  {
    title: 'Usuários',
    href: '/admin/accounts',
  },
  {
    title: 'Cadastrar Usuários',
    href: '/admin/accounts/register',
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="2xl:max-w-[1440px] 2xl:mx-auto">
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="flex items-center gap-4">
          <Image src={'/linkdiario.png'} alt="linkdiario" width={48} height={48} />
          <h2 className="text-2xl font-semibold tracking-tight">linkdiario - admin</h2>
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
