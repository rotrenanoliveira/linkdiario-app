export type SuccessActionResponse = {
  success: true
  title: string
  message: string
}

export type FailureActionResponse = {
  success: false
  title: string
  message: string
}

export type ActionResponse = SuccessActionResponse | FailureActionResponse
