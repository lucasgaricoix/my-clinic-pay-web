import { UserSession } from '../../types/auth/session'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: UserSession = {
  id: '',
  name: '',
  email: '',
  picture: '',
  iat: 0,
  exp: 0,
  token: '',
  tenantId: '',
}

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<UserSession>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.picture = action.payload.picture
      state.iat = action.payload.iat
      state.exp = action.payload.exp
      state.token = action.payload.token
      state.tenantId = action.payload.tenantId
    },
    clearUserSession: () => initialState,
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

export const { setUserSession, clearUserSession } = userSessionSlice.actions

export default userSessionSlice.reducer
