const services = [
  {
    title: "Terapie Individuală",
    description: "Sesiuni personalizate pentru adulți care se confruntă cu anxietate, depresie, stres sau căutări identitare.",
    duration: "50 minute",
    icon: "👤"
  },
  {
    title: "Terapie de Cuplu",
    description: "Sprijin pentru relații, comunicare îmbunătățită și rezolvarea conflictelor într-un cadru empatic.",
    duration: "60 minute",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
        {/* Rubin's Vase/Faces - simplified */}
        <path d="M30,20 Q25,40 25,50 Q25,60 30,80 L30,20" />
        <path d="M70,20 Q75,40 75,50 Q75,60 70,80 L70,20" />
        <path d="M30,20 Q50,22 70,20 L70,80 Q50,78 30,80 Z" opacity="0.7" />
      </svg>
    )
  },
  {
    title: "Consiliere Online",
    description: "Sesiuni flexibile prin videoconferință, oferind același nivel de profesionalism și confidențialitate ca ședințele față în față.",
    duration: "50 minute",
    icon: "💻"
  },
]

export default function Services() {
  return (
    <section id="services" className="py-8 lg:py-12 bg-cream-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-6">
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-3">
            Servicii
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Fiecare sesiune este adaptată nevoilor tale individuale, oferind un spațiu 
            de siguranță pentru explorare și dezvoltare personală.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
