import { setError } from '@/store/reducers/notification'
import { Credential, ParsedJWT, UserPayload } from '@/types/user/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import jwt from 'jsonwebtoken'
import { setCustomHeadersFromToken } from '../api'

export const useAuthApi = createApi({
  reducerPath: 'authSession',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signup: builder.query<UserPayload, UserPayload>({
      query: (user) => ({
        url: '/api/auth/signup',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    login: builder.query<ParsedJWT, Credential>({
      query: (credential) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credential,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      transformResponse(__, meta) {
        const token = meta?.response?.headers.get('Authorization')
        const refreshToken = meta?.response?.headers.get('Refresh-Token')
        const tokenSubstring = token?.substring(7)
        const value = jwt.decode(tokenSubstring ?? '', { json: true })
        return {
          id: value?.jti,
          token: token ?? '',
          refreshToken: refreshToken ?? '',
          name: value?.aud as string,
          email: value?.sub as string,
          tenantId: value?.jti,
        }
      },
      async onQueryStarted(__, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled
          setCustomHeadersFromToken(data.token, data.tenantId)
        } catch (error: any) {
          const exception = {
            code: 403,
            message: 'Bad credentials.',
            meta: error,
          }
          dispatch(setError(exception))
        }
      },
    }),
    refresh: builder.query<ParsedJWT, string>({
      query: (token) => ({
        url: '/api/auth/refresh-token',
        method: 'POST',
        body: token,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Refresh-token': token,
        },
      }),
      transformResponse(__, meta) {
        const token = meta?.response?.headers.get('Authorization')
        const refreshToken = meta?.response?.headers.get('Refresh-token')
        const tokenSubstring = token?.substring(7)
        const value = jwt.decode(tokenSubstring ?? '', { json: true })
        return {
          id: value?.jti,
          token: token ?? '',
          refreshToken: refreshToken ?? '',
          name: value?.aud as string,
          email: value?.sub as string,
          tenantId: value?.jti,
        }
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        const { data } = await queryFulfilled
        setCustomHeadersFromToken(data.token, data.tenantId)
      },
    }),
  }),
})

export const {
  useSignupQuery,
  useLoginQuery,
  useLazySignupQuery,
  useLazyLoginQuery,
  useRefreshQuery,
  useLazyRefreshQuery,
} = useAuthApi
