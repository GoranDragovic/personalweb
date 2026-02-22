'use client'

import {
  Calendar,
  Bell,
  Users,
  BarChart3,
  TrendingUp,
  Clock,
  RefreshCw,
  CheckCircle,
} from 'lucide-react'

const bookings = [
  { time: '09:00', name: 'M. Steiner', type: 'Haarschnitt', status: 'confirmed' },
  { time: '10:30', name: 'K. Berger', type: 'Färben + Schnitt', status: 'confirmed' },
  { time: '12:00', name: 'A. Novak', type: 'Bartpflege', status: 'pending' },
  { time: '14:00', name: 'L. Wagner', type: 'Haarschnitt', status: 'confirmed' },
  { time: '15:30', name: 'S. Huber', type: 'Balayage', status: 'confirmed' },
  { time: '17:00', name: 'J. Müller', type: 'Beratung', status: 'pending' },
]

const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const calendarSlots = [
  [3, 2, 4, 3, 5, 2],
  [2, 4, 3, 5, 2, 1],
  [4, 3, 5, 2, 4, 3],
  [3, 5, 2, 4, 3, 0],
]

export default function DashboardMockup() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#E8E8ED] overflow-hidden max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="bg-[#1D1D1F] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#0071E3] rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-bold">CA</span>
            </div>
            <span className="font-medium text-xs">ChatAuto Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-3.5 h-3.5 text-[#86868B]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF3B30] rounded-full border border-[#1D1D1F]" />
            </div>
            <div className="w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center text-[9px] font-bold">
              SH
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left sidebar */}
          <div className="lg:w-56 border-b lg:border-b-0 lg:border-r border-[#E8E8ED] bg-[#FAFAFA] p-3 space-y-3">
            <div className="bg-white rounded-xl p-3 border border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-3.5 h-3.5 text-[#0071E3]" />
                <span className="text-[10px] font-medium text-[#86868B]">Diese Woche</span>
              </div>
              <p className="text-xl font-bold text-[#1D1D1F]">47</p>
              <p className="text-[10px] text-[#86868B]">Buchungen</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-2.5 h-2.5 text-[#34C759]" />
                <span className="text-[10px] text-[#34C759] font-medium">+12%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#34C759]" />
                <span className="text-[10px] font-medium text-[#86868B]">Umsatz</span>
              </div>
              <p className="text-xl font-bold text-[#1D1D1F]">&euro; 8.420</p>
              <div className="w-full bg-[#E8E8ED] rounded-full h-1 mt-2">
                <div className="bg-[#34C759] h-1 rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-[10px] text-[#86868B] mt-1">78% vom Ziel</p>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-3.5 h-3.5 text-[#0071E3]" />
                <span className="text-[10px] font-medium text-[#86868B]">No-Show</span>
              </div>
              <p className="text-xl font-bold text-[#1D1D1F]">4,2%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-2.5 h-2.5 text-[#34C759] rotate-180" />
                <span className="text-[10px] text-[#34C759] font-medium">-8%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#E8E8ED]">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-3.5 h-3.5 text-[#FF9F0A]" />
                <span className="text-[10px] font-medium text-[#86868B]">Offen</span>
              </div>
              <p className="text-xl font-bold text-[#1D1D1F]">3</p>
              <p className="text-[10px] text-[#FF9F0A]">warten auf Bestätigung</p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#1D1D1F] text-sm">Terminkalender</h3>
                <p className="text-[10px] text-[#86868B]">KW 8 &middot; Februar 2026</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[10px] bg-[rgba(0,113,227,0.08)] text-[#0071E3] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <RefreshCw className="w-2.5 h-2.5" />
                  Sync
                </button>
                <div className="flex items-center gap-1 text-[10px] text-[#86868B]">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[rgba(0,113,227,0.08)]" /> Google
                  <div className="w-2.5 h-2.5 rounded-sm bg-[rgba(113,0,227,0.08)] ml-1" /> Outlook
                </div>
              </div>
            </div>

            {/* Mini week calendar */}
            <div className="grid grid-cols-6 gap-1 mb-5">
              {weekDays.map((day, di) => (
                <div key={day}>
                  <div className="text-center text-[10px] font-medium text-[#86868B] mb-1">{day}</div>
                  {calendarSlots.map((row, ri) => (
                    <div
                      key={ri}
                      className={`h-4 rounded mb-0.5 ${
                        row[di] === 0
                          ? 'bg-[#FAFAFA]'
                          : row[di] >= 4
                          ? 'bg-[rgba(0,113,227,0.15)]'
                          : row[di] >= 2
                          ? 'bg-[rgba(0,113,227,0.08)]'
                          : 'bg-[rgba(0,113,227,0.04)]'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Today's bookings */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-[#1D1D1F] text-xs flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#0071E3]" />
                Heute &middot; 6 Termine
              </h4>
              <span className="text-[10px] text-[#86868B]">Dienstag, 17. Feb</span>
            </div>

            <div className="space-y-1.5">
              {bookings.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#FAFAFA] rounded-xl px-3 py-2 border border-[#E8E8ED]"
                >
                  <div className="text-[10px] font-mono text-[#86868B] w-8">{b.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1D1D1F] truncate">{b.name}</p>
                    <p className="text-[10px] text-[#86868B]">{b.type}</p>
                  </div>
                  {b.status === 'confirmed' ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#34C759] bg-[rgba(52,199,89,0.1)] px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Bestätigt
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-[#FF9F0A] bg-[rgba(255,159,10,0.1)] px-2 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      Offen
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Notification */}
            <div className="mt-4 bg-[rgba(0,113,227,0.08)] border border-[rgba(0,113,227,0.15)] rounded-xl px-3 py-2.5 flex items-start gap-2">
              <Bell className="w-3.5 h-3.5 text-[#0071E3] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-[#1D1D1F]">Neue Buchung</p>
                <p className="text-[10px] text-[#6E6E73]">
                  E. Kovacs — Freitag 11:00 (via WhatsApp)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
