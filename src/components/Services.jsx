const services = [
  {
    title: "Terapie Individuală",
    format: "În persoană / online",
    description: "Sesiuni personalizate pentru adulți care se confruntă cu anxietate, depresie, stres sau căutări identitare.",
    duration: "50 minute",
    price: "200 lei"
  },
  {
    title: "Terapie de Cuplu",
    description: "Sprijin pentru relații, comunicare îmbunătățită și rezolvarea conflictelor într-un cadru empatic.",
    duration: "90 minute",
    price: "350 lei"
  },
  {
    title: "Terapie de Grup",
    description: "Sesiuni într-un cadru sigur și confidențial, în care participanții pot explora relațiile, tiparele și experiențele personale alături de ceilalți.",
    duration: "120 minute",
    price: "150 lei / participant"
  },
  {
    title: "Evaluare psihologică",
    description: "Evaluări adaptate obiectivului solicitării, realizate prin interviu clinic și instrumente psihologice adecvate.",
    duration: "50–120 minute",
    price: "200–500 lei",
    priceNote: "(în funcție de complexitatea evaluării)"
  },
]

export default function Services() {
  return (
    <section id="services" className="section-spacing bg-cream-50">
      <div className="container-custom">
        <div className="section-shell">
          <div className="section-header">
          <h2 className="section-title">
            Servicii
          </h2>
          <p className="section-lead">
            Fiecare sesiune este adaptată nevoilor tale individuale, oferind un spațiu 
            de siguranță pentru explorare și dezvoltare personală.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden flex flex-col bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage-100/40 via-transparent to-cream-100/60 opacity-40 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative z-10 flex h-full flex-col">
                <h3 className="text-2xl font-serif text-slate-900">
                  {service.title}
                </h3>
                {service.format && (
                  <p className="mt-1 text-sm font-medium text-sage-700">
                    {service.format}
                  </p>
                )}

                <p className="mt-6 text-lg text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="mt-6 pt-4 border-t border-sage-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-sage-700 bg-sage-50 px-3 py-1 rounded-full whitespace-nowrap">
                    {service.duration}
                  </span>
                  <span className="font-medium text-slate-800">
                    {service.price}
                  </span>
                </div>
                {service.priceNote && (
                  <p className="mt-2 text-sm text-slate-500">
                    {service.priceNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
