'use client'

import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { requestAccessCode, signIn } from '../actions'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  userEmail?: string
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [accessCodeResponse, formRequestAccessCodeAction] = useFormState(requestAccessCode, null)
  const [signInResponse, formSignInAction] = useFormState(signIn, null)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (accessCodeResponse) {
      toast({
        variant: accessCodeResponse.success ? 'default' : 'destructive',
        title: accessCodeResponse.title,
        description: accessCodeResponse.message,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessCodeResponse])

  useEffect(() => {
    if (signInResponse) {
      toast({
        variant: signInResponse.success ? 'default' : 'destructive',
        title: signInResponse.title,
        description: signInResponse.message,
        duration: 5000,
      })

      if (signInResponse.success) {
        router.push('/dashboard')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInResponse])

  const codeHasBeenRequested = accessCodeResponse && accessCodeResponse.success === true

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={formRequestAccessCodeAction}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>

            <Input
              id="authenticate-email"
              name="authenticate-email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>

          {!codeHasBeenRequested && (
            <PendingSubmitButton type="submit" className="bg-blue-500 hover:bg-blue-400 font-light">
              Continuar com o e-mail
            </PendingSubmitButton>
          )}
        </div>
      </form>

      {codeHasBeenRequested && (
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

          <form action={formSignInAction}>
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
                />
              </div>

              <PendingSubmitButton type="submit" className="bg-blue-500 hover:bg-blue-400 font-light">
                Continuar com o e-mail
              </PendingSubmitButton>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
