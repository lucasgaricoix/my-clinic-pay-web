
export type UserPayload = {
  id?: string
  name: string
  email: string
  password: string
  picture: string,
  role?: string,
  settings?: Settings
  tenantId?: string
}

type Settings = {
  id?: string
  schedule: Pick<ScheduleSettings, 'rules'>
}
