'use client'

import { useFormState } from 'react-dom'
import { useRef, useMemo, useEffect, useState, ChangeEvent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PendingSubmitButton, ToastProps } from '@/components/pending-submit-button'
import { Company } from '@/core/types/company'
import { actionRegisterCompany, actionUpdateCompany } from '../actions'
import { InputCompanyLogo } from './input-company-logo'
import Image from 'next/image'

interface FormRegisterCompanyProps {
  company: Company | null
}

export function FormRegisterCompany({ company }: FormRegisterCompanyProps) {
  const formStatus = company ? 'edit' : 'create'
  const action = formStatus === 'create' ? actionRegisterCompany : actionUpdateCompany

  const ref = useRef<HTMLFormElement>(null)

  const [formState, formAction] = useFormState(action, null)

  const router = useRouter()

  const toastProps = useMemo<ToastProps>(() => {
    return { id: 'form-company', loadingMessage: 'Salvando empresa...' }
  }, [])

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

  const [companyName, setCompanyName] = useState<string>(company?.name || '')
  const [companySlug, setCompanySlug] = useState<string>(company?.slug || '')

  function handleOnChangeCompanyName(e: ChangeEvent<HTMLInputElement>) {
    const newCompanyName = e.target.value
    const newCompanySlug = newCompanyName
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    setCompanyName(newCompanyName)
    setCompanySlug(newCompanySlug)
  }

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - company name */}
      <FormItem>
        <Label>Nome</Label>
        <Input
          type="text"
          id="company-name"
          name="company-name"
          defaultValue={companyName}
          placeholder="Insira o nome da empresa"
          onChange={handleOnChangeCompanyName}
          required
        />
        <FormDescription>Nome da empresa cadastrada no sistema.</FormDescription>
      </FormItem>

      {/* input - company description */}
      <FormItem>
        <Label>Slug - URL personalizada</Label>

        <div className="w-full flex items-center gap-2">
          <Input
            type="text"
            id="company-url"
            name="company-url"
            defaultValue={'https://linkdiario.com.br/'}
            className="w-1/4 text-black"
            disabled
          />

          <Input
            type="text"
            id="company-slug"
            name="company-slug"
            defaultValue={companySlug}
            placeholder="company-slug"
            className="flex-1"
            required
          />
        </div>

        <FormDescription>
          O slug da sua empresa não deve conter nenhum caractere especial e/ou espaço vazio.
        </FormDescription>
      </FormItem>

      <FormItem>
        <Label>Descrição</Label>
        <Input
          type="text"
          id="company-description"
          name="company-description"
          placeholder="Insira a descrição da empresa"
          defaultValue={company?.description || ''}
          required
        />
        <FormDescription>Breve descrição da empresa.</FormDescription>
      </FormItem>

      <div className="flex space-x-4">
        {company && company.logoUrl && (
          <div className="w-fit h-fit flex flex-col items-center justify-center gap-2 p-2 border-2 border-dashed bg-zinc-50 rounded-md">
            <Image
              src={company.logoUrl}
              alt={company.name}
              width={256}
              height={256}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
        <InputCompanyLogo />
      </div>

      {/* input - company id */}
      {company && (
        <FormItem className="hidden">
          <Input type="text" id="company-id" name="company-id" defaultValue={company?.id} required />
        </FormItem>
      )}

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={toastProps}>
        {formStatus === 'create' ? 'Cadastrar' : 'Salvar'}
      </PendingSubmitButton>
    </form>
  )
}
