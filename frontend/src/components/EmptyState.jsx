import { Inbox } from 'lucide-react'
export default function EmptyState({ title = 'Nothing here yet', subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <Inbox size={28} className="text-muted" />
      <p className="font-semibold">{title}</p>
      {subtitle && <p className="max-w-sm text-sm text-muted">{subtitle}</p>}
    </div>
  )
}
