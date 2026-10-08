/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        // Soft pastel palette
        cream: '#FAF8F4',
        blush: '#F5EEF8',
        mist: '#EBF4FB',
        mint: '#EAF6F2',
        peach: '#FEF3ED',
        lavender: {
          50: '#F5F0FF',
          100: '#EDE5FF',
          200: '#D9CBFF',
          300: '#BEA7FF',
          400: '#9E7FFA',
          500: '#7C5CBF',
          600: '#6644A8',
        },
        sky: {
          50: '#EBF4FB',
          100: '#D4E9F7',
          200: '#A9D4EF',
          300: '#72B9E4',
          400: '#3D9DD8',
          500: '#1A7FC1',
          600: '#1465A0',
        },
        sage: {
          50: '#EAF6F2',
          100: '#C8EAE0',
          200: '#95D5C4',
          300: '#5CBAA9',
          400: '#2E9E8D',
          500: '#1A8070',
          600: '#12655A',
        },
        coral: {
          50: '#FEF3ED',
          100: '#FCE0CF',
          200: '#F9BDA0',
          300: '#F49571',
          400: '#EE6E42',
          500: '#D95224',
          600: '#B5401A',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.12)',
        'glow-lavender': '0 0 40px rgba(158, 127, 250, 0.25)',
        'glow-sky': '0 0 40px rgba(61, 157, 216, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}














