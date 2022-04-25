import axios from "axios"

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://demo.satavan.com"

const axiosClient = axios.create({
  baseURL: API_URL,
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
