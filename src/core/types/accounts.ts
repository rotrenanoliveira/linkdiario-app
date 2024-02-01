export type UserRole = 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED'

export type Account = {
  id: string
  email: string
  fullName: string
  status: UserStatus
}

export type AccountDetails = Account & {
  role: UserRole
  createdAt: Date
}
