export default function Gestalt() {
  return (
    <section id="gestalt" className="py-8 lg:py-12 bg-sage-50/30">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-3">
            Terapia Gestalt
          </h2>
          <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full"></div>
        </div>

        {/* Intro Section */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-3 text-slate-700 leading-relaxed text-lg">
            <p className="text-xl font-light text-sage-800">
              Gestalt terapia este o abordare optimistă, care crede în capacitatea intrinsecă a omului de a se vindeca și de a crește.
            </p>
            <p>
              Este o formă de psihoterapie umanistă care se concentrează pe experiența de "aici și acum", punând accent pe conștientizarea momentului prezent, a corpului și a emoțiilor, nu doar a gândurilor.
            </p>
          </div>
          
          <div className="relative h-80 rounded-2xl overflow-hidden bg-sage-50/30 flex items-center justify-center p-8">
            {/* Tree logo with transparent background */}
            <img 
              src="/treehero.png" 
              alt="" 
              className="w-2/3 h-auto object-contain"
            />
          </div>
        </div>

        {/* Core Principles Cards */}
        <div className="max-w-6xl mx-auto mb-6">
          <h3 className="text-3xl font-light text-slate-900 mb-6 text-center">Principii Fundamentale</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Aici și Acum - Here and Now */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              {/* Background image */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/here and now.png" alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Aici și Acum</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Trecutul există doar ca amintire, iar viitorul ca anticipare. Puterea de schimbare rezidă exclusiv în momentul prezent. Ne concentrăm pe cum experimentezi lucrurile acum.
                </p>
              </div>
            </div>

            {/* Card 2: Conștientizare - Tree */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              {/* Background image */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/tree.jpeg" alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Conștientizare</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Vindecarea începe prin a deveni conștient de tiparele tale, de senzațiile din corp și de modul în care interacționezi cu mediul. Ceea ce este ascuns la vedere.
                </p>
              </div>
            </div>

            {/* Card 3: Întregul - Holistic */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              {/* Background image */}
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/holistic.jpg" alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Întregul (Holism)</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Nu ești doar o minte care gândește. Ești un întreg format din corp, emoții, gânduri și spirit. Terapia Gestalt integrează toate aceste aspecte.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why it works */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 sm:p-14 shadow-sm border border-sage-100">
          <h3 className="text-3xl font-light text-slate-900 mb-8">De ce să alegi terapia Gestalt?</h3>
          
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Terapia Gestalt nu își propune să te "repare", pentru că nu ești stricat. Scopul ei este să te ajute să redevii întreg. Deseori, blocajele noastre vin din "gestalt-uri neterminate" — situații din trecut care nu au fost închise emoțional și care ne consumă energie în prezent.
            </p>
            
            <ul className="space-y-4 my-8">
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Crește capacitatea de a face față stresului și anxietății</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Îmbunătățește relațiile prin autenticitate și comunicare reală</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Te ajută să îți asumi responsabilitatea pentru propriile alegeri</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
