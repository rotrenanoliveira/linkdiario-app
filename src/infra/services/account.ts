import { redirect } from 'next/navigation'

import { Account } from '@/core/types'
import { AccountsRepository } from '@/infra/database/db'
import { getSession } from '../auth'

/**
 * Retrieves the account associated with the authenticated user.
 *
 * @return {Promise<Account|null>} The account information.
 */
export async function getAccount(): Promise<Account | null> {
  const session = await getSession()
  if (!session || !session.user) {
    redirect('/')
  }
  // Get user ID
  const userId = session.user as string
  // Get accounts
  const account = await AccountsRepository.findById(userId)
  return account
}
