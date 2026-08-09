import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import '@fontsource/crimson-pro/300.css'
import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import LandingPage from './LandingPage.jsx'
import { PrivacyPolicyPage, TermsAndConditionsPage } from './LegalPages.jsx'
import BlogArticlePage from './pages/BlogArticlePage.jsx'
import BlogListPage from './pages/BlogListPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { usePageMetadata } from './hooks/usePageMetadata.js'
import './index.css'

const defaultTitle = 'Vlad Coșa - Cabinet Individual de Psihologie | Timișoara'
const defaultDescription =
  'Cabinet Individual de Psihologie Vlad Coșa din Timișoara. Psihoterapie Gestalt, terapie individuală, terapie de cuplu și consiliere online.'
const AdminApp = React.lazy(() => import('./admin/AdminApp.jsx'))

function HomePage() {
  const { hash } = useLocation()
  const isPrivacyPolicy = hash === '#politica-de-confidentialitate'
  const isTermsAndConditions = hash === '#termeni-si-conditii'
  const title = isPrivacyPolicy
    ? 'Politica de confidențialitate | Vlad Coșa'
    : isTermsAndConditions
      ? 'Termeni și condiții | Vlad Coșa'
      : defaultTitle

  usePageMetadata(title, defaultDescription)

  useEffect(() => {
    if (isPrivacyPolicy || isTermsAndConditions) {
      window.scrollTo(0, 0)
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      document.querySelector(hash || '#hero')?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [hash, isPrivacyPolicy, isTermsAndConditions])

  if (isPrivacyPolicy) {
    return <PrivacyPolicyPage />
  }

  if (isTermsAndConditions) {
    return <TermsAndConditionsPage />
  }

  return <LandingPage />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route
        path="/admin/*"
        element={
          <React.Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center bg-cream-50 text-slate-600">
                <p role="status">Se încarcă panoul de administrare…</p>
              </div>
            }
          >
            <AdminApp />
          </React.Suspense>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
