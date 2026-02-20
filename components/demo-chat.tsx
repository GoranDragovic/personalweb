'use client'

import { useState } from 'react'
import { MessageCircle, Utensils, Scissors } from 'lucide-react'

type Role = 'user' | 'bot'

interface ChatMessage {
  role: Role
  text: string
}

const conversations: Record<
  string,
  { title: string; messages: ChatMessage[] }
> = {
  restaurant: {
    title: 'Restaurant-Reservierung',
    messages: [
      {
        role: 'user',
        text: 'Hallo, ich möchte einen Tisch für 4 Personen am Samstag um 19 Uhr reservieren.',
      },
      {
        role: 'bot',
        text: 'Gerne! Ich prüfe die Verfügbarkeit … ✓ Am Samstag um 19:00 Uhr ist ein Tisch für 4 Personen frei. Auf welchen Namen darf ich reservieren?',
      },
      { role: 'user', text: 'Auf den Namen Müller.' },
      {
        role: 'bot',
        text: 'Perfekt! Ihre Reservierung ist bestätigt:\n\n📅 Samstag, 19:00 Uhr\n👥 4 Personen\n📝 Name: Müller\n\nSie erhalten eine Bestätigung per WhatsApp. Wir freuen uns auf Ihren Besuch!',
      },
    ],
  },
  salon: {
    title: 'Friseur-Terminbuchung',
    messages: [
      {
        role: 'user',
        text: 'Hi, kann ich morgen einen Termin zum Haareschneiden bekommen?',
      },
      {
        role: 'bot',
        text: 'Hallo! Morgen haben wir noch folgende freie Termine:\n\n• 10:00 Uhr\n• 14:30 Uhr\n• 16:00 Uhr\n\nWelcher passt Ihnen am besten?',
      },
      { role: 'user', text: '14:30 bitte.' },
      {
        role: 'bot',
        text: 'Ihr Termin ist gebucht:\n\n📅 Morgen, 14:30 Uhr\n✂️ Haarschnitt\n\nSie bekommen morgen früh eine Erinnerung per WhatsApp. Bis dann!',
      },
    ],
  },
}

export default function DemoChat() {
  const [activeDemo, setActiveDemo] = useState<'restaurant' | 'salon'>(
    'restaurant'
  )

  const convo = conversations[activeDemo]

  return (
    <div className="max-w-lg mx-auto">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setActiveDemo('restaurant')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeDemo === 'restaurant'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          Restaurant
        </button>
        <button
          onClick={() => setActiveDemo('salon')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeDemo === 'salon'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4" />
          Friseur
        </button>
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium text-sm">{convo.title} – Live Demo</span>
          <span className="ml-auto flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Online
          </span>
        </div>

        <div className="p-4 space-y-3 max-h-[28rem] overflow-y-auto bg-slate-50">
          {convo.messages.map((msg, i) => (
            <div
              key={`${activeDemo}-${i}`}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-slate-200 bg-white">
          <div className="bg-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-400">
            Nachricht eingeben …
          </div>
        </div>
      </div>
    </div>
  )
}
