import { redirect } from 'next/navigation'

import { Company } from '@/core/types'
import { CompaniesRepository } from '@/infra/database/db'
import { validateUserAccess } from '@/utils/validate-access'

/**
 * Retrieves the company information associated with the user, after validating user access.
 *
 * @return {Promise<Company|null>} The company information associated with the user.
 */
export async function getCompany(): Promise<Company | null> {
  const _user = validateUserAccess()
  if (!_user.isValid) {
    redirect('/')
  }
  // Get user ID
  const userId = _user.payload.userId
  // Get company
  const company = await CompaniesRepository.findByContactId(userId)
  return company
}
