/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Flat Able Deep Navy Slate (Navbar & Sidebar)
        flatnavy: {
          950: '#121824',
          900: '#1b2434', // Signature Flat Able dark navy background
          850: '#202b3e',
          800: '#26344b',
          700: '#334464',
          600: '#425780',
        },
        // Flat Able Signature Sea-Green / Emerald-Teal
        brand: {
          50: '#e8f8f5',
          100: '#d1f2eb',
          200: '#a3e4d7',
          300: '#76d7c4',
          400: '#48c9b0',
          500: '#1abc9c', // Primary Flat Able signature teal
          600: '#16a085', // Hover state
          700: '#117a65',
          800: '#0e6655',
          900: '#0b5345',
        },
        // Flat Able Coral Red Accent
        coral: {
          50: '#fff1f1',
          100: '#ffe1e1',
          500: '#ff5252',
          600: '#e04545',
        },
        // Clean Canvas Background
        canvas: '#f4f7f6',
        // Restored Standard Clean Slate
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
        'brand': '0 4px 14px 0 rgba(26, 188, 156, 0.35)',
        'brand-sm': '0 2px 8px 0 rgba(26, 188, 156, 0.25)',
      },
    },
  },
  plugins: [],
}
