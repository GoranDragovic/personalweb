'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
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
  Stethoscope,
  ChevronDown,
  Mail,
  User,
  Building,
  Send,
  Zap,
  Phone,
  CalendarCheck,
  BadgeCheck,
  BarChart3,
  Calendar,
  Bell,
  Users,
} from 'lucide-react'
import RoiCalculator from '@/components/roi-calculator'
import DemoChat from '@/components/demo-chat'
import DashboardMockup from '@/components/dashboard-mockup'
import InteractiveChat from '@/components/interactive-chat'

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
      'Meine Kunden buchen jetzt Termine über WhatsApp — auch um 23 Uhr. Weniger Anrufe, mehr Buchungen.',
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

const industries = [
  {
    icon: Utensils,
    title: 'Restaurant',
    slug: 'restaurant',
    features: [
      'Automatische Reservierungen',
      'Speisekarte & Öffnungszeiten',
      'Erinnerungen gegen No-Shows',
      'Sonderwünsche erfassen',
    ],
  },
  {
    icon: Scissors,
    title: 'Friseur & Salon',
    slug: 'friseur',
    features: [
      'Terminbuchung rund um die Uhr',
      'Preisliste & Verfügbarkeit',
      'Automatische Erinnerungen',
      'Umbuchung ohne Anruf',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Zahnarzt & Arztpraxis',
    slug: 'zahnarzt',
    features: [
      'Terminvergabe automatisiert',
      'Versicherungsfragen beantworten',
      'Vorbereitungshinweise senden',
      'Notfall-Weiterleitung',
    ],
  },
  {
    icon: Wrench,
    title: 'Handwerker & Gewerbe',
    slug: 'handwerker',
    features: [
      'Anfragen sofort beantworten',
      'Kostenvoranschläge per Chat',
      'Notdienst priorisiert weiterleiten',
      'Nachfass automatisieren',
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
    description: 'Alles inklusive — für maximale Automatisierung.',
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
    a: 'Ein intelligenter Chat auf Ihrer Website oder WhatsApp, der Kundenanfragen automatisch beantwortet, Termine bucht und Reservierungen annimmt — rund um die Uhr.',
  },
  {
    q: 'Brauche ich technisches Wissen?',
    a: 'Nein. Wir übernehmen das komplette Setup. Sie brauchen keine technischen Vorkenntnisse. In einem kurzen Erstgespräch klären wir Ihre Anforderungen.',
  },
  {
    q: 'Funktioniert das mit meiner Website?',
    a: 'Ja. Der Chat lässt sich auf jeder Website einbinden — WordPress, Wix, eigene Seite. Ohne Website nutzen wir WhatsApp direkt.',
  },
  {
    q: 'Ist das DSGVO-konform?',
    a: 'Ja, zu 100%. Alle Daten werden in der EU verarbeitet und gespeichert. Wir stellen auch die nötigen Datenschutz-Texte zur Verfügung.',
  },
  {
    q: 'Wie schnell ist das eingerichtet?',
    a: 'In der Regel innerhalb von 7 Werktagen. Einfache Setups sind oft schon nach 3 Tagen live.',
  },
  {
    q: 'Was passiert bei unbeantwortbaren Fragen?',
    a: 'Komplexe Anfragen werden automatisch an Sie weitergeleitet — per E-Mail, WhatsApp oder in Ihr System. Kein Kunde geht verloren.',
  },
  {
    q: 'Kann ich jederzeit kündigen?',
    a: 'Ja. Keine Mindestlaufzeit. Monatlich kündbar.',
  },
  {
    q: 'Welche Sprachen werden unterstützt?',
    a: 'Deutsch und Englisch standardmäßig. Auf Wunsch Türkisch, BKS und weitere — ideal für den österreichischen Markt.',
  },
]

const dashboardFeatures = [
  {
    icon: Calendar,
    title: 'Kalenderansicht',
    desc: 'Alle Buchungen auf einen Blick. Sync mit Google, Outlook & Apple Calendar.',
  },
  {
    icon: Bell,
    title: 'Echtzeit-Benachrichtigungen',
    desc: 'Sofort informiert bei neuen Buchungen, Stornierungen und Anfragen.',
  },
  {
    icon: Users,
    title: 'Kundenverwaltung',
    desc: 'Kundenhistorie, Notizen und Kontaktdaten an einem Ort.',
  },
  {
    icon: BarChart3,
    title: 'Analyse-Dashboard',
    desc: 'Buchungen pro Woche, Umsatz, No-Show-Rate — alles messbar.',
  },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [branchenOpen, setBranchenOpen] = useState(false)
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
    console.log('Form submitted:', formData)
    setFormSubmitted(true)
  }

  return (
    <>
      {/* ============================================================ */}
      {/*  NAV                                                          */}
      {/* ============================================================ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]">
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between h-12">
          <Link href="/personalweb" className="text-base font-semibold text-[#1D1D1F] tracking-[-0.015em]">
            Chat<span className="text-[#0071E3]">Auto</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#so-funktionierts" className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
              So funktioniert&apos;s
            </a>

            {/* Branchen dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBranchenOpen(true)}
              onMouseLeave={() => setBranchenOpen(false)}
            >
              <button className="flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
                Branchen
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${branchenOpen ? 'rotate-180' : ''}`} />
              </button>
              {branchenOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-[#E8E8ED] p-2 min-w-[200px]">
                    {industries.map((ind) => (
                      <Link
                        key={ind.slug}
                        href={`/personalweb/${ind.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
                      >
                        <ind.icon className="w-4 h-4" />
                        {ind.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#preise" className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
              Preise
            </a>
            <a href="#faq" className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
              FAQ
            </a>
            <a href="#kontakt" className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
              Kontakt
            </a>
            <a
              href="#kontakt"
              className="bg-[#0071E3] text-white text-xs font-medium px-4 py-1.5 rounded-full hover:bg-[#0077ED] transition-colors"
            >
              ROI-Analyse
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Menü"
            className="md:hidden p-2 -mr-2 text-[#1D1D1F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8E8ED] px-6 pb-6 pt-2">
            <div className="space-y-1">
              {[
                { href: '#so-funktionierts', label: "So funktioniert's" },
                { href: '#branchen', label: 'Branchen' },
                { href: '#preise', label: 'Preise' },
                { href: '#faq', label: 'FAQ' },
                { href: '#kontakt', label: 'Kontakt' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block py-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#E8E8ED] mt-2">
                <p className="text-[10px] text-[#86868B] uppercase tracking-widest mb-2">Branchen</p>
                {industries.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/personalweb/${ind.slug}`}
                    className="flex items-center gap-2 py-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ind.icon className="w-4 h-4" />
                    {ind.title}
                  </Link>
                ))}
              </div>
              <a
                href="#kontakt"
                className="block text-center mt-3 bg-[#0071E3] text-white text-sm font-medium px-4 py-2.5 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kostenlose ROI-Analyse
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="h-12" />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <p className="text-[#0071E3] text-sm font-medium tracking-wide mb-4">
            Chat-Automatisierung
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1D1D1F] tracking-[-0.015em] leading-[1.05]">
            Mehr Buchungen.
            <br />
            <span className="text-[#86868B]">Weniger Telefon.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
            Ihr Chat beantwortet Anfragen, nimmt Reservierungen an und reduziert
            No-Shows — 24/7, ohne App, ohne Technik-Aufwand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-[#0071E3] text-white font-medium px-8 py-3.5 rounded-full text-base hover:bg-[#0077ED] transition-colors"
            >
              Kostenlose ROI-Analyse
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 text-[#0071E3] font-medium px-8 py-3.5 rounded-full text-base hover:bg-[rgba(0,113,227,0.08)] transition-colors"
            >
              Demo ausprobieren
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { icon: Shield, label: 'DSGVO-konform' },
              { icon: Clock, label: 'Setup in 7 Tagen' },
              { icon: MessageCircle, label: 'Keine App nötig' },
              { icon: Globe, label: 'Mehrsprachig' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-[#86868B]">
                <b.icon className="w-4 h-4" />
                <span className="text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF                                                 */}
      {/* ============================================================ */}
      <section className="py-8 border-y border-[#E8E8ED]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 items-center opacity-30">
            {['Gasthaus Huber', 'Salon Bella', 'Installationen Mayr', 'Pizzeria Roma', 'Praxis Dr. König'].map(
              (name) => (
                <span key={name} className="text-xs font-semibold text-[#1D1D1F] tracking-wide">
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#F5F5F7] rounded-2xl p-8">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF9F0A] text-[#FF9F0A]" />
                  ))}
                </div>
                <p className="text-[#1D1D1F] text-[15px] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-[#1D1D1F] text-sm">{t.name}</p>
                  <p className="text-[#86868B] text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROBLEM                                                      */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <p className="text-[#FF3B30] text-sm font-medium mb-4">Das Problem</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-6">
            Jede verpasste Anfrage kostet&nbsp;Geld.
          </h2>
          <p className="text-lg text-[#6E6E73] max-w-lg mx-auto mb-16">
            Kunden erwarten sofortige Antworten. Wenn niemand abnimmt, buchen sie bei der Konkurrenz.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { value: '5', label: 'verpasste Anrufe pro Tag' },
              { value: '30 %', label: 'davon wären zahlende Kunden' },
              { value: '€ 60', label: 'durchschnittlicher Auftragswert' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p className="text-3xl font-bold text-[#1D1D1F] mb-1">{s.value}</p>
                <p className="text-xs text-[#6E6E73]">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-[rgba(255,59,48,0.08)] rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-sm text-[#FF3B30] font-medium mb-2">Das ergibt:</p>
            <p className="text-4xl sm:text-5xl font-bold text-[#FF3B30]">€ 2.700</p>
            <p className="text-sm text-[#FF3B30] font-medium mt-2">entgangener Umsatz pro Monat</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section id="so-funktionierts" className="py-20 sm:py-28">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] text-sm font-medium mb-4">So einfach</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em]">
              In drei Schritten live.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-3xl mx-auto">
            {[
              {
                num: '1',
                icon: Phone,
                title: 'Erstgespräch',
                desc: 'Wir analysieren Ihre häufigsten Anfragen und richten den Chat innerhalb von 7 Tagen ein.',
              },
              {
                num: '2',
                icon: Zap,
                title: 'Chat geht live',
                desc: 'Ihr Chat beantwortet Fragen, nimmt Buchungen an und leitet komplexe Anfragen weiter.',
              },
              {
                num: '3',
                icon: CheckCircle,
                title: 'Sie profitieren',
                desc: 'Mehr Buchungen, weniger No-Shows, zufriedenere Kunden — messbar ab Tag 1.',
              },
            ].map((s) => (
              <div key={s.num} className="text-center">
                <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <s.icon className="w-5 h-5 text-[#1D1D1F]" />
                </div>
                <p className="text-xs font-semibold text-[#0071E3] mb-3">Schritt {s.num}</p>
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">{s.title}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 text-[#0071E3] text-sm font-medium hover:underline"
            >
              Jetzt starten
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DASHBOARD                                                    */}
      {/* ============================================================ */}
      <section id="dashboard" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-[#0071E3] text-sm font-medium mb-4">Für unsere Kunden</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Alles im Blick.
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-lg mx-auto">
              Ein Dashboard für alle Buchungen, Kunden und Analysen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {dashboardFeatures.map((f) => (
              <div key={f.title} className="text-center p-4">
                <f.icon className="w-5 h-5 text-[#0071E3] mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-[#1D1D1F] mb-1">{f.title}</h4>
                <p className="text-xs text-[#6E6E73] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <DashboardMockup />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BRANCHEN                                                     */}
      {/* ============================================================ */}
      <section id="branchen" className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] text-sm font-medium mb-4">Branchen</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Perfekt für Ihr Geschäft.
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-lg mx-auto">
              Egal ob Gastronomie, Dienstleistung oder Handwerk — der Chat passt sich an.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1120px] mx-auto">
            {industries.map((uc) => (
              <Link
                key={uc.title}
                href={`/personalweb/${uc.slug}`}
                className="group bg-[#F5F5F7] rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <uc.icon className="w-6 h-6 text-[#1D1D1F] mb-4" />
                <h3 className="text-base font-semibold text-[#1D1D1F] mb-4">{uc.title}</h3>
                <ul className="space-y-2 mb-6">
                  {uc.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#6E6E73]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#34C759] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-xs font-medium text-[#0071E3] group-hover:underline flex items-center gap-1">
                  Mehr erfahren <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEMO CHAT                                                    */}
      {/* ============================================================ */}
      <section id="demo" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#0071E3] text-sm font-medium mb-4">Live-Beispiele</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              So klingt Ihr Chat.
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-lg mx-auto">
              Echte Gespräche, automatisch geführt. KI-gestützt, aber menschlich formuliert.
            </p>
          </div>
          <DemoChat />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTIVE CHAT                                              */}
      {/* ============================================================ */}
      <section id="live-demo" className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-[rgba(0,113,227,0.08)] text-[#0071E3] text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]" />
              </span>
              Probieren Sie unseren Chat live aus — genau so funktioniert er auf Ihrer Website
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Testen Sie es selbst.
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-lg mx-auto">
              Tippen Sie eine Nachricht und erleben Sie, wie der Chat antwortet.
            </p>
          </div>
          <InteractiveChat />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ROI CALCULATOR                                               */}
      {/* ============================================================ */}
      <section id="roi" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#0071E3] text-sm font-medium mb-4">ROI-Rechner</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Berechnen Sie Ihr Potenzial.
            </h2>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRICING                                                      */}
      {/* ============================================================ */}
      <section id="preise" className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0071E3] text-sm font-medium mb-4">Preise</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Transparent. Keine versteckten Kosten.
            </h2>
            <p className="text-base text-[#6E6E73]">
              Monatlich kündbar. Keine Bindung.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-[980px] mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-shadow ${
                  plan.popular
                    ? 'bg-[#1D1D1F] text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]'
                    : 'bg-[#F5F5F7]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0071E3] text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                    Empfohlen
                  </span>
                )}
                <h3 className={`text-lg font-semibold ${plan.popular ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 mb-6 ${plan.popular ? 'text-white/60' : 'text-[#86868B]'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#1D1D1F]'}`}>
                    € {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#86868B]'}`}>
                    {' '}/ Monat
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/80' : 'text-[#6E6E73]'}`}>
                      <CheckCircle className="w-4 h-4 text-[#34C759] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className={`block text-center text-sm font-medium py-3 rounded-full transition-colors ${
                    plan.popular
                      ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]'
                      : 'bg-[#1D1D1F] text-white hover:bg-[#333336]'
                  }`}
                >
                  Jetzt starten
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#86868B] mt-8">
            Alle Preise exkl. USt. Monatlich kündbar — keine Bindung.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section id="faq" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em]">
              Häufige Fragen.
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  aria-expanded={activeFaq === i}
                >
                  <span className="font-medium text-[#1D1D1F] text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform duration-300 ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 text-sm text-[#6E6E73] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT                                                      */}
      {/* ============================================================ */}
      <section id="kontakt" className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <p className="text-[#0071E3] text-sm font-medium mb-4">Kontakt</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-6">
                Lassen Sie kein Geld mehr liegen.
              </h2>
              <p className="text-base text-[#6E6E73] mb-10 leading-relaxed">
                Fordern Sie Ihre kostenlose ROI-Analyse an und erfahren Sie, wie viel Umsatz Ihnen entgeht.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: CalendarCheck, text: 'Setup in 7 Tagen' },
                  { icon: Shield, text: '100% DSGVO-konform' },
                  { icon: BadgeCheck, text: 'Jederzeit kündbar' },
                  { icon: Globe, text: 'Mehrsprachig' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#86868B] shrink-0" />
                    <span className="text-sm text-[#6E6E73]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#F5F5F7] rounded-2xl p-5">
                <p className="text-xs font-medium text-[#86868B] mb-1">Lieber direkt schreiben?</p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#34C759] text-sm font-medium hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +43 660 0000000
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-[#F5F5F7] rounded-2xl p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-[#34C759] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">Vielen Dank.</h3>
                  <p className="text-sm text-[#6E6E73]">Wir melden uns innerhalb von 24 Stunden.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">ROI-Analyse anfordern</h3>
                    <p className="text-xs text-[#86868B]">Kostenlos und unverbindlich.</p>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="name" type="text" required placeholder="Ihr Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-[#6E6E73] mb-1.5">E-Mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="email" type="email" required placeholder="ihre@email.at" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Telefon <span className="text-[#86868B]">(optional)</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="phone" type="tel" placeholder="+43 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="branche" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Branche</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <select id="branche" value={formData.branche} onChange={(e) => setFormData({ ...formData, branche: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent appearance-none">
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
                    <label htmlFor="nachricht" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Nachricht <span className="text-[#86868B]">(optional)</span></label>
                    <textarea id="nachricht" rows={3} placeholder="Erzählen Sie uns kurz von Ihrem Geschäft …" value={formData.nachricht} onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                  </div>

                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0071E3] text-white text-sm font-medium py-3 rounded-full hover:bg-[#0077ED] transition-colors">
                    <Send className="w-4 h-4" />
                    ROI-Analyse anfordern
                  </button>

                  <p className="text-[11px] text-[#86868B] text-center">
                    Antwort innerhalb von 24 Stunden.
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
      <footer className="py-8 border-t border-[#E8E8ED]">
        <div className="max-w-[1120px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#86868B]">
            &copy; {new Date().getFullYear()} ChatAuto. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-[#86868B]">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Impressum</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/*  STICKY WHATSAPP                                              */}
      {/* ============================================================ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp schreiben"
        className="fixed bottom-6 right-6 z-50 bg-[#34C759] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </>
  )
}
