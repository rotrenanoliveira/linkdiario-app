'use client'

import { useFormState } from 'react-dom'
import { useRef, useEffect, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { Company } from '@/core/types/company'
import { actionRegisterCompany, actionUpdateCompany } from '../actions'

interface FormRegisterCompanyProps {
  company: Company | null
}

export function FormRegisterCompany({ company }: FormRegisterCompanyProps) {
  const formStatus = company ? 'edit' : 'create'
  const action = formStatus === 'create' ? actionRegisterCompany : actionUpdateCompany

  const ref = useRef<HTMLFormElement>(null)
  const [formState, formAction] = useFormState(action, null)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (formState) {
      toast({
        variant: formState.success ? 'default' : 'destructive',
        title: formState.title,
        description: formState.message,
        duration: 3000,
      })

      if (formState.success !== true) {
        return
      }

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

      {/* input - company id */}
      {company && (
        <FormItem className="hidden">
          <Input type="text" id="company-id" name="company-id" defaultValue={company?.id} required />
        </FormItem>
      )}

      <PendingSubmitButton type="submit" className="min-w-32">
        {formStatus === 'create' ? 'Cadastrar' : 'Salvar'}
      </PendingSubmitButton>
    </form>
  )
}
