import axios from 'axios'

let axiosInstance = null

axiosInstance = axios.create({
  baseURL: 'http://localhost:8082',
})

const api = axiosInstance

export { api }
