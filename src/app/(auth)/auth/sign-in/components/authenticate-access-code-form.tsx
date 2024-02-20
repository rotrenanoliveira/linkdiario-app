import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'

import { authenticate } from '../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { useToast } from '@/components/ui/use-toast'

export function AuthenticateAccessCodeForm() {
  const [authenticateResponse, formAuthenticateAction] = useFormState(authenticate, null)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (authenticateResponse) {
      if (authenticateResponse.success) {
        router.push('/dashboard')

        return
      }

      toast({
        variant: authenticateResponse.success ? 'default' : 'destructive',
        title: authenticateResponse.title,
        description: authenticateResponse.message,
        duration: 5000,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticateResponse])

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Código de acesso</span>
        </div>
      </div>

      <>
        <span className="text-sm text-center text-muted-foreground">Verifique seu caixa de entrada.</span>
      </>

      <form action={formAuthenticateAction}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="token">
              Código de acesso
            </Label>

            <Input
              id="authenticate-token"
              name="authenticate-token"
              placeholder="Colar código de acesso"
              type="token"
              autoCapitalize="none"
              autoComplete="token"
              autoCorrect="off"
              required
            />
          </div>

          <PendingSubmitButton type="submit" className="bg-blue-500 hover:bg-blue-400 font-light">
            Continuar com o e-mail
          </PendingSubmitButton>
        </div>
      </form>
    </>
  )
}
