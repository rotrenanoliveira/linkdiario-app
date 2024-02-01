import { Account, UserRole } from '@/core/types/accounts'
import { PrismaClient } from '@prisma/client'
import { PrismaAccountsMapper } from '../mapper/accounts-mapper'

export class PrismaAccountsRepository {
  private prisma: PrismaClient

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient
    this.connect()
  }

  private connect() {
    this.prisma.$connect()
  }

  disconnect() {
    return this.prisma.$disconnect()
  }

  async findByEmail(email: string) {
    const account = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  }

  async findById(id: string) {
    const account = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  }

  async findMany() {
    const accounts = await this.prisma.user.findMany()

    return accounts.map(PrismaAccountsMapper.toDomain)
  }

  async findManyByRole(role: UserRole) {
    const accounts = await this.prisma.user.findMany({
      where: {
        role,
      },
    })

    return accounts.map(PrismaAccountsMapper.toDomain)
  }

  async create(data: Account) {
    await this.prisma.user.create({
      data,
    })
  }
}
