import api from './axios'

export const getMatches = (params) =>
  api.get('/matches', { params }).then((r) => r.data)

export const getMatch = (id) => api.get(`/matches/${id}`).then((r) => r.data)
