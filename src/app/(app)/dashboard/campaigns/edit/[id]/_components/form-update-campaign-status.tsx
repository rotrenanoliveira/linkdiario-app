'use client'

import { useFormState } from 'react-dom'
import React, { useRef, useEffect, useMemo } from 'react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { PendingSubmitButton, ToastProps } from '@/components/pending-submit-button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { CampaignStatus } from '@/core/types/campaign'
import { actionUpdateCampaignStatus } from '../actions'
import { useRouter } from 'next/navigation'

interface FormRegisterCampaignProps {
  campaign: {
    id: string
    status: CampaignStatus
  }
}

export function FormUpdateCampaignStatus({ campaign }: FormRegisterCampaignProps) {
  const [status, setStatus] = React.useState<CampaignStatus | null>(campaign.status)

  const [formState, formAction] = useFormState(actionUpdateCampaignStatus, null)

  const toastProps = useMemo<ToastProps>(() => {
    return { id: 'form-status-campaign', loadingMessage: 'Atualizando status da campanha...' }
  }, [])

  const ref = useRef<HTMLFormElement>(null)
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
      router.push(`/dashboard/campaigns/`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  function handleSelectStatus(value: CampaignStatus) {
    if (status === 'REMOVED') {
      toast.error('Esta campanha não pode ser alterada.')

      return
    }

    setStatus(value)
  }

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4 flex justify-between gap-4 md:justify-start">
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

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={toastProps}>
        Atualizar status
      </PendingSubmitButton>
    </form>
  )
}
