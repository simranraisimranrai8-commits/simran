import { api, unwrap } from './api.js'

export default {
  summary: () => unwrap(api.get('/reports/summary')),
  trend: (range) => unwrap(api.get('/reports/trend', { params: { range } })),
  demand: (range) => unwrap(api.get('/reports/demand', { params: { range } })),
  recent: () => unwrap(api.get('/reports/recent')),
}
