import { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import ChartCard from '../../components/admin/ChartCard'
import LoadingState from '../../components/LoadingState'
import { colors } from '../../theme/theme'
import reportService from '../../services/reportService'
import { useToast } from '../../components/Toast'

const ranges = [['Today', 'today'], ['7 Days', '7d'], ['30 Days', '30d'], ['This Year', 'year']]

export default function Reports() {
  const toast = useToast()
  const [range, setRange] = useState('30d')
  const [trend, setTrend] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    reportService.trend(range).then((d) => { if (!cancelled) setTrend(d) }).catch((e) => toast.error(e.message)).finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [range])

  const bars = trend ? [
    { name: 'Users', value: trend.users }, { name: 'Jobs', value: trend.jobs },
    { name: 'Applications', value: trend.applications }, { name: 'Orders', value: trend.orders },
  ] : []

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-xl font-extrabold sm:text-2xl">Reports</h1><p className="text-sm text-muted">Live counts pulled from the database for the selected range.</p></div>
        <div className="flex gap-1 rounded-lg border border-line bg-white p-1">
          {ranges.map(([label, key]) => <button key={key} onClick={() => setRange(key)} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${range === key ? 'bg-navy text-white' : 'text-muted'}`}>{label}</button>)}
        </div>
      </div>
      {loading ? <LoadingState /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Activity in range">
            <ResponsiveContainer><BarChart data={bars}><CartesianGrid strokeDasharray="3 3" stroke={colors.border} /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="value" fill={colors.blue} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Revenue in range">
            <ResponsiveContainer><LineChart data={[{ name: 'Revenue', value: trend?.revenue || 0 }]}><CartesianGrid strokeDasharray="3 3" stroke={colors.border} /><XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip formatter={(v) => `\u20B9${v.toLocaleString('en-IN')}`} /><Line type="monotone" dataKey="value" stroke={colors.navy} strokeWidth={2.5} dot={{ r: 5 }} /></LineChart></ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  )
}
