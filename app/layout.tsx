import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title:
    'Chat-Automatisierung für Ihr Geschäft | Mehr Buchungen, weniger Telefonstress',
  description:
    'Automatisieren Sie Anfragen, Reservierungen und Terminbuchungen mit intelligentem Chat. DSGVO-konform, Setup in 7 Tagen. Für Restaurants, Friseure und Handwerker in Österreich.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de-AT">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
