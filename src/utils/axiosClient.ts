/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios'

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
})

/* Request Interceptor */
export const requestInterceptor = async (config: any) => {
  const customHeader = {} as AxiosRequestHeaders

  return {
    ...config,
    headers: {
      ...customHeader,
      ...config.headers
    }
  }
}
export const requestErrorInterceptor = (error: any) => Promise.reject(error)
axiosClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor)

/* Response Interceptor */
export const responseInterceptor = (response: any) => {
  return response?.data || {}
}
export const responseErrorInterceptor = async (error: any) => {
  if (error.response && error.response.data.message) {
    return Promise.reject(error.response.data.message)
  } else if (error.message) {
    return Promise.reject(error.message)
  } else {
    return Promise.reject('Có lỗi bất ngờ xảy ra !!!')
  }
}
axiosClient.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

/* Export */
export default axiosClient
