'use client'

import { useState, type FormEvent } from 'react'
import {
  Menu,
  X,
  MessageCircle,
  Clock,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Utensils,
  Scissors,
  Wrench,
  ChevronDown,
  Mail,
  User,
  Building,
  Send,
  Zap,
  PhoneOff,
  TrendingDown,
  Phone,
  CalendarCheck,
  BellRing,
  FileText,
  Users,
  BadgeCheck,
} from 'lucide-react'
import RoiCalculator from '@/components/roi-calculator'
import DemoChat from '@/components/demo-chat'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = '+436600000000'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Chat-Automatisierung.`

const testimonials = [
  {
    quote:
      'Seit wir den Chat haben, verpassen wir keine Reservierung mehr. Das hat sich im ersten Monat bezahlt gemacht.',
    name: 'Maria K.',
    role: 'Restaurantbesitzerin, Wien',
  },
  {
    quote:
      'Meine Kunden buchen jetzt Termine über WhatsApp – auch um 23 Uhr. Weniger Anrufe, mehr Buchungen.',
    name: 'Thomas R.',
    role: 'Friseurmeister, Graz',
  },
  {
    quote:
      'Endlich muss ich nicht mehr jede Anfrage selbst beantworten. Der Chat macht das schneller als ich.',
    name: 'Stefan M.',
    role: 'Installateur, Linz',
  },
]

const useCases = [
  {
    icon: Utensils,
    title: 'Restaurant',
    features: [
      'Automatische Reservierungen annehmen',
      'Speisekarte & Öffnungszeiten beantworten',
      'Erinnerungen gegen No-Shows versenden',
      'Sonderwünsche & Allergien erfassen',
    ],
  },
  {
    icon: Scissors,
    title: 'Friseur & Salon',
    features: [
      'Terminbuchung rund um die Uhr',
      'Preisliste & Verfügbarkeit anzeigen',
      'Automatische Terminerinnerungen',
      'Umbuchung ohne Anruf ermöglichen',
    ],
  },
  {
    icon: Wrench,
    title: 'Handwerker & Gewerbe',
    features: [
      'Anfragen sofort beantworten',
      'Verfügbarkeit & Kostenvoranschläge',
      'Terminvereinbarung ohne Telefon',
      'Nachfass-Nachrichten automatisieren',
    ],
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: 149,
    description: 'Ideal zum Einstieg für kleine Betriebe.',
    popular: false,
    features: [
      '1 Chat-Kanal (Website oder WhatsApp)',
      'Bis zu 500 Gespräche / Monat',
      'Automatische Antworten',
      'E-Mail-Support',
      'DSGVO-konform',
    ],
  },
  {
    name: 'Pro',
    price: 299,
    description: 'Für Betriebe, die auf mehreren Kanälen erreichbar sein wollen.',
    popular: true,
    features: [
      '3 Kanäle (Website + WhatsApp + Instagram)',
      'Bis zu 2.000 Gespräche / Monat',
      'Terminbuchung & Erinnerungen',
      'Mehrsprachig (DE, EN, TR, BKS)',
      'Priority Support',
    ],
  },
  {
    name: 'Full',
    price: 499,
    description: 'Alles inklusive – für maximale Automatisierung.',
    popular: false,
    features: [
      'Alle Kanäle unbegrenzt',
      'Unbegrenzte Gespräche',
      'CRM-Integration',
      'Persönlicher Ansprechpartner',
      'Individuelle Anpassungen',
    ],
  },
]

const faqs = [
  {
    q: 'Was genau ist Chat-Automatisierung?',
    a: 'Ein intelligenter Chat auf Ihrer Website oder WhatsApp, der Kundenanfragen automatisch beantwortet, Termine bucht und Reservierungen annimmt – rund um die Uhr, ohne dass Sie selbst am Telefon sitzen müssen.',
  },
  {
    q: 'Brauche ich technisches Wissen für die Einrichtung?',
    a: 'Nein. Wir übernehmen das komplette Setup. Sie müssen nichts installieren und brauchen keine technischen Vorkenntnisse. In einem kurzen Erstgespräch klären wir Ihre Anforderungen, den Rest erledigen wir.',
  },
  {
    q: 'Funktioniert das mit meiner bestehenden Website?',
    a: 'Ja. Der Chat lässt sich auf jeder Website einbinden – egal ob WordPress, Wix, eigene Seite oder gar keine Website. Im letzteren Fall nutzen wir WhatsApp direkt.',
  },
  {
    q: 'Ist das DSGVO-konform?',
    a: 'Ja, zu 100 %. Alle Daten werden in der EU verarbeitet und gespeichert. Wir stellen Ihnen auch die nötigen Datenschutz-Texte zur Verfügung.',
  },
  {
    q: 'Wie schnell ist das eingerichtet?',
    a: 'In der Regel innerhalb von 7 Werktagen. Einfache Setups sind oft schon nach 3 Tagen live.',
  },
  {
    q: 'Was passiert, wenn der Chat eine Frage nicht beantworten kann?',
    a: 'Komplexe oder ungewöhnliche Anfragen werden automatisch an Sie weitergeleitet – per E-Mail, WhatsApp oder in Ihr bestehendes System. Kein Kunde geht verloren.',
  },
  {
    q: 'Kann ich jederzeit kündigen?',
    a: 'Ja. Es gibt keine Mindestlaufzeit. Sie können monatlich kündigen, wenn Sie nicht zufrieden sind. Kein Risiko.',
  },
  {
    q: 'Welche Sprachen werden unterstützt?',
    a: 'Standardmäßig Deutsch und Englisch. Auf Wunsch auch Türkisch, Bosnisch/Kroatisch/Serbisch und weitere Sprachen – ideal für den österreichischen Markt.',
  },
]

/* ------------------------------------------------------------------ */
/*  SMALL REUSABLE PIECES                                              */
/* ------------------------------------------------------------------ */

function CtaBand({ text }: { text: string }) {
  return (
    <section className="py-12 sm:py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl sm:text-2xl font-bold text-white mb-6">
          {text}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Kostenlose ROI-Analyse anfordern
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            Demo-Chat ansehen
          </a>
        </div>
      </div>
    </section>
  )
}

function TrustBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <Icon className="w-5 h-5 text-blue-600 shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branche: '',
    nachricht: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: connect to your form endpoint (e.g. Formspree, Netlify Forms, API route)
    console.log('Form submitted:', formData)
    setFormSubmitted(true)
  }

  const navLinks = [
    { href: '#so-funktionierts', label: "So funktioniert\u2019s" },
    { href: '#branchen', label: 'Branchen' },
    { href: '#preise', label: 'Preise' },
    { href: '#faq', label: 'FAQ' },
    { href: '#kontakt', label: 'Kontakt' },
  ]

  return (
    <>
      {/* ============================================================ */}
      {/*  NAV                                                          */}
      {/* ============================================================ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-slate-900">
            Chat<span className="text-blue-600">Auto</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                ROI-Analyse
                <ArrowRight className="w-4 h-4" />
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            aria-label="Menü öffnen"
            className="md:hidden p-2 -mr-2 text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 pb-4">
            <ul className="space-y-2 pt-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block py-2 text-sm font-medium text-slate-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#kontakt"
                  className="block text-center mt-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kostenlose ROI-Analyse
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
            Chat-Automatisierung für Ihr Geschäft
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto">
            Mehr Buchungen, weniger Telefonstress –{' '}
            <span className="text-blue-600">vollautomatisch.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Ihr Chat beantwortet Anfragen sofort, nimmt Reservierungen an und
            reduziert No-Shows – 24/7, ohne App, ohne Technik-Aufwand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Kostenlose ROI-Analyse anfordern
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Demo-Chat ansehen
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <TrustBadge icon={Shield} label="DSGVO-konform" />
            <TrustBadge icon={Clock} label="Setup in 7 Tagen" />
            <TrustBadge icon={MessageCircle} label="Keine App nötig" />
            <TrustBadge icon={Globe} label="Mehrsprachig" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF / LOGOS                                         */}
      {/* ============================================================ */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
            Vertrauen von Betrieben in ganz Österreich
          </p>
          {/* Placeholder logos */}
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {['Gasthaus Huber', 'Salon Bella', 'Installationen Mayr', 'Pizzeria Roma', 'Praxis Dr. König'].map(
              (name) => (
                <div
                  key={name}
                  className="text-sm font-bold text-slate-400 tracking-wide"
                >
                  {name}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROBLEM SECTION                                              */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Jede verpasste Anfrage kostet Sie bares Geld
            </h2>
            <p className="text-lg text-slate-600">
              Kunden erwarten sofortige Antworten. Wenn niemand abnimmt oder
              antwortet, buchen sie bei der Konkurrenz.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
              <PhoneOff className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">5</p>
              <p className="text-sm text-slate-600 mt-1">
                verpasste Anrufe pro Tag
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
              <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">30 %</p>
              <p className="text-sm text-slate-600 mt-1">
                davon wären zahlende Kunden
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm">
              <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-3xl font-bold text-slate-900">€ 60</p>
              <p className="text-sm text-slate-600 mt-1">
                durchschnittlicher Auftragswert
              </p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
            <p className="text-sm text-red-600 font-medium mb-2">
              Das ergibt:
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-red-600">
              € 2.700
            </p>
            <p className="text-red-600 font-medium mt-2">
              entgangener Umsatz pro Monat
            </p>
            <p className="text-sm text-red-500 mt-3">
              5 Anfragen × 30 Tage × 30 % Abschlussrate × € 60
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand text="Wie viel Umsatz lassen Sie liegen?" />

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section id="so-funktionierts" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              In 3 Schritten zum automatisierten Chat
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kein Technik-Aufwand für Sie. Wir kümmern uns um alles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                icon: Phone,
                title: 'Erstgespräch & Setup',
                desc: 'Wir analysieren Ihre häufigsten Anfragen und richten Ihren Chat innerhalb von 7 Tagen ein.',
              },
              {
                step: '2',
                icon: Zap,
                title: 'Chat geht live',
                desc: 'Ihr Chat beantwortet Fragen, nimmt Buchungen an und leitet komplexe Anfragen an Sie weiter.',
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Sie profitieren',
                desc: 'Mehr Buchungen, weniger No-Shows, zufriedenere Kunden – messbar ab Tag 1.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <s.icon className="w-7 h-7 text-blue-600" />
                </div>
                <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
                  Schritt {s.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand text="Bereit, keine Anfrage mehr zu verpassen?" />

      {/* ============================================================ */}
      {/*  USE CASES                                                    */}
      {/* ============================================================ */}
      <section id="branchen" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Perfekt für Ihre Branche
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Egal ob Gastronomie, Dienstleistung oder Handwerk – der Chat passt
              sich Ihrem Geschäft an.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <uc.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {uc.title}
                </h3>
                <ul className="space-y-2.5">
                  {uc.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEMO CHAT                                                    */}
      {/* ============================================================ */}
      <section id="demo" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              So sieht es in der Praxis aus
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Echte Gespräche, automatisch geführt. KI-gestützt, aber
              menschlich formuliert.
            </p>
          </div>
          <DemoChat />
        </div>
      </section>

      {/* CTA */}
      <CtaBand text="Starten Sie in 7 Tagen – ohne Technik-Aufwand." />

      {/* ============================================================ */}
      {/*  ROI CALCULATOR                                               */}
      {/* ============================================================ */}
      <section id="roi" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Berechnen Sie Ihr Umsatz-Potenzial
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ziehen Sie an den Reglern und sehen Sie sofort, was möglich ist.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING                                                      */}
      {/* ============================================================ */}
      <section id="preise" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Transparente Preise. Keine versteckten Kosten.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Monatlich kündbar. Keine Bindung. Kein Risiko.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 sm:p-8 border-2 ${
                  plan.popular
                    ? 'border-blue-600 shadow-lg shadow-blue-600/10'
                    : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Am beliebtesten
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    € {plan.price}
                  </span>
                  <span className="text-slate-500"> / Monat</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Jetzt starten
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Alle Preise exkl. USt. Monatlich kündbar – keine Bindung.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CtaBand text="Lassen Sie kein Geld mehr liegen." />

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section id="faq" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Häufige Fragen
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA + CONTACT FORM                                     */}
      {/* ============================================================ */}
      <section id="kontakt" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: copy */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Lassen Sie kein Geld mehr liegen.
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Fordern Sie jetzt Ihre kostenlose ROI-Analyse an und erfahren
                Sie, wie viel Umsatz Ihnen aktuell entgeht.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: CalendarCheck,
                    text: 'Setup in 7 Tagen – Sie müssen nichts tun',
                  },
                  {
                    icon: Shield,
                    text: '100 % DSGVO-konform, Daten in der EU',
                  },
                  {
                    icon: BadgeCheck,
                    text: 'Keine Bindung – jederzeit monatlich kündbar',
                  },
                  {
                    icon: Globe,
                    text: 'Mehrsprachig: DE, EN, TR, BKS und mehr',
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3"
                  >
                    <item.icon className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  Lieber direkt schreiben?
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp: +43 660 0000000
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Vielen Dank!
                  </h3>
                  <p className="text-slate-600">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Kostenlose ROI-Analyse anfordern
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Füllen Sie das Formular aus – wir erstellen Ihre
                    individuelle Analyse.
                  </p>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Ihr Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      E-Mail *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="ihre@email.at"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Telefon{' '}
                      <span className="text-slate-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+43 ..."
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="branche"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Branche
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        id="branche"
                        value={formData.branche}
                        onChange={(e) =>
                          setFormData({ ...formData, branche: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="restaurant">Restaurant / Gastro</option>
                        <option value="friseur">Friseur / Salon</option>
                        <option value="handwerk">Handwerk / Gewerbe</option>
                        <option value="arztpraxis">Arztpraxis / Ordination</option>
                        <option value="sonstiges">Sonstiges</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="nachricht"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Nachricht{' '}
                      <span className="text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      id="nachricht"
                      rows={3}
                      placeholder="Erzählen Sie uns kurz von Ihrem Geschäft …"
                      value={formData.nachricht}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nachricht: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Kostenlose ROI-Analyse anfordern
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    Antwort innerhalb von 24 Stunden. Kein Spam, versprochen.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ChatAuto. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/*  STICKY WHATSAPP BUTTON                                       */}
      {/* ============================================================ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp schreiben"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  )
}
