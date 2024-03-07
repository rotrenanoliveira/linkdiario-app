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
import { CampaignToCustomer } from '@/core/types/campaign'
import { Slug } from '@/utils/slug'
import { InputCarouselImages } from './input-carousel-images'
import { InputAccentColor } from './input-accent-color'
import { InputPresellCampaign } from './input-presell-campaign'
import { InputQuizCampaign } from './input-quiz-campaign'
import { actionUpdateCampaign } from '../actions'

interface FormRegisterCampaignProps {
  campaign: CampaignToCustomer
  company: {
    id: string
    slug: string
  }
}

export function FormUpdateCampaign({ campaign, company }: FormRegisterCampaignProps) {
  const [campaignTitle, setCampaignTitle] = useState<string | null>(campaign.title)
  const [campaignSlug, setCampaignSlug] = useState<string | null>(campaign.slug)
  const [campaignType, setCampaignType] = useState<'PRESELL' | 'QUIZ' | null>(campaign.type)
  const [campaignCallToActionText, setCampaignCallToActionText] = useState<string>(campaign.ctaText)

  const [formState, formAction] = useFormState(actionUpdateCampaign, null)

  const ref = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const toastProps = useMemo<ToastProps>(() => {
    return { id: 'form-campaign', loadingMessage: 'Atualizando campanha...' }
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
      router.push(`/preview/${campaign.id}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - campaign company */}
      <Input type="text" id="campaign-id" name="campaign-id" value={campaign.id} readOnly className="hidden" required />
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
          defaultValue={campaign.subtitle}
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

      {/* input - campaign affiliate URL */}
      <FormItem>
        <Label>Link de afiliado</Label>
        <Input
          type="text"
          id="campaign-affiliate-url"
          name="campaign-affiliate-url"
          defaultValue={campaign.affiliateUrl}
          placeholder="Insira o link de afiliado do produto."
          required
        />
        <FormDescription>
          Link de afiliado que será exibido na campanha e levará a compra o site do produtor.
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

          <InputAccentColor ctaText={campaignCallToActionText} ctaColor={campaign.ctaColor} />
        </div>

        <FormDescription>
          Call to action, texto do botão que será exibido na campanha. O tamanho é de 2 palavras.
        </FormDescription>
        <FormDescription>A cor selecionada será a cor predominante da campanha.</FormDescription>
      </FormItem>

      {/* input - campaign images */}
      <InputCarouselImages images={campaign.carouselImages} />

      {/* input - campaign type */}
      <FormItem>
        <Label>Tipo de campanha</Label>

        <ToggleGroup
          type="single"
          defaultValue={campaignType ?? 'PRESELL'}
          className="w-fit p-2 gap-2 justify-start border border-input rounded-md"
        >
          <ToggleGroupItem value="PRESELL" onClick={() => setCampaignType('PRESELL')}>
            Presell
          </ToggleGroupItem>

          <ToggleGroupItem value="QUIZ" onClick={() => setCampaignType('QUIZ')}>
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

      {campaignType && campaignType === 'PRESELL' && <InputPresellCampaign description={campaign.description} />}
      {campaignType && campaignType === 'QUIZ' && <InputQuizCampaign quiz={campaign.quiz} />}

      <PendingSubmitButton type="submit" className="min-w-32" toastProps={toastProps}>
        Salvar campanha
      </PendingSubmitButton>
    </form>
  )
}
