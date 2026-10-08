import { Loader2 } from 'lucide-react'
export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted">
      <Loader2 size={18} className="animate-spin" />{label}
    </div>
  )
}
