import { Separator } from '@/components/ui/separator'
import { FormRegisterAccount } from './_components/form-register-account'

export default function Register() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cadastro de Contas</h3>
        <p className="text-sm text-muted-foreground">Informações da conta.</p>
      </div>
      <Separator />

      <FormRegisterAccount />
    </div>
  )
}
