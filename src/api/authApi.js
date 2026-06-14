import api from './axios'

export const loginRequest = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data)

export const logoutRequest = () => api.post('/auth/logout').then((r) => r.data)

/**
 * skipAuthRefresh: true is CRITICAL here.
 *
 * This endpoint is called on every page load to restore the session.
 * When the user is logged out, it returns 401 — and that is EXPECTED.
 * Without this flag, every 401 from this call triggers POST /auth/refresh.
 * Result: 3 reloads while logged out = 3 refresh calls = 429 rate limit.
 *
 * With the flag, the 401 is passed straight to the caller (checkAuth),
 * which handles it silently by setting user = null.
 */
export const getMeRequest = () =>
  api.get('/users/me', { skipAuthRefresh: true }).then((r) => r.data)

export const refreshRequest = () =>
  api.post('/auth/refresh').then((r) => r.data)
