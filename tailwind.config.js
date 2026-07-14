/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base — preto quente (com fundo de vinho nas sombras)
        ink: '#100B0A',
        coal: '#17100E',
        graphite: '#1C1512',
        ash: '#241A16',
        smoke: '#31241E',
        // Acento — vinho / oxblood (usado com expressão)
        gold: {
          light: '#D6836A',
          DEFAULT: '#A8423C',
          deep: '#5E2622',
        },
        amber: '#C2663F',
        ember: '#B5623F',
        // Apoio — terracota / barro quente
        clay: '#7A3B28',
        cream: '#F1E7D8',
        muted: '#A99A88',
        // Terracota (washes quentes e destaques)
        warm: {
          100: '#F0D9C4',
          300: '#D79B72',
          500: '#B5623F',
          700: '#7A3B28',
          900: '#2A1613',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        heading: ['Outfit', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        gold: '0 20px 50px -24px rgba(0,0,0,0.85)',
        glow: '0 24px 60px -28px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'gold-grad': 'linear-gradient(180deg, #D6836A, #A8423C)',
        'stage-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(168,66,60,0.14) 0%, rgba(16,11,10,0) 70%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '60%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        equalize: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '100%': { transform: 'translateX(230%) skewX(-18deg)' },
        },
        drift1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(16%, 12%) scale(1.18)' },
        },
        drift2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
          '50%': { transform: 'translate(-14%, -10%) scale(1)' },
        },
        drift3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(10%, -14%) scale(1.22)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(-6%) scaleY(1)' },
          '50%': { transform: 'translateX(6%) scaleY(1.3)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        glowPulse: 'glowPulse 5s ease-in-out infinite',
        scrollDot: 'scrollDot 1.8s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
        equalize: 'equalize 0.9s ease-in-out infinite',
        sheen: 'sheen 3.5s ease-in-out infinite',
        drift1: 'drift1 19s ease-in-out infinite',
        drift2: 'drift2 24s ease-in-out infinite',
        drift3: 'drift3 28s ease-in-out infinite',
        wave: 'wave 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
