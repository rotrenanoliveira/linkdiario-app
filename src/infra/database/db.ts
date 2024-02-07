import { Campaign, ProductCreateInput, ProductWithSameSlugAndCompanyArgs, Optional } from '@/core/types'

import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository'
import { PrismaCampaignsRepository } from './prisma/repositories/prisma-campaign-repository'

//= Campaigns Repository ==
export const CampaignsRepository = {
  findManyByCompanyId(companyId: string) {
    return PrismaCampaignsRepository.findManyByCompanyId(companyId)
  },
  create(data: Optional<Campaign, 'createdAt'>) {
    return PrismaCampaignsRepository.create(data)
  },
  save(id: string, data: Partial<Campaign>) {
    return PrismaCampaignsRepository.save(id, data)
  },
}

//= Products Repository ==
export const ProductsRepository = {
  findBySlugAndCompanyId(args: ProductWithSameSlugAndCompanyArgs) {
    return PrismaProductsRepository.findBySlugAndCompanyId(args)
  },
  create(data: ProductCreateInput) {
    return PrismaProductsRepository.create(data)
  },
}
