import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error'
import { FailureRequestAccessCodeResponse } from '@/core/types'

export function ActionResponseError(error: unknown): FailureRequestAccessCodeResponse | null {
  console.error(error)

  if (error instanceof InvalidCredentialsError) {
    return {
      success: false,
      title: 'Algo deu errado!',
      message: error.message,
    }
  }

  if (error instanceof ZodError) {
    const zodValidationError = fromZodError(error)
    return {
      success: false,
      title: 'Algo deu errado!',
      message: zodValidationError.toString(),
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      title: error.name,
      message: error.message,
    }
  }

  return null
}
