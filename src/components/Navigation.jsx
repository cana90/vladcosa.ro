import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { calendlyUrl, openCalendlyPopup } from '../config/booking.js'

const sections = ['hero', 'about', 'gestalt', 'services', 'contact']
const navigationHeight = 80
const navLinks = [
  { id: 'about', label: 'Despre' },
  { id: 'gestalt', label: 'Metodă' },
  { id: 'services', label: 'Servicii' },
  { id: 'contact', label: 'Contact' },
  { to: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isBlogRoute = location.pathname.startsWith('/blog')

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return undefined

    const observers = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [location.pathname])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return

    const menu = menuRef.current
    const focusableEls = menu.querySelectorAll('a, button')
    if (focusableEls.length === 0) return

    const firstEl = focusableEls[0]
    const lastEl = focusableEls[focusableEls.length - 1]

    const trapFocus = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    menu.addEventListener('keydown', trapFocus)
    firstEl.focus()

    return () => menu.removeEventListener('keydown', trapFocus)
  }, [isOpen])

  const handleNavClick = useCallback(
    (section) => {
      setIsOpen(false)
      const hash = `#${section}`

      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash })
        return
      }

      const element = document.querySelector(hash)
      if (element) {
        const sectionTop = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: Math.max(0, sectionTop - navigationHeight),
          behavior: 'smooth',
        })
      }
    },
    [location.pathname, navigate],
  )

  const getLinkClass = (isActive) => {
    const baseClass = 'text-slate-700 hover:text-sage-700 transition-colors font-medium'
    const activeClass = 'text-sage-700 border-b-2 border-sage-700'
    return isActive ? `${baseClass} ${activeClass}` : baseClass
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/80 backdrop-blur-md border-b border-sage-100/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <a
            href="/#hero"
            onClick={(event) => {
              event.preventDefault()
              handleNavClick('hero')
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img src="/logo.png" alt="Logo" className="h-12 w-auto opacity-80 group-hover:opacity-100 transition-opacity" width="698" height="274" />
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
            {navLinks.map(({ id, label, to }) => {
              if (to) {
                return (
                  <Link
                    key={to}
                    to={to}
                    className={getLinkClass(isBlogRoute)}
                    aria-current={isBlogRoute ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                )
              }

              const isActive = location.pathname === '/' && activeSection === id

              return (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavClick(id)
                  }}
                  className={getLinkClass(isActive)}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {label}
                </a>
              )
            })}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={openCalendlyPopup}
              className="btn-primary !py-2 !px-6 text-sm"
            >
              Programează
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-sage-700 transition-colors"
            aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
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

        {/* Mobile Menu with animation */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-sage-100">
            {navLinks.map(({ id, label, to }) => {
              if (to) {
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium ${
                      isBlogRoute ? 'text-sage-700' : ''
                    }`}
                    aria-current={isBlogRoute ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                )
              }

              const isActive = location.pathname === '/' && activeSection === id

              return (
                <a
                  key={id}
                  href={`/#${id}`}
                  className={`block py-2 text-slate-700 hover:text-sage-700 transition-colors font-medium ${
                    isActive ? 'text-sage-700' : ''
                  }`}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavClick(id)
                  }}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {label}
                </a>
              )
            })}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-6 text-sm inline-block"
              onClick={(event) => {
                setIsOpen(false)
                openCalendlyPopup(event)
              }}
            >
              Programează
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
