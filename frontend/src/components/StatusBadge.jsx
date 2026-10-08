const tone = {
  green: ['Active', 'ACTIVE', 'Verified', 'COMPLETED', 'PAID', 'SENT', 'SELECTED', 'ACCEPTED', 'Success'],
  blue: ['REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'APPLIED', 'ON_THE_WAY', 'STARTED', 'SCHEDULED', 'REQUESTED', 'Growth', 'Pro'],
  amber: ['Pending', 'PENDING', 'PAUSED', 'DRAFT', 'Not submitted', 'Starter'],
  red: ['Suspended', 'REJECTED', 'WITHDRAWN', 'CANCELLED', 'FAILED', 'REFUNDED', 'EXPIRED', 'CLOSED', 'FLAGGED'],
}
const cls = {
  green: 'bg-leaf/10 text-leaf',
  blue: 'bg-brand/10 text-brand',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-line text-muted',
}
export default function StatusBadge({ value }) {
  const key = Object.keys(tone).find((k) => tone[k].includes(value)) || 'gray'
  return <span className={`chip ${cls[key]}`}>{String(value ?? '\u2014')}</span>
}
