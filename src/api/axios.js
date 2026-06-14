import axios from 'axios'
import { serverBaseUrl } from '../utils/constants'

const api = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
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
    // If we hit a rate limit and still have retries remaining
    if (error.response?.status === 429 && retries > 0) {
      // Pause execution for the specified delay time
      await new Promise((resolve) => setTimeout(resolve, delay))
      // Retry with one less attempt and increase the delay slightly (backoff)
      return executeRefreshWithBackoff(retries - 1, delay * 1.5)
    }
    // If it's a 401/403 or we ran out of retries, bubble the error up
    throw error
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Stop execution immediately if the request that failed was the refresh route itself
      if (originalRequest.url.includes('/auth/refresh')) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Run the token refresh with the 429 retry safety net built-in
        await executeRefreshWithBackoff()

        isRefreshing = false
        processQueue(null)
        return api(originalRequest)
      } catch (refreshError) {
        isRefreshing = false
        processQueue(refreshError)

        // If the session is totally invalid (401/403) or retries ran out, redirect to login
        navigate('/signin', { replace: true })
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
