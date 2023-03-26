import { UserSession } from '../../types/auth/session'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAuthApi } from '@/services/auth/auth-rtk-api'
import { m } from 'framer-motion'

const initialState: UserSession = {
  id: '',
  name: '',
  email: '',
  picture: '',
  token: '',
  tenantId: '',
  settings: {
    schedule: {
      rules: [],
    },
  },
}

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setUserSession: (state, { payload }: PayloadAction<UserSession>) => {
      state.id = payload.id
      state.name = payload.name
      state.email = payload.email
      state.picture = payload.picture
      state.token = payload.token
      state.tenantId = payload.tenantId
      state.role = payload.role
      state.settings = payload.settings
    },
    clearUserSession: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      useAuthApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.id = payload.id
        state.name = payload.name
        state.email = payload.email
        state.picture = payload.picture
        state.tenantId = payload.tenantId
        state.role = payload.role
        state.settings = payload.settings
      }
    ),
      builder.addMatcher(
        useAuthApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.name = payload.name ?? ''
          state.email = payload.email ?? ''
          state.token = payload.token
          state.tenantId = payload.tenantId
        }
      ),
      builder.addMatcher(
        useAuthApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          state.name = payload.name ?? ''
          state.email = payload.email ?? ''
          state.token = payload.token
          state.tenantId = payload.tenantId
        }
      )
  },
})

export const { setUserSession, clearUserSession } = userSessionSlice.actions

export default userSessionSlice.reducer
