'use server'

import { randomUUID } from 'node:crypto'
import { fromZodError } from 'zod-validation-error'
import { z } from 'zod'

import { ActionResponse, Campaign, CampaignWithProduct, ProductCreateInput } from '@/core/types'
import { ProductsRepository, CampaignsRepository } from '@/lib/db'
import { RedisCacheRepository } from '@/infra/cache/redis-cache-repository'
import { validateTextLength } from '@/utils/text-length'

type PrevState = ActionResponse | null

export async function actionSaveCampaign(prevState: PrevState, data: FormData): Promise<ActionResponse> {
  // Validation
  const saveCampaignSchema = z.object({
    companyId: z.string().uuid({ message: 'Company ID inválido.' }),
    productName: z
      .string()
      .min(1, { message: 'Por favor, insira o nome do produto.' })
      .transform((value) => value.toLowerCase()),
    campaignName: z
      .string()
      .min(1, { message: 'Por favor, insira o nome da campanha.' })
      .transform((value) => value.toLowerCase()),
    productSlug: z
      .string()
      .min(1, { message: 'Por favor, insira o slug do produto.' })
      .transform((value) =>
        value
          .normalize('NFKD')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/_/g, '-')
          .replace(/--+/g, '-')
          .replace(/-$/g, ''),
      ),
    productCatchPhrase: z
      .string()
      .min(1, { message: 'Por favor, insira uma frase de efeito do produto.' })
      .refine((value) => validateTextLength(value, 10), {
        message: 'A frase de efeito do produto deve ter no máximo 10 palavras.',
      }),
    productDescription: z
      .string()
      .min(1, { message: 'Por favor, insira breve uma descrição do produto.' })
      .refine((value) => validateTextLength(value, 15), {
        message: 'A descrição do produto deve ser breve e ter no máximo 15 palavras.',
      }),
    productAbout: z
      .string()
      .min(1, { message: 'Por favor, insira um sobre do produto.' })
      .refine((value) => validateTextLength(value, undefined, 600), {
        message: 'Informação sobre o produto deve ter no máximo 600 caracteres.',
      }),
    productPrice: z
      .string()
      .min(1, { message: 'Por favor, insira o preço do produto.' })
      .refine((value) => validateTextLength(value, undefined, 25), {
        message: 'O preço do produto deve ter no máximo 25 caracteres.',
      }),
    affiliateUrl: z.string().url({ message: 'Por favor, insira uma URL válida.' }),
    status: z.enum(['NOT_PUBLISHED', 'ACTIVE', 'PAUSED', 'REMOVED', 'ENDED']).default('NOT_PUBLISHED'),
    startedAt: z.date().default(new Date()),
  })
  //=
  const result = saveCampaignSchema.safeParse({
    companyId: data.get('campaign-company-id'),
    productName: data.get('campaign-product-name'),
    campaignName: data.get('campaign-name'),
    productSlug: data.get('campaign-product-slug'),
    productCatchPhrase: data.get('campaign-catch-phrase'),
    productDescription: data.get('campaign-product-description'),
    productAbout: data.get('campaign-product-about'),
    productPrice: data.get('campaign-product-price'),
    affiliateUrl: data.get('campaign-affiliate-url'),
  })
  //= Validation
  if (result.success === false) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: fromZodError(result.error).toString(),
    }
  }

  const productData = result.data

  const productWithSameSlug = await ProductsRepository.findBySlugAndCompanyId({
    companyId: productData.companyId,
    slug: productData.productSlug,
  })

  if (productWithSameSlug) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: 'Ja existe um produto com esse slug.',
    }
  }
  // Create product
  const product: ProductCreateInput = {
    id: randomUUID(),
    name: productData.productName,
    slug: productData.productSlug,
    description: productData.productDescription,
    catchPhrase: productData.productCatchPhrase,
    about: productData.productAbout,
    price: productData.productPrice,
    benefits: [],
  }

  // Create campaign
  const campaign: Omit<Campaign, 'createdAt'> = {
    id: randomUUID(),
    productId: product.id,
    companyId: productData.companyId,
    name: productData.campaignName,
    affiliateUrl: productData.affiliateUrl,
    status: productData.status,
    startedAt: productData.startedAt,
  }
  // Save product and campaign
  await ProductsRepository.create(product)
  await CampaignsRepository.create(campaign)

  const campaignWithProduct: CampaignWithProduct = {
    ...campaign,
    createdAt: new Date(),
    product: {
      ...product,
      carouselImages: [],
    },
  }

  await RedisCacheRepository.set(`campaign:${campaign.id}:details`, JSON.stringify(campaignWithProduct))

  return {
    success: true,
    title: 'Parabéns!',
    message: 'Seu campanha foi criada com sucesso.',
  }
}
