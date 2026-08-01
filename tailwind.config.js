/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // TEMA CLARO (padrão sertanejo: Murilo Huff / Gusttavo Lima).
        paper: '#FFFFFF', // fundo principal
        bone: '#F5F3F0', // off-white p/ seções alternadas
        // `ink`/`coal` seguem escuros: usados no TEXTO e nas seções de foto
        // (hero, rodapé) com overlay escuro e texto claro.
        ink: '#151311',
        coal: '#0E0D0C',
        graphite: '#262320',
        ash: '#E9E6E1', // cinza claro (bordas/cards no claro)
        smoke: '#D8D3CC',
        // Acento VERMELHO (marca do Paulo, alinhado ao vermelho-laranja do
        // Murilo). Mantém o nome `gold` por compatibilidade com o código.
        gold: {
          light: '#FF3B2A',
          DEFAULT: '#E5102E',
          deep: '#B00C22',
        },
        amber: '#F5330C',
        ember: '#FF3B2A',
        // Wordmark: agora escuro (nome preto sobre claro)
        wm: {
          light: '#151311',
          DEFAULT: '#151311',
          deep: '#151311',
        },
        clay: '#B00C22',
        // `cream` = claro, p/ texto sobre seções de FOTO/escuras
        cream: '#F7F5F2',
        // `muted` = cinza médio, legível sobre claro
        muted: '#6C655E',
        warm: {
          100: '#FBE1DC',
          300: '#F5330C',
          500: '#E5102E',
          700: '#B00C22',
          900: '#3A0A0E',
        },
      },
      fontFamily: {
        // Archivo Expanded = títulos bold e largos (estilo Acumin Pro Wide,
        // do site do Murilo Huff). Archivo p/ subtítulos, Inter p/ corpo.
        display: ['"Archivo Expanded"', 'Archivo', 'system-ui', 'sans-serif'],
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
        'gold-grad': 'linear-gradient(180deg, #FF3B2A, #E5102E)',
        'wordmark-grad': 'linear-gradient(180deg, #151311, #151311)',
        'stage-radial':
          'radial-gradient(60% 50% at 50% 0%, rgba(229,16,46,0.10) 0%, rgba(255,255,255,0) 70%)',
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
