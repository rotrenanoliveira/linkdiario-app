import { Account, AccountDetails, UserRole } from '@/core/types/accounts'
import { PrismaAccountsMapper } from '../mapper/accounts-mapper'
import { prisma } from '../client'

export const PrismaAccountsRepository = {
  /**
   * Find a user by email.
   *
   * @param {string} email - the email of the user to find
   * @return {Promise<AccountDetails | null>} the account corresponding to the email, or null if not found
   */
  async findByEmail(email: string): Promise<AccountDetails | null> {
    const account = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  },
  /**
   * Finds a user by ID.
   *
   * @param {string} id - the ID of the user to find
   * @return {Promise<AccountDetails | null>} the user account, or null if not found
   */
  async findById(id: string): Promise<AccountDetails | null> {
    const account = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  },
  /**
   * Find many accounts and map them to domain objects.
   *
   * @return {Promise<AccountDetails[]>} mapped domain objects
   */
  async findMany(): Promise<AccountDetails[]> {
    const accounts = await prisma.user.findMany()

    return accounts.map(PrismaAccountsMapper.toDomain)
  },
  /**
   * Asynchronously finds many users by role.
   *
   * @param {UserRole} role - the role to filter by
   * @return {Promise<AccountDetails[]>} an array of domain accounts
   */
  async findManyByRole(role: UserRole): Promise<AccountDetails[]> {
    const accounts = await prisma.user.findMany({
      where: {
        role,
      },
    })

    return accounts.map(PrismaAccountsMapper.toDomain)
  },
  /**
   * Create a new account.
   *
   * @param {Account} data - the data for creating the account
   * @return {Promise<void>} a promise that resolves when the account is created
   */
  async create(data: Account): Promise<void> {
    await prisma.user.create({
      data,
    })
  },
}
