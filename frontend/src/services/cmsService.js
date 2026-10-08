import { api, unwrap } from './api.js'

export default {
  list: () => unwrap(api.get('/cms')),
  save: (section, payload) => unwrap(api.put(`/cms/${section}`, payload)),
}
