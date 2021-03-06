import { AxiosPromise } from 'axios'
import { Expense } from '../../types/payment/expense'
import { api } from '../api'

export const findAll = (month: number): AxiosPromise<Expense[]> => {
  return api.get('/expenses', { params: { month } })
}

export const findById = (id: string) => {
  return api.get(`/expenses/${id}`)
}

export const save = (expense: Expense, method = 'save') => {
  if (method === 'update') {
    return api.put('/expenses', expense)
  }
  return api.post('/expenses', expense)
}

export const deleteById = (id: string) => {
  return api.delete(`/expenses/${id}`)
}
