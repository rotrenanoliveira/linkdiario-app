import { Company as PrismaCompany } from '@prisma/client'

import { Company, CompanyDetails } from '@/core/types'
import { env } from '@/env'

export class PrismaCompanyMapper {
  static toDomain(raw: PrismaCompany): Company {
    const logoUrl = raw.logoUrl ? `${env.ASSETS_URL}/${raw.logoUrl}` : null

    return {
      id: raw.id,
      contactId: raw.contactId,
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      logoUrl,
    }
  }

  static toDomainWithDetails(raw: PrismaCompany): CompanyDetails {
    const logoUrl = raw.logoUrl ? `${env.ASSETS_URL}/${raw.logoUrl}` : null

    return {
      id: raw.id,
      contactId: raw.contactId,
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      logoUrl,
    }
  }
}
