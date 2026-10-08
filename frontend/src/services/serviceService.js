import { api, unwrap } from './api.js'
import { createCrudService } from './crudService.js'

const providerServices = createCrudService('/services')

export default {
  ...providerServices,
  listCategories: (params = {}) => unwrap(api.get('/services/categories', { params })),
  createCategory: (payload) => unwrap(api.post('/services/categories', payload)),
  updateCategory: (id, payload) => unwrap(api.patch(`/services/categories/${id}`, payload)),
  removeCategory: (id) => unwrap(api.delete(`/services/categories/${id}`)),
}
