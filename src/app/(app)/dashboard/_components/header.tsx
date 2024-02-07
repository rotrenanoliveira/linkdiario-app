import Link from 'next/link'
import { Blocks, LogOut } from 'lucide-react'

import { jetBrainsMono } from '@/app/fonts'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Services } from '@/infra/services'

export async function DashboardHeader() {
  const company = await Services.getCompany()

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Blocks size={48} className="text-yellow-400" />

        <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>
          {(company && company.name) || 'linkdiario'} - dashboard
        </h2>
      </div>

      <Link
        href={'/api/auth/sign-out'}
        className={cn(buttonVariants({ variant: 'ghost' }), 'font-light text-md justify-start flex items-center gap-3')}
      >
        <LogOut strokeWidth={1} />
        Sair
      </Link>
    </div>
  )
}
