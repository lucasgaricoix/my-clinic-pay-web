import { UserSession } from '../../types/auth/session'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAuthApi } from '@/services/auth/auth-rtk-api'
import { Exception } from '@/types/http/exception'

const initialState: Exception = {
  code: 0,
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<Exception>) => {
      state.code = payload.code
      state.message = payload.message
      state.meta = payload.meta
    },
    clear: () => initialState,
  },
})

export const { setError, clear } = notificationSlice.actions

export default notificationSlice.reducer
