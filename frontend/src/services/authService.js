import { api, unwrap, setAccessToken } from './api.js'

export async function login(email, password) {
  const data = await unwrap(api.post('/auth/login', { email, password }))
  setAccessToken(data.accessToken)
  return data.user
}

export async function me() {
  const data = await unwrap(api.get('/auth/me'))
  return data.user
}

export async function logout() {
  try { await unwrap(api.post('/auth/logout')) } finally { setAccessToken(null) }
}
