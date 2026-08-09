import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Navigation from '../components/Navigation.jsx'
import { usePageMetadata } from '../hooks/usePageMetadata.js'

export default function NotFoundPage() {
  usePageMetadata(
    'Pagina nu a fost găsită | Vlad Coșa',
    'Pagina solicitată nu a fost găsită.',
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <Navigation />
      <main className="container-custom flex min-h-[42rem] items-center justify-center pt-20 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sage-600">Eroare 404</p>
          <h1 className="mt-4 text-4xl font-light text-slate-900 sm:text-5xl">
            Pagina nu a fost găsită
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Adresa accesată nu există sau pagina a fost mutată.
          </p>
          <Link to="/" className="btn-primary mt-8">
            Înapoi la pagina principală
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
