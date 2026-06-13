/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',          // signature gold (matches logo)
        'primary-dark': '#A67C1A',   // deep antique gold
        'primary-light': '#F4D77E',  // champagne highlight
        accent: '#C8CDD6',           // platinum — bi-metal contrast
        'accent-dark': '#8A9099',
        background: '#070707',       // near-black
        surface: '#0E0E10',          // charcoal panel
        'surface-2': '#15151A',      // raised panel
        ink: '#F5F2EA',              // warm off-white
        muted: '#8C887E',            // muted text
        divider: '#1E1C18',          // hairline
        deep: '#030303',             // deepest black
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
        'marquee-rev': 'marquee-rev 38s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spotlight': 'spotlight 2s ease 0.2s 1 forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
