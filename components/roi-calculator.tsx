'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

export default function RoiCalculator() {
  const [anfragen, setAnfragen] = useState(10)
  const [abschlussrate, setAbschlussrate] = useState(30)
  const [warenkorb, setWarenkorb] = useState(60)

  const monatlich = Math.round(anfragen * (abschlussrate / 100) * warenkorb * 30)
  const jaehrlich = monatlich * 12

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-[#E8E8ED] p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="space-y-8">
        <div>
          <label htmlFor="anfragen" className="block text-sm font-medium text-[#1D1D1F] mb-3">
            Anfragen pro Tag
          </label>
          <input
            id="anfragen"
            type="range"
            min={1}
            max={50}
            value={anfragen}
            onChange={(e) => setAnfragen(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#86868B] mt-2">
            <span>1</span>
            <span className="font-semibold text-[#0071E3] text-lg">{anfragen}</span>
            <span>50</span>
          </div>
        </div>

        <div>
          <label htmlFor="abschlussrate" className="block text-sm font-medium text-[#1D1D1F] mb-3">
            Abschlussrate (%)
          </label>
          <input
            id="abschlussrate"
            type="range"
            min={5}
            max={80}
            step={5}
            value={abschlussrate}
            onChange={(e) => setAbschlussrate(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#86868B] mt-2">
            <span>5 %</span>
            <span className="font-semibold text-[#0071E3] text-lg">{abschlussrate} %</span>
            <span>80 %</span>
          </div>
        </div>

        <div>
          <label htmlFor="warenkorb" className="block text-sm font-medium text-[#1D1D1F] mb-3">
            Durchschnittlicher Auftragswert (€)
          </label>
          <input
            id="warenkorb"
            type="range"
            min={10}
            max={500}
            step={10}
            value={warenkorb}
            onChange={(e) => setWarenkorb(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#86868B] mt-2">
            <span>€ 10</span>
            <span className="font-semibold text-[#0071E3] text-lg">€ {warenkorb}</span>
            <span>€ 500</span>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-[#E8E8ED]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[rgba(0,113,227,0.08)] rounded-2xl p-5 text-center">
            <p className="text-xs text-[#6E6E73] mb-1">Potenzial pro Monat</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#0071E3]">
              € {monatlich.toLocaleString('de-AT')}
            </p>
          </div>
          <div className="bg-[rgba(52,199,89,0.1)] rounded-2xl p-5 text-center">
            <p className="text-xs text-[#6E6E73] mb-1">Potenzial pro Jahr</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#34C759]">
              € {jaehrlich.toLocaleString('de-AT')}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-4 text-xs text-[#86868B]">
          <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <p>
            Basierend auf Ihren Angaben — so viel zusätzlicher Umsatz ist durch
            automatisierte Beantwortung möglich.
          </p>
        </div>
      </div>
    </div>
  )
}
