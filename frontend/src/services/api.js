import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({ baseURL, withCredentials: true })

// The access token is short-lived and kept in memory + localStorage so a
// page refresh doesn't immediately log the admin out. The refresh token
// itself lives only in an httpOnly cookie set by the backend.
let accessToken = localStorage.getItem('lojopo_access_token') || null

export function setAccessToken(token) {
  accessToken = token
  if (token) localStorage.setItem('lojopo_access_token', token)
  else localStorage.removeItem('lojopo_access_token')
}

export function getAccessToken() {
  return accessToken
}

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

let refreshingPromise = null

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error
    if (response?.status === 401 && !config._retried && !config.url.includes('/auth/login') && !config.url.includes('/auth/refresh')) {
      config._retried = true
      try {
        if (!refreshingPromise) {
          refreshingPromise = api.post('/auth/refresh').finally(() => { refreshingPromise = null })
        }
        const { data } = await refreshingPromise
        setAccessToken(data.data.accessToken)
        config.headers.Authorization = `Bearer ${data.data.accessToken}`
        return api(config)
      } catch {
        setAccessToken(null)
      }
    }
    return Promise.reject(error)
  }
)

// Normalizes the {success,message,data} envelope and throws a plain Error
// with a readable message on failure, so calling code can just await and
// catch(err) { err.message }.
export async function unwrap(promise) {
  try {
    const { data } = await promise
    return data.data
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'Something went wrong.'
    const errors = err.response?.data?.errors || []
    const wrapped = new Error(message)
    wrapped.errors = errors
    wrapped.status = err.response?.status
    throw wrapped
  }
}
