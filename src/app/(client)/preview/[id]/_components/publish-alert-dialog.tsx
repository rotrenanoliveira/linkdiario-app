'use client'

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
import { useRouter } from 'next/navigation'

interface PublishAlertDialogProps {
  campaignId: string
}

export function PublishAlertDialog({ campaignId }: PublishAlertDialogProps) {
  const router = useRouter()

  async function handlePublishCampaign() {
    try {
      await publishCampaign(campaignId)

      router.push(`/dashboard/campaigns/`)
    } catch (error) {
      console.error(error)

      return alert('Ocorreu um erro ao publicar a campanha. Por favor, tente novamente.')
    }
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
