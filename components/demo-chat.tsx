'use client'

import { useState } from 'react'
import { MessageCircle, Utensils, Scissors, Stethoscope, Wrench, Dumbbell, Hotel } from 'lucide-react'

type Role = 'user' | 'bot'

interface ChatMessage {
  role: Role
  text: string
}

interface DemoConversation {
  title: string
  icon: React.ComponentType<{ className?: string }>
  messages: ChatMessage[]
}

const conversations: Record<string, DemoConversation> = {
  restaurant: {
    title: 'Restaurant',
    icon: Utensils,
    messages: [
      { role: 'user', text: 'Hallo, ich möchte einen Tisch für 4 Personen am Samstag um 19 Uhr reservieren.' },
      { role: 'bot', text: 'Gerne! Ich prüfe die Verfügbarkeit … Am Samstag um 19:00 Uhr ist ein Tisch für 4 Personen frei. Auf welchen Namen darf ich reservieren?' },
      { role: 'user', text: 'Auf den Namen Müller. Wir haben eine Glutenallergie.' },
      { role: 'bot', text: 'Perfekt! Ihre Reservierung ist bestätigt:\n\nSamstag, 19:00 Uhr\n4 Personen, Name: Müller\nHinweis: Glutenallergie notiert\n\nUnsere Küche wird entsprechend vorbereitet. Sie erhalten eine Bestätigung per WhatsApp.' },
    ],
  },
  salon: {
    title: 'Friseur',
    icon: Scissors,
    messages: [
      { role: 'user', text: 'Hi, kann ich morgen einen Termin zum Haareschneiden bekommen?' },
      { role: 'bot', text: 'Hallo! Morgen haben wir noch folgende freie Termine:\n\n10:00 Uhr\n14:30 Uhr\n16:00 Uhr\n\nWelcher passt Ihnen am besten?' },
      { role: 'user', text: '14:30 bitte. Was kostet ein Damenschnitt?' },
      { role: 'bot', text: 'Ihr Termin ist gebucht:\n\nMorgen, 14:30 Uhr\nDamenschnitt: ab € 42 (inkl. Waschen)\n\nSie bekommen morgen früh eine Erinnerung per WhatsApp. Bis dann!' },
    ],
  },
  zahnarzt: {
    title: 'Zahnarzt',
    icon: Stethoscope,
    messages: [
      { role: 'user', text: 'Guten Tag, ich bräuchte einen Termin zur Kontrolle.' },
      { role: 'bot', text: 'Guten Tag! Unsere nächsten freien Kontrolltermine:\n\nMittwoch, 08:30 Uhr\nDonnerstag, 10:00 Uhr\nFreitag, 14:00 Uhr\n\nWelcher passt Ihnen?' },
      { role: 'user', text: 'Donnerstag 10 Uhr bitte. Nehmen Sie die ÖGK?' },
      { role: 'bot', text: 'Termin ist notiert:\n\nDonnerstag, 10:00 Uhr\nKontrolluntersuchung\n\nWir sind Wahlarzt-Ordination. Rückverrechnung mit der ÖGK ist möglich.\n\nBitte mitbringen: e-Card, Allergiepass (falls vorhanden). 10 Min. vor dem Termin da sein.' },
    ],
  },
  handwerker: {
    title: 'Handwerker',
    icon: Wrench,
    messages: [
      { role: 'user', text: 'Hallo, unser Wasserhahn tropft seit 2 Tagen. Können Sie vorbeikommen?' },
      { role: 'bot', text: 'Guten Tag! Ein tropfender Wasserhahn — das beheben wir schnell. Nächste freie Termine:\n\nÜbermorgen, 08:00–12:00\nFreitag, 13:00–17:00\n\nGeschätzt: Anfahrt € 35 + ca. € 65/Std. (30–60 Min. üblich).' },
      { role: 'user', text: 'Übermorgen Vormittag wäre super.' },
      { role: 'bot', text: 'Alles klar, eingetragen:\n\nÜbermorgen, 08:00–12:00\nWasserhahn-Reparatur\nGeschätzt: € 65–100 (inkl. Anfahrt)\n\nUnser Techniker ruft 30 Min. vorher an. Bitte Bereich unter dem Waschbecken freihalten.' },
    ],
  },
  fitness: {
    title: 'Fitness',
    icon: Dumbbell,
    messages: [
      { role: 'user', text: 'Hey, ich möchte gerne bei euch ein Probetraining machen.' },
      { role: 'bot', text: 'Super! Unser Probetraining ist 1 Woche kostenlos:\n\nZugang zu allen Geräten & Kursen\nPersönliche Einführung\nBeratungsgespräch\n\nWann möchten Sie starten?' },
      { role: 'user', text: 'Am liebsten morgen. Was kostet danach eine Mitgliedschaft?' },
      { role: 'bot', text: 'Ihr Probetraining-Start:\n\nMorgen, Einführung um 10:00 oder 17:00 Uhr\nBitte Sportkleidung & Handtuch mitbringen\n\nMitgliedschaften:\nBasic: € 29,90/Mo. (Geräte)\nPremium: € 49,90/Mo. (Geräte + Kurse)\nVIP: € 69,90/Mo. (alles + Personal Training)\n\nAlle monatlich kündbar.' },
    ],
  },
  hotel: {
    title: 'Hotel',
    icon: Hotel,
    messages: [
      { role: 'user', text: 'Hallo, haben Sie ein Doppelzimmer frei vom 15. bis 18. März?' },
      { role: 'bot', text: 'Guten Tag! Für den 15.–18. März (3 Nächte):\n\nDoppelzimmer Classic: € 129/Nacht — verfügbar\nJunior Suite: € 179/Nacht — noch 1 frei\n\nAlle Preise inkl. Frühstück. Ab 3 Nächten: 10% Rabatt!' },
      { role: 'user', text: 'Das Doppelzimmer bitte. Wie ist der Check-in?' },
      { role: 'bot', text: 'Ihre Buchung:\n\n15.–18. März (3 Nächte)\nDoppelzimmer Classic\n€ 348,30 (3 × € 129, -10%)\nFrühstück inklusive\n\nCheck-in: ab 15:00 Uhr\nExpress Check-in per App möglich\n\nBuchungsbestätigung kommt per E-Mail.' },
    ],
  },
}

const demoKeys = Object.keys(conversations)

export default function DemoChat() {
  const [activeDemo, setActiveDemo] = useState('restaurant')
  const convo = conversations[activeDemo]

  return (
    <div className="max-w-lg mx-auto">
      {/* Tab switcher */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {demoKeys.map((key) => {
          const c = conversations[key]
          const Icon = c.icon
          return (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeDemo === key
                  ? 'bg-[#1D1D1F] text-white'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {c.title}
            </button>
          )
        })}
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-[#E8E8ED] overflow-hidden">
        <div className="bg-[#1D1D1F] text-white px-4 py-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium text-xs">{convo.title} — Demo</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full" />
            Online
          </span>
        </div>

        <div className="p-4 space-y-3 max-h-[28rem] overflow-y-auto bg-[#FAFAFA]">
          {convo.messages.map((msg, i) => (
            <div
              key={`${activeDemo}-${i}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#0071E3] text-white rounded-br-md'
                    : 'bg-white text-[#1D1D1F] border border-[#E8E8ED] rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-[#E8E8ED] bg-white">
          <div className="bg-[#F5F5F7] rounded-full px-4 py-2.5 text-xs text-[#86868B]">
            Nachricht eingeben …
          </div>
        </div>
      </div>
    </div>
  )
}
