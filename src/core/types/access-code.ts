export interface AccessCode {
  id: string
  userId: string
  code: string
  expiresAt: Date
  usedAt?: Date | null
}
