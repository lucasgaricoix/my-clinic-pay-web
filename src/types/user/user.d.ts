
export type UserPayload = {
  id?: string
  name: string
  email: string
  password: string
  picture: string,
  role?: string,
  settings?: Settings
  tenantId?: string
  token?: string
}

type Settings = {
  id?: string
  schedule: Pick<ScheduleSettings, 'rules'>
}


export type Credential ={
  username: string
  password: string
}
