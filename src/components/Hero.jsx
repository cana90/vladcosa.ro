export default function Hero() {
  const scrollToContact = (e) => {
    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-cream-50 via-cream-100 to-sage-50">
      <div className="container-custom py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-3">
            <div className="space-y-2">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-slate-900 leading-tight">
                Vlad Coșa
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 font-light uppercase tracking-widest">
                Psiholog clinician
              </p>
            </div>
            
            <div className="w-24 h-px bg-sage-400"></div>
            
            <div className="text-xl text-slate-700 leading-relaxed max-w-md space-y-1">
              <p>Sunt psiholog clinician și psihoterapeut Gestalt.</p>
              <p>Cred că fiecare persoană are în sine resurse de creștere și vindecare.</p>
              <p>Rolul meu este să creez un spațiu sigur, empatic și autentic în care aceste resurse să poată fi descoperite.</p>
            </div>
            
            <div className="hidden lg:flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <a href="#contact" onClick={scrollToContact} className="btn-primary">
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
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="/vlad-profile.jpg" 
                alt="Vlad Coșa - Psiholog"
                className="w-full max-w-sm aspect-[3/4] object-cover rounded-xl shadow-2xl"
              />
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-sage-100 rounded-xl -z-10 opacity-30"></div>
            </div>
          </div>

          {/* Mobile-only buttons placed under image */}
          <div className="lg:hidden flex flex-col items-center gap-6 mt-4 w-full">
            <a href="#contact" onClick={scrollToContact} className="btn-primary w-full text-center">
              Programează o consultație
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center text-sage-600 hover:text-sage-700 transition-colors">
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
