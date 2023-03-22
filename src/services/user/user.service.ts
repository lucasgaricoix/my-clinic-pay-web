import { AxiosPromise } from 'axios'
import { UserPayload } from '../../types/user/user'
import { api } from '../api'

export function updateUser(user: UserPayload): AxiosPromise<UserPayload> {
  return api.patch('/users', user)
}

export const UserService = { updateUser }
