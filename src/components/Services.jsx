const services = [
  {
    title: "Consultații Individuale",
    description: "Sesiuni personalizate pentru adulți care se confruntă cu anxietate, depresie, stres sau căutări identitare.",
    duration: "50 minute",
  },
  {
    title: "Terapie de Cuplu",
    description: "Sprijin pentru relații, comunicare îmbunătățită și rezolvarea conflictelor într-un cadru empatic.",
    duration: "60 minute",
  },
  {
    title: "Consiliere pentru Tineri",
    description: "Suport dedicat adolescenților și tinerilor adulți în navigarea provocărilor specifice acestei perioade.",
    duration: "50 minute",
  },
  {
    title: "Consiliere pentru Părinți",
    description: "Ghidare și suport pentru părinți în dezvoltarea unor strategii educaționale eficiente și sănătoase.",
    duration: "50 minute",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-cream-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6">
            Servicii Oferite
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Fiecare sesiune este adaptată nevoilor tale individuale, oferind un spațiu 
            de siguranță pentru explorare și dezvoltare personală.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 lg:p-10 bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif text-slate-900 group-hover:text-sage-700 transition-colors">
                  {service.title}
                </h3>
                <span className="text-sm text-sage-600 bg-sage-50 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                  {service.duration}
                </span>
              </div>
              
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <a 
                  href="#contact" 
                  className="text-sage-700 font-medium inline-flex items-center hover:text-sage-800 transition-colors"
                >
                  Solicită detalii
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
