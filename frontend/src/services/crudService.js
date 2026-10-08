import { api, unwrap } from './api.js'

// Mirrors the backend's crudFactory: given a base URL this returns
// list/get/create/update/remove functions that all admin pages can share.
export function createCrudService(basePath) {
  return {
    list: (params = {}) => unwrap(api.get(basePath, { params })),
    getById: (id) => unwrap(api.get(`${basePath}/${id}`)),
    create: (payload) => unwrap(api.post(basePath, payload)),
    update: (id, payload) => unwrap(api.patch(`${basePath}/${id}`, payload)),
    remove: (id) => unwrap(api.delete(`${basePath}/${id}`)),
  }
}
