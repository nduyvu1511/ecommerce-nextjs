import axios from "axios"

export const DOMAIN_URL = "https://demo.satavan.com"

const axiosClient = axios.create({
  baseURL: DOMAIN_URL,
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
