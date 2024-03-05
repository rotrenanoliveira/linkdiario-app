import { AccountDetails, UserLicense } from '@/core/types/accounts'
import { User as PrismaAccount } from '@prisma/client'

type PrismaAccountWithLicense = PrismaAccount & {
  license: {
    license: UserLicense
  } | null
}

export class PrismaAccountsMapper {
  static toDomain(account: PrismaAccountWithLicense): AccountDetails {
    return {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      status: account.status,
      role: account.role,
      license: account.license?.license || 'STANDARD',
      createdAt: account.createdAt,
    }
  }
}
