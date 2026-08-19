export const calendlyUrl = 'https://calendly.com/psihologie-vladcosa'

export function openCalendlyPopup(event) {
  if (!window.Calendly?.initPopupWidget) return

  event.preventDefault()
  window.Calendly.initPopupWidget({ url: calendlyUrl })
}
