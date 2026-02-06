import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'gestalt', 'services', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (hash) => {
    setIsOpen(false)
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getLinkClass = (section) => {
    const baseClass = "text-slate-700 hover:text-sage-700 transition-colors font-medium"
    const activeClass = "text-sage-700 border-b-2 border-sage-700"
    return activeSection === section ? `${baseClass} ${activeClass}` : baseClass
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/80 backdrop-blur-md border-b border-sage-100/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }} className="flex items-center gap-3 group cursor-pointer">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col">
              <span className="text-xl font-serif text-slate-900 group-hover:text-sage-700 transition-colors leading-tight">
                Vlad Coșa
              </span>
              <span className="text-xs text-slate-600 uppercase tracking-wider leading-tight">
                Cabinet Individual de Psihologie
              </span>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about') }} className={getLinkClass('about')}>
              Despre
            </a>
            <a href="#gestalt" onClick={(e) => { e.preventDefault(); handleNavClick('#gestalt') }} className={getLinkClass('gestalt')}>
              Metodă
            </a>
            <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services') }} className={getLinkClass('services')}>
              Servicii
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }} className={getLinkClass('contact')}>
              Contact
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }} className="btn-primary !py-2 !px-6 text-sm">
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
              href="#about"
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={(e) => { e.preventDefault(); handleNavClick('#about') }}
            >
              Despre
            </a>
            <a 
              href="#gestalt"
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={(e) => { e.preventDefault(); handleNavClick('#gestalt') }}
            >
              Metodă
            </a>
            <a 
              href="#services" 
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={(e) => { e.preventDefault(); handleNavClick('#services') }}
            >
              Servicii
            </a>
            <a 
              href="#contact" 
              className="block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            >
              Contact
            </a>
            <a 
              href="#contact" 
              className="btn-primary !py-2 !px-6 text-sm inline-block"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            >
              Programează
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
