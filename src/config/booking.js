export const calendlyUrls = {
  evaluation: 'https://calendly.com/psihologie-vladcosa/terapie-individuala-online-clone',
  individualOnline: 'https://calendly.com/psihologie-vladcosa/terapie-individuala-in-persoana-clone',
  individualInPerson: 'https://calendly.com/psihologie-vladcosa/terapie-individuala-in-persoana',
  couplesTherapy: 'https://calendly.com/psihologie-vladcosa/terapie-de-cuplu',
}

export function openCalendlyPopup(event, url) {
  if (!window.Calendly?.initPopupWidget) return

  event.preventDefault()
  window.Calendly.initPopupWidget({ url })
}
