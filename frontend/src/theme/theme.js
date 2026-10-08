import { colors, chartColors } from './colors.js'

export { colors, chartColors }

export const radius = { sm: '6px', md: '10px', lg: '14px', xl: '20px', full: '9999px' }

export const spacing = { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' }

export const shadow = {
  card: '0 1px 2px rgba(16,42,67,0.06), 0 4px 16px rgba(16,42,67,0.05)',
  lift: '0 10px 30px rgba(11,58,117,0.14)',
  floating: '0 8px 24px rgba(11,58,117,0.10)',
}

export const typography = {
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  sizes: { xs: '12px', sm: '13px', base: '14px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '30px' },
}

// Light and dark theme tokens used by ThemeContext. Components read these
// through CSS variables (see index.css) rather than importing this file
// directly, so a theme switch only needs a class toggle on <html>.
export const lightTheme = {
  '--surface': colors.background,
  '--surface-card': colors.white,
  '--surface-sidebar': colors.navy,
  '--ink': colors.text,
  '--ink-muted': colors.muted,
  '--line': colors.border,
}

export const darkTheme = {
  '--surface': '#0A1930',
  '--surface-card': '#0F2545',
  '--surface-sidebar': '#081A33',
  '--ink': '#E7EEF7',
  '--ink-muted': '#9FB3CC',
  '--line': '#1E3A5F',
}
