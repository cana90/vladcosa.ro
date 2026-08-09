import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function AdminHeader({ onBeforeLogout }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    if (onBeforeLogout && !onBeforeLogout()) return
    logout()
  }

  return (
    <header className="border-b border-sage-100 bg-cream-50">
      <div className="container-custom flex min-h-20 items-center justify-between gap-6 py-3">
        <Link to="/admin" className="group flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo Vlad Coșa"
            className="h-12 w-auto opacity-80 transition-opacity group-hover:opacity-100"
            width="698"
            height="274"
          />
          <div className="hidden sm:block">
            <span className="block text-xl leading-tight text-slate-900">
              Administrare blog
            </span>
            <span className="block text-xs uppercase tracking-wider text-slate-500">
              Vlad Coșa
            </span>
          </div>
        </Link>

        <button
          type="button"
          className="text-sm font-medium text-sage-700 transition-colors hover:text-sage-800"
          onClick={handleLogout}
        >
          Deconectare
        </button>
      </div>
    </header>
  )
}
