import axios, { AxiosInstance } from 'axios'

let axiosInstance: AxiosInstance | null = null

axiosInstance = axios.create({
  baseURL: 'https://my-clinic-pay.herokuapp.com',
  // baseURL: 'http://localhost:8082',
})

function setTenantId(tenantId?: string) {
  axiosInstance?.interceptors.request.use(function (config) {
    config.headers['X-tenant-id'] = tenantId
    return config
  })
}

const api = axiosInstance

export { api, setTenantId }
