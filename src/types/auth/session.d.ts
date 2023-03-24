import { ScheduleSettings } from "../settings/schedule"
import { Settings } from "../user/user"

export type UserSession = {
  id?: string
  name: string
  email: string
  picture: string
  token?: string,
  tenantId?: string
  role?: string
  settings?: Settings
}
