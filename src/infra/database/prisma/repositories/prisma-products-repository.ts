import { PrismaProductMapper } from '../mapper/products-mapper'
import { Product, ProductCreateInput, ProductWithSameSlugAndCompanyArgs } from '@/core/types'
import prisma from '@/lib/prisma'

export const PrismaProductsRepository = {
  async findBySlugAndCompanyId({ companyId, slug }: ProductWithSameSlugAndCompanyArgs): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        campaign: {
          select: {
            companyId: true,
          },
        },
        attachments: {
          select: {
            file: true,
            url: true,
            type: true,
          },
        },
      },
    })

    if (!product) {
      return null
    }

    if (product.campaign?.companyId !== companyId) {
      return null
    }

    return PrismaProductMapper.toDomain(product)
  },
  async create(data: ProductCreateInput): Promise<void> {
    const benefits = JSON.stringify(data.benefits)

    await prisma.product.create({
      data: {
        ...data,
        benefits,
      },
    })
  },
}
