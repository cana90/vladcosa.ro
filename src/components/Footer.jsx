export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-900 text-cream-100">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-cream-50">Vlad Coșa</h3>
            <p className="text-cream-200/80 text-sm leading-relaxed">
              Cabinet Individual de Psihologie dedicat sănătății tale mentale 
              și bunăstării emoționale.
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-cream-200/60">Navigare Rapidă</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-cream-100/80 hover:text-cream-50 transition-colors">
                  Despre
                </a>
              </li>
              <li>
                <a href="#services" className="text-cream-100/80 hover:text-cream-50 transition-colors">
                  Servicii
                </a>
              </li>
              <li>
                <a href="#contact" className="text-cream-100/80 hover:text-cream-50 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Legal */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider text-cream-200/60">Informații Legale</h4>
            <ul className="space-y-2 text-sm text-cream-100/80">
              <li>Membru al Colegiului Psihologilor din România</li>
              <li>
                <a href="#" className="hover:text-cream-50 transition-colors">
                  Politica de Confidențialitate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cream-50 transition-colors">
                  Termeni și Condiții
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream-100/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream-200/60">
            <p>
              © {currentYear} Coșa Vlad - Cabinet Individual de Psihologie. Toate drepturile rezervate.
            </p>
            <p className="flex items-center gap-2">
              Creat cu
              <svg className="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              pentru sănătatea ta mintală
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
