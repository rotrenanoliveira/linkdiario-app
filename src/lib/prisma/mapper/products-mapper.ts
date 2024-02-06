import { Product, ProductBenefits } from '@/core/types'
import { ProductAttachments as PrismaProductAttachments, Product as PrismaProduct } from '@prisma/client'

type PrismaProductWithAttachments = PrismaProduct & {
  attachments: Pick<PrismaProductAttachments, 'file' | 'url'>[]
}

export class PrismaProductMapper {
  static toDomain(product: PrismaProductWithAttachments): Product {
    const parsedBenefits = JSON.parse(product.benefits) as ProductBenefits[]
    const benefits = parsedBenefits

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      catchPhrase: product.catchPhrase,
      about: product.about,
      price: product.price,
      carouselImages: product.attachments,
      benefits,
    }
  }
}
