import { redirect } from 'next/navigation'

import { Company } from '@/core/types'
import { CompaniesRepository } from '@/infra/database/db'
import { getSession } from '../auth'

/**
 * Retrieves the company information associated with the user, after validating user access.
 *
 * @return {Promise<Company|null>} The company information associated with the user.
 */
export async function getCompany(): Promise<Company | null> {
  const session = await getSession()
  if (!session || !session.user) {
    redirect('/')
  }
  // Get user ID
  const userId = session.user as string
  // Get company
  const company = await CompaniesRepository.findByContactId(userId)
  return company
}
