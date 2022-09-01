import { AxiosPromise } from 'axios'
import { Income } from '../../types/payment/income'
import { IncomeByPatient } from '../../types/payment/income-by-patient'
import { api } from '../api'

export const findAll = (month: number, year: number): AxiosPromise<Income[]> => {
  return api.get('/incomes/search', { params: { month, year } })
}

export const findAllByPatient = (
  month: number,
  year: number
): AxiosPromise<IncomeByPatient[]> => {
  return api.get('/incomes/by-patients', { params: { month, year } })
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

export const pay = (id: string) => {
  return api.put(`/incomes/pay`, { id })
}
