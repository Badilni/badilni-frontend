import api, { executeLogout } from './axios'

export const loginRequest = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data)

export const logoutRequest = () => executeLogout()

export const getMeRequest = () =>
  api.get('/users/me', { skipAuthRefresh: true }).then((r) => r.data)

export const refreshRequest = () =>
  api.post('/auth/refresh').then((r) => r.data)

export const getUsersRequest = (params) =>
  api.get('/users', { params }).then((r) => r.data)

export const updateMe = (params) =>
  api.patch('/users/me', params).then((r) => r.data)

export const getUserProfileRequest = (userId) =>
  api.get(`/users/${userId}`).then((r) => r.data)

export const resetUserEmail = (data) =>
  api
    .patch('/auth/me/email', {
      currentPassword: data.currentPassword,
      newEmail: data.newEmail,
    })
    .then((r) => r.data)

export const verifyChangedEmail = (code) =>
  api.post('/auth/me/email/verify', { code }).then((r) => r.data)

export const deactivateMeRequest = () =>
  api.delete('/users/me').then((r) => r.data)

export const deleteAvatarRequest = () =>
  api.delete('/users/me/avatar').then((r) => r.data)