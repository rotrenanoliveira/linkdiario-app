import {
  AccessCode,
  Account,
  CampaignCreateInput,
  CampaignUpdateInput,
  CampaignFindBySlugAndCompanyIdArgs,
  CampaignFindBySlugAndCompanySlugArgs,
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
  findById(id: string) {
    return PrismaCampaignsRepository.findById(id)
  },
  findManyByCompanyId(companyId: string) {
    return PrismaCampaignsRepository.findManyByCompanyId(companyId)
  },
  findBySlugAndCompanyId(args: CampaignFindBySlugAndCompanyIdArgs) {
    return PrismaCampaignsRepository.findBySlugAndCompanyId(args)
  },
  findByCampaignAndCompanySlug(args: CampaignFindBySlugAndCompanySlugArgs) {
    return PrismaCampaignsRepository.findByCampaignAndCompanySlug(args)
  },
  getCompanyAndCampaignSlugById(id: string) {
    return PrismaCampaignsRepository.getCompanyAndCampaignSlugById(id)
  },
  create(data: CampaignCreateInput) {
    return PrismaCampaignsRepository.create(data)
  },
  save(id: string, data: CampaignUpdateInput) {
    return PrismaCampaignsRepository.save(id, data)
  },
}

//= = Campaign Attachments Repository ==
export const CampaignAttachmentsRepository = {
  findByCampaignId(campaignId: string) {
    return PrismaCampaignAttachmentsRepository.findManyByCampaignId(campaignId)
  },
  create(data: CarouselImageCreateInput) {
    return PrismaCampaignAttachmentsRepository.create(data)
  },
  deleteMany(campaignId: string) {
    return PrismaCampaignAttachmentsRepository.deleteMany(campaignId)
  },
}
