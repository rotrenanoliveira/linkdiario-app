import { Product, ProductBenefits } from '@/core/types'
import { ProductAttachments as PrismaProductAttachments, Product as PrismaProduct } from '@prisma/client'

type PrismaProductWithAttachments = PrismaProduct & {
  attachments: Pick<PrismaProductAttachments, 'file' | 'url' | 'type'>[]
}

export class PrismaProductMapper {
  static toDomain(product: PrismaProductWithAttachments): Product {
    const parsedBenefits = JSON.parse(product.benefits) as ProductBenefits[]
    const benefits = parsedBenefits

    const cardAttachment = product.attachments.find((attachment) => attachment.type === 'CARD')
    const cardImageUrl = cardAttachment ? cardAttachment.url : ''

    const carouselImages = product.attachments.filter((attachment) => attachment.type === 'CAROUSEL')

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      catchPhrase: product.catchPhrase,
      about: product.about,
      price: product.price,
      cardImageUrl,
      benefits,
      carouselImages,
    }
  }
}
