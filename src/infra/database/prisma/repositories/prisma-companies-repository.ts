import { Company, CompanyDetails } from '@/core/types/company'
import prisma from '@/lib/prisma'

export const PrismaCompaniesRepository = {
  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    })

    if (!company) {
      return null
    }

    return company
  },
  async findBySlug(slug: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: {
        slug,
      },
    })

    if (!company) {
      return null
    }

    return company
  },
  async findByContactId(contactId: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: {
        contactId,
      },
    })

    if (!company) {
      return null
    }

    return company
  },
  async findMany(): Promise<CompanyDetails[]> {
    const companies = await prisma.company.findMany()
    return companies
  },
  async create(data: Omit<Company, 'id'>): Promise<void> {
    await prisma.company.create({
      data,
    })
  },
  async save(id: string, data: Partial<Company>): Promise<void> {
    await prisma.company.update({
      where: {
        id,
      },
      data,
    })
  },
}
