import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { FormUpdateCampaign } from './_components/form-update-campaign'
import { Separator } from '@/components/ui/separator'
import { Services } from '@/infra/services'
import { AlertDialogRemoveCampaign } from './_components/alert-dialog-remove-campaign'
import { FormUpdateCampaignStatus } from './_components/form-update-campaign-status'

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

  const campaignStatus = {
    id: campaign.id,
    status: campaign.status ?? 'NOT_PUBLISHED',
  }

  // console.log(campaignStatus)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Atualizar Campanha</h3>
        <p className="text-sm text-muted-foreground">Informações da campanha.</p>
      </div>
      <Separator />
      <FormUpdateCampaign campaign={campaign} company={companyData} />

      <Separator />

      <div className="w-full lg:flex gap-4">
        <div className="w-1/2">
          <div>
            <h3 className="text-lg font-medium">Atualizar Status da Campanha</h3>
            <p className="text-sm text-muted-foreground">Alterar o status da campanha.</p>
          </div>

          <FormUpdateCampaignStatus campaign={campaignStatus} />
        </div>

        <div>
          <div>
            <h3 className="text-lg font-medium">Remover Campanha</h3>
            <p className="text-sm text-muted-foreground">Essa operação não pode ser desfeita.</p>
          </div>

          <AlertDialogRemoveCampaign campaignId={campaign.id} />
        </div>
      </div>
    </div>
  )
}
