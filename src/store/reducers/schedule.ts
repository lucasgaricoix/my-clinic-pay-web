import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import {
  AppointmentSchedule,
} from '../../types/appointment/appointment'

const initialState: AppointmentSchedule = {
  id: '',
  user: {
    id: '',
    name: '',
    email: '',
    picture: '',
    role: 'standard',
    tenantId: ''
  },
  date: '',
  schedule: [],
  unavailableSchedule: []
}

const scheduleSession = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<AppointmentSchedule>) => {
      state.id = action.payload.id
      state.user = action.payload.user
      state.date = action.payload.date
      state.schedule = action.payload.schedule
      state.unavailableSchedule = action.payload.schedule
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setSchedule } = scheduleSession.actions

export default scheduleSession.reducer
