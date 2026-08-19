import { calendlyUrls, openCalendlyPopup } from '../config/booking.js'

const services = [
  {
    title: "Terapie Individuală",
    format: "În persoană / online",
    description: "Sesiuni personalizate pentru adulți care se confruntă cu anxietate, depresie, stres sau căutări identitare.",
    duration: "50 minute",
    price: "200 lei",
    bookingOptions: [
      { label: "În cabinet", ariaLabel: "Programează terapia individuală în cabinet", url: calendlyUrls.individualInPerson },
      { label: "Online", ariaLabel: "Programează terapia individuală online", url: calendlyUrls.individualOnline },
    ],
  },
  {
    title: "Terapie de Cuplu",
    format: "În persoană",
    description: "Sprijin pentru relații, comunicare îmbunătățită și rezolvarea conflictelor într-un cadru empatic.",
    duration: "90 minute",
    price: "350 lei",
    bookingOptions: [
      { label: "Programează", ariaLabel: "Programează terapia de cuplu", url: calendlyUrls.couplesTherapy },
    ],
  },
  {
    title: "Terapie de Grup",
    format: "În persoană",
    description: "Sesiuni într-un cadru sigur și confidențial, în care participanții pot explora relațiile, tiparele și experiențele personale alături de ceilalți.",
    duration: "120 minute",
    price: "150 lei / participant",
    bookingOptions: [
      { label: "Înscrie-te", ariaLabel: "Contactează-mă pentru terapia de grup", href: "#contact" },
    ],
  },
  {
    title: "Evaluare psihologică",
    format: "În persoană",
    description: "Evaluări adaptate obiectivului solicitării, realizate prin interviu clinic și instrumente psihologice adecvate.",
    duration: "50–120 minute",
    price: "200–500 lei",
    priceNote: "(în funcție de complexitatea evaluării)",
    bookingOptions: [
      { label: "Programează", ariaLabel: "Programează o evaluare psihologică", url: calendlyUrls.evaluation },
    ],
  },
]

export default function Services() {
  const handleBookingClick = (event, option) => {
    if (!option.href) {
      openCalendlyPopup(event, option.url)
      return
    }

    event.preventDefault()
    document.querySelector(option.href)?.scrollIntoView({ behavior: 'smooth' })
  }

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
              className="group relative overflow-hidden flex flex-col bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-700"
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

                <div className={`mt-6 grid gap-3 ${service.bookingOptions.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {service.bookingOptions.map((option, optionIndex) => (
                    <a
                      key={option.label}
                      href={option.href || option.url}
                      target={option.href ? undefined : '_blank'}
                      rel={option.href ? undefined : 'noopener noreferrer'}
                      aria-label={option.ariaLabel}
                      onClick={(event) => handleBookingClick(event, option)}
                      className={`${optionIndex === 0 ? 'btn-primary' : 'btn-secondary'} min-h-12 w-full justify-center gap-2 px-4 py-3 text-center text-sm`}
                    >
                      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
