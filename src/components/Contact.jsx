import { useState, useEffect, useRef, useCallback } from 'react'

const env = import.meta.env
const mapsConsentKey = 'vladcosa-google-maps-consent'

function hasStoredMapsConsent() {
  try {
    return window.localStorage.getItem(mapsConsentKey) === 'granted'
  } catch {
    return false
  }
}

export default function Contact() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)
  const [hasCarouselFocus, setHasCarouselFocus] = useState(false)
  const [hasMapsConsent, setHasMapsConsent] = useState(hasStoredMapsConsent)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const carouselRef = useRef(null)

  const email = env.VITE_EMAIL || 'cosa.vlad@gmail.com'
  const phone = env.VITE_PHONE || '+40 748 133 913'
  const phoneHref = `tel:${(env.VITE_PHONE || '+40 748 133 913').replace(/\s/g, '')}`
  const address = env.VITE_ADDRESS || 'Strada August Treboniu Laurian, nr. 5, 300200 Timișoara, România'
  const addressParts = address.split(', ')
  const facebookUrl = env.VITE_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61581089522302'
  const calendlyUrl = env.VITE_CALENDLY_URL || 'https://calendly.com/cosa-vlad/50min'
  const mapsUrl = env.VITE_MAPS_EMBED_URL || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.1!2d21.2269!3d45.7566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDQ1JzIzLjgiTiAyMcKwMTMnMzYuOCJF!5e0!3m2!1sen!2sro!4v1234567890!5m2!1sen!2sro&q=Strada+August+Treboniu+Laurian+5,+Timișoara+300200,+Romania"

  const officeImages = [
    '/cabinet1.jpg',
    '/cabinet2.jpg',
    '/cabinet3.jpg'
  ]

  const navigateByUser = useCallback((getNextIndex) => {
    setIsManuallyPaused(true)
    setCurrentImage((current) => getNextIndex(current))
  }, [])

  const advanceImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % officeImages.length)
  }, [officeImages.length])

  const goTo = useCallback((index) => {
    navigateByUser(() => index)
  }, [navigateByUser])

  const showNextImage = useCallback(() => {
    navigateByUser((current) => (current + 1) % officeImages.length)
  }, [navigateByUser, officeImages.length])

  const showPreviousImage = useCallback(() => {
    navigateByUser((current) => (current - 1 + officeImages.length) % officeImages.length)
  }, [navigateByUser, officeImages.length])

  const isAutoPlaying = !isManuallyPaused && !isCarouselHovered && !hasCarouselFocus

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const intervalId = setInterval(advanceImage, 5000)
    return () => clearInterval(intervalId)
  }, [isAutoPlaying, advanceImage])

  // Touch/swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (Math.abs(delta) < minSwipe) return

    if (delta > 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }
  }

  // Keyboard navigation for carousel
  const handleCarouselKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      showPreviousImage()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      showNextImage()
    }
  }

  const handleCarouselBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHasCarouselFocus(false)
    }
  }

  const handleLoadMap = () => {
    try {
      window.localStorage.setItem(mapsConsentKey, 'granted')
    } catch {
      // Harta poate fi încărcată pentru sesiunea curentă chiar dacă stocarea este blocată.
    }
    setHasMapsConsent(true)
  }

  const handleHideMap = () => {
    try {
      window.localStorage.removeItem(mapsConsentKey)
    } catch {
      // Starea curentă rămâne controlată local dacă stocarea este blocată.
    }
    setHasMapsConsent(false)
  }

  return (
    <section id="contact" className="py-8 lg:py-12 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-3">
                Programează o consultație
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Poți programa o ședință direct online folosind butonul de mai jos sau putem intra în legătură prin detaliile de mai jos.
              </p>

              {/* Calendly Button */}
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Programează Online
              </a>
            </div>

            <div className="w-24 h-px bg-sage-400"></div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${email}`} className="text-sage-700 hover:text-sage-800 transition-colors">
                  {email}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={phoneHref} className="text-sage-700 hover:text-sage-800 transition-colors">
                  {phone}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-slate-600">
                  <p>Luni - Vineri: 10:00 - 19:00</p>
                  <p>Sâmbătă: La programare</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
                  </svg>
                </div>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-700 hover:text-sage-800 transition-colors"
                >
                  Facebook Page
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-slate-600">
                  <p>{addressParts.slice(0, -1).join(', ')}</p>
                  <p>{addressParts[addressParts.length - 1]}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="p-6 bg-sage-50 rounded-lg border border-sage-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Confidențialitate:</strong>{' '}
                  Toate informațiile partajate rămân strict confidențiale,
                  în conformitate cu Codul Deontologic al Psihologilor din România.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Office Photos & Map */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-8">
            {/* Office Carousel */}
            <div
              className="bg-sage-50 p-2 rounded-2xl"
              ref={carouselRef}
              role="region"
              aria-label="Fotografii cabinet"
              aria-roledescription="carousel"
              aria-live="polite"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
              onFocusCapture={() => setHasCarouselFocus(true)}
              onBlurCapture={handleCarouselBlur}
            >
              <div
                className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-sm"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={officeImages[currentImage]}
                  alt={`Cabinetul meu - fotografia ${currentImage + 1} din ${officeImages.length}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="1600"
                  height="1200"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-white/90 text-sm font-medium">Cabinetul meu</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setIsManuallyPaused((paused) => !paused) }}
                      onKeyDown={handleCarouselKeyDown}
                      className="text-white hover:text-sage-200 transition-colors"
                      aria-label={isManuallyPaused ? 'Pornește derularea automată' : 'Oprește derularea automată'}
                    >
                      {isManuallyPaused ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14l11-7L8 5z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14m6-14v14" />
                        </svg>
                      )}
                    </button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); showPreviousImage() }} onKeyDown={handleCarouselKeyDown} className="text-white hover:text-sage-200 transition-colors" aria-label="Fotografia anterioară">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); showNextImage() }} onKeyDown={handleCarouselKeyDown} className="text-white hover:text-sage-200 transition-colors" aria-label="Fotografia următoare">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {officeImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goTo(index)}
                      onKeyDown={handleCarouselKeyDown}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Mergi la fotografia ${index + 1}`}
                      aria-current={index === currentImage ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            {hasMapsConsent ? (
              <div className="space-y-3">
                <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-sage-100 to-slate-100 rounded-xl shadow-lg overflow-hidden">
                  <iframe
                    src={mapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locația cabinetului pe Google Maps"
                  ></iframe>
                </div>
                <button
                  type="button"
                  onClick={handleHideMap}
                  className="text-sm text-sage-700 underline underline-offset-4 hover:text-sage-800 transition-colors"
                >
                  Retrage acordul și ascunde harta
                </button>
              </div>
            ) : (
              <div
                className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-sage-100 to-slate-100 rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center"
                role="region"
                aria-label="Locația cabinetului"
              >
                <h3 className="text-2xl text-slate-900 mb-3">Locația cabinetului</h3>
                <p className="text-slate-700 mb-5">{address}</p>
                <p className="max-w-md text-sm text-slate-600 leading-relaxed mb-6">
                  Harta este furnizată de Google. Dacă alegi să o încarci, adresa IP și informații despre browserul tău pot fi transmise către Google.
                </p>
                <button type="button" onClick={handleLoadMap} className="btn-secondary">
                  Încarcă harta Google
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
