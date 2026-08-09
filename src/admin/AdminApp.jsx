import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AuthStatusPage from './components/AuthStatusPage.jsx'
import ArticleEditorPage from './pages/ArticleEditorPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function AdminIndex() {
  const { status, user, retrySession } = useAuth()

  if (status === 'checking' || status === 'error') {
    return <AuthStatusPage status={status} onRetry={retrySession} />
  }

  return user ? <DashboardPage /> : <LoginPage />
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<AdminIndex />} />
        <Route element={<ProtectedRoute />}>
          <Route path="articles/new" element={<ArticleEditorPage />} />
          <Route path="articles/:id/edit" element={<ArticleEditorPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  )
}
