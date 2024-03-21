import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { FormUpdateProfile } from './_components/form-update-profile'
import { Separator } from '@/components/ui/separator'
import { Services } from '@/infra/services'

export const metadata: Metadata = {
  title: 'Sua conta ・ linkdiario',
  description: 'linkdiario - Sua conta',
  icons: '/favicon.ico',
}

export default async function ProfilePage() {
  const user = await Services.getAccount()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sua conta</h3>
        <p className="text-sm text-muted-foreground">Dados da conta.</p>
      </div>

      <Separator />

      <FormUpdateProfile account={user} />
    </div>
  )
}
