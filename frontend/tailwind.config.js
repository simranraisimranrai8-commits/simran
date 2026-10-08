import { colors } from './src/theme/colors.js'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        brand: colors.blue,
        leaf: colors.green,
        cyan: { DEFAULT: colors.cyan },
        // Theme-aware tokens: these read CSS variables that flip in
        // index.css under html.dark, so `bg-surface` etc. work in both themes.
        surface: 'var(--surface)',
        card: 'var(--surface-card)',
        ink: 'var(--ink)',
        muted: 'var(--ink-muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,42,67,0.06), 0 4px 16px rgba(16,42,67,0.05)',
        lift: '0 10px 30px rgba(11,58,117,0.14)',
        floating: '0 8px 24px rgba(11,58,117,0.10)',
      },
    },
  },
  plugins: [],
}
