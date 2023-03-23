import axios, { AxiosInstance } from 'axios'
import jwt from 'jsonwebtoken'

interface Token {
  jti: string
  sub: string
  exp: string
}

let axiosInstance: AxiosInstance | null = null

axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

function setCustomHeaders(tenantId?: string, token?: string) {
  axiosInstance?.interceptors.request.use(function (config) {
    config.headers['X-tenant-id'] = tenantId
    config.headers['Authorization'] = token
    return config
  })
}

function setCustomHeadersFromToken(token: string) {
  const tokenSubstring = token.substring(7)
  const value = jwt.decode(tokenSubstring, { json: true }) as unknown as Token
  axiosInstance?.interceptors.request.use(function (config) {
    config.headers['X-tenant-id'] = value.jti
    config.headers['Authorization'] = token
    return config
  })
}

const api = axiosInstance

export { api, setCustomHeaders, setCustomHeadersFromToken }
