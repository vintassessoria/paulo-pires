/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base — preto profundo (estilo bold), leve calor nas sombras
        ink: '#0A0908',
        coal: '#121010',
        graphite: '#191615',
        ash: '#221D1B',
        smoke: '#2C2623',
        // Acento — ÂMBAR-BRASA / TANGERINA (identidade bold 2026).
        // Mantém o nome `gold` por compatibilidade com o site inteiro;
        // o valor agora é brasa. Luz de palco, energia.
        gold: {
          light: '#FF7A48',
          DEFAULT: '#FF5A1F',
          deep: '#B23A12',
        },
        amber: '#FF5A1F',
        ember: '#FF7A48',
        // Wordmark: no bold o nome é osso quente (não mais dourado)
        wm: {
          light: '#F6F0E4',
          DEFAULT: '#F2ECE0',
          deep: '#CBB89E',
        },
        clay: '#B23A12',
        cream: '#F4EEE3',
        muted: '#98918A',
        // Brasa de apoio (washes e destaques quentes)
        warm: {
          100: '#FCE7D6',
          300: '#FF9A6B',
          500: '#FF5A1F',
          700: '#B23A12',
          900: '#2A1509',
        },
      },
      fontFamily: {
        // Anton = títulos gigantes de pôster (maiúsculas, condensada, pesada)
        display: ['Anton', 'Arial Narrow', 'sans-serif'],
        // Archivo Expanded para subtítulos/rótulos com presença
        heading: ['"Archivo Expanded"', 'Archivo', 'sans-serif'],
        // Archivo grotesca limpa no corpo/UI
        sans: ['Archivo', 'system-ui', 'sans-serif'],
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
        'gold-grad': 'linear-gradient(180deg, #FF7A48, #FF5A1F)',
        'wordmark-grad':
          'linear-gradient(180deg, #F6F0E4 0%, #E7DECB 55%, #CBB89E 100%)',
        'stage-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(255,90,31,0.16) 0%, rgba(10,9,8,0) 70%)',
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
