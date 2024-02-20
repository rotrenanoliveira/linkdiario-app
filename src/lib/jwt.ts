import jwt from 'jsonwebtoken'

export function jwtDecode(token: string) {
  const decoded = jwt.decode(token)

  if (!decoded) {
    throw new Error('Token inválido.')
  }

  return decoded
}
