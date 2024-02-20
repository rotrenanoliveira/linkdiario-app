'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { actionRemoveCampaign } from '../actions'

interface AlertDialogRemoveCampaignProps {
  campaignId: string
}

export function AlertDialogRemoveCampaign({ campaignId }: AlertDialogRemoveCampaignProps) {
  const [isPending, setIsPending] = React.useState(false)

  const router = useRouter()

  async function handleRemoveCampaign() {
    try {
      setIsPending(true)

      await actionRemoveCampaign(campaignId)

      router.push('/dashboard/campaigns')
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao remover a campanha. Por favor, tente novamente.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="mt-4">
        <Button variant="destructive">Remover campanha</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            A partir deste momento a campanha ficará excluída, esta operação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveCampaign} disabled={isPending}>
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
