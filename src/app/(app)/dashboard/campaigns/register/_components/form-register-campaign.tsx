'use client'

import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { useRef, useEffect, useState, ChangeEvent, useMemo } from 'react'
import { toast } from 'sonner'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PendingSubmitButton, ToastProps } from '@/components/pending-submit-button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Company } from '@/core/types'
import { Slug } from '@/utils/slug'
import { InputAccentColor } from './input-accent-color'
import { InputCarouselImages } from './input-carousel-images'
import { InputPresellCampaign } from './input-presell-campaign'
import { InputQuizCampaign } from './input-quiz-campaign'
import { actionSaveCampaign } from '../actions'

interface FormRegisterCampaignProps {
  company: Company
}

export function FormRegisterCampaign({ company }: FormRegisterCampaignProps) {
  const [campaignTitle, setCampaignTitle] = useState<string | null>(null)
  const [campaignSlug, setCampaignSlug] = useState<string | null>(null)
  const [campaignType, setCampaignType] = useState<'presell' | 'quiz' | null>(null)
  const [campaignCallToActionText, setCampaignCallToActionText] = useState<string>('Saiba mais')

  const [formState, formAction] = useFormState(actionSaveCampaign, null)

  const ref = useRef<HTMLFormElement>(null)

  const router = useRouter()

  const toastProps = useMemo<ToastProps>(() => {
    return { id: 'form-campaign', loadingMessage: 'Registrando campanha...' }
  }, [])

  function handleOnChangeCampaignTitle(e: ChangeEvent<HTMLInputElement>) {
    const newProductName = e.target.value
    const newProductSlug = Slug.fromText(newProductName)

    setCampaignTitle(newProductName)
    setCampaignSlug(newProductSlug)
  }

  function handleChangeOnCallToAction(e: ChangeEvent<HTMLInputElement>) {
    setCampaignCallToActionText(e.target.value)
  }

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
      router.push(`/preview/${formState.title}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - campaign company */}
      <Input type="text" id="company-id" name="company-id" value={company.id} readOnly className="hidden" required />

      {/* input - campaign title */}
      <FormItem>
        <Label>Título/Produto</Label>
        <Input
          type="text"
          id="campaign-title"
          name="campaign-title"
          placeholder="Insira o nome/título do produto afiliado"
          defaultValue={campaignTitle ?? ''}
          onChange={handleOnChangeCampaignTitle}
          required
        />
        <FormDescription>
          Informe o nome do produto ou título que deseja exibir na página da presell. Pense em algo curto com no máximo
          5 palavras.
        </FormDescription>
      </FormItem>

      {/* input - campaign subtitle */}
      <FormItem>
        <Label>Subtítulo - frase de efeito</Label>
        <Input
          type="text"
          id="campaign-subtitle"
          name="campaign-subtitle"
          placeholder="Insira o subtítulo da campanha"
          required
        />
        <FormDescription>
          Informe o subtítulo da campanha, pense em uma frase de efeito de preferência curta com no máximo de 10
          palavras.
        </FormDescription>
      </FormItem>

      {/* input - campaign name */}
      <FormItem>
        <Label>Nome da Campanha</Label>
        <Input
          type="text"
          id="campaign-name"
          name="campaign-name"
          placeholder="Insira um nome personalizado para a campanha."
          defaultValue={campaignTitle ? `Campanha - ${campaignTitle}` : ''}
          required
        />
        <FormDescription>
          Nome personalizado para a campanha, não será exibido para o consumidor apenas para o anunciante no painel.
        </FormDescription>
      </FormItem>

      {/* input - campaign slug */}
      <FormItem>
        <Label>Slug - URL personalizada</Label>

        <div className="w-full flex flex-col md:flex-row items-center gap-2">
          <Input
            type="text"
            id="company-slug"
            name="company-slug"
            defaultValue={`https://linkdiario.com.br/${company.slug}/`}
            className="md:w-1/3 text-black"
            disabled
          />

          <Input
            type="text"
            id="campaign-slug"
            name="campaign-slug"
            defaultValue={campaignSlug ?? ''}
            placeholder="campaign-slug"
            className="flex-1"
            required
          />
        </div>

        <FormDescription>
          O slug do produto não deve conter nenhum caractere especial e/ou espaço vazio.
        </FormDescription>
      </FormItem>

      {/* input - campaign call to action */}
      <FormItem>
        <Label>Call to action</Label>
        <div className="w-full flex flex-col md:flex-row items-center gap-2">
          <Input
            type="text"
            id="campaign-call-to-action-description"
            name="campaign-call-to-action-description"
            defaultValue={campaignCallToActionText}
            onChange={handleChangeOnCallToAction}
            placeholder="Insira a texto do botão."
            required
          />

          <InputAccentColor btnText={campaignCallToActionText} />
        </div>

        <FormDescription>
          Call to action, texto do botão que será exibido na campanha. O tamanho é de 2 palavras.
        </FormDescription>
        <FormDescription>A cor selecionada será a cor predominante da campanha.</FormDescription>
      </FormItem>

      {/* input - campaign affiliate URL */}
      <FormItem>
        <Label>Link de afiliado</Label>
        <Input
          type="text"
          id="campaign-affiliate-url"
          name="campaign-affiliate-url"
          placeholder="Insira o link de afiliado do produto."
          required
        />
        <FormDescription>
          Link de afiliado que será exibido na campanha e levará a compra o site do produtor.
        </FormDescription>
      </FormItem>

      {/* input - campaign images */}
      <InputCarouselImages />

      {/* input - campaign type */}
      <FormItem>
        <Label>Tipo de campanha</Label>

        <ToggleGroup type="single" className="w-fit p-2 gap-2 justify-start border border-input rounded-md">
          <ToggleGroupItem value="presell" onClick={() => setCampaignType('presell')}>
            Presell
          </ToggleGroupItem>

          <ToggleGroupItem value="quiz" onClick={() => setCampaignType('quiz')}>
            Quiz
          </ToggleGroupItem>
        </ToggleGroup>

        <FormDescription>Selecione o tipo de campanha que deseja criar.</FormDescription>

        <Input
          type="text"
          id="campaign-type"
          name="campaign-type"
          value={(campaignType && campaignType.toUpperCase()) ?? ''}
          readOnly
          className="hidden"
          required
        />
      </FormItem>

      {campaignType && campaignType === 'presell' && <InputPresellCampaign />}
      {campaignType && campaignType === 'quiz' && <InputQuizCampaign />}

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={toastProps}>
        Salvar campanha
      </PendingSubmitButton>
    </form>
  )
}
