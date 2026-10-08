import { api, unwrap } from './api.js'

export default {
  get: () => unwrap(api.get('/settings')),
  update: (payload) => unwrap(api.patch('/settings', payload)),
}
