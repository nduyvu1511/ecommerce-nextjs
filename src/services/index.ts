import axios from "axios"

export const DOMAIN_URL = "https://erp.womart.vn"

const axiosClient = axios.create({
  baseURL: "https://erp.womart.vn",
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(async (config) => {
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response.data
    }
    return response
  },
  (err) => {
    throw err
  }
)

export default axiosClient
