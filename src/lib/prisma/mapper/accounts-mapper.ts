import { AccountDetails } from '@/core/types/accounts'
import { User as PrismaAccount } from '@prisma/client'

export class PrismaAccountsMapper {
  static toDomain(account: PrismaAccount): AccountDetails {
    return {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      status: account.status,
      role: account.role,
      createdAt: account.createdAt,
    }
  }
}
