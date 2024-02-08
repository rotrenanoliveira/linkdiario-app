import { Optional } from '@/core/types'
import { AccessCode } from '@/core/types/access-code'
import prisma from '@/lib/prisma'

export const PrismaAccessCodeRepository = {
  async findByUserId(userId: string) {
    return await prisma.accessCode.findFirstOrThrow({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        code: true,
        usedAt: true,
        expiresAt: true,
      },
    })
  },

  async create(data: Optional<AccessCode, 'id'>): Promise<void> {
    await prisma.accessCode.create({
      data,
    })
  },
  async save(id: string, data: Partial<AccessCode>): Promise<void> {
    await prisma.accessCode.update({
      where: {
        id,
      },
      data,
    })
  },
}
