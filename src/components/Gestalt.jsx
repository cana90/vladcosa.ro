export default function Gestalt() {
  return (
    <section id="gestalt" className="section-spacing bg-sage-50/30">
      <div className="container-custom">
        <div className="section-shell">
          {/* Header */}
          <div className="section-header">
            <h2 className="section-title">
              Terapia Gestalt
            </h2>
            <div className="w-24 h-1 bg-sage-500 mt-4 rounded-full"></div>
          </div>

          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div className="space-y-3 text-slate-700 leading-relaxed text-lg">
            <p className="text-xl font-light text-sage-800">
              Terapia Gestalt este o formă de psihoterapie umanistă și experiențială care se axează pe conștientizarea experienței din prezent. Explorăm ce se întâmplă cu emoțiile, gândurile, senzațiile fizice și cum te raportezi la acestea în timp ce le povestești aici și acum.
            </p>
            <p>
              În terapie, vei fi ajutat/ă să observi ce simți și cum reacționezi în situații concrete, cu scopul de a înțelege mai bine care sunt nevoile tale și cum poți răspunde diferit în funcție de acestea.
            </p>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden bg-sage-50/30 flex items-center justify-center p-8">
            <img
              src="/treehero.png"
              alt=""
              className="w-2/3 h-auto object-contain"
              loading="lazy"
              width="1024"
              height="825"
            />
          </div>
          </div>

          {/* Core Principles Cards */}
          <div className="mb-16">
            <h3 className="text-3xl font-light text-slate-900 mb-8">Principii Fundamentale</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Conștientizarea */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/tree.jpeg" alt="" className="w-full h-full object-cover grayscale" loading="lazy" width="736" height="584" />
              </div>

              <div className="relative z-10 space-y-4">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Conștientizarea</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  În Gestalt, conștientizarea este punctul de plecare în procesul de auto-cunoaștere. Acesta presupune să observi cât mai clar ce se întâmplă în prezent (ce simți, ce gândești, ce senzații ai în corp, ce îți dorești și cum reacționezi într-o anumită situație).
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Prin exersarea conștientizării, experiența devine mai clară și apar posibilități noi de a răspunde.
                </p>
              </div>
            </div>

            {/* Card 2: Responsabilitatea personală */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/holistic.jpg" alt="" className="w-full h-full object-cover grayscale" loading="lazy" width="450" height="398" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Responsabilitatea personală</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Acest principiu ne invită să observăm care este rolul nostru în ceea ce trăim, cum interpretăm o situație, ce alegem să facem sau să nu facem și ce nevoi avem în momentul respectiv. Scopul nu este să ne învinovățim, ci să recunoaștem și să acceptăm că avem un rol activ în propria experiență și că putem face alegeri diferite.
                </p>
              </div>
            </div>

            {/* Card 3: Aici și acum */}
            <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-700">
              <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700">
                <img src="/here-and-now.png" alt="" className="w-full h-full object-cover grayscale" loading="lazy" width="586" height="395" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-serif text-slate-900 mb-6">Aici și acum</h4>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Acordăm importanță experienței din momentul prezent și felul în care aceasta se manifestă în relație cu ceilalți. Trecutul este important, dar îl explorăm mai ales prin felul în care continuă să te afecteze la nivel emoțional, comportamental și relațional. Scopul este să înțelegem cum se regăsesc experiențele trecute în felul in care trăiești și relaționezi astăzi.
                </p>
              </div>
            </div>
          </div>
          </div>

          {/* Why it works */}
          <div className="w-full bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-sage-100">
          <h3 className="text-3xl font-light text-slate-900 mb-6">De ce să alegi terapia Gestalt?</h3>

          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p>
              Dacă îți dorești o intervenție practică și orientată spre ceea ce trăiești în prezent, nu doar spre analizarea trecutului, această formă de terapie ar putea fi potrivită pentru tine.
            </p>
            <p>
              Este compatibilă cu persoanele care vor să se înțeleagă mai bine, să își recunoască emoțiile și nevoile și să observe tiparele prin care relaționează cu ceilalți.
            </p>

            <p className="font-medium text-slate-800">Terapia Gestalt rezonează cu următoarele teme de lucru:</p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Înțelegere de sine mai bună</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Dificultăți relaționale</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Blocaj în repetarea acelorași tipare</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Perioade de schimbări și adaptare</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Dificultăți în exprimarea emoțiilor</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage-500 mt-1">✓</span>
                <span>Dorința de schimbări concrete</span>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
