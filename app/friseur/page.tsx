import IndustryPage from '@/components/industry-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat-Automatisierung für Friseure & Salons | ChatAuto',
  description: 'Terminbuchung rund um die Uhr, automatische Erinnerungen und weniger No-Shows. Chat-Automatisierung speziell für Friseure und Salons in Österreich.',
}

export default function FriseurPage() {
  return (
    <IndustryPage
      slug="friseur"
      headline="Termine buchen um 23 Uhr? Ihr Salon-Chat macht's möglich."
      subheadline="24/7 Terminbuchung per WhatsApp oder Website. Automatische Erinnerungen, weniger No-Shows, mehr zufriedene Kunden."
      heroLabel="Chat-Automatisierung für Friseure & Salons"
      painPoints={[
        { stat: '6', label: 'verpasste Terminanfragen pro Woche' },
        { stat: '18%', label: 'No-Show-Rate ohne Erinnerungen' },
        { stat: '€ 1.800', label: 'entgangener Umsatz pro Monat' },
      ]}
      painSummary="Kunden wollen Termine buchen, wenn es ihnen passt — abends, am Wochenende, in der Pause. Aber wenn Sie gerade schneiden, geht niemand ans Telefon."
      features={[
        'Terminbuchung rund um die Uhr — auch nachts',
        'Automatische Terminerinnerungen per WhatsApp',
        'Preisliste und Verfügbarkeit sofort beantworten',
        'Umbuchung und Stornierung ohne Anruf',
        'Warteliste bei ausgebuchten Zeiten',
        'Kundenpräferenzen merken (Lieblingsmitarbeiter, etc.)',
        'Automatische Nachfass-Nachrichten für Wiederholungsbuchungen',
        'Integration mit Ihrem bestehenden Kalender',
      ]}
      testimonials={[
        {
          quote: 'Meine Kunden buchen jetzt Termine über WhatsApp — auch um 23 Uhr. Weniger Anrufe, mehr Buchungen.',
          name: 'Thomas R.',
          role: 'Friseurmeister, Graz',
        },
        {
          quote: 'Die No-Shows haben sich halbiert seit wir automatische Erinnerungen versenden.',
          name: 'Sabrina L.',
          role: 'Salon-Inhaberin, Linz',
        },
        {
          quote: 'Ich spare mir täglich 1 Stunde Telefonzeit. Das ist unbezahlbar.',
          name: 'Michael W.',
          role: 'Barbershop-Besitzer, Wien',
        },
      ]}
      roi={{
        before: '€ 1.800 Verlust/Monat',
        after: '€ 1.400 mehr Umsatz',
        saving: '€ 3.200 Differenz/Monat',
      }}
      defaultIndustry="friseur"
    />
  )
}
