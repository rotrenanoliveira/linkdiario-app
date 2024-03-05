import { PrismaAccessCodeRepository } from './prisma/repositories/prisma-access-code-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'
import { PrismaCampaignsRepository } from './prisma/repositories/prisma-campaign-repository'
import { PrismaCompaniesRepository } from './prisma/repositories/prisma-companies-repository'
import { PrismaCampaignAttachmentsRepository } from './prisma/repositories/prisma-campaign-attachments-repository'
import { PrismaCampaignAnalyticsRepository } from './prisma/repositories/prisma-campaign-analytics-repository'

//= Access Code Repository ==//
export const AccessCodeRepository = {
  findByUserId: PrismaAccessCodeRepository.findByUserId,
  create: PrismaAccessCodeRepository.create,
  save: PrismaAccessCodeRepository.save,
}

//= Accounts Repository ==//
export const AccountsRepository = {
  findByEmail: PrismaAccountsRepository.findByEmail,
  findById: PrismaAccountsRepository.findById,
  findMany: PrismaAccountsRepository.findMany,
  findManyByRole: PrismaAccountsRepository.findManyByRole,
  create: PrismaAccountsRepository.create,
  save: PrismaAccountsRepository.save,
}

//= Company Repository ==
export const CompaniesRepository = {
  findById: PrismaCompaniesRepository.findById,
  findBySlug: PrismaCompaniesRepository.findBySlug,
  findByContactId: PrismaCompaniesRepository.findByContactId,
  findMany: PrismaCompaniesRepository.findMany,
  create: PrismaCompaniesRepository.create,
  save: PrismaCompaniesRepository.save,
}

//= Campaigns Repository ==
export const CampaignsRepository = {
  findById: PrismaCampaignsRepository.findById,
  findManyByCompanyId: PrismaCampaignsRepository.findManyByCompanyId,
  findBySlugAndCompanyId: PrismaCampaignsRepository.findBySlugAndCompanyId,
  findByCampaignAndCompanySlug: PrismaCampaignsRepository.findByCampaignAndCompanySlug,
  getCompanyAndCampaignSlugById: PrismaCampaignsRepository.getCompanyAndCampaignSlugById,
  create: PrismaCampaignsRepository.create,
  save: PrismaCampaignsRepository.save,
  counter: PrismaCampaignsRepository.counter,
}

//= Analytics Repository ==
export const AnalyticsRepository = {
  findRecentByCompanyId: PrismaCampaignAnalyticsRepository.findRecentByCompanyId,
  findManyByCompanyId: PrismaCampaignAnalyticsRepository.findManyByCompanyId,
  save: PrismaCampaignAnalyticsRepository.save,
}

//= = Campaign Attachments Repository ==
export const CampaignAttachmentsRepository = {
  findByCampaignId: PrismaCampaignAttachmentsRepository.findManyByCampaignId,
  create: PrismaCampaignAttachmentsRepository.create,
  deleteMany: PrismaCampaignAttachmentsRepository.deleteMany,
}
