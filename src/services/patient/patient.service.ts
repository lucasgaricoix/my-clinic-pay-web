import { Patinet } from "../../types/patient/patient-type"
import { api } from "../api"

export const findAll = () => {
  return api.get('/person')
}

export const deleteById = (id: string) => {
  return api.delete(`/person/${id}`)
}

export const findById = (id: string) => {
  return api.get(`/person/${id}`)
}

export const save = (patient: Patinet, method = 'save') => {
  if (method === 'update') {
    return api.put('/person', patient)
  }
  return api.post('/person', patient)
}