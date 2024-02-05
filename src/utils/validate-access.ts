import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

type Payload = {
  userId: string
}

type InvalidUserAccess = {
  isValid: false
  payload: null
}

type ValidUserAccess = {
  isValid: true
  payload: Payload
}

type UserAccess = InvalidUserAccess | ValidUserAccess

/**
 * Validate user access by checking the cookie for a token, decoding the token, and checking for a user ID in the payload.
 *
 * @return {UserAccess} An object containing a boolean indicating if the user access is valid and the user's ID if valid.
 */
export function validateUserAccess(): UserAccess {
  const cookie = cookies().get('_Host:linkdiario:token')
  if (!cookie) {
    return {
      isValid: false,
      payload: null,
    }
  }

  const token = cookie.value

  const payload = jwt.decode(token)
  if (!payload) {
    return {
      isValid: false,
      payload: null,
    }
  }

  if (!payload.sub) {
    return {
      isValid: false,
      payload: null,
    }
  }

  const userId = payload.sub.toString()

  return {
    isValid: true,
    payload: { userId },
  }
}
