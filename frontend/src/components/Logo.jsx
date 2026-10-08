import { Link } from 'react-router-dom'
import { colors } from '../theme/theme'

export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lj-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.cyan} />
          <stop offset="1" stopColor={colors.blue} />
        </linearGradient>
        <linearGradient id="lj-arrow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={colors.blue} />
          <stop offset="1" stopColor={colors.green} />
        </linearGradient>
      </defs>
      <path d="M32 61C32 61 7 39 7 24.5a25 25 0 1 1 50 0C57 39 32 61 32 61Z" fill="url(#lj-pin)" />
      <circle cx="32" cy="25" r="14" fill="#fff" />
      <path d="M24 32l15-13m0 0h-9m9 0v9" stroke="url(#lj-arrow)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Logo({ to = '/', light = false, showTag = true }) {
  return (
    <Link to={to} className="flex items-center gap-2.5" aria-label="LOJOPO home">
      <LogoMark />
      <span className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight">
          <span style={{ color: light ? colors.white : colors.navy }}>LO</span>
          <span style={{ color: colors.green }}>JO</span>
          <span style={{ color: light ? colors.white : colors.navy }}>PO</span>
        </span>
        {showTag && (
          <span className={`mt-0.5 block text-[11px] font-medium ${light ? 'text-white/70' : 'text-muted'}`}>Local Job Portal</span>
        )}
      </span>
    </Link>
  )
}
