'use client'

import { useFormState } from 'react-dom'
import { actionRegisterAccount } from '../actions'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { useRef, useEffect } from 'react'
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

export function FormRegisterAccount() {
  const [formState, formAction] = useFormState(actionRegisterAccount, null)
  const ref = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (formState) {
      toast({
        variant: formState.success ? 'default' : 'destructive',
        title: formState.success === false ? formState.title : undefined,
        description: formState.message,
        duration: 3000,
      })

      formState.success === true && ref.current?.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Select name="account-license">
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

      <PendingSubmitButton type="submit" className="min-w-32">
        Cadastrar
      </PendingSubmitButton>
    </form>
  )
}

// import * as React from "react"

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// export function SelectDemo() {
//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Select a fruit" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Fruits</SelectLabel>
//           <SelectItem value="apple">Apple</SelectItem>
//           <SelectItem value="banana">Banana</SelectItem>
//           <SelectItem value="blueberry">Blueberry</SelectItem>
//           <SelectItem value="grapes">Grapes</SelectItem>
//           <SelectItem value="pineapple">Pineapple</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   )
// }
