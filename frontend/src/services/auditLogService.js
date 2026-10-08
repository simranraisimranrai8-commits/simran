import { api, unwrap } from './api.js'

export default { list: (params = {}) => unwrap(api.get('/audit-logs', { params })) }
