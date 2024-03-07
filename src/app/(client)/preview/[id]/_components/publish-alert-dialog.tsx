'use client'

import { useRouter } from 'next/navigation'
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
import { publishCampaign } from '../actions'

interface PublishAlertDialogProps {
  campaignId: string
}

export function PublishAlertDialog({ campaignId }: PublishAlertDialogProps) {
  const router = useRouter()

  async function handlePublishCampaign() {
    toast.promise(publishCampaign(campaignId), {
      loading: 'Publicando campanha...',
      success: () => {
        router.push(`/dashboard/campaigns/`)

        return 'Campanha publicada com sucesso!'
      },
      error: (error) => error?.message,
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="rounded-full">
          Publicar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            A partir deste momento a campanha ficará visível publicamente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handlePublishCampaign}>Publicar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
