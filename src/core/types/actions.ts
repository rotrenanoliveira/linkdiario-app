export type SuccessRequestAccessCodeResponse<S = Record<string, unknown>> = {
  success: true
  title: string
  message: string
} & S

export type FailureRequestAccessCodeResponse<F = Record<string, unknown>> = {
  success: false
  title: string
  message: string
} & F

/**
 * Represents the possible states of an action, encapsulating either a failure or a success response.
 *
 * This type is a union of `FailureRequestAccessCodeResponse<F>` and `SuccessRequestAccessCodeResponse<S>`,
 * where `F` and `S` are generic types that default to `Record<string, unknown>`. The `Record<string, unknown>`
 * serves as a flexible structure to hold any additional fields that might be needed for the response.
 *
 * @typeParam F - The shape of additional data to include in a failure response.
 * @typeParam S - The shape of additional data to include in a success response.
 */
export type ActionStateResponse<F = Record<string, unknown>, S = Record<string, unknown>> =
  | FailureRequestAccessCodeResponse<F>
  | SuccessRequestAccessCodeResponse<S>
