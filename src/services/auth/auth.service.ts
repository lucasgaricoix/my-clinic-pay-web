import { Credential, UserPayload } from '@/types/user/user'
import axios, { AxiosPromise } from 'axios'
import { api } from '../api'

const DEFAULT_TENANT_ID = 'admin'

export const signup = (user: UserPayload): AxiosPromise<UserPayload> => {
  return api.post('/api/auth/signup', user, {
    headers: { 'X-tenant-id': DEFAULT_TENANT_ID },
  })
}

export const login = (credential: Credential): AxiosPromise<UserPayload> => {
  return api.post('/api/auth/login', credential)
}

export const refresh = (token: string): AxiosPromise<UserPayload> => {
  return api.post('/api/auth/login', token, {
    headers: { 'Refresh-Token': token },
  })
}

export const AuthService = { signup, login }
