import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import AuthStatusPage from './components/AuthStatusPage.jsx'

export default function ProtectedRoute() {
  const { status, user, retrySession } = useAuth()

  if (status === 'checking' || status === 'error') {
    return <AuthStatusPage status={status} onRetry={retrySession} />
  }

  if (!user) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
