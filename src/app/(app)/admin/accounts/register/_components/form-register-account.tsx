'use client'

import { toast } from 'sonner'
import { useRef, useEffect } from 'react'
import { useFormState } from 'react-dom'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { actionRegisterAccount } from '../actions'

const TOAST_PROPS = {
  id: 'account-register',
  loadingMessage: 'Cadastrando conta...',
}

export function FormRegisterAccount() {
  const [formState, formAction] = useFormState(actionRegisterAccount, null)
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formState) {
      if (formState.success === false) {
        toast.error(formState.message, {
          id: TOAST_PROPS.id,
        })

        return
      }

      toast.success(formState.message, {
        id: TOAST_PROPS.id,
      })

      ref.current?.reset()
    }
  }, [formState])

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - account email */}
      <FormItem>
        <Label>Email</Label>
        <Input type="email" id="account-email" name="account-email" placeholder="Insira o email da conta" required />
        <FormDescription>Email da conta cadastrada no sistema.</FormDescription>
      </FormItem>

      {/* input - account full name */}
      <FormItem>
        <Label>Nome Completo</Label>
        <Input
          type="text"
          id="account-full-name"
          name="account-full-name"
          placeholder="Insira o nome completo"
          required
        />
        <FormDescription>Nome completo cadastrado no sistema.</FormDescription>
      </FormItem>

      {/* input - account license */}
      <FormItem>
        <Label>Licença</Label>
        <Select name="account-license" defaultValue="STANDARD">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione a licença" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Licença</SelectLabel>
              <SelectItem value="STANDARD">Standard</SelectItem>
              <SelectItem value="PRO">Pro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormDescription>Nome completo cadastrado no sistema.</FormDescription>
      </FormItem>

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={TOAST_PROPS}>
        Cadastrar
      </PendingSubmitButton>
    </form>
  )
}
