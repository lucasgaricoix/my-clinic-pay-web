import { AxiosPromise } from 'axios'
import { PaymentType } from '../../types/payment/payment-type'
import { api } from '../api'

export const getAll = (): AxiosPromise<PaymentType[]> => {
  return api.get('/payments/types')
}

export const save = (
  data: PaymentType,
  method: string = 'save'
): AxiosPromise<PaymentType> => {
  if (method === 'update') {
    return api.put('/payments/types', data)
  }
  return api.post('/payments/types', data)
}

export const findById = (id: string): AxiosPromise<PaymentType> => {
  return api.get(`/payments/types/${id}`)
}

export const removeById = (id: string): AxiosPromise<PaymentType> => {
  return api.delete(`payments/types/${id}`)
}

export const search = (
  description: string,
  type: string
): AxiosPromise<PaymentType[]> => {
  return api.get('/payments/types/search', { params: { description, type } })
}
