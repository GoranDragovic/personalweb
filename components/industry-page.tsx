'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Globe,
  CalendarCheck,
  BadgeCheck,
  MessageCircle,
  Mail,
  User,
  Send,
  Phone,
} from 'lucide-react'
import InteractiveChat from '@/components/interactive-chat'

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface PainPoint {
  stat: string
  label: string
}

interface RoiExample {
  before: string
  after: string
  saving: string
}

export interface IndustryPageProps {
  slug: string
  headline: string
  subheadline: string
  heroLabel: string
  painPoints: PainPoint[]
  painSummary: string
  features: string[]
  testimonials: Testimonial[]
  roi: RoiExample
  defaultIndustry: string
}

const WHATSAPP_LINK = `https://wa.me/436600000000?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Chat-Automatisierung.`

const pricingPlans = [
  {
    name: 'Starter',
    price: 149,
    description: 'Ideal zum Einstieg.',
    popular: false,
    features: [
      '1 Chat-Kanal',
      '500 Gespräche / Monat',
      'Automatische Antworten',
      'E-Mail-Support',
      'DSGVO-konform',
    ],
  },
  {
    name: 'Pro',
    price: 299,
    description: 'Mehrere Kanäle, mehr Funktionen.',
    popular: true,
    features: [
      '3 Kanäle (Web + WhatsApp + Instagram)',
      '2.000 Gespräche / Monat',
      'Terminbuchung & Erinnerungen',
      'Mehrsprachig',
      'Priority Support',
    ],
  },
  {
    name: 'Full',
    price: 499,
    description: 'Alles inklusive.',
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

export default function IndustryPage({
  headline,
  subheadline,
  heroLabel,
  painPoints,
  painSummary,
  features,
  testimonials,
  roi,
}: IndustryPageProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nachricht: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormSubmitted(true)
  }

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]">
        <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between h-12">
          <Link href="/personalweb" className="text-base font-semibold text-[#1D1D1F] tracking-[-0.015em]">
            Chat<span className="text-[#0071E3]">Auto</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/personalweb" className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors">
              Startseite
            </Link>
            <a
              href="#kontakt"
              className="bg-[#0071E3] text-white text-xs font-medium px-4 py-1.5 rounded-full hover:bg-[#0077ED] transition-colors"
            >
              ROI-Analyse
            </a>
          </div>
        </div>
      </nav>
      <div className="h-12" />

      {/* HERO */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <p className="text-[#0071E3] text-sm font-medium tracking-wide mb-4">{heroLabel}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1F] tracking-[-0.015em] leading-[1.08] max-w-3xl mx-auto">
            {headline}
          </h1>
          <p className="mt-6 text-lg text-[#6E6E73] max-w-xl mx-auto leading-relaxed">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#kontakt" className="inline-flex items-center justify-center gap-2 bg-[#0071E3] text-white font-medium px-8 py-3.5 rounded-full hover:bg-[#0077ED] transition-colors">
              Kostenlose ROI-Analyse
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#demo" className="inline-flex items-center justify-center gap-2 text-[#0071E3] font-medium px-8 py-3.5 rounded-full hover:bg-[rgba(0,113,227,0.08)] transition-colors">
              Demo ausprobieren
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
            Kennen Sie das?
          </h2>
          <p className="text-lg text-[#6E6E73] max-w-lg mx-auto mb-12">{painSummary}</p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {painPoints.map((pp, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p className="text-3xl font-bold text-[#1D1D1F]">{pp.stat}</p>
                <p className="text-xs text-[#6E6E73] mt-2">{pp.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[980px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] text-center mb-12">
            Das macht ChatAuto für Sie
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F5F5F7] rounded-xl p-4">
                <CheckCircle className="w-4 h-4 text-[#34C759] mt-0.5 shrink-0" />
                <span className="text-sm text-[#1D1D1F]">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] text-center mb-12">
            Das sagen unsere Kunden
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-apple-w mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#FF9F0A] text-[#FF9F0A]" />
                  ))}
                </div>
                <p className="text-[#1D1D1F] text-[15px] leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-[#1D1D1F] text-sm">{t.name}</p>
                <p className="text-[#86868B] text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[980px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] text-center mb-12">
            Konkretes ROI-Beispiel
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-[rgba(255,59,48,0.08)] rounded-2xl p-6 text-center">
              <p className="text-xs font-medium text-[#FF3B30] mb-2">Vorher</p>
              <p className="text-xl font-bold text-[#FF3B30]">{roi.before}</p>
            </div>
            <div className="bg-[rgba(52,199,89,0.1)] rounded-2xl p-6 text-center">
              <p className="text-xs font-medium text-[#34C759] mb-2">Nachher</p>
              <p className="text-xl font-bold text-[#34C759]">{roi.after}</p>
            </div>
            <div className="bg-[rgba(0,113,227,0.08)] rounded-2xl p-6 text-center">
              <p className="text-xs font-medium text-[#0071E3] mb-2">Ersparnis</p>
              <p className="text-xl font-bold text-[#0071E3]">{roi.saving}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-[rgba(0,113,227,0.08)] text-[#0071E3] text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]" />
              </span>
              Probieren Sie unseren Chat live aus
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Testen Sie es selbst.
            </h2>
          </div>
          <InteractiveChat />
        </div>
      </section>

      {/* PRICING */}
      <section id="preise" className="py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-4">
              Transparente Preise.
            </h2>
            <p className="text-base text-[#6E6E73]">Monatlich kündbar. Keine Bindung.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-[980px] mx-auto">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-[#1D1D1F] text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]' : 'bg-[#F5F5F7]'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0071E3] text-white text-[10px] font-semibold px-3 py-1 rounded-full">Empfohlen</span>
                )}
                <h3 className={`text-lg font-semibold ${plan.popular ? 'text-white' : 'text-[#1D1D1F]'}`}>{plan.name}</h3>
                <p className={`text-xs mt-1 mb-6 ${plan.popular ? 'text-white/60' : 'text-[#86868B]'}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#1D1D1F]'}`}>€ {plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-[#86868B]'}`}> / Monat</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-white/80' : 'text-[#6E6E73]'}`}>
                      <CheckCircle className="w-4 h-4 text-[#34C759] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#kontakt" className={`block text-center text-sm font-medium py-3 rounded-full transition-colors ${plan.popular ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]' : 'bg-[#1D1D1F] text-white hover:bg-[#333336]'}`}>
                  Jetzt starten
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#86868B] mt-8">Alle Preise exkl. USt.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt" className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#0071E3] text-sm font-medium mb-4">Kontakt</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-[-0.01em] mb-6">
                Lassen Sie kein Geld mehr liegen.
              </h2>
              <p className="text-base text-[#6E6E73] mb-10 leading-relaxed">
                Fordern Sie Ihre kostenlose ROI-Analyse an.
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
              <div className="bg-white rounded-2xl p-5">
                <p className="text-xs font-medium text-[#86868B] mb-1">Lieber direkt schreiben?</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#34C759] text-sm font-medium hover:underline">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +43 660 0000000
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8">
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
                    <label htmlFor="ind-name" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="ind-name" type="text" required placeholder="Ihr Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ind-email" className="block text-xs font-medium text-[#6E6E73] mb-1.5">E-Mail *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="ind-email" type="email" required placeholder="ihre@email.at" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ind-phone" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Telefon <span className="text-[#86868B]">(optional)</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                      <input id="ind-phone" type="tel" placeholder="+43 ..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ind-msg" className="block text-xs font-medium text-[#6E6E73] mb-1.5">Nachricht <span className="text-[#86868B]">(optional)</span></label>
                    <textarea id="ind-msg" rows={3} placeholder="Erzählen Sie uns kurz von Ihrem Geschäft …" value={formData.nachricht} onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[#D2D2D7] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0071E3] text-white text-sm font-medium py-3 rounded-full hover:bg-[#0077ED] transition-colors">
                    <Send className="w-4 h-4" />
                    ROI-Analyse anfordern
                  </button>
                  <p className="text-[11px] text-[#86868B] text-center">Antwort innerhalb von 24 Stunden.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[#E8E8ED]">
        <div className="max-w-[1120px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#86868B]">&copy; {new Date().getFullYear()} ChatAuto.</p>
          <div className="flex gap-6 text-xs text-[#86868B]">
            <Link href="/personalweb" className="hover:text-[#1D1D1F] transition-colors">Startseite</Link>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Impressum</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Datenschutz</a>
          </div>
        </div>
      </footer>
    </>
  )
}
