import { AxiosPromise } from 'axios'
import { Appointment, AppointmentSchedule } from '../../types/appointment/appointment'
import { api } from '../api'

function create(data: Appointment) {
  return api.post('/appointments', data)
}

function findAppointmentByUserAndDate(userId: string, date: string): AxiosPromise<AppointmentSchedule> {
  return api.get(`appointments/${userId}`, { params: { date }})
}

const appointmentService = { create, findAppointmentByUserAndDate }

export default appointmentService
