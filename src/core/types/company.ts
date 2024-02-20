export interface Company {
  id: string
  contactId: string
  name: string
  slug: string
  description: string
  logoUrl?: string | null
}

export type CompanyDetails = {
  createdAt: Date
  updatedAt?: Date | null
} & Company
