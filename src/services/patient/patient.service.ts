import { AxiosPromise } from 'axios'
import { Patient } from '../../types/patient/patient-type'
import { api } from '../api'

export const findAll = (): AxiosPromise<Patient[]> => {
  return api.get('/persons')
}

export const deleteById = (id: string) => {
  return api.delete(`/persons/${id}`)
}

export const findById = (id: string): AxiosPromise<Patient> => {
  return api.get(`/persons/${id}`)
}

export const save = (patient: Patient, method = 'save') => {
  if (method === 'update') {
    return api.put('/persons', patient)
  }
  return api.post('/persons', patient)
}

export const search = (search: string): AxiosPromise<Patient[]> => {
  return api.get('/persons/search', { params: { name: search } })
}
