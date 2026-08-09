import Footer from './components/Footer'

function LegalLayout({ title, updatedAt, children }) {
  return (
    <div className="min-h-screen bg-cream-50 text-slate-800">
      <header className="border-b border-sage-100 bg-cream-50">
        <div className="container-custom h-20 flex items-center justify-between gap-6">
          <a href="#hero" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Logo Vlad Coșa" className="h-12 w-auto opacity-80 group-hover:opacity-100 transition-opacity" width="698" height="274" />
            <span className="text-xl text-slate-900 group-hover:text-sage-700 transition-colors">Vlad Coșa</span>
          </a>
          <a href="#hero" className="text-sage-700 hover:text-sage-800 transition-colors">
            Înapoi la pagina principală
          </a>
        </div>
      </header>

      <main className="container-custom py-16">
        <article className="max-w-4xl mx-auto bg-white rounded-2xl border border-sage-100 shadow-sm p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-light text-slate-900 mb-4">{title}</h1>
          <p className="text-sm text-slate-500 mb-10">Ultima actualizare: {updatedAt}</p>
          <div className="space-y-10 leading-relaxed text-slate-700">{children}</div>
        </article>
      </main>

      <Footer />
    </div>
  )
}

function LegalSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl text-slate-900">{title}</h2>
      {children}
    </section>
  )
}

export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Politica de confidențialitate" updatedAt="9 august 2026">
      {/* ȘABLON JURIDIC: textul trebuie revizuit de proprietarul site-ului și de un avocat înainte de publicare. */}
      <LegalSection title="1. Operatorul datelor">
        <p>
          Operatorul datelor cu caracter personal este Coșa Vlad - Cabinet Individual de Psihologie, cu sediul profesional în Strada August Treboniu Laurian nr. 5, Timișoara. Pentru întrebări privind protecția datelor, ne poți contacta la adresa de e-mail afișată în secțiunea Contact a site-ului.
        </p>
      </LegalSection>

      <LegalSection title="2. Datele pe care le prelucrăm">
        <ul className="list-disc pl-6 space-y-2">
          <li>Datele pe care ni le comunici direct prin e-mail sau telefon, inclusiv numele, datele de contact și conținutul mesajului.</li>
          <li>Datele necesare programării, atunci când alegi serviciul extern Calendly. Aceste date sunt introduse și prelucrate conform politicii Calendly.</li>
          <li>Date tehnice transmise către Google numai dacă îți dai acordul pentru încărcarea hărții Google Maps, cum ar fi adresa IP și informații despre browser sau dispozitiv.</li>
        </ul>
        <p>Site-ul nu încarcă Google Maps înainte de acordul tău și păstrează alegerea în memoria locală a browserului.</p>
      </LegalSection>

      <LegalSection title="3. Scopuri și temeiuri legale">
        <ul className="list-disc pl-6 space-y-2">
          <li>Răspunderea la solicitări și stabilirea unei programări: demersuri la cererea ta înaintea încheierii unui contract și, după caz, executarea contractului.</li>
          <li>Gestionarea activității profesionale și îndeplinirea obligațiilor legale, contabile și profesionale: obligație legală.</li>
          <li>Protejarea site-ului și gestionarea corespondenței curente: interesul legitim de a asigura funcționarea și securitatea serviciilor.</li>
          <li>Încărcarea Google Maps: consimțământul tău, care poate fi retras oricând prin butonul de ascundere a hărții sau prin ștergerea datelor locale ale browserului.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Servicii externe și destinatari">
        <p>
          Datele pot fi prelucrate de furnizorii necesari comunicării și programării, inclusiv furnizorul de e-mail, operatorul de telefonie și Calendly. Google primește date numai după ce alegi să încarci harta. Calendly și Google pot prelucra date în afara Spațiului Economic European, în baza mecanismelor de transfer și a garanțiilor descrise în propriile politici de confidențialitate.
        </p>
      </LegalSection>

      <LegalSection title="5. Perioada de păstrare">
        <p>
          Corespondența este păstrată atât timp cât este necesar pentru soluționarea solicitării și, dacă începe o relație profesională, pe durata impusă de obligațiile legale, profesionale, contabile și de termenele aplicabile pentru apărarea drepturilor. Alegerea privind Google Maps rămâne în memoria locală până când îți retragi acordul sau ștergi datele browserului.
        </p>
      </LegalSection>

      <LegalSection title="6. Drepturile tale">
        <p>În condițiile Regulamentului general privind protecția datelor, poți solicita:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>accesul la datele tale și o copie a acestora;</li>
          <li>rectificarea datelor inexacte sau completarea celor incomplete;</li>
          <li>ștergerea datelor, atunci când condițiile legale sunt îndeplinite;</li>
          <li>restricționarea prelucrării, opoziția și, unde se aplică, portabilitatea datelor;</li>
          <li>retragerea consimțământului, fără a afecta legalitatea prelucrării anterioare retragerii.</li>
        </ul>
        <p>
          Ai dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), prin informațiile de contact publicate pe <a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer" className="text-sage-700 underline underline-offset-4">www.dataprotection.ro</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Confidențialitatea profesională">
        <p>
          Informațiile comunicate în cadrul serviciilor psihologice sunt protejate de confidențialitatea profesională și sunt gestionate în conformitate cu Codul Deontologic al Psihologilor din România și cu obligațiile legale aplicabile.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

export function TermsAndConditionsPage() {
  return (
    <LegalLayout title="Termeni și condiții" updatedAt="9 august 2026">
      {/* ȘABLON JURIDIC: textul trebuie revizuit de proprietarul site-ului și de un avocat înainte de publicare. */}
      <LegalSection title="1. Despre acest site">
        <p>
          Site-ul vladcosa.ro este prezentat de Coșa Vlad - Cabinet Individual de Psihologie, cu sediul profesional în Strada August Treboniu Laurian nr. 5, Timișoara. Prin utilizarea site-ului accepți acești termeni și condiții.
        </p>
      </LegalSection>

      <LegalSection title="2. Scopul informațiilor">
        <p>
          Conținutul are caracter general și informativ și nu reprezintă un diagnostic, o evaluare psihologică sau o recomandare medicală personalizată. Utilizarea site-ului nu creează automat o relație profesională între vizitator și cabinet.
        </p>
        <p>
          Într-o urgență medicală sau într-o situație de pericol imediat, apelează serviciul unic de urgență 112 sau adresează-te celui mai apropiat serviciu medical de urgență.
        </p>
      </LegalSection>

      <LegalSection title="3. Programări și servicii">
        <p>
          Poți solicita o programare prin e-mail, telefon sau prin serviciul extern Calendly. Programarea este confirmată numai după acceptarea datei și a condițiilor comunicate direct de cabinet. Detaliile serviciului, costurile, regulile de anulare și reprogramare se comunică înainte de începerea relației profesionale.
        </p>
      </LegalSection>

      <LegalSection title="4. Confidențialitate și conduită profesională">
        <p>
          Serviciile psihologice sunt oferite cu respectarea legislației aplicabile și a Codului Deontologic al Psihologilor din România. Limitele confidențialității și condițiile colaborării sunt explicate în cadrul documentelor profesionale furnizate clientului.
        </p>
      </LegalSection>

      <LegalSection title="5. Servicii și legături externe">
        <p>
          Site-ul conține legături către servicii administrate de terți, inclusiv Calendly, Facebook și Google Maps. Folosirea acestor servicii este guvernată de termenii și politicile furnizorilor respectivi. Google Maps se încarcă numai după acordul tău explicit.
        </p>
      </LegalSection>

      <LegalSection title="6. Proprietate intelectuală">
        <p>
          Textele, elementele grafice, fotografiile și structura site-ului sunt protejate de legislația privind drepturile de autor. Reproducerea, distribuirea sau utilizarea lor în scop comercial fără acordul titularului nu este permisă, cu excepțiile prevăzute de lege.
        </p>
      </LegalSection>

      <LegalSection title="7. Disponibilitate și răspundere">
        <p>
          Depunem eforturi rezonabile pentru ca informațiile să fie corecte și site-ul disponibil, dar nu putem garanta funcționarea neîntreruptă sau absența erorilor. Cabinetul nu răspunde pentru indisponibilitatea serviciilor externe sau pentru decizii luate exclusiv pe baza informațiilor generale de pe site.
        </p>
      </LegalSection>

      <LegalSection title="8. Modificări și lege aplicabilă">
        <p>
          Acești termeni pot fi actualizați pentru a reflecta modificări ale site-ului, serviciilor sau legislației. Versiunea aplicabilă este cea publicată pe această pagină. Termenii sunt guvernați de legea română, iar eventualele neînțelegeri vor fi soluționate mai întâi pe cale amiabilă și, dacă este necesar, de instanțele competente.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Pentru întrebări privind site-ul sau acești termeni, folosește datele publicate în secțiunea Contact.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
