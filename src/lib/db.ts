import { AccessCode } from '@/core/types/access-code'
import { Account, UserRole } from '@/core/types/accounts'

import { PrismaAccessCodeRepository } from './prisma/repositories/prisma-access-code-repository'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts-repository'

//= Access Code Repository ==//
export const AccessCodeRepository = {
  findByUserId(userId: string) {
    return PrismaAccessCodeRepository.findByUserId(userId)
  },
  create(data: AccessCode) {
    return PrismaAccessCodeRepository.create(data)
  },
  save(id: string, data: Partial<AccessCode>) {
    return PrismaAccessCodeRepository.save(id, data)
  },
}
//= Accounts Repository ==//
export const AccountsRepository = {
  findByEmail(email: string) {
    return PrismaAccountsRepository.findByEmail(email)
  },
  findById(id: string) {
    return PrismaAccountsRepository.findById(id)
  },
  findMany() {
    return PrismaAccountsRepository.findMany()
  },
  findManyByRole(role: UserRole) {
    return PrismaAccountsRepository.findManyByRole(role)
  },
  create(data: Account) {
    return PrismaAccountsRepository.create(data)
  },
}
