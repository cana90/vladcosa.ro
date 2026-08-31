export default function Hero() {
  const scrollToServices = (event) => {
    event.preventDefault()
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] max-w-full items-center overflow-x-clip bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50">
      <div className="container-custom box-border w-full max-w-full py-3 [@media(min-height:760px)_and_(max-width:639px)]:py-5 sm:py-6 lg:py-16 [@media(min-width:1024px)_and_(max-height:700px)]:py-4">
        <div className="section-shell grid min-w-0 items-center gap-3 [@media(min-height:760px)_and_(max-width:639px)]:gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 [@media(min-width:1024px)_and_(max-height:700px)]:gap-6">
          {/* Left Column - Text Content */}
          <div className="min-w-0 lg:flex lg:h-full lg:flex-col lg:justify-between">
            <div className="space-y-2 lg:space-y-3">
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-5xl [@media(min-height:760px)_and_(max-width:639px)]:text-6xl sm:text-6xl lg:text-8xl [@media(min-width:1024px)_and_(max-height:700px)]:text-7xl font-light text-slate-900 leading-tight">
                  Vlad Coșa
                </h1>
                <p className="text-base [@media(min-height:760px)_and_(max-width:639px)]:text-lg sm:text-xl lg:text-2xl [@media(min-width:1024px)_and_(max-height:700px)]:text-xl text-slate-600 font-light uppercase tracking-[0.16em] sm:tracking-widest">
                  Psihoterapeut
                </p>
              </div>

              <div className="w-24 h-px bg-sage-400"></div>

              <div className="max-w-md break-words space-y-0.5 text-[15px] leading-[1.4] text-slate-700 [@media(min-height:760px)_and_(max-width:639px)]:text-[17px] sm:space-y-1 sm:text-lg sm:leading-relaxed lg:text-xl [@media(min-width:1024px)_and_(max-height:700px)]:max-w-none [@media(min-width:1024px)_and_(max-height:700px)]:text-lg">
                <p>Sunt psiholog clinician și psihoterapeut Gestalt.</p>
                <p>Cred că fiecare persoană are în sine resurse de creștere și vindecare.</p>
                <p>Rolul meu este să creez un spațiu sigur, empatic și autentic în care aceste resurse să poată fi descoperite.</p>
              </div>
            </div>

            <div className="hidden lg:flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <a
                href="#services"
                onClick={scrollToServices}
                className="btn-primary"
              >
                Programează o consultație
              </a>
              <a href="#about" className="group inline-flex items-center text-sage-700 font-medium hover:text-sage-800 transition-colors">
                Despre mine
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative flex min-w-0 max-w-full justify-center lg:justify-end [@media(min-width:1024px)_and_(max-height:700px)]:justify-start">
            <div className="relative box-border w-full min-w-0 max-w-sm [@media(min-width:1024px)_and_(max-height:700px)]:w-[54svh]">
              <img 
                src="/vlad-profile.jpg" 
                alt="Vlad Coșa - Psiholog"
                className="block h-[clamp(11rem,34svh,18rem)] w-full max-w-full rounded-xl object-cover object-[center_30%] shadow-2xl [@media(min-height:680px)_and_(max-height:759px)_and_(max-width:639px)]:h-[47svh] [@media(min-height:760px)_and_(max-width:639px)]:h-[49svh] [@media(min-height:760px)_and_(max-width:639px)]:max-h-[28rem] lg:h-auto lg:aspect-[3/4]"
                width="1341"
                height="1341"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-8 right-0 -z-10 hidden h-48 w-48 rounded-xl bg-sage-100 opacity-30 lg:block sm:-right-8"></div>
            </div>
          </div>

          {/* Mobile-only buttons placed under image */}
          <div className="flex w-full min-w-0 max-w-full flex-col items-center lg:hidden">
            <a
              href="#services"
              onClick={scrollToServices}
              className="btn-primary box-border w-full max-w-full justify-center py-2.5 text-center"
            >
              Programează o consultație
            </a>
          </div>

          {/* Mobile-only scroll indicator */}
          <a
            href="#about"
            className="mt-2 flex justify-center text-sage-600 transition-colors hover:text-sage-700 [@media(min-height:760px)_and_(max-width:639px)]:mt-3 lg:hidden"
            aria-label="Continuă către secțiunea Despre mine"
          >
            <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
