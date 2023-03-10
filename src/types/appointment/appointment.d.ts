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
  scheduled: Scheduled[]
}

type Scheduled = {
  at: string,
  duration: number
  patient: Patient
  appointmentType: string,
  description: string
}
