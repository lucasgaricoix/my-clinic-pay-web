import { Patient } from "../patient"

export type Schedule = {
  start: string
  end: string
  duration: number
  patient: Patient
  appointmentType: string
  description: string
}

export type UnavailableSchedule = {
  start: string
  end: string
}

export const scheduleTypeEnum: Record<string, string> = {
  schedule: 'Agendamento',
  confirmed: 'Confirmado',
  absence: 'Falta',
  cancel: 'Cancelou',
  not_informed: 'Não avisou',
  feedback_session: 'Sessão devolutiva',
  delayed: 'Atrasado',
  attended: 'Atendido',
  not_attended: 'Não atendido',
  social: 'Social',
}
