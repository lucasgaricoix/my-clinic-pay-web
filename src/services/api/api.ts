import axios, { AxiosInstance } from 'axios'

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

const api = axiosInstance

export { api, setCustomHeaders }
