import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#FFFFFF',
          'bg-s': '#F5F5F7',
          'bg-t': '#FAFAFA',
          text: '#1D1D1F',
          'text-s': '#6E6E73',
          'text-t': '#86868B',
          blue: '#0071E3',
          'blue-h': '#0077ED',
          'blue-l': 'rgba(0,113,227,0.08)',
          border: '#D2D2D7',
          'border-l': '#E8E8ED',
          green: '#34C759',
          'green-l': 'rgba(52,199,89,0.1)',
          orange: '#FF9F0A',
          'orange-l': 'rgba(255,159,10,0.1)',
          red: '#FF3B30',
          'red-l': 'rgba(255,59,48,0.08)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        apple: '980px',
        'apple-w': '1120px',
      },
      boxShadow: {
        'apple-s': '0 1px 3px rgba(0,0,0,0.06)',
        apple: '0 4px 14px rgba(0,0,0,0.06)',
        'apple-l': '0 8px 30px rgba(0,0,0,0.1)',
        'apple-xl': '0 20px 60px rgba(0,0,0,0.12)',
      },
      letterSpacing: {
        'tight-apple': '-0.015em',
        'snug-apple': '-0.01em',
      },
      animation: {
        'typing-1': 'typing-bounce 1.4s ease-in-out infinite',
        'typing-2': 'typing-bounce 1.4s ease-in-out 0.15s infinite',
        'typing-3': 'typing-bounce 1.4s ease-in-out 0.3s infinite',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.4,0,0,1) forwards',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
