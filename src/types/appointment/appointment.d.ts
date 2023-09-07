import { UserPayload } from '../auth/session'
import { Patient } from '../patient'
import { PaymentType } from '../payment'
import { Schedule, UnavailableSchedule } from './schedule'

export type Appointment = {
  patientId: string
  userId: string
  at: string
  duration: number
  appointmentType: string
  description?: string
}

export type AppointmentSchedule = {
  id: string
  user: UserPayload
  date: string
  schedules: Schedule[]
  unavailableSchedule: UnavailableSchedule[]
}

export type ScheduleTimes = {
  id?: string
  start: Date
  end: Date
  duration: number
  appointmentType: string
  description: string
  patient?: Patient
}
