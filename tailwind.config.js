/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial light system — warm paper, near-black ink, electric cobalt
        primary: '#1B33E0',          // electric cobalt (the one bold accent)
        'primary-dark': '#1124A8',   // deep ink-blue
        'primary-light': '#5E73FF',  // bright cobalt highlight
        accent: '#E8740C',           // warm amber — used sparingly for "free"
        background: '#F2EDE3',        // warm bone paper
        surface: '#EBE4D6',           // panel
        'surface-2': '#E3DBCB',       // raised panel
        deep: '#ECE5D7',              // gentle section alternation
        ink: '#17150F',               // near-black warm
        'ink-soft': '#3B372E',        // strong secondary ink
        muted: '#6E685B',             // muted text on paper
        divider: '#D9D1C0',           // hairline
        night: '#14130E',             // dramatic dark band
        'night-2': '#1E1C15',         // raised dark panel
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 5s linear infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
