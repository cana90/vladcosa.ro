import { useState } from 'react'

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          
          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-8">
              Despre mine
            </h2>
            
            <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <p className="font-light text-sage-700 text-xl">
                Salut,
              </p>
              
              <p>
                Aș vrea să folosesc postările de pe această pagină pentru a vă povesti despre terapia Gestalt și cum o voi folosi în cabinet. Înainte de a face asta, cred că un început bun este să vă spun câteva cuvinte despre mine ca persoană.
              </p>
              
              {/* Collapsible Content */}
              <div className={`space-y-6 overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p>
                  Un prim aspect pe care l-aș prezenta este că mereu am fost curios să învăț mai multe despre lumea înconjurătoare și oamenii care o populează. Îmi place să descopăr povești de viață, să aflu cum au reușit oamenii și popoarele să își depășească provocările care stăteau în calea dezvoltării lor naturale. În căutarile mele am studiat istorie, filozofie și psihologie, literatură fantasy și science-fiction.
                </p>
                
                <p>
                  Sunt interesat de sensul pe care oamenii îl dau lucrurilor și evenimentelor la care iau parte. Una este să citesc despre cum funcționează societățile, ce este iubirea, ura, rușinea, tristețea, furia și alta este să aflu cum sunt simțite de fiecare în parte. Cred în unicitatea fiecărei persoane și cred că fiecare are propriul fel de a vedea și simți viața.
                </p>
                
                <p>
                  Rezonez cu ideea că fiecare persoană este liberă să își ia propriile decizii și că este responsabilă pentru deciziile luate. Deși poate părea puțin rigidă formularea despre responsabilitate, consider că este o lecție importantă de autenticitate față de noi înșine. Și indecizia este o formă de decizie, anume amânarea ei.
                </p>
                
                <p>
                  În toată gălăgia și lucrurile care ne fură atenția în mod constant, cred că este important să nu uităm cine suntem noi cu adevărat. Este greu să nu te pierzi atunci când sunt atâția experți care îți spun cum să te îmbraci, ce să mănânci, cât să dormi, ce să citești, cum să gândești etc. Asta este o temă la care am lucrat mult, să descopăr cine sunt și să încetez să fiu ce vor ceilalți.
                </p>
                
                <p>
                  Cred mult în bunătatea celor din jur. Mi-am petrecut o bună bucată din viață încercând să aduc compasiune și alinare în universul celorlalți și, deseori, am reușit. Una din convingerile mele este că se poate să produci schimbare în lume și cu blândețe și iubire.
                </p>
                
                <p className="font-medium text-slate-800 pt-2">
                  Cam atât despre mine momentan. V-am scris mai sus ceea ce mă definește pe mine și ce voi aduce în cabinet în lucrul cu clienții.
                </p>
              </div>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-2 text-sage-700 font-medium hover:text-sage-800 transition-colors pt-2 focus:outline-none"
              >
                <span>{isExpanded ? 'Citește mai puțin' : 'Citește toata povestea'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
        </div>

        {/* Education Section - New Row */}
        <div className="mt-16 sm:mt-24 border-t border-sage-200 pt-16">
          <h3 className="text-2xl font-light text-slate-900 mb-10 text-center sm:text-left">
            Educație și Certificări
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start group">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-400 group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
              <div>
                <span className="block text-lg text-slate-900 font-medium mb-1">Psiholog Clinician</span>
                <span className="text-slate-500">Universitatea de Vest</span>
                <span className="block text-sm text-sage-600 mt-1">2015 - 2020</span>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-400 group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
              <div>
                <span className="block text-lg text-slate-900 font-medium mb-1">Psihoterapeut Gestalt</span>
                <span className="text-slate-500">Institutul de Psihoterapie Gestalt</span>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="w-2 h-2 mt-2.5 rounded-full bg-sage-400 group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
              <div>
                <span className="block text-lg text-slate-900 font-medium mb-1">Drept de liberă practică</span>
                <span className="text-slate-500">Colegiul Psihologilor din România</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}