import { useState } from 'react'
import { usePageMetadata } from '../../hooks/usePageMetadata.js'
import { useAuth } from '../AuthContext.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  usePageMetadata(
    'Administrare blog | Vlad Coșa',
    'Autentificare pentru administrarea blogului.',
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await login(username, password)
    } catch (loginError) {
      setError(
        loginError.status === 401
          ? 'Date de autentificare incorecte'
          : 'Autentificarea nu este disponibilă momentan.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-sage-100 bg-white p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Logo Vlad Coșa"
            className="mx-auto h-16 w-auto opacity-80"
            width="698"
            height="274"
          />
          <h1 className="mt-6 text-4xl font-light text-slate-900">
            Administrare blog
          </h1>
          <p className="mt-2 text-slate-600">
            Autentifică-te pentru a gestiona articolele.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="admin-username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Utilizator
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isSubmitting}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-200 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Parolă
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isSubmitting}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sage-500 focus:ring-2 focus:ring-sage-200 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {error && (
            <p
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Se autentifică…' : 'Autentificare'}
          </button>
        </form>
      </div>
    </main>
  )
}
