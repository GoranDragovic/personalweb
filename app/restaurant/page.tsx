import IndustryPage from '@/components/industry-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat-Automatisierung für Restaurants | ChatAuto',
  description: 'Automatische Reservierungen, Speisekarten-Auskunft und weniger No-Shows. Chat-Automatisierung speziell für Restaurants und Gastronomie in Österreich.',
}

export default function RestaurantPage() {
  return (
    <IndustryPage
      slug="restaurant"
      headline="Nie wieder verpasste Reservierungen — Ihr Restaurant-Chat arbeitet rund um die Uhr."
      subheadline="Automatische Tischreservierungen, Speisekarten-Auskunft und Erinnerungen gegen No-Shows. Mehr Gäste, weniger Telefonzeit."
      heroLabel="Chat-Automatisierung für Restaurants & Gastronomie"
      painPoints={[
        { stat: '8', label: 'verpasste Anrufe pro Abend während der Stoßzeit' },
        { stat: '25%', label: 'No-Show-Rate ohne automatische Erinnerungen' },
        { stat: '€ 3.600', label: 'entgangener Umsatz pro Monat' },
      ]}
      painSummary="In der Stoßzeit klingelt das Telefon ununterbrochen. Ihr Team ist beschäftigt, Anrufe gehen verloren — und damit Reservierungen und Umsatz."
      features={[
        'Automatische Reservierungen 24/7 annehmen',
        'Speisekarte und Tagesmenü per Chat beantworten',
        'Sonderwünsche und Allergien direkt erfassen',
        'Erinnerungen 24h vor der Reservierung senden',
        'No-Show-Rate um bis zu 60% reduzieren',
        'Öffnungszeiten und Anfahrt automatisch beantworten',
        'Gruppenbuchungen und Events verwalten',
        'Mehrsprachig: DE, EN, TR und mehr',
      ]}
      testimonials={[
        {
          quote: 'Seit wir den Chat haben, verpassen wir keine Reservierung mehr. Das hat sich im ersten Monat bezahlt gemacht.',
          name: 'Maria K.',
          role: 'Restaurantbesitzerin, Wien',
        },
        {
          quote: 'Die No-Show-Rate ist von 20% auf 8% gesunken. Die automatischen Erinnerungen sind Gold wert.',
          name: 'Giovanni P.',
          role: 'Pizzeria-Inhaber, Salzburg',
        },
        {
          quote: 'Unser Team kann sich endlich aufs Kochen konzentrieren statt aufs Telefon.',
          name: 'Andreas H.',
          role: 'Gasthaus-Besitzer, Graz',
        },
      ]}
      roi={{
        before: '€ 3.600 Verlust/Monat',
        after: '€ 2.900 mehr Umsatz',
        saving: '€ 6.500 Differenz/Monat',
      }}
      defaultIndustry="restaurant"
    />
  )
}
