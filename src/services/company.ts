import { CompaniesRepository } from '@/lib/db'
import { jwtDecode } from '@/lib/jwt'
import { cookies } from 'next/headers'

async function getCompany() {
  // Get token
  const token = cookies().get('_Host:linkdiario:token')
  if (!token) throw new Error('Token not found')
  // Decode token
  const payload = jwtDecode(token.value)
  if (!payload.sub) throw new Error('Invalid token')
  // Get user ID
  const userId = payload.sub.toString()
  // Get company
  const company = await CompaniesRepository.findByContactId(userId)
  return company
}

export const Services = {
  getCompany,
}
