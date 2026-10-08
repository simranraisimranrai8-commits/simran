import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  const nums = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
      <button className="btn-outline !px-2.5" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>
      {nums.map((n) => (
        <button key={n} onClick={() => onChange(n)} aria-current={n === page ? 'page' : undefined}
          className={`h-10 w-10 rounded-lg text-sm font-semibold ${n === page ? 'bg-brand text-white' : 'border border-line bg-white hover:border-brand'}`}>
          {n}
        </button>
      ))}
      <button className="btn-outline !px-2.5" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Next page">
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}
