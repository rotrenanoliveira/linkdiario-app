'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

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
    setIsPending(true)

    toast.promise(actionRemoveCampaign(campaignId), {
      loading: 'Removendo campanha...',
      success: () => {
        router.push('/dashboard/campaigns')

        return 'Campanha removida com sucesso!'
      },
      error: (error) => error?.message,
    })

    setIsPending(false)
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
