import axios from 'axios'
import { serverBaseUrl } from '../utils/constants'

const api = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true, // keep this if refresh token lives in an httpOnly cookie
})

// ---- Access token store (in-memory, not localStorage, to limit XSS exposure) ----
let accessToken = null

export const setAccessToken = (token) => {
  accessToken = token
}

export const getAccessToken = () => accessToken

export const clearAccessToken = () => {
  accessToken = null
}

// ---- Attach token to every outgoing request ----
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

/**
 * Robust wrapper to hit the refresh endpoint.
 * If the server responds with a 429, it pauses and retries up to 'retries' times.
 */
const executeRefreshWithBackoff = async (retries = 3, delay = 1000) => {
  try {
    return await api.post('/auth/refresh')
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return executeRefreshWithBackoff(retries - 1, delay * 1.5)
    }
    throw error
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Run the token refresh with the 429 retry safety net built-in
        const refreshResponse = await executeRefreshWithBackoff()

        // Adjust this path to match your backend's actual response shape
        const newAccessToken = refreshResponse.data.accessToken
        setAccessToken(newAccessToken)

        isRefreshing = false
        processQueue(null, newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        isRefreshing = false
        processQueue(refreshError)
        clearAccessToken()

        navigate('/signin', { replace: true })
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
