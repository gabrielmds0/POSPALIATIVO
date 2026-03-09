/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cor de destaque azul (substitui o vermelho/coral original)
        accent: {
          DEFAULT: '#2e52eb',
          dark: '#1a3cb8',
          mid: '#5b7cf0',
          light: '#8da3f5',
          ghost: '#c4d0fa',
        },
        // Fundos dark
        surface: {
          DEFAULT: '#000000',
          1: '#040404',
          2: '#050505',
          slate: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(36px,6vw,60px)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        section: ['clamp(28px,4vw,36px)', { lineHeight: '1.11' }],
        price: ['48px', { lineHeight: '1' }],
        label: ['12px', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
      boxShadow: {
        'card-hover': '0 0 30px rgba(46, 82, 235, 0.15)',
        btn: '0 4px 20px rgba(46, 82, 235, 0.3)',
        'btn-hover': '0 6px 30px rgba(46, 82, 235, 0.5)',
      },
      backgroundImage: {
        'radial-accent':
          'radial-gradient(ellipse at center, rgba(46, 82, 235, 0.08) 0%, transparent 70%)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.6)', opacity: '0.4' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
