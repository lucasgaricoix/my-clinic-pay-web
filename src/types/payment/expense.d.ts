import { PaymentType } from './payment-type'

export type Expense = {
  id?: string
  date?: string
  dueDate: string
  paymentDate: string
  paymentType: PaymentType
  description: string
}
