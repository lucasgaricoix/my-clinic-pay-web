export type UserPayload = {
  id?: string
  name: string
  email: string
  password: string
  picture: string
  role?: string
  settings?: Settings
  tenantId?: string
  token?: string
}

interface Settings {
  id?: string
  schedule: Pick<ScheduleSettings, 'rules'>
}

export interface Credential {
  username: string
  password: string
}

export interface ParsedJWT {
  token: string
  refreshToken: string
  name?: string
  email?: string
  tenantId?: string
}