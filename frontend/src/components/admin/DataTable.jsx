import { useState } from 'react'
import { Search, Eye, Pencil, Trash2, Ban, CheckCircle } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts'
import Pagination from '../Pagination'
import StatusBadge from '../StatusBadge'
import Modal from '../Modal'
import ConfirmDialog from '../ConfirmDialog'
import LoadingState from '../LoadingState'
import EmptyState from '../EmptyState'
import { useApiList } from '../../hooks/useApiList'
import { useToast } from '../Toast'
import { chartColors } from '../../theme/theme'

const STATUS_KEYS = ['status', 'kyc', 'plan']

const getVal = (row, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), row)
const getFacetVal = (row, key) => {
  const value = getVal(row, key)
  if (value && typeof value === 'object') return value.name || value.slug || value.city || value._id || ''
  return value
}

// A fully API-backed admin table: fetches its own page of data from
// `service`, and can view/edit/suspend-toggle/delete rows against the same
// service. Any admin list page (Users, Jobs, Orders, ...) is just this
// component configured with columns + a service.
export default function DataTable({
  title, columns, service, searchable = true, filterKey, filterOptions,
  statusField = 'status', actions = ['view', 'edit', 'delete'],
  emptyTitle = 'No records found', emptySubtitle = 'Try adjusting your search or filters.',
}) {
  const toast = useToast()
  const { items, meta, loading, error, params, setPage, setFilters, refetch } = useApiList(service, {})
  const [q, setQ] = useState('')
  const [modal, setModal] = useState(null) // { type, row }
  const [busy, setBusy] = useState(false)

  const facetKeys = ['role', 'city', 'industry', 'type', 'mode', 'plan', 'kyc', 'action']
  const facets = facetKeys.filter((key) => {
    if (key === filterKey || !items.some((row) => getFacetVal(row, key))) return false
    return new Set(items.map((row) => getFacetVal(row, key)).filter(Boolean)).size <= 8
  })
  const chartKey = filterKey || facets[0]
  const chartData = chartKey ? Object.entries(items.reduce((result, row) => {
    const value = getFacetVal(row, chartKey) || 'Unknown'
    result[value] = (result[value] || 0) + 1
    return result
  }, {})).map(([name, value]) => ({ name, value })) : []

  const submitSearch = (e) => { e.preventDefault(); setFilters({ q }) }

  const runAction = async (type, row) => {
    setBusy(true)
    try {
      if (type === 'delete') { await service.remove(row._id); toast.success(`${title.slice(0, -1) || title} deleted.`) }
      if (type === 'suspend') { await service.update(row._id, { [statusField]: row[statusField] === 'Suspended' ? 'Active' : 'Suspended' }); toast.success('Status updated.') }
      setModal(null)
      refetch()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData.entries())
    try {
      await service.update(modal.row._id, payload)
      toast.success('Changes saved.')
      setModal(null)
      refetch()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold sm:text-2xl">{title}</h1>
        <p className="text-sm text-muted"><b className="text-ink">{meta.total}</b> total</p>
      </div>
      <div className="card mb-4 flex flex-wrap items-center gap-3 p-3">
        {searchable && (
          <form onSubmit={submitSearch} className="relative min-w-[200px] flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input className="input !pl-9" placeholder={`Search ${title.toLowerCase()}...`} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          </form>
        )}
        {filterOptions && (
          <select className="input !w-auto" value={params[filterKey] || ''} onChange={(e) => setFilters({ [filterKey]: e.target.value || undefined })} aria-label="Filter by status">
            <option value="">All statuses</option>
            {filterOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        )}
        {facets.map((key) => {
          const options = [...new Set(items.map((row) => getFacetVal(row, key)).filter(Boolean))]
          return <select key={key} className="input !w-auto" value={params[key] || ''} onChange={(e) => setFilters({ [key]: e.target.value || undefined })} aria-label={`Filter by ${key}`}>
            <option value="">All {key}s</option>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        })}
      </div>

      {chartData.length > 0 && (
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(220px,0.8fr)_minmax(280px,1.2fr)]">
          <div className="card flex min-h-[210px] items-center justify-center p-4">
            <div className="h-48 w-full"><ResponsiveContainer><PieChart><Pie data={chartData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3}>{chartData.map((item, index) => <Cell key={item.name} fill={chartColors[index % chartColors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
            <div className="hidden min-w-[110px] space-y-2 text-xs sm:block">{chartData.slice(0, 5).map((item, index) => <div key={item.name} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />{item.name}<b className="ml-auto">{item.value}</b></div>)}</div>
          </div>
          <div className="card p-4"><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-bold capitalize">{chartKey} distribution</h2><span className="text-xs text-muted">Loaded records</span></div><div className="h-44 w-full"><ResponsiveContainer><BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 10 }}><XAxis type="number" hide /><YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill={chartColors[1]} radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div></div>
        </div>
      )}

      <div className="card overflow-x-auto">
        {loading ? <LoadingState /> : error ? (
          <div className="p-6"><EmptyState title="Could not load data" subtitle={error} /></div>
        ) : items.length === 0 ? (
          <EmptyState title={emptyTitle} subtitle={emptySubtitle} />
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-line bg-surface/60 text-xs uppercase tracking-wide text-muted">
              <tr>{columns.map((c) => <th key={c.key} className="whitespace-nowrap px-4 py-3 font-semibold">{c.label}</th>)}<th className="px-4 py-3 font-semibold">Actions</th></tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r._id} className="border-b border-line last:border-0 hover:bg-surface/40">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-4 py-3">
                      {STATUS_KEYS.includes(c.key) ? <StatusBadge value={getVal(r, c.key)} /> : c.render ? c.render(r) : String(getVal(r, c.key) ?? '\u2014')}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-1">
                      {actions.includes('view') && <button onClick={() => setModal({ type: 'view', row: r })} className="rounded-lg p-1.5 text-muted hover:bg-surface hover:text-brand" aria-label="View"><Eye size={15} /></button>}
                      {actions.includes('edit') && <button onClick={() => setModal({ type: 'edit', row: r })} className="rounded-lg p-1.5 text-muted hover:bg-surface hover:text-brand" aria-label="Edit"><Pencil size={15} /></button>}
                      {actions.includes('suspend') && <button onClick={() => runAction('suspend', r)} className="rounded-lg p-1.5 text-muted hover:bg-surface hover:text-amber-600" aria-label="Toggle suspend">{r[statusField] === 'Suspended' ? <CheckCircle size={15} /> : <Ban size={15} />}</button>}
                      {actions.includes('delete') && <button onClick={() => setModal({ type: 'delete', row: r })} className="rounded-lg p-1.5 text-muted hover:bg-surface hover:text-red-600" aria-label="Delete"><Trash2 size={15} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!loading && !error && items.length > 0 && <Pagination page={meta.page} pages={meta.pages} onChange={setPage} />}

      <Modal open={modal?.type === 'view'} onClose={() => setModal(null)} title="Record details" footer={<button className="btn-primary" onClick={() => setModal(null)}>Close</button>}>
        {modal?.type === 'view' && (
          <dl className="space-y-2 text-sm">
            {columns.map((c) => (
              <div key={c.key} className="flex justify-between gap-4 border-b border-line py-1.5 last:border-0">
                <dt className="text-muted">{c.label}</dt><dd className="font-medium">{String(getVal(modal.row, c.key) ?? '\u2014')}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

      <Modal open={modal?.type === 'edit'} onClose={() => setModal(null)} title="Edit record">
        {modal?.type === 'edit' && (
          <form onSubmit={submitEdit} className="space-y-3">
            {columns.filter((c) => c.editable !== false && !STATUS_KEYS.includes(c.key)).slice(0, 5).map((c) => (
              <div key={c.key}><label className="label">{c.label}</label><input name={c.key} className="input" defaultValue={String(getVal(modal.row, c.key) ?? '')} /></div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-outline" onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmDialog open={modal?.type === 'delete'} onClose={() => setModal(null)} onConfirm={() => runAction('delete', modal.row)}
        title="Delete record" description="This action cannot be undone. Are you sure you want to delete this record?" confirmLabel="Delete" danger loading={busy} />
    </div>
  )
}
