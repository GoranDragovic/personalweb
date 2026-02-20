'use client'

import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'

export default function RoiCalculator() {
  const [anfragen, setAnfragen] = useState(10)
  const [abschlussrate, setAbschlussrate] = useState(30)
  const [warenkorb, setWarenkorb] = useState(60)

  const monatlich = Math.round(anfragen * (abschlussrate / 100) * warenkorb * 30)
  const jaehrlich = monatlich * 12

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">ROI-Rechner</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="anfragen"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Anfragen pro Tag
          </label>
          <input
            id="anfragen"
            type="range"
            min={1}
            max={50}
            value={anfragen}
            onChange={(e) => setAnfragen(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>1</span>
            <span className="font-semibold text-blue-600 text-lg">{anfragen}</span>
            <span>50</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="abschlussrate"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
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
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>5 %</span>
            <span className="font-semibold text-blue-600 text-lg">
              {abschlussrate} %
            </span>
            <span>80 %</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="warenkorb"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
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
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>€ 10</span>
            <span className="font-semibold text-blue-600 text-lg">
              € {warenkorb}
            </span>
            <span>€ 500</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600 mb-1">Potenzial pro Monat</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              € {monatlich.toLocaleString('de-AT')}
            </p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 text-center">
            <p className="text-sm text-slate-600 mb-1">Potenzial pro Jahr</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
              € {jaehrlich.toLocaleString('de-AT')}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-4 text-sm text-slate-500">
          <TrendingUp className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Basierend auf Ihren Angaben – so viel zusätzlicher Umsatz ist durch
            automatisierte Beantwortung Ihrer Anfragen möglich.
          </p>
        </div>
      </div>
    </div>
  )
}
