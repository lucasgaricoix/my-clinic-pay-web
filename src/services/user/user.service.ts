import { AxiosPromise } from 'axios'
import { UserPayload } from '../../types/user/user'
import { api } from '../api'

const DEFAULT_TENANT_ID = 'admin'

export function createUser(user: UserPayload): AxiosPromise<UserPayload> {
  return api.post('/users', user, {
    headers: { 'X-tenant-id': DEFAULT_TENANT_ID },
  })
}

export function updateUser(user: UserPayload): AxiosPromise<UserPayload> {
  return api.patch('/users', user)
}

export const UserService = { createUser, updateUser }
