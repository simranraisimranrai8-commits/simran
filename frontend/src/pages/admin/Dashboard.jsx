import { useEffect, useState } from 'react'
import { Users, Building2, UserCog, Briefcase, FileText, ShoppingCart, IndianRupee } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import StatCard from '../../components/admin/StatCard'
import StatusBadge from '../../components/StatusBadge'
import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'
import reportService from '../../services/reportService'
import { useToast } from '../../components/Toast'
import { chartColors } from '../../theme/theme'

export default function Dashboard() {
  const toast = useToast()
  const [summary, setSummary] = useState(null)
  const [recent, setRecent] = useState(null)
  const [demand, setDemand] = useState(null)
  const [range, setRange] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([reportService.summary(), reportService.recent(), reportService.demand(range)])
      .then(([s, r, d]) => { setSummary(s); setRecent(r); setDemand(d) })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [range])

  if (loading) return <LoadingState label="Loading dashboard..." />
  if (!summary) return <EmptyState title="Could not load the dashboard" subtitle="Check that the backend and MongoDB are running." />

  const stats = [
    ['Total Users', summary.totalUsers, Users], ['Job Seekers', summary.jobSeekers, Users], ['Employers', summary.employers, Building2],
    ['Providers', summary.providers, UserCog], ['Active Jobs', summary.activeJobs, Briefcase], ['Applications', summary.applications, FileText],
    ['Service Orders', summary.orders, ShoppingCart], ['Revenue (\u20B9)', summary.revenue.toLocaleString('en-IN'), IndianRupee],
  ]
  const activity = [
    { name: 'Users', value: summary.totalUsers }, { name: 'Jobs', value: summary.activeJobs },
    { name: 'Applications', value: summary.applications }, { name: 'Orders', value: summary.orders },
  ]
  const statusMix = Object.entries(recent.recentApplications.reduce((result, item) => { result[item.status] = (result[item.status] || 0) + 1; return result }, {})).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-xl font-extrabold sm:text-2xl">Dashboard</h1><p className="text-sm text-muted">Live platform overview for LOJOPO.</p></div><select className="input !w-auto" value={range} onChange={(event) => setRange(event.target.value)} aria-label="Dashboard date range"><option value="today">Today</option><option value="7d">7 Days</option><option value="30d">30 Days</option><option value="year">This Year</option></select></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {stats.map(([label, value, icon], i) => <StatCard key={label} label={label} value={value} delta={0} icon={icon} index={i} />)}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5"><h3 className="mb-3 font-bold">Platform activity</h3><div className="h-56"><ResponsiveContainer><BarChart data={activity}><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill={chartColors[0]} radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
        <div className="card p-5"><h3 className="mb-3 font-bold">Application status mix</h3><div className="h-56"><ResponsiveContainer><PieChart><Pie data={statusMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>{statusMix.map((item, index) => <Cell key={item.name} fill={chartColors[index % chartColors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></div>
      </div>
      {demand && <div className="grid gap-4 lg:grid-cols-2">
        <div className="card overflow-hidden bg-gradient-to-br from-white via-blue-50 to-brand/10 p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><h3 className="font-bold">Jobs in demand</h3><p className="text-sm text-muted">Most requested job categories.</p></div><span className="chip bg-white/80 text-brand">Jobs</span></div>
          <div className="h-72"><ResponsiveContainer><LineChart data={demand.categories.filter((item) => item.jobs > 0)} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}><CartesianGrid strokeDasharray="3 3" stroke="#DCE7F2" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="jobs" name="Jobs" stroke={chartColors[0]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div>
        </div>
        <div className="card overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-cyan/10 p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><h3 className="font-bold">Services in demand</h3><p className="text-sm text-muted">Most requested service categories.</p></div><span className="chip bg-white/80 text-leaf">Services</span></div>
          <div className="h-72"><ResponsiveContainer><LineChart data={demand.categories.filter((item) => item.services > 0)} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}><CartesianGrid strokeDasharray="3 3" stroke="#DCE7F2" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="services" name="Services" stroke={chartColors[1]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} /></LineChart></ResponsiveContainer></div>
        </div>
      </div>}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="mb-3 font-bold">Recent Users</h3>
          {recent.recentUsers.length === 0 ? <EmptyState title="No users yet" subtitle="Run the seed script to add demo data." /> : (
            <div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase text-muted"><tr><th className="py-2">Name</th><th className="py-2">Role</th><th className="py-2">Status</th></tr></thead>
              <tbody>{recent.recentUsers.map((u) => <tr key={u._id} className="border-t border-line"><td className="py-2">{u.name}</td><td className="py-2 text-muted">{u.role}</td><td className="py-2"><StatusBadge value={u.status} /></td></tr>)}</tbody>
            </table></div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-bold">Recent Applications</h3>
          {recent.recentApplications.length === 0 ? <EmptyState title="No applications yet" subtitle="Run the seed script to add demo data." /> : (
            <div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase text-muted"><tr><th className="py-2">Candidate</th><th className="py-2">Job</th><th className="py-2">Status</th></tr></thead>
              <tbody>{recent.recentApplications.map((a) => <tr key={a._id} className="border-t border-line"><td className="py-2">{a.candidate?.name}</td><td className="py-2 text-muted">{a.job?.title}</td><td className="py-2"><StatusBadge value={a.status} /></td></tr>)}</tbody>
            </table></div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-bold">Recent Service Orders</h3>
          {recent.recentOrders.length === 0 ? <EmptyState title="No orders yet" subtitle="Run the seed script to add demo data." /> : (
            <div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase text-muted"><tr><th className="py-2">Customer</th><th className="py-2">Amount</th><th className="py-2">Status</th></tr></thead>
              <tbody>{recent.recentOrders.map((o) => <tr key={o._id} className="border-t border-line"><td className="py-2">{o.customer?.name}</td><td className="py-2 text-muted">{'\u20B9'}{o.amount}</td><td className="py-2"><StatusBadge value={o.status} /></td></tr>)}</tbody>
            </table></div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-bold">Recent Payments</h3>
          {recent.recentPayments.length === 0 ? <EmptyState title="No payments yet" subtitle="Run the seed script to add demo data." /> : (
            <div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase text-muted"><tr><th className="py-2">Payer</th><th className="py-2">Amount</th><th className="py-2">Status</th></tr></thead>
              <tbody>{recent.recentPayments.map((p) => <tr key={p._id} className="border-t border-line"><td className="py-2">{p.payer?.name}</td><td className="py-2 text-muted">{'\u20B9'}{p.amount}</td><td className="py-2"><StatusBadge value={p.status} /></td></tr>)}</tbody>
            </table></div>
          )}
        </div>
      </div>
    </div>
  )
}
