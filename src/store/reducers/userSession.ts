import { UserSession } from '../../types/auth/session'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/services/auth/redux-api'

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
      authApi.endpoints.signup.matchFulfilled,
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
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload
        }
      )
  },
})

export const { setUserSession, clearUserSession } = userSessionSlice.actions

export default userSessionSlice.reducer
