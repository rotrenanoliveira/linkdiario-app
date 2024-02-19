'use client'

import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'
import { useRef, useEffect, useState, ChangeEvent } from 'react'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useToast } from '@/components/ui/use-toast'
import { InputPresellCampaign } from './input-presell-campaign'
import { InputQuizCampaign } from './input-quiz-campaign'
// import { actionSaveCampaign } from '../actions'
import { InputCarouselImages } from './input-carousel-images'
import { Slug } from '@/utils/slug'
import { CampaignToCustomer } from '@/core/types/campaign'
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

  const [formState, formAction] = useFormState(actionUpdateCampaign, null)

  const ref = useRef<HTMLFormElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (formState) {
      toast({
        variant: formState.success ? 'default' : 'destructive',
        title: formState.title,
        description: formState.message,
        duration: 3000,
      })

      if (formState.success === false) {
        return
      }

      ref.current?.reset()
      router.push('/dashboard/campaigns')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  function handleOnChangeCampaignTitle(e: ChangeEvent<HTMLInputElement>) {
    const newProductName = e.target.value
    const newProductSlug = Slug.fromText(newProductName)

    setCampaignTitle(newProductName)
    setCampaignSlug(newProductSlug)
  }

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

        <div className="w-full flex items-center gap-2">
          <Input
            type="text"
            id="company-slug"
            name="company-slug"
            defaultValue={`https://linkdiario.com.br/${company.slug}/`}
            className="w-1/3 text-black"
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

      <PendingSubmitButton type="submit" className="min-w-32">
        Salvar campanha
      </PendingSubmitButton>
    </form>
  )
}