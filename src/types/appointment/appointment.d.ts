import { UserPayload } from "../auth/session"
import { Patient } from "../patient"

export type Appointment = {
  patientId: string
  userId: string,
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

type Schedule = {
  start: string,
  end: string,
  duration: number
  patient: Patient
  appointmentType: string,
  description: string
}

type UnavailableSchedule = {
  start: string
  end: string
}

export type CalendarTimes = {
  start: Date
  end: Date
  patientName: string
  type: string
  duration: number
}
