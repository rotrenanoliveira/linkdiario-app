import Image from 'next/image'
import { Blocks } from 'lucide-react'

import { jetBrainsMono } from '@/app/fonts'
import { SignOutForm } from '@/components/sign-out-form'
import { Services } from '@/infra/services'
import { cn } from '@/lib/utils'
import { LabelCompanyName } from './label-company-name'

export async function DashboardHeader() {
  const company = await Services.getCompany()

  const companyName = (company && company.name) || 'linkdiario'

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-full flex items-center justify-between md:justify-normal gap-4">
        {company && company.logoUrl ? (
          <Image src={company.logoUrl} alt={company.name} width={56} height={56} className="rounded-full" />
        ) : (
          <Blocks size={56} className="text-blue-400" />
        )}

        <h2 className={cn(jetBrainsMono.className, 'text-lg font-medium tracking-tight')}>
          <LabelCompanyName companyName={companyName} />
          <span className="hidden md:inline"> - dashboard</span>
        </h2>
      </div>

      <SignOutForm />
    </div>
  )
}
