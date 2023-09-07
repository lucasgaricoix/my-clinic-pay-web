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
  schedules: [],
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
      state.schedules = action.payload.schedules
      state.unavailableSchedule = action.payload.schedules
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
