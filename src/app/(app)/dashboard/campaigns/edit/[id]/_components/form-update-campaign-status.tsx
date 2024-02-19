'use client'

import { useFormState } from 'react-dom'
import React, { useRef, useEffect } from 'react'

import { Input } from '@/components/ui/input'
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
import { useToast } from '@/components/ui/use-toast'
import { CampaignStatus } from '@/core/types/campaign'
import { actionUpdateCampaignStatus } from '../actions'

interface FormRegisterCampaignProps {
  campaign: {
    id: string
    status: CampaignStatus
  }
}

export function FormUpdateCampaignStatus({ campaign }: FormRegisterCampaignProps) {
  const [status, setStatus] = React.useState<CampaignStatus | null>(campaign.status)

  const [formState, formAction] = useFormState(actionUpdateCampaignStatus, null)

  const ref = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (formState) {
      toast({
        variant: formState.success ? 'default' : 'destructive',
        title: formState.title,
        description: formState.message,
        duration: 5000,
      })

      if (formState.success === false) {
        return
      }

      ref.current?.reset()
      // router.push('/dashboard/campaigns')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  function handleSelectStatus(value: CampaignStatus) {
    if (status === 'REMOVED') {
      toast({
        variant: 'destructive',
        title: 'Campanha removida',
        description: 'Esta campanha não pode ser alterada. OBS.: Uma campanha removida não pode ser reativada.',
        duration: 3000,
      })

      return
    }

    setStatus(value)
  }

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - campaign company */}
      <Input type="text" id="campaign-id" name="campaign-id" value={campaign.id} readOnly className="hidden" required />

      {/* input - campaign status */}
      <Select name="campaign-status" onValueChange={handleSelectStatus} value={status ?? ''}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o status" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="ACTIVE">Ativo</SelectItem>
            <SelectItem value="PAUSED">Pausado</SelectItem>
            <SelectItem value="ENDED">Finalizado</SelectItem>
            <SelectItem value="REMOVED">Removido</SelectItem>
            <SelectItem value="NOT_PUBLISHED">Não publicado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <PendingSubmitButton type="submit" className="min-w-32">
        Salvar status da campanha
      </PendingSubmitButton>
    </form>
  )
}
