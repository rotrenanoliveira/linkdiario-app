export type UserRole = 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED'
export type UserLicense = 'STANDARD' | 'PRO'

export type Account = {
  id: string
  email: string
  fullName: string
  license: UserLicense
  status: UserStatus
}

export type AccountDetails = Account & {
  role: UserRole
  createdAt: Date
}
