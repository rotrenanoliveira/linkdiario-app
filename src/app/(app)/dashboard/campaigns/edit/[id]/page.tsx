import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { FormUpdateCampaign } from './_components/form-update-campaign'
import { Separator } from '@/components/ui/separator'
import { Services } from '@/infra/services'

export const metadata: Metadata = {
  title: 'Atualizar Campanha | linkdiario',
  description: 'linkdiario - Cadastrar Campanha',
  icons: '/favicon.ico',
}

interface UpdateCampaignPageParams {
  params: {
    id: string
  }
}

export default async function UpdateCampaignPage({ params }: UpdateCampaignPageParams) {
  if (!params.id) {
    return redirect('/dashboard/campaigns')
  }

  const campaign = await Services.getCampaignById(params.id)
  const company = await Services.getCompany()

  if (!campaign || !company) {
    redirect('/dashboard/company')
  }

  const companyData = {
    id: company.id,
    slug: company.slug,
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Atualizar Campanha</h3>
        <p className="text-sm text-muted-foreground">Informações da campanha.</p>
      </div>
      <Separator />

      <FormUpdateCampaign campaign={campaign} company={companyData} />
    </div>
  )
}
