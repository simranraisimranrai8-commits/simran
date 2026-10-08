import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import pricingService from '../../services/pricingService'
import { useToast } from '../../components/Toast'
import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'
import Modal from '../../components/Modal'
import { PRICING_CATEGORIES } from '../../constants/statuses'
import { colors } from '../../theme/theme'

function PricingCard({ item, onSaved }) {
  const toast = useToast()
  const [val, setVal] = useState(item.amount)
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      await pricingService.update(item._id, { amount: Number(val) })
      toast.success('Pricing updated.')
      onSaved()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{item.title}</h3>
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <input type="checkbox" defaultChecked={item.enabled} onChange={async (e) => { await pricingService.update(item._id, { enabled: e.target.checked }); onSaved() }} className="h-3.5 w-3.5 accent-leaf" />Enabled
        </label>
      </div>
      <p className="mt-1 text-sm text-muted">{item.description}</p>
      <div className="mt-4 flex items-end gap-2">
        <div className="flex-1"><label className="label">Amount</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">{item.unit?.includes('%') ? '%' : '\u20B9'}</span>
            <input type="number" className="input !pl-8" value={val} onChange={(e) => setVal(e.target.value)} />
          </div>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary !py-2.5"><Save size={15} />{saving ? 'Saving' : 'Save'}</button>
      </div>
      <p className="mt-2 text-xs text-muted">{item.unit}</p>
    </motion.div>
  )
}

export default function Pricing() {
  const toast = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('All')

  const load = async () => {
    setLoading(true)
    try {
      const { items: rows } = await pricingService.list({ limit: 50 })
      setItems(rows)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])
  const filteredItems = category === 'All' ? items : items.filter((item) => item.category === category)

  const submitNew = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    try {
      await pricingService.create({ category: f.get('category'), title: f.get('title'), description: f.get('description'), amount: Number(f.get('amount')), unit: f.get('unit'), enabled: true })
      toast.success('Pricing rule added.')
      setOpen(false)
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-xl font-extrabold sm:text-2xl">Pricing</h1><p className="text-sm text-muted">Fees are stored in the database, not hard-coded in the frontend.</p></div>
        <div className="flex flex-wrap gap-2"><select className="input !w-auto" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter pricing category"><option>All</option>{PRICING_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select><button onClick={() => setOpen(true)} className="btn-primary"><Plus size={16} />Add pricing rule</button></div>
      </div>
      {loading ? <LoadingState /> : items.length === 0 ? <EmptyState title="No pricing rules yet" subtitle="Add one to get started, or run the seed script." /> : (
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]"><div className="grid gap-4 sm:grid-cols-2">{filteredItems.map((i) => <PricingCard key={i._id} item={i} onSaved={load} />)}</div><div className="card p-5"><h3 className="mb-3 font-bold">Fee comparison</h3><div className="h-64"><ResponsiveContainer><BarChart data={filteredItems} layout="vertical" margin={{ left: 8, right: 8 }}><CartesianGrid strokeDasharray="3 3" stroke={colors.border} /><XAxis type="number" tick={{ fontSize: 11 }} /><YAxis dataKey="title" type="category" width={88} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="amount" fill={colors.cyan} radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div></div></div>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title="Add pricing rule">
        <form onSubmit={submitNew} className="space-y-3">
          <div><label className="label">Category</label><select name="category" className="input">{PRICING_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className="label">Title</label><input name="title" className="input" required /></div>
          <div><label className="label">Description</label><input name="description" className="input" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Amount</label><input name="amount" type="number" className="input" required /></div>
            <div><label className="label">Unit</label><input name="unit" className="input" placeholder="per job" /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2"><button type="button" className="btn-outline" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary">Add rule</button></div>
        </form>
      </Modal>
    </div>
  )
}
