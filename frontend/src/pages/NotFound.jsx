import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Logo'

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center py-24 text-center">
      <LogoMark size={56} />
      <h1 className="mt-5 text-3xl font-extrabold text-navy">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted">The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  )
}
