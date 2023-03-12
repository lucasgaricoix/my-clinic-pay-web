export type UserSession = {
  id?: string
  name: string
  email: string
  picture: string
  iat: number
  exp: number,
  token: string,
  tenantId?: string
  sub?: string
}

export type UserPayload = {
  id?: string
  name: string
  email: string
  password: string
  picture: string,
  role: string,
  tenantId?: string
}
