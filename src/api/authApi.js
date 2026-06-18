import api from './axios'

export const loginRequest = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data)

export const logoutRequest = () => api.post('/auth/logout').then((r) => r.data)

export const getMeRequest = () =>
  api.get('/users/me', { skipAuthRefresh: true }).then((r) => r.data)

export const refreshRequest = () =>
  api.post('/auth/refresh').then((r) => r.data)

export const getUsersRequest = (params) =>
  api.get('/users', { params }).then((r) => r.data)

export const updateMe = (params) =>
  api.patch('/users/me', params).then((r) => r.data)
