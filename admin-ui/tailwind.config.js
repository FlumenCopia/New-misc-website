/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MiscArchive Dark Charcoal Brand Slate (Sidebar & Header)
        charcoal: {
          950: '#090a0b',
          900: '#111315', // Premium dark charcoal background
          850: '#16191d',
          800: '#1f2328',
          700: '#2b3138',
          600: '#3d444e',
        },
        // MiscArchive Warm Yellow / Orange Primary
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FFA000', // MiscArchive authentic warm amber/orange
          600: '#e68a00', // Hover state
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // MiscArchive Warm Neutral Canvas Background
        canvas: '#faf9f6',
        cream: {
          50: '#fdfdfc',
          100: '#faf9f6',
          200: '#f3efe6',
          300: '#e8e2d5',
        },
        // Clean Neutral Slate
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(255, 160, 0, 0.25)',
        'brand-sm': '0 2px 8px 0 rgba(255, 160, 0, 0.18)',
      },
    },
  },
  plugins: [],
}
