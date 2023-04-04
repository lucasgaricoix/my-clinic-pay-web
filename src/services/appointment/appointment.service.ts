import { AxiosPromise } from 'axios'
import {
  Appointment,
  AppointmentSchedule,
} from '../../types/appointment/appointment'
import { api } from '../api'

function create(data: Appointment) {
  return api.post('/appointments', data)
}

function findAppointmentByUserAndDate(
  userId: string,
  date: string
): AxiosPromise<AppointmentSchedule> {
  return api.get(`appointments/${userId}`, { params: { date } })
}

function findWeeklyAppointment(
  from: string,
  to: string
): AxiosPromise<AppointmentSchedule[]> {
  return api.get('appointments/weekly', { params: { from, to } })
}

function deleteByIds(id: string, scheduleId: string) {
  return api.delete(`appointments/${id}/${scheduleId}`)
}

const appointmentService = { create, findAppointmentByUserAndDate, findWeeklyAppointment, deleteByIds }

export default appointmentService
