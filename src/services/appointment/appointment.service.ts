import { Appointment } from '../../types/appointment/appointment'
import { api } from '../api'

function create(data: Appointment) {
  return api.post('/appointments', data)
}

const appointmentService = { create }

export default appointmentService
