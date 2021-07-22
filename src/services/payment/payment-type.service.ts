import { AxiosPromise } from "axios"
import { PaymentType } from "../../types/payment-type/payment-type"
import { api } from "../api"

export const getAll = (): AxiosPromise<PaymentType[]> => {
  return api.get('/payment/type')
}


export const save = (data: PaymentType): AxiosPromise<PaymentType> => {
  return api.post('/payment/type', data)
}