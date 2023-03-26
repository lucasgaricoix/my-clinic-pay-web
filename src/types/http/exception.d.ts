export interface Exception {
  code: number
  message: string
  meta?: Record<string, string>
}
