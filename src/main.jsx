import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/crimson-pro/300.css'
import '@fontsource/crimson-pro/400.css'
import '@fontsource/crimson-pro/600.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import LandingPage from './LandingPage.jsx'
import { PrivacyPolicyPage, TermsAndConditionsPage } from './LegalPages.jsx'
import './index.css'

const defaultTitle = 'Vlad Coșa - Cabinet Individual de Psihologie | Timișoara'

function HashView() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (hash === '#politica-de-confidentialitate') {
      document.title = 'Politica de confidențialitate | Vlad Coșa'
      window.scrollTo(0, 0)
      return
    }

    if (hash === '#termeni-si-conditii') {
      document.title = 'Termeni și condiții | Vlad Coșa'
      window.scrollTo(0, 0)
      return
    }

    document.title = defaultTitle
    window.requestAnimationFrame(() => {
      document.querySelector(hash || '#hero')?.scrollIntoView()
    })
  }, [hash])

  if (hash === '#politica-de-confidentialitate') {
    return <PrivacyPolicyPage />
  }

  if (hash === '#termeni-si-conditii') {
    return <TermsAndConditionsPage />
  }

  return <LandingPage />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashView />
  </React.StrictMode>,
)
