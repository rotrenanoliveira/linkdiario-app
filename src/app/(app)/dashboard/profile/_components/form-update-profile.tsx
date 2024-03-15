'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'

import { actionUpdateProfile } from '../actions'
import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PendingSubmitButton, ToastProps } from '@/components/pending-submit-button'
import { Account } from '@/core/types/accounts'

interface FormUpdateProfileProps {
  account: Account
}

export function FormUpdateProfile({ account }: FormUpdateProfileProps) {
  const [formState, formAction] = useFormState(actionUpdateProfile, null)

  const ref = useRef<HTMLFormElement>(null)

  const toastProps = useMemo<ToastProps>(() => {
    return { id: 'form-profile', loadingMessage: 'Salvando perfil...' }
  }, [])

  const router = useRouter()

  useEffect(() => {
    if (formState) {
      if (formState.success === false) {
        toast.error(formState.message, {
          id: toastProps.id,
        })

        return
      }

      toast.success(formState.message, {
        id: toastProps.id,
      })

      ref.current?.reset()
      router.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - account email */}
      <FormItem>
        <Label>Email</Label>

        <Input
          type="text"
          id="account-email"
          name="account-email"
          value={account.email}
          placeholder="email@example.com"
          className="flex-1"
          disabled
        />

        <FormDescription>O email de acesso da sua conta não pode ser alterado.</FormDescription>
      </FormItem>

      {/* input - account full name */}
      <FormItem>
        <Label>Nome</Label>
        <Input
          type="text"
          id="account-full-name"
          name="account-full-name"
          defaultValue={account.fullName}
          placeholder="Insira o nome completo."
          required
        />
        <FormDescription>Nome completo da sua conta.</FormDescription>
      </FormItem>

      {/* input - company id */}
      <FormItem className="hidden">
        <Input type="text" id="account-id" name="account-id" defaultValue={account.id} required />
      </FormItem>

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={toastProps}>
        Salvar
      </PendingSubmitButton>
    </form>
  )
}
