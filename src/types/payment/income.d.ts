import { Patient } from '../patient/patient-type'
import { PaymentType } from './payment-type'

export type Income = {
  id?: string
  date: string
  paymentType: PaymentType
  description: string
  sessionNumber?: Int
  isPaid: Boolean = false
  isPartial: Boolean = false
  isAbsence: Boolean = false
  person: Patient
}
