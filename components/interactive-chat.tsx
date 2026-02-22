'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, Send, Utensils, Scissors, Stethoscope, Wrench, Dumbbell, Hotel } from 'lucide-react'

type Role = 'user' | 'bot'

interface ChatMsg {
  role: Role
  text: string
}

interface IndustryFlow {
  label: string
  icon: React.ComponentType<{ className?: string }>
  greeting: string
  rules: { keywords: string[]; response: string }[]
  fallback: string
}

const industries: Record<string, IndustryFlow> = {
  restaurant: {
    label: 'Restaurant',
    icon: Utensils,
    greeting:
      'Willkommen beim Gasthaus zur goldenen Gans! Wie kann ich Ihnen helfen? Sie können z.B. nach freien Tischen, unserer Speisekarte, Öffnungszeiten oder Preisen fragen.',
    rules: [
      {
        keywords: ['termin', 'tisch', 'reserv', 'buch', 'platz'],
        response:
          'Gerne helfe ich Ihnen bei der Reservierung! Wir haben heute noch folgende Zeiten frei:\n\n12:00 Uhr (2-4 Personen)\n18:30 Uhr (2-6 Personen)\n19:30 Uhr (2-4 Personen)\n20:00 Uhr (2-8 Personen)\n\nFür wie viele Personen und welche Uhrzeit darf ich reservieren?',
      },
      {
        keywords: ['speisekarte', 'menu', 'menü', 'essen', 'gericht'],
        response:
          'Hier sind unsere beliebtesten Gerichte:\n\nWiener Schnitzel vom Kalb — € 18,90\nForelle Müllerin — € 16,50\nGroßer Salatteller — € 12,90\nHausgemachte Kässpätzle — € 13,50\nKaiserschmarrn — € 9,90\n\nHaben Sie Allergien oder Sonderwünsche?',
      },
      {
        keywords: ['öffnungszeit', 'offen', 'geöffnet', 'wann', 'uhr'],
        response:
          'Unsere Öffnungszeiten:\n\nMo–Fr: 11:00–14:30 & 17:30–22:00\nSamstag: 11:00–22:00\nSonntag: 11:00–21:00\n\nWarme Küche bis 30 Min. vor Schluss.',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'teuer', 'günstig', 'was kostet'],
        response:
          'Unsere Preise:\n\nHauptgerichte: € 12,90 – € 24,90\nVorspeisen: € 6,90 – € 11,90\nDesserts: € 6,90 – € 9,90\nGetränke ab € 3,50\n\nMittagsmenü (Mo–Fr): € 9,90 inkl. Suppe\n\nMöchten Sie reservieren?',
      },
      {
        keywords: ['allerg', 'vegan', 'vegetar', 'gluten', 'laktose', 'unverträg'],
        response:
          'Wir nehmen Allergien sehr ernst:\n\nVegetarische Optionen bei jedem Gang\nVegane Gerichte auf Anfrage\nGlutenfreie Alternativen verfügbar\nAllergen-Kennzeichnung auf der Karte\n\nBitte teilen Sie uns Ihre Bedürfnisse bei der Reservierung mit.',
      },
      {
        keywords: ['stornieren', 'absagen', 'cancel', 'storno'],
        response:
          'Stornierungen sind bis 2 Stunden vor dem Termin kostenlos möglich. Bitte nennen Sie mir den Namen der Reservierung.',
      },
    ],
    fallback:
      'Vielen Dank für Ihre Nachricht! Ich kann Ihnen bei Reservierungen, Speisekarte, Öffnungszeiten und Preisen helfen. Was genau interessiert Sie?',
  },
  friseur: {
    label: 'Friseur',
    icon: Scissors,
    greeting:
      'Willkommen bei Salon Bella! Wie kann ich Ihnen helfen? Fragen Sie nach freien Terminen, Preisen, unseren Leistungen oder Öffnungszeiten.',
    rules: [
      {
        keywords: ['termin', 'buch', 'reserv', 'frei', 'wann', 'zeit'],
        response:
          'Unsere nächsten freien Termine:\n\nHeute, 16:00 Uhr\nMorgen, 09:30 Uhr\nMorgen, 14:00 Uhr\nÜbermorgen, 10:00 Uhr\nÜbermorgen, 15:30 Uhr\n\nWelcher Termin passt Ihnen? Und welche Leistung wünschen Sie?',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'teuer', 'günstig', 'was kostet', 'preisliste'],
        response:
          'Unsere Preise:\n\nHerrenschnitt: € 28\nDamenschnitt: ab € 42\nFärben: ab € 55\nSträhnchen: ab € 65\nWaschen + Föhnen: € 25\nBartpflege: € 18\n\nAlle Preise inkl. Waschen. Termin buchen?',
      },
      {
        keywords: ['öffnungszeit', 'offen', 'geöffnet', 'uhr'],
        response:
          'Unsere Öffnungszeiten:\n\nDi–Fr: 09:00–18:00\nSamstag: 09:00–14:00\nSonntag & Montag: geschlossen\n\nTermine können auch außerhalb über den Chat gebucht werden.',
      },
      {
        keywords: ['leistung', 'angebot', 'service', 'behandlung', 'machen sie'],
        response:
          'Unser Angebot:\n\nSchnitt & Styling (Damen & Herren)\nFärben, Strähnchen, Balayage\nKopfhautbehandlungen\nBartpflege & Rasur\nHochsteckfrisuren & Event-Styling\nHaarpflege-Beratung\n\nTermin für eine bestimmte Leistung?',
      },
      {
        keywords: ['umbuchen', 'verschieben', 'ändern', 'stornieren', 'absagen'],
        response:
          'Umbuchungen und Stornierungen sind bis 24 Stunden vorher kostenlos. Nennen Sie mir Ihren Namen und den ursprünglichen Termin.',
      },
      {
        keywords: ['parken', 'parkplatz', 'anfahrt', 'wo', 'adresse'],
        response:
          'Sie finden uns in der Hauptstraße 12, 8010 Graz. 3 Kundenparkplätze direkt vor dem Salon. Straßenbahn-Haltestelle Jakominiplatz 2 Min. Fußweg.',
      },
    ],
    fallback:
      'Danke für Ihre Nachricht! Ich helfe bei Terminen, Preisen, Leistungen und Öffnungszeiten. Was möchten Sie wissen?',
  },
  zahnarzt: {
    label: 'Zahnarzt',
    icon: Stethoscope,
    greeting:
      'Willkommen in der Zahnarztpraxis Dr. König! Fragen Sie nach Terminen, Leistungen, Versicherung oder Vorbereitung auf Ihren Besuch.',
    rules: [
      {
        keywords: ['termin', 'buch', 'reserv', 'frei', 'wann'],
        response:
          'Unsere nächsten freien Termine:\n\nMorgen, 08:30 Uhr\nÜbermorgen, 10:00 Uhr\nFreitag, 14:00 Uhr\nNächster Montag, 09:00 Uhr\n\nUm welche Behandlung geht es?',
      },
      {
        keywords: ['versicherung', 'kasse', 'kassa', 'krankenkasse', 'ögk', 'privat', 'wahlarzt'],
        response:
          'Zur Versicherung:\n\nWir sind Wahlarzt-Ordination\nAlle gängigen Kassen (ÖGK, BVAEB, SVS) — Rückverrechnung möglich\nPrivatversicherungen werden direkt abgerechnet\nKostenvoranschlag vor größeren Behandlungen\n\nBitte e-Card mitbringen.',
      },
      {
        keywords: ['schmerz', 'weh', 'notfall', 'akut', 'dringend', 'sofort'],
        response:
          'Bei akuten Schmerzen haben wir täglich Notfall-Termine reserviert.\n\nNotfall-Slots: Mo–Fr 08:00–08:30\nTelefon: +43 1 234 5678\n\nBeschreiben Sie kurz Ihre Beschwerden.',
      },
      {
        keywords: ['vorbereitung', 'vorher', 'was muss ich', 'mitbringen', 'bevor'],
        response:
          'Vor Ihrem Termin:\n\nBitte mitbringen:\ne-Card, Allergiepass, aktuelle Medikamentenliste, Röntgenbilder (falls vorhanden)\n\n10 Min. vor dem Termin da sein\nZähne vorher normal putzen\nBlutverdünner? Bitte vorher absprechen.',
      },
      {
        keywords: ['leistung', 'behandlung', 'angebot', 'machen sie', 'was bieten'],
        response:
          'Unser Leistungsspektrum:\n\nProphylaxe & Mundhygiene\nFüllungen & Wurzelbehandlungen\nKronen, Brücken, Implantate\nZahnaufhellung (Bleaching)\nUnsichtbare Zahnspange (Aligner)\nKinderzahnheilkunde',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'teuer', 'was kostet'],
        response:
          'Richtwerte:\n\nMundhygiene: € 90–120\nFüllung: ab € 80\nKrone: ab € 650\nImplantat: ab € 1.200\nBleaching: ab € 350\n\nKostenvoranschlag vor größeren Behandlungen. Teilweise Kassenübernahme möglich.',
      },
    ],
    fallback:
      'Ich helfe bei Terminen, Versicherungsfragen, Behandlungen und Vorbereitung. Was kann ich für Sie tun?',
  },
  handwerker: {
    label: 'Handwerker',
    icon: Wrench,
    greeting:
      'Willkommen bei Installationen Mayr! Fragen Sie nach Verfügbarkeit, Kostenvoranschlägen, Notdienst oder unseren Leistungen.',
    rules: [
      {
        keywords: ['termin', 'verfügbar', 'frei', 'wann', 'zeit', 'kommen'],
        response:
          'Nächste freie Termine:\n\nÜbermorgen, 08:00–12:00\nFreitag, 13:00–17:00\nNächste Woche Montag, ganztags\n\nUm welche Art von Arbeit geht es?',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'kostenvoranschlag', 'angebot', 'was kostet'],
        response:
          'Unsere Richtwerte:\n\nStundensatz: € 65 (exkl. USt.)\nAnfahrtspauschale: € 35 (20km Radius)\nNotdienst-Zuschlag: +50%\n\nFür einen genauen KV beschreiben Sie das Problem oder senden ein Foto. Antwort innerhalb 24h.',
      },
      {
        keywords: ['notfall', 'notdienst', 'dringend', 'rohrbruch', 'überschwemm', 'sofort', 'akut'],
        response:
          'Unser Notdienst ist 24/7 erreichbar!\n\nNotfall-Hotline: +43 660 1234567\n\nBei Rohrbruch, Gasgeruch oder Heizungsausfall rücken wir innerhalb von 60 Minuten aus.\n\nErste Maßnahmen:\nHauptwasserhahn zudrehen\nBei Gas: Fenster öffnen, kein Licht\nBei Wasser: Strom abschalten',
      },
      {
        keywords: ['leistung', 'service', 'machen sie', 'angebot', 'was bieten'],
        response:
          'Unsere Leistungen:\n\nSanitär (Rohre, Armaturen, Bäder)\nHeizung (Wartung, Reparatur, Einbau)\nKlima & Lüftung\nBadsanierung\nReparaturen aller Art\nWartungsverträge\n\nEinsatzgebiet: Wien und Umgebung (25km).',
      },
      {
        keywords: ['rechnung', 'zahlung', 'bezahlen', 'überweisen'],
        response:
          'Zahlungsoptionen:\n\nRechnung (14 Tage Zahlungsziel)\nKartenzahlung vor Ort\nRatenzahlung bei größeren Projekten\n\nKostenvoranschlag ist verbindlich — keine versteckten Kosten.',
      },
      {
        keywords: ['gebiet', 'wo', 'region', 'umkreis', 'anfahrt'],
        response:
          'Einsatzgebiet:\n\nWien und Umgebung (25km Radius)\nAlle Wiener Bezirke + Klosterneuburg, Mödling, Baden, Schwechat\n\nAnfahrt: € 35 (bis 20km), danach € 0,50/km.',
      },
    ],
    fallback:
      'Ich kann bei Terminen, Kostenvoranschlägen, Notdienst und Leistungen helfen. Was brauchen Sie?',
  },
  fitness: {
    label: 'Fitness',
    icon: Dumbbell,
    greeting:
      'Willkommen bei FitLife Studio! Fragen Sie nach Kurszeiten, Mitgliedschaften, Probetraining oder unseren Angeboten.',
    rules: [
      {
        keywords: ['kurs', 'class', 'stunde', 'yoga', 'spinning', 'pilates', 'training'],
        response:
          'Unser Kursplan:\n\nYoga: Mo/Mi/Fr 07:00 & 18:30\nSpinning: Di/Do 07:30 & 19:00\nHIIT: Mo/Mi 12:00 & 17:30\nKraftzirkel: Di/Do/Sa 10:00\nPilates: Di/Fr 09:00\nBoxen: Mi/Sa 11:00\n\nMöchten Sie sich anmelden?',
      },
      {
        keywords: ['probe', 'test', 'schnupper', 'ausprobier', 'gratis', 'kostenlos'],
        response:
          'Probetraining:\n\n1 Woche kostenlos testen!\nZugang zu allen Kursen\nEinführung an den Geräten\nPersönliches Beratungsgespräch\n\nEinfach vorbeikommen oder Termin buchen. Wann passt es Ihnen?',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'mitglied', 'abo', 'was kostet', 'tarif', 'beitrag'],
        response:
          'Mitgliedschaften:\n\nBasic: € 29,90/Mo. (Gerätetraining)\nPremium: € 49,90/Mo. (Geräte + Kurse)\nVIP: € 69,90/Mo. (alles + Personal Training)\n\n10er-Block Kurse: € 89\nTagespass: € 15\n\nAlle monatlich kündbar. Probetraining?',
      },
      {
        keywords: ['öffnungszeit', 'offen', 'geöffnet', 'wann'],
        response:
          'Öffnungszeiten:\n\nMo–Fr: 06:00–22:00\nSamstag: 08:00–20:00\nSonntag: 09:00–18:00\nFeiertage: 09:00–16:00',
      },
      {
        keywords: ['personal', 'trainer', 'einzel', 'individuell', 'coaching'],
        response:
          'Personal Training:\n\nEinzelstunde: € 65\nDuo-Training: € 45/Person\n10er-Block: € 550 (15% Ersparnis)\n\nKennenlern-Termin buchen?',
      },
      {
        keywords: ['parken', 'parkplatz', 'adresse', 'wo', 'anfahrt'],
        response:
          'Standort:\n\nSportgasse 5, 1030 Wien\n20 kostenlose Parkplätze\nU3 Rochusgasse (3 Min.)\nStraßenbahn 71 direkt davor',
      },
    ],
    fallback:
      'Ich helfe bei Kurszeiten, Mitgliedschaften, Probetraining und allen Fragen rund ums Studio. Was möchten Sie wissen?',
  },
  hotel: {
    label: 'Hotel',
    icon: Hotel,
    greeting:
      'Willkommen im Hotel Alpenblick! Fragen Sie nach Zimmerverfügbarkeit, Preisen, Check-in-Zeiten oder Ausstattung.',
    rules: [
      {
        keywords: ['zimmer', 'buch', 'reserv', 'frei', 'verfügbar', 'übernacht'],
        response:
          'Verfügbare Zimmer:\n\nEinzelzimmer: ab € 89/Nacht — verfügbar\nDoppelzimmer: ab € 129/Nacht — verfügbar\nJunior Suite: ab € 179/Nacht — noch 2 frei\nFamilienzimmer: ab € 159/Nacht — verfügbar\n\nAlle inkl. Frühstück. Zeitraum und Personenanzahl?',
      },
      {
        keywords: ['check-in', 'checkin', 'check in', 'anreise', 'abreise', 'check-out', 'checkout'],
        response:
          'Check-in & Check-out:\n\nCheck-in: ab 15:00 Uhr\nEarly Check-in: ab 12:00 (€ 25)\nCheck-out: bis 11:00 Uhr\nLate Check-out: bis 14:00 (€ 25)\n\nExpress Check-in per App möglich.',
      },
      {
        keywords: ['preis', 'kosten', 'kost', 'was kostet', 'tarif', 'rate'],
        response:
          'Zimmerpreise (pro Nacht, inkl. Frühstück):\n\nEinzelzimmer: € 89–119\nDoppelzimmer: € 129–169\nJunior Suite: € 179–229\nFamilienzimmer: € 159–199\n\nAb 3 Nächten: 10% Rabatt\nAb 7 Nächten: 20% Rabatt\n\nKinder bis 6 Jahre kostenlos.',
      },
      {
        keywords: ['frühstück', 'essen', 'restaurant', 'halbpension', 'abendessen'],
        response:
          'Kulinarisches:\n\nFrühstücksbuffet: 07:00–10:30 (inklusive)\nHalbpension zubuchbar: +€ 35/Person\nHotelbar: 10:00–23:00\n\nRegionale Küche, vegetarisch/vegan verfügbar.',
      },
      {
        keywords: ['ausstattung', 'pool', 'sauna', 'spa', 'wellness', 'fitness', 'wifi', 'wlan', 'parkplatz'],
        response:
          'Ausstattung:\n\nInnenpool (25m)\nSauna & Dampfbad\nSpa mit Massagen\nFitnessraum (24/7)\nKostenloses WLAN\nTiefgarage (€ 12/Tag)\nFahrradverleih\nKinderspielraum\n\nWellness für Hotelgäste kostenlos.',
      },
      {
        keywords: ['stornieren', 'storno', 'absagen', 'cancel'],
        response:
          'Stornobedingungen:\n\nBis 48h vor Anreise: kostenlos\n24–48h: 50% der ersten Nacht\nUnter 24h: 100% der ersten Nacht\n\nWebsite-Buchungen: immer flexible Rate.',
      },
    ],
    fallback:
      'Ich kann bei Zimmerbuchungen, Preisen, Check-in und Ausstattung helfen. Was interessiert Sie?',
  },
}

export default function InteractiveChat() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('restaurant')
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'bot', text: industries.restaurant.greeting },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  function switchIndustry(key: string) {
    setSelectedIndustry(key)
    setMessages([{ role: 'bot', text: industries[key].greeting }])
    setInput('')
    setIsTyping(false)
  }

  function getResponse(userText: string): string {
    const flow = industries[selectedIndustry]
    const lower = userText.toLowerCase()

    for (const rule of flow.rules) {
      if (rule.keywords.some((kw) => lower.includes(kw))) {
        return rule.response
      }
    }

    if (lower.match(/hallo|hi |hey|guten|servus|grüß/)) return flow.greeting
    if (lower.match(/danke|vielen dank|super|toll|perfekt/))
      return 'Sehr gerne! Gibt es noch etwas, wobei ich Ihnen helfen kann?'
    if (lower.match(/tschüss|bye|auf wiedersehen|ciao/))
      return 'Auf Wiedersehen! Schreiben Sie uns jederzeit, wenn Sie etwas brauchen.'
    if (lower.match(/mensch|echt|person|mitarbeiter|jemand/))
      return 'Ich verbinde Sie gerne mit einem Mitarbeiter. Hinterlassen Sie Ihren Namen und Ihre Telefonnummer, wir rufen Sie zurück!'

    return flow.fallback
  }

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setIsTyping(true)

    const response = getResponse(trimmed)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: response }])
    }, 800 + Math.random() * 700)
  }

  const flow = industries[selectedIndustry]

  return (
    <div className="max-w-lg mx-auto">
      {/* Industry selector */}
      <div className="mb-4">
        <p className="text-xs font-medium text-[#86868B] text-center mb-3">Branche wählen:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(industries).map(([key, ind]) => {
            const Icon = ind.icon
            return (
              <button
                key={key}
                onClick={() => switchIndustry(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedIndustry === key
                    ? 'bg-[#1D1D1F] text-white'
                    : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E8E8ED]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {ind.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-[#E8E8ED] overflow-hidden">
        <div className="bg-[#1D1D1F] text-white px-4 py-3 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          <span className="font-medium text-xs">{flow.label} — Live-Demo</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-white/60">
            <span className="w-1.5 h-1.5 bg-[#34C759] rounded-full animate-pulse" />
            Online
          </span>
        </div>

        <div className="p-4 space-y-3 h-[22rem] overflow-y-auto bg-[#FAFAFA]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#0071E3] text-white rounded-br-md'
                    : 'bg-white text-[#1D1D1F] border border-[#E8E8ED] rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-[#1D1D1F] border border-[#E8E8ED] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-typing-1" />
                  <span className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-typing-2" />
                  <span className="w-1.5 h-1.5 bg-[#86868B] rounded-full animate-typing-3" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 py-3 border-t border-[#E8E8ED] bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ihre Nachricht eingeben …"
              className="flex-1 bg-[#F5F5F7] rounded-full px-4 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-[#0071E3] text-white rounded-full px-3 py-2.5 hover:bg-[#0077ED] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
