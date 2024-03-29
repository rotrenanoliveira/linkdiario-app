import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { FormUpdateCampaign } from './_components/form-update-campaign'
import { Separator } from '@/components/ui/separator'
import { Services } from '@/infra/services'
import { AlertDialogRemoveCampaign } from './_components/alert-dialog-remove-campaign'
import { FormUpdateCampaignStatus } from './_components/form-update-campaign-status'

export const metadata: Metadata = {
  title: 'Atualizar Campanha ・ linkdiario',
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

  const [company, campaign] = await Promise.all([Services.getCompany(), Services.getCampaignById(params.id)])

  if (!company) {
    redirect('/dashboard/company')
  }

  if (!campaign) {
    redirect('/dashboard/campaigns')
  }

  const companyData = {
    id: company.id,
    slug: company.slug,
  }

  const campaignStatus = {
    id: campaign.id,
    status: campaign.status ?? 'NOT_PUBLISHED',
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Atualizar Campanha</h3>
        <p className="text-sm text-muted-foreground">Informações da campanha.</p>
      </div>
      <Separator />
      <FormUpdateCampaign campaign={campaign} company={companyData} />

      <Separator />

      <div className="w-full space-y-8 md:space-y-0 lg:flex">
        <div className="lg:w-1/2">
          <div>
            <h3 className="text-lg font-medium">Atualizar Status da Campanha</h3>
            <p className="text-sm text-muted-foreground">Alterar o status da campanha.</p>
          </div>

          <FormUpdateCampaignStatus campaign={campaignStatus} />
        </div>

        <Separator className="lg:hidden" />

        <Separator orientation="vertical" className="hidden lg:block" />

        <div>
          <div>
            <h3 className="text-lg font-medium">Remover Campanha</h3>
            <p className="text-sm text-muted-foreground">Uma campanha removida não pode ser reativada.</p>
          </div>

          <AlertDialogRemoveCampaign campaignId={campaign.id} />
        </div>
      </div>
    </div>
  )
}
