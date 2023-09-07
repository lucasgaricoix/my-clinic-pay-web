export interface Exception {
  code: number
  message: string
  meta?: Record<string, string>
}

export interface Error {
  status: number
  error: string
  trace: string
  message: string
  path: string
}