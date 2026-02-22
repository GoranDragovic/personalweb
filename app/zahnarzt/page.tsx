import IndustryPage from '@/components/industry-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat-Automatisierung für Zahnarztpraxen | ChatAuto',
  description: 'Terminvereinbarung, Versicherungsfragen und Vorbereitungshinweise automatisiert. Chat-Automatisierung speziell für Zahnarztpraxen und Ordinationen in Österreich.',
}

export default function ZahnarztPage() {
  return (
    <IndustryPage
      slug="zahnarzt"
      headline="Weniger Telefon, mehr Patienten — Ihr Praxis-Chat übernimmt."
      subheadline="Automatische Terminvergabe, Versicherungsfragen beantworten und Patienten optimal auf ihren Besuch vorbereiten — 24/7."
      heroLabel="Chat-Automatisierung für Zahnarztpraxen & Ordinationen"
      painPoints={[
        { stat: '12', label: 'Anrufe pro Tag nur für Terminvereinbarungen' },
        { stat: '15%', label: 'nicht erschienene Patienten' },
        { stat: '45 Min', label: 'tägliche Telefonzeit der Assistenz' },
      ]}
      painSummary="Ihre Assistentin verbringt den halben Tag am Telefon — Termine vergeben, Versicherungsfragen beantworten, Patienten erinnern. Zeit, die für die Betreuung fehlt."
      features={[
        'Terminvereinbarung rund um die Uhr automatisiert',
        'Versicherungs- und Kassenfragen sofort beantwortet',
        'Vorbereitungshinweise automatisch zusenden',
        'Erinnerungen gegen No-Shows (SMS/WhatsApp)',
        'Notfall-Weiterleitung bei akuten Schmerzen',
        'Neue Patienten: Anamnesebogen vorab digital',
        'Mehrsprachig für diverse Patientengruppen',
        'DSGVO-konform mit Daten in der EU',
      ]}
      testimonials={[
        {
          quote: 'Unsere Assistentin hat endlich Zeit für die Patienten in der Praxis. Der Chat übernimmt die Telefonate.',
          name: 'Dr. Elisabeth K.',
          role: 'Zahnärztin, Wien',
        },
        {
          quote: 'Patienten lieben es, dass sie Termine auch abends online buchen können. Die Auslastung ist um 20% gestiegen.',
          name: 'Dr. Martin S.',
          role: 'Zahnarzt, Innsbruck',
        },
        {
          quote: 'Die automatischen Erinnerungen haben unsere No-Show-Rate von 15% auf 5% gesenkt.',
          name: 'Dr. Sarah M.',
          role: 'Zahnärztin, Klagenfurt',
        },
      ]}
      roi={{
        before: '€ 2.400 Verlust/Monat',
        after: '€ 3.200 mehr Umsatz',
        saving: '€ 5.600 Differenz/Monat',
      }}
      defaultIndustry="zahnarzt"
    />
  )
}
