import axios from 'axios'
import { serverBaseUrl } from '../utils/constants'

const api = axios.create({
  baseURL: serverBaseUrl,
  withCredentials: true,
})

let accessToken = null
let navigateFn = null

export const setNavigate = (fn) => {
  navigateFn = fn
}

export const navigateTo = (path) => {
  if (navigateFn) {
    navigateFn(path)
  } else {
    try {
      if (window.location.hash || window.location.href.includes('#')) {
        window.location.hash = path
      } else {
        window.location.assign(path)
      }
    } catch {
      // ignore
    }
  }
}

export const setAccessToken = (token) => {
  accessToken = token
}

export const getAccessToken = () => accessToken

export const clearAccessToken = () => {
  accessToken = null
}

export const executeLogout = async () => {
  try {
    const response = await api.post('/auth/logout')
    return response.data
  } finally {
    clearAccessToken()
  }
}

api.interceptors.request.use((config) => {
  if (accessToken && !config.skipAuthHeader) {
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

    // Requests that explicitly opt out of the refresh flow (e.g. getMe on boot)
    if (originalRequest?.skipAuthRefresh) {
      if (error.response?.data?.message) {
        error.message = error.response.data.message
      }
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
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

        // Redirect via registered useNavigate SPA navigation helper
        try {
          navigateTo('/signIn')
        } catch {
          // ignore in non-browser environments
        }
        return Promise.reject(refreshError)
      }
    }

    // Attach any server-sent message to the thrown Error for downstream handlers
    if (error.response?.data?.message) {
      error.message = error.response.data.message
    }

    return Promise.reject(error)
  }
)

export default api