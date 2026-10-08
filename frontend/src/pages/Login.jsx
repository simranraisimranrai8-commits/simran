import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@lojopo.local')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      nav(location.state?.from || '/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="card w-full max-w-md space-y-4 p-6 sm:p-8">
        <div className="flex justify-center"><Logo showTag={false} /></div>
        <div className="text-center">
          <h1 className="text-xl font-extrabold">LOJOPO Admin Panel</h1>
          <p className="mt-1 text-sm text-muted">Sign in with your admin account.</p>
        </div>
        {(error || location.state?.error) && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error || location.state.error}</p>}
        <div><label className="label" htmlFor="le">Email</label><input id="le" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="label" htmlFor="lp">Password</label><input id="lp" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <button className="btn-primary w-full" disabled={loading}><LogIn size={16} />{loading ? 'Signing in...' : 'Login'}</button>
        <p className="rounded-lg bg-surface px-3 py-2 text-center text-xs text-muted">
          Demo credentials (from <code>npm run seed</code>): <b>admin@lojopo.local</b> / <b>Passw0rd!</b>
        </p>
      </motion.form>
    </div>
  )
}
