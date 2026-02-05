export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6">
                Programează o consultație
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Poți programa o ședință direct online folosind butonul de mai jos sau putem intra în legătură prin detaliile de mai jos.
              </p>
              
              {/* Calendly Button */}
              <a 
                href="https://calendly.com/cosa-vlad/50min" 
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
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:cosa.vlad@gmail.com" className="text-sage-700 hover:text-sage-800 transition-colors">
                  cosa.vlad@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+40748133913" className="text-sage-700 hover:text-sage-800 transition-colors">
                  +40 748 133 913
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
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">                  <svg className="w-6 h-6 text-sage-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
                  </svg>
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=61581089522302" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sage-700 hover:text-sage-800 transition-colors"
                >
                  Facebook Page
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">                  <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-slate-600">
                  <p>Strada August Treboniu Laurian, nr. 5</p>
                  <p>300200 Timișoara, România</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="p-6 bg-sage-50 rounded-lg border border-sage-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Confidențialitate:</strong> 
                  Toate informațiile partajate rămân strict confidențiale, 
                  în conformitate cu Codul Deontologic al Psihologilor din România.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="aspect-square lg:aspect-auto lg:h-[700px] bg-gradient-to-br from-sage-100 to-slate-100 rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.1!2d21.2269!3d45.7566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDQ1JzIzLjgiTiAyMcKwMTMnMzYuOCJF!5e0!3m2!1sen!2sro!4v1234567890!5m2!1sen!2sro&q=Strada+August+Treboniu+Laurian+5,+Timișoara+300200,+Romania"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locația cabinetului"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
