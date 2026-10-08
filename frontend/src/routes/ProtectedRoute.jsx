import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingState from '../components/LoadingState'

export default function ProtectedRoute() {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="flex min-h-screen items-center justify-center"><LoadingState label="Checking your session..." /></div>
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (user?.role !== 'ADMIN') return <Navigate to="/login" state={{ from: location.pathname, error: 'Admin access is required.' }} replace />
  return <Outlet />
}
