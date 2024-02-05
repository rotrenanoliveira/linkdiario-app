import { redirect } from 'next/navigation'

import { Account, Company } from '@/core/types'
import { AccountsRepository, CompaniesRepository } from '@/lib/db'
import { validateUserAccess } from '@/utils/validate-access'

/**
 * Retrieves the company information associated with the user, after validating user access.
 *
 * @return {Promise<Company|null>} The company information associated with the user.
 */
async function getCompany(): Promise<Company | null> {
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

/**
 * Retrieves the account associated with the authenticated user.
 *
 * @return {Promise<Account|null>} The account information.
 */
async function getAccount(): Promise<Account | null> {
  const _user = validateUserAccess()
  if (!_user.isValid) {
    redirect('/')
  }
  // Get user ID
  const userId = _user.payload.userId
  // Get accounts
  const account = await AccountsRepository.findById(userId)
  return account
}

export const Services = {
  // company
  getCompany,
  // account
  getAccount,
}
