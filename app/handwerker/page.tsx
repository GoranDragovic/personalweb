import IndustryPage from '@/components/industry-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat-Automatisierung für Handwerker & Installateure | ChatAuto',
  description: 'Anfragen sofort beantworten, Kostenvoranschläge und Notdienst automatisieren. Chat-Automatisierung speziell für Handwerker und Installateure in Österreich.',
}

export default function HandwerkerPage() {
  return (
    <IndustryPage
      slug="handwerker"
      headline="Kein Anruf geht mehr verloren — auch wenn Sie auf der Baustelle sind."
      subheadline="Automatische Anfragen-Beantwortung, Kostenvoranschläge und Terminvereinbarung. Ihr Chat arbeitet, während Sie arbeiten."
      heroLabel="Chat-Automatisierung für Handwerker & Installateure"
      painPoints={[
        { stat: '7', label: 'verpasste Anfragen pro Woche auf der Baustelle' },
        { stat: '€ 420', label: 'durchschnittlicher Auftragswert' },
        { stat: '€ 2.940', label: 'entgangener Umsatz pro Monat' },
      ]}
      painSummary="Als Handwerker sind Sie den ganzen Tag unterwegs. Wenn das Telefon klingelt, können Sie oft nicht abnehmen. Und der Kunde ruft beim nächsten Betrieb an."
      features={[
        'Anfragen sofort beantworten — auch während der Arbeit',
        'Verfügbarkeit und freie Termine automatisch anzeigen',
        'Kostenvoranschläge per Chat einholen',
        'Notdienst-Anfragen priorisiert weiterleiten',
        'Nachfass-Nachrichten automatisch versenden',
        'Fotos vom Schaden per Chat empfangen',
        'Einsatzgebiet und Anfahrtskosten kommunizieren',
        'Kundenbewertungen nach dem Auftrag einholen',
      ]}
      testimonials={[
        {
          quote: 'Endlich muss ich nicht mehr jede Anfrage selbst beantworten. Der Chat macht das schneller als ich.',
          name: 'Stefan M.',
          role: 'Installateur, Linz',
        },
        {
          quote: 'Seitdem der Chat Anfragen beantwortet, habe ich 40% mehr Aufträge. Kein Kunde geht mehr verloren.',
          name: 'Markus P.',
          role: 'Elektriker, Wien',
        },
        {
          quote: 'Die automatischen Nachfass-Nachrichten haben mir schon etliche Folgeaufträge gebracht.',
          name: 'Christian B.',
          role: 'Maler, Salzburg',
        },
      ]}
      roi={{
        before: '€ 2.940 Verlust/Monat',
        after: '€ 2.100 mehr Umsatz',
        saving: '€ 5.040 Differenz/Monat',
      }}
      defaultIndustry="handwerker"
    />
  )
}
