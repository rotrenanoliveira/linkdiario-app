'use client'

import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

import { cn } from '@/lib/utils'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { AuthenticateAccessCodeForm } from './authenticate-access-code-form'
import { requestAccessCode } from '../actions'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  userEmail?: string
}

export function AuthenticateUserForm({ className, ...props }: UserAuthFormProps) {
  const [accessCodeResponse, formRequestAccessCodeAction] = useFormState(requestAccessCode, null)

  const { toast } = useToast()

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

  // useEffect(() => {
  //   if (signInResponse) {
  //     toast({
  //       variant: signInResponse.success ? 'default' : 'destructive',
  //       title: signInResponse.title,
  //       description: signInResponse.message,
  //       duration: 5000,
  //     })

  //     if (signInResponse.success) {
  //       router.push('/dashboard')
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signInResponse])

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
              required
            />
          </div>

          {!codeHasBeenRequested && (
            <PendingSubmitButton type="submit" className="bg-blue-500 hover:bg-blue-400 font-light">
              Continuar com o e-mail
            </PendingSubmitButton>
          )}
        </div>
      </form>

      {codeHasBeenRequested && <AuthenticateAccessCodeForm />}
    </div>
  )
}
