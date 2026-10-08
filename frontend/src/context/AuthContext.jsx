import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { getAccessToken, setAccessToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      if (!getAccessToken()) { setLoading(false); return }
      try {
        setUser(await authService.me())
      } catch {
        setAccessToken(null)
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [])

  const login = async (email, password) => {
    const u = await authService.login(email, password)
    setUser(u)
    return u
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
