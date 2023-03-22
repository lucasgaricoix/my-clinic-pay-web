import { Credential, UserPayload } from '@/types/user/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
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
    login: builder.query<string, Credential>({
      query: (credential) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credential,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      transformResponse(__, meta) {
        return meta?.response?.headers.get('Authorization') ?? ''
      },
    }),
  }),
})

export const { useSignupQuery, useLoginQuery } = authApi
