import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function GestaltPage() {
  return (
    <div className="bg-cream-50 min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6 font-serif">
              Terapia Gestalt
            </h1>
            <div className="w-24 h-1 bg-sage-500 mx-auto rounded-full"></div>
          </div>

          {/* Intro Section with Image */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="prose prose-lg text-slate-700 leading-relaxed">
              <p className="text-xl font-light text-sage-800 mb-6">
                Gestalt terapia este o abordare optimistă, care crede în capacitatea intrinsecă a omului de a se vindeca și de a crește.
              </p>
              <p>
                Este o formă de psihoterapie umanistă care se concentrează pe experiența de "aici și acum", punând accent pe conștientizarea momentului prezent, a corpului și a emoțiilor, nu doar a gândurilor.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg bg-sage-100">
              {/* Abstract decorative element representing wholeness */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <svg className="w-48 h-48 text-sage-300 opacity-50" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" />
                 </svg>
                 <svg className="w-32 h-32 text-sage-400 opacity-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="30" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Core Principles Cards */}
          <div className="max-w-6xl mx-auto mb-24">
            <h2 className="text-3xl font-light text-slate-900 mb-12 text-center">Principii Fundamentale</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sage-50 rounded-lg flex items-center justify-center mb-6">
                   <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-4">Aici și Acum</h3>
                <p className="text-slate-600">
                  Trecutul există doar ca amintire, iar viitorul ca anticipare. Puterea de schimbare rezidă exclusiv în momentul prezent. Ne concentrăm pe cum experimentezi lucrurile acum.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sage-50 rounded-lg flex items-center justify-center mb-6">
                   <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-4">Conștientizare (Awareness)</h3>
                <p className="text-slate-600">
                  Vindecarea începe prin a deveni conștient de tiparele tale, de senzațiile din corp și de modul în care interacționezi cu mediul.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-sage-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sage-50 rounded-lg flex items-center justify-center mb-6">
                   <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-4">Întregul (Holism)</h3>
                <p className="text-slate-600">
                  Nu ești doar o minte care gândește. Ești un întreg format din corp, emoții, gânduri și spirit. Terapia Gestalt integrează toate aceste aspecte.
                </p>
              </div>
            </div>
          </div>

          {/* Why it works / Resources */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 sm:p-14 shadow-sm border border-sage-100">
            <h2 className="text-3xl font-light text-slate-900 mb-8">De ce să alegi terapia Gestalt?</h2>
            
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

              <h3 className="text-xl font-medium text-slate-900 mt-10 mb-4">Resurse recomandate</h3>
              <p className="mb-4">Pentru cei interesați de o aprofundare, iată câteva lecturi fundamentale:</p>
              <ul className="list-disc pl-5 space-y-2 text-sage-800">
                <li><em>"Gestalt Therapy: Excitement and Growth in the Human Personality"</em> — Frederick Perls</li>
                <li><em>"Awareness: The Perils and Opportunities of Reality"</em> — Anthony de Mello (perspectivă conexă)</li>
                <li><em>"Arta de a fi"</em> — Erich Fromm</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
