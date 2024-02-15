import {
  AccessCode,
  Account,
  CampaignCreateInput,
  CampaignFindBySlugAndCompanyIdArgs,
  CarouselImageCreateInput,
  Company,
  Optional,
  UserRole,
} from '@/core/types'

import { PrismaAccessCodeRepository } from './prisma/repositories/prisma-access-code-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { PrismaCampaignsRepository } from './prisma/repositories/prisma-campaign-repository'
import { PrismaCompaniesRepository } from './prisma/repositories/prisma-companies-repository'
import { PrismaCampaignAttachmentsRepository } from './prisma/repositories/prisma-campaign-attachments-repository'

//= Access Code Repository ==//
export const AccessCodeRepository = {
  findByUserId(userId: string) {
    return PrismaAccessCodeRepository.findByUserId(userId)
  },
  create(data: Optional<AccessCode, 'id'>) {
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
  findBySlugAndCompanyId(args: CampaignFindBySlugAndCompanyIdArgs) {
    return PrismaCampaignsRepository.findBySlugAndCompanyId(args)
  },
  create(data: CampaignCreateInput) {
    return PrismaCampaignsRepository.create(data)
  },
}

//= = Campaign Attachments Repository ==
export const CampaignAttachmentsRepository = {
  create(data: CarouselImageCreateInput) {
    return PrismaCampaignAttachmentsRepository.create(data)
  },
}
