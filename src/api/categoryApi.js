import api from './axios'

export const getAllCategoriesRequest = (params = {}) =>
  api.get('/categories', { params }).then((r) => r.data)

export const getCategoryByIdRequest = (id) =>
  api.get(`/categories/${id}`).then((r) => r.data)
