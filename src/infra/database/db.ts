import {
  AccessCode,
  Account,
  Campaign,
  Company,
  Optional,
  ProductCreateInput,
  ProductWithSameSlugAndCompanyArgs,
  UserRole,
} from '@/core/types'

import { PrismaAccessCodeRepository } from './prisma/repositories/prisma-access-code-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { PrismaCampaignsRepository } from './prisma/repositories/prisma-campaign-repository'
import { PrismaCompaniesRepository } from './prisma/repositories/prisma-companies-repository'
import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository'

//= Access Code Repository ==//
export const AccessCodeRepository = {
  findByUserId(userId: string) {
    return PrismaAccessCodeRepository.findByUserId(userId)
  },
  create(data: AccessCode) {
    return PrismaAccessCodeRepository.create(data)
  },
  save(id: string, data: Partial<AccessCode>) {
    return PrismaAccessCodeRepository.save(id, data)
  },
}

//= Accounts Repository ==//
export const AccountsRepository = {
  findByEmail(email: string) {
    return PrismaAccountsRepository.findByEmail(email)
  },
  findById(id: string) {
    return PrismaAccountsRepository.findById(id)
  },
  findMany() {
    return PrismaAccountsRepository.findMany()
  },
  findManyByRole(role: UserRole) {
    return PrismaAccountsRepository.findManyByRole(role)
  },
  create(data: Account) {
    return PrismaAccountsRepository.create(data)
  },
  save(id: string, data: Partial<Account>) {
    return PrismaAccountsRepository.save(id, data)
  },
}

//= Company Repository ==
export const CompaniesRepository = {
  findById(id: string) {
    return PrismaCompaniesRepository.findById(id)
  },
  findBySlug(slug: string) {
    return PrismaCompaniesRepository.findBySlug(slug)
  },
  findByContactId(contactId: string) {
    return PrismaCompaniesRepository.findByContactId(contactId)
  },
  findMany() {
    return PrismaCompaniesRepository.findMany()
  },
  create(data: Omit<Company, 'id'>) {
    return PrismaCompaniesRepository.create(data)
  },
  save(id: string, data: Partial<Company>) {
    return PrismaCompaniesRepository.save(id, data)
  },
}

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
