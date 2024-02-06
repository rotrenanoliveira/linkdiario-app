'use client'

import { useFormState } from 'react-dom'
import { useRef, useEffect, useState, ChangeEvent } from 'react'

import { FormItem, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@radix-ui/react-label'
import { PendingSubmitButton } from '@/components/pending-submit-button'
import { Company } from '@/core/types'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { validateTextLength } from '@/utils/text-length'
import { actionSaveCampaign } from '../actions'

interface FormRegisterCampaignProps {
  company: Company
}

export function FormRegisterCampaign({ company }: FormRegisterCampaignProps) {
  const [productName, setProductName] = useState<string | null>(null)
  const [productSlug, setProductSlug] = useState<string | null>(null)
  const [productAboutLength, setProductAboutLength] = useState<number | null>(null)
  const [productCatchPhrase, setProductCatchPhrase] = useState<string | null>(null)
  const [productDescription, setProductDescription] = useState<string | null>(null)
  const [productPrice, setProductPrice] = useState<string | null>(null)

  const [formState, formAction] = useFormState(actionSaveCampaign, null)

  const ref = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  function resetStates() {
    setProductName(null)
    setProductSlug(null)
    setProductAboutLength(null)
    setProductCatchPhrase(null)
    setProductDescription(null)
    setProductPrice(null)
  }

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
      resetStates()
      // router.push('/dashboard/campaigns')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

  function handleOnChangeProductName(e: ChangeEvent<HTMLInputElement>) {
    const newProductName = e.target.value
    const newProductSlug = newProductName
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    setProductName(newProductName)
    setProductSlug(newProductSlug)
  }

  return (
    <form ref={ref} action={formAction} className="w-full space-y-4">
      {/* input - campaign product name */}
      <FormItem>
        <Label>Produto afiliado</Label>
        <Input
          type="text"
          id="campaign-product-name"
          name="campaign-product-name"
          placeholder="Insira o nome do produto afiliado"
          defaultValue={productName ?? ''}
          onChange={handleOnChangeProductName}
          required
        />
        <FormDescription>Nome do produto afiliado que será exibido da campanha.</FormDescription>
      </FormItem>

      {/* input - campaign name */}
      <FormItem>
        <Label>Nome da Campanha</Label>
        <Input
          type="text"
          id="campaign-name"
          name="campaign-name"
          placeholder="Insira um nome personalizado para a campanha."
          defaultValue={productName ? `Campanha - ${productName}` : ''}
          required
        />
        <FormDescription>Nome personalizado para a campanha, não será exibido para o consumidor.</FormDescription>
      </FormItem>

      {/* input - campaign slug */}
      <FormItem>
        <Label>Slug - URL personalizada</Label>

        <div className="w-full flex items-center gap-2">
          <Input
            type="text"
            id="campaign-product-slug"
            name="campaign-product-slug"
            defaultValue={`https://linkdiario.com.br/${company.slug}/`}
            className="w-1/3 text-black"
            disabled
          />

          <Input
            type="text"
            id="campaign-product-slug"
            name="campaign-product-slug"
            defaultValue={productSlug ?? ''}
            placeholder="campaign-product-slug"
            className="flex-1"
            required
          />
        </div>

        <FormDescription>
          O slug do produto não deve conter nenhum caractere especial e/ou espaço vazio.
        </FormDescription>
      </FormItem>

      {/* input - campaign catch phrase */}
      <FormItem>
        <Label>Frase de efeito (catch phrase)</Label>
        <Input
          type="text"
          id="campaign-catch-phrase"
          name="campaign-catch-phrase"
          value={productCatchPhrase ?? ''}
          onChange={(e) => setProductCatchPhrase(e.target.value)}
          className={cn(productCatchPhrase && !validateTextLength(productCatchPhrase, 10) && 'border-red-500')}
          placeholder="Insira uma frase de efeito (até 10 palavras)."
          required
        />
        <FormDescription>
          Pense em uma frase de efeito que seja irresistível ao consumidor com no máximo 10 palavras.
        </FormDescription>
      </FormItem>

      {/* input - campaign product description */}
      <FormItem>
        <Label>Descrição do Produto</Label>
        <Input
          type="text"
          id="campaign-product-description"
          name="campaign-product-description"
          value={productDescription ?? ''}
          placeholder="Insira a descrição do produto (até 15 palavras)."
          onChange={(e) => setProductDescription(e.target.value)}
          className={cn(productDescription && !validateTextLength(productDescription, 15) && 'border-red-500')}
          required
        />
        <FormDescription>Breve descrição do produto com no máximo 15 palavras.</FormDescription>
      </FormItem>

      {/* input - campaign product about */}
      <FormItem>
        <Label>Sobre o produto</Label>
        <Textarea
          id="campaign-product-about"
          name="campaign-product-about"
          placeholder="Descreva o produto em até 600 caracteres."
          onChange={(e) => setProductAboutLength(e.target.value.length)}
          maxLength={600}
          className={cn(productAboutLength && productAboutLength >= 600 && 'border-red-500')}
          required
        />
        <FormDescription>
          Descreva o produto afiliado, este campo será exibido na campanha.{' '}
          <span>Caracteres: {productAboutLength ?? 0}</span>
        </FormDescription>
      </FormItem>

      {/* input - campaign product price */}
      <FormItem>
        <Label>Preço do Produto</Label>
        <Input
          type="text"
          id="campaign-product-price"
          name="campaign-product-price"
          value={productPrice ?? ''}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Insira o preço do produto em texto (Ex: R$ 100,00 ou 10x de R$ 10,00)."
          className={cn(productPrice && !validateTextLength(productPrice, undefined, 25) && 'border-red-500')}
          required
        />
        <FormDescription>Preço do produto que será exibido na campanha. Max. 25 caracteres.</FormDescription>
      </FormItem>

      {/* input - campaign affiliate URL */}
      <FormItem>
        <Label>Link de afiliado</Label>
        <Input
          type="text"
          id="campaign-affiliate-url"
          name="campaign-affiliate-url"
          placeholder="Insira o seu link de afiliado."
          required
        />
        <FormDescription>
          Link de afiliado que será exibido na campanha e levará a compra o site do produtor.
        </FormDescription>
      </FormItem>

      {/* input - company id */}
      <FormItem className="hidden">
        <Input type="text" id="campaign-company-id" name="campaign-company-id" defaultValue={company.id} required />
      </FormItem>

      <PendingSubmitButton type="submit" className="min-w-32">
        Salvar
      </PendingSubmitButton>
    </form>
  )
}
