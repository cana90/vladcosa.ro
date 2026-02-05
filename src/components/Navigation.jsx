import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Helper to handle navigation based on current route
  const handleNavClick = (hash) => {
    setIsOpen(false)
    if (isHome) {
      // If on home, just scroll
      const element = document.querySelector(hash)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // If not on home, route to home with hash is handled by browser native behavior if we use <a href="/">
      // or we can just link to /
    }
  }

  const getLink = (hash) => {
    return isHome ? hash : `/${hash}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-sage-100">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col">
              <span className="text-xl font-serif text-slate-900 group-hover:text-sage-700 transition-colors leading-tight">
                Vlad Coșa
              </span>
              <span className="text-xs text-slate-600 uppercase tracking-wider leading-tight">
                Cabinet Individual de Psihologie
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href={getLink('#about')} className="text-slate-700 hover:text-sage-700 transition-colors font-medium">
              Despre
            </a>
            <Link to="/gestalt" className="text-slate-700 hover:text-sage-700 transition-colors font-medium">
              Despre Gestalt
            </Link>
            <a href={getLink('#services')} className="text-slate-700 hover:text-sage-700 transition-colors font-medium">
              Servicii
            </a>
            <a href={getLink('#contact')} className="text-slate-700 hover:text-sage-700 transition-colors font-medium">
              Contact
            </a>
            <a href={getLink('#contact')} className="btn-primary !py-2 !px-6 text-sm">
              Programează
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-sage-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-sage-100">
            <a 
              href={getLink('#about')}
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Despre
            </a>
            <Link 
              to="/gestalt"
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Despre Gestalt
            </Link>
            <a 
              href={getLink('#services')} 
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Servicii
            </a>
            <a 
              href={getLink('#contact')} 
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <a 
              href="#contact" 
              className="btn-primary !py-2 !px-6 text-sm inline-block"
              onClick={() => setIsOpen(false)}
            >
              Programează
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
