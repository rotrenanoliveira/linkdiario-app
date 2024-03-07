import { Blocks } from 'lucide-react'

import { jetBrainsMono } from '@/app/fonts'
import { SignOutForm } from '@/components/sign-out-form'
import { Services } from '@/infra/services'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export async function DashboardHeader() {
  const company = await Services.getCompany()

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {company && company.logoUrl ? (
          <Image src={company.logoUrl} alt={company.name} width={56} height={56} className="rounded-full" />
        ) : (
          <Blocks size={56} className="text-blue-400" />
        )}

        <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>
          {(company && company.name) || 'linkdiario'} - dashboard
        </h2>
      </div>

      <SignOutForm />
    </div>
  )
}
