export type UserSession = {
  name: string
  email: string
  picture: string
  iat: number
  exp: number,
  token: string,
  tenantId?: string
}

export type UserPayload = {
  name: string
  email: string
  picture: string,
  role: string,
  tenantId?: string
}
