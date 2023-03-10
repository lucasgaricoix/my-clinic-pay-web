import { configureStore } from '@reduxjs/toolkit'
import userSessionSlice from './reducers/userSessionSlice'
import { createWrapper } from 'next-redux-wrapper'
import scheduleSlice from './reducers/scheduleSlice'

const store = () =>
  configureStore({
    reducer: {
      userSession: userSessionSlice,
      schedule: scheduleSlice
    }
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>

export const wrapper = createWrapper<AppStore>(store)
