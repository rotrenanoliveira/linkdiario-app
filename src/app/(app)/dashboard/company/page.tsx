import type { Metadata } from 'next'

import { FormRegisterCompany } from './_components/form-register-company'
import { Separator } from '@/components/ui/separator'
import { Services } from '@/infra/services'

export const metadata: Metadata = {
  title: 'Cadastro de empresa | linkdiario',
  description: 'linkdiario - Cadastro de empresa',
  icons: '/favicon.ico',
}

export default async function CompanyPage() {
  const company = await Services.getCompany()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sua empresa</h3>
        <p className="text-sm text-muted-foreground">Dados da empresa.</p>
      </div>

      <Separator />

      <FormRegisterCompany company={company} />
    </div>
  )
}
