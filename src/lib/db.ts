import { Account } from '@/app/(app)/admin/accounts/register/accounts.types'
import { PrismaClient } from '@prisma/client'

export class PrismaAccountsRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
    this.prisma.$connect()
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Account): Promise<void> {
    await this.prisma.user.create({
      data,
    })
  }
}
