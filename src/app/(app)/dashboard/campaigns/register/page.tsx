import { Separator } from '@/components/ui/separator'
import { FormRegisterCampaign } from './_components/form-register-campaign'
import { Services } from '@/services/company'
import { redirect } from 'next/navigation'

export default async function RegisterCampaignPage() {
  const company = await Services.getCompany()

  if (!company) {
    redirect('/dashboard/company')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cadastro de Campanhas</h3>
        <p className="text-sm text-muted-foreground">Informações da campanha.</p>
      </div>
      <Separator />

      <FormRegisterCampaign company={company} />
    </div>
  )
}