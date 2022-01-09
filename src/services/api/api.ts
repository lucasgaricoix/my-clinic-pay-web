import axios from 'axios'

let axiosInstance = null

axiosInstance = axios.create({
  baseURL: 'https://my-clinic-pay.herokuapp.com',
})

const api = axiosInstance

export { api }
