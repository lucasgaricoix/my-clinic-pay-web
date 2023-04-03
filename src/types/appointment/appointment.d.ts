import { UserPayload } from '../auth/session'
import { Patient } from '../patient'
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
  schedule: Schedule[]
  unavailableSchedule: UnavailableSchedule[]
}

export type CalendarTimes = {
  start: Date
  end: Date
  patientName: string
  type: string
  duration: number
}
