import { AxiosPromise } from 'axios'
import { PaymentOverMonthType } from '../../types/payment/payment'
import { api } from '../api'

export const findAllOverMonth = (): AxiosPromise<PaymentOverMonthType[]> => {
  return api.get('/payments/all/over-month')
}
