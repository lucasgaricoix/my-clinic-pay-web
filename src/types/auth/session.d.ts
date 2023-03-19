import { ScheduleSettings } from "../settings/schedule"
import { Settings } from "../user/user"

export type UserSession = {
  id?: string
  name: string
  email: string
  password: string
  picture: string
  iat: number
  exp: number,
  token: string,
  tenantId?: string
  sub?: string
  role?: string
  settings?: Settings
}
