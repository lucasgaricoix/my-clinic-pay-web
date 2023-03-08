import { Patient } from "../patient"

export type Appointment = {
  patientId: string
  user: string,
  at: string
  duration: number
  type: string
  description?: string
}

export type AppointmentSchedule = {
  id: string
  user: string
  date: string
  scheduled: Array<Scheduled>
}

type Scheduled = {
  at: string,
  duration: number
  patient: Patient
  description: string
}
