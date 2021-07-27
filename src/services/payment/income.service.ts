import { AxiosPromise } from 'axios'
import { Income } from '../../types/payment/income'
import { api } from '../api'

export const findAll = (): AxiosPromise<Income[]> => {
  return api.get('/incomes')
}

export const findById = (id: string): AxiosPromise<Income> => {
  return api.get(`/incomes/${id}`)
}

export const deleteById = (id: string): AxiosPromise<void> => {
  return api.delete(`/incomes/${id}`)
}

export const save = (income: Income, method = 'save'): AxiosPromise<void> => {
  if (method === 'update') {
    return api.put('/incomes', income)
  }
  return api.post('/incomes', income)
}

export const search = (description: string): AxiosPromise<Income> => {
  return api.get('/incomes/search', { params: { description } })
}
