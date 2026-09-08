/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vyra: {
          bg: '#0A0D14',
          surface: '#121723',
          card: '#181F2F',
          cardHover: '#1F293D',
          border: '#232D42',
          borderHighlight: '#3B82F6',
          primary: '#00F0FF',
          accent: '#7928CA',
          warning: '#F59E0B',
          success: '#10B981',
          danger: '#EF4444',
          textMuted: '#94A3B8',
          textMain: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -5px rgba(0, 240, 255, 0.3)',
        'glow-purple': '0 0 20px -5px rgba(121, 40, 202, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
