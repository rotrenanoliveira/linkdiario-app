import { CompaniesRepository } from '@/lib/db'
import { validateUserAccess } from '@/utils/validate-access'
import { redirect } from 'next/navigation'

async function getCompany() {
  const _user = validateUserAccess()
  if (!_user.isValid) {
    redirect('/')
  }
  // Get user ID
  const userId = _user.payload.userId
  // Get company
  const company = await CompaniesRepository.findByContactId(userId)
  return company
}

export const Services = {
  getCompany,
}
