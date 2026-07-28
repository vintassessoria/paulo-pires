/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base — preto profundo com leve calor de vermelho nas sombras
        ink: '#0B0809',
        coal: '#131011',
        graphite: '#1A1517',
        ash: '#221A1C',
        smoke: '#2E2224',
        // Acento — VERMELHO VIVO (identidade do mídia kit 2026).
        // Mantém o nome `gold` por compatibilidade com o site inteiro; o
        // valor agora é vermelho. O dourado real vive só em `.wordmark-gold`
        // e no token `wm` abaixo, reservado ao nome/logo do artista.
        gold: {
          light: '#FF3D4E',
          DEFAULT: '#E5102E',
          deep: '#7A0E1C',
        },
        amber: '#F5233B',
        ember: '#F5233B',
        // Dourado do wordmark (SÓ para o nome/logo do Paulo Pires)
        wm: {
          light: '#F7DCA0',
          DEFAULT: '#E3AE63',
          deep: '#C6923F',
        },
        clay: '#8E1420',
        cream: '#F1E7D8',
        muted: '#A2938C',
        // Vermelho de apoio (washes e destaques quentes)
        warm: {
          100: '#FBE0E4',
          300: '#F26A7A',
          500: '#E5102E',
          700: '#8E1420',
          900: '#2A0C0E',
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
        'gold-grad': 'linear-gradient(180deg, #FF3D4E, #E5102E)',
        'wordmark-grad':
          'linear-gradient(180deg, #F7DCA0 0%, #E3AE63 45%, #C6923F 100%)',
        'stage-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(229,16,46,0.16) 0%, rgba(11,8,9,0) 70%)',
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
