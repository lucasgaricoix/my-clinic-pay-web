import { AxiosPromise } from "axios"
import { PaymentType } from "../../types/payment-type/payment-type"
import { api } from "../api"

export const getAll = (): AxiosPromise<PaymentType[]> => {
  return api.get('/payment/type')
}


export const save = (data: PaymentType, method: string = 'save'): AxiosPromise<PaymentType> => {
  if (method === 'update') {
    return api.put('payment/type', data)
  }
  return api.post('/payment/type', data)
}

export const findById = (id: string): AxiosPromise<PaymentType> => {
  return api.get(`/payment/type/${id}`)
}

export const removeById = (id: string): AxiosPromise<PaymentType> => {
  return api.delete(`payment/type/${id}`)
}