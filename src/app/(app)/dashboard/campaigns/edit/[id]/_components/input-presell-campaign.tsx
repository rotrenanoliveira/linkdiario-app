import { FormDescription, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface InputPresellCampaignProps {
  description?: string | null
}

export function InputPresellCampaign({ description }: InputPresellCampaignProps) {
  return (
    <>
      {/* input - campaign product description */}
      <FormItem>
        <Label>Sobre o produto / descrição</Label>
        <Textarea
          id="campaign-description"
          name="campaign-description"
          defaultValue={description ?? undefined}
          placeholder="Descreva o produto em até 450 caracteres."
          maxLength={450}
          required
        />
        <FormDescription>
          Descreva o produto afiliado, este campo será exibido na campanha. Máximo de 450 caracteres.
        </FormDescription>
      </FormItem>
    </>
  )
}
