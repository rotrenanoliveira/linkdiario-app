import { redirect } from 'next/navigation'

import { Account } from '@/core/types'
import { AccountsRepository } from '@/infra/database/db'
import { validateUserAccess } from '@/utils/validate-access'

/**
 * Retrieves the account associated with the authenticated user.
 *
 * @return {Promise<Account|null>} The account information.
 */
export async function getAccount(): Promise<Account | null> {
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
