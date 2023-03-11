import { PaymentType } from "../payment"

export type Patient = {
  id?: string,
  name: string,
  birthDate: string,
  responsible: Responsible
  paymentType: PaymentType
}

type Responsible = {
  name: string
}

export type Option = {
  value: string
  label: string
}
