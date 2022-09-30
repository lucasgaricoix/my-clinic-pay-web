import axios from 'axios'

let axiosInstance = null

axiosInstance = axios.create({
  baseURL: 'https://my-clinic-pay.herokuapp.com',
  // headers: { Authorization: `Bearer ${token}` },
})

const api = axiosInstance

export { api }
