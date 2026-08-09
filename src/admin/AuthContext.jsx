import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { apiFetch } from './api.js'

const AuthContext = createContext(null)

async function readSessionState() {
  try {
    const response = await apiFetch('/api/auth/me')

    if (response.status === 401) {
      return { status: 'unauthenticated', user: null }
    }

    if (!response.ok) {
      throw new Error('Sesiunea nu a putut fi verificată')
    }

    const user = await response.json()
    return { status: 'authenticated', user }
  } catch {
    return { status: 'error', user: null }
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ status: 'checking', user: null })

  useEffect(() => {
    let isActive = true

    readSessionState().then((nextState) => {
      if (isActive) setAuthState(nextState)
    })

    return () => {
      isActive = false
    }
  }, [])

  const retrySession = useCallback(async () => {
    setAuthState({ status: 'checking', user: null })
    setAuthState(await readSessionState())
  }, [])

  const login = useCallback(async (username, password) => {
    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const error = new Error('Autentificarea a eșuat')
      error.status = response.status
      throw error
    }

    const user = await response.json()
    setAuthState({ status: 'authenticated', user })
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // The local session is cleared even if the server cannot be reached.
    } finally {
      setAuthState({ status: 'unauthenticated', user: null })
    }
  }, [])

  const expireSession = useCallback(() => {
    setAuthState({ status: 'unauthenticated', user: null })
  }, [])

  const value = useMemo(
    () => ({ ...authState, login, logout, retrySession, expireSession }),
    [authState, expireSession, login, logout, retrySession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth trebuie folosit în interiorul AuthProvider')
  }
  return context
}
