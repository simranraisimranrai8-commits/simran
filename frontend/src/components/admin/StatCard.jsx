import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function StatCard({ label, value, delta, icon: Icon, index = 0 }) {
  const positive = delta >= 0
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="card p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand"><Icon size={19} /></span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? 'text-leaf' : 'text-red-600'}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(delta)}%
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-navy">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </motion.div>
  )
}
