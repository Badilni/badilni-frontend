import api from './axios'

export const getNotificationsRequest = (params = {}) =>
  api.get('/notifications', { params }).then((r) => r.data)

export const markAllAsReadRequest = () =>
  api.patch('/notifications/read-all').then((r) => r.data)

export const markAsReadRequest = (id) =>
  api.patch(`/notifications/${id}/read`).then((r) => r.data)

export const deleteNotificationRequest = (id) =>
  api.delete(`/notifications/${id}`).then((r) => r.data)
