import { FormDescription, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function InputPresellCampaign() {
  return (
    <>
      {/* input - campaign product description */}
      <FormItem>
        <Label>Sobre o produto / descrição</Label>
        <Textarea
          name="campaign-description"
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
