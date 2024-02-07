import { AccessCode } from '@/core/types/access-code'
import prisma from '@/lib/prisma'

export const PrismaAccessCodeRepository = {
  async findByUserId(userId: string): Promise<AccessCode | null> {
    const accessCode = await prisma.accessCode.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!accessCode) {
      return null
    }

    return accessCode
  },

  async create(data: AccessCode): Promise<void> {
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
