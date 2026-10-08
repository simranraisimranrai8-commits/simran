import { useState } from 'react'
import { Plus } from 'lucide-react'
import DataTable from '../../components/admin/DataTable'
import Modal from '../../components/Modal'
import notificationService from '../../services/notificationService'
import { useToast } from '../../components/Toast'
import { NOTIFICATION_TYPES, NOTIFICATION_STATUS } from '../../constants/statuses'

export default function Notifications() {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    try {
      await notificationService.create({ title: f.get('title'), message: f.get('message'), type: f.get('type'), audience: f.get('audience'), status: f.get('status') })
      toast.success('Notification saved.')
      setOpen(false)
      setRefreshKey((k) => k + 1)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-xl font-extrabold sm:text-2xl">Notifications</h1><p className="text-sm text-muted">Send and schedule notifications to users.</p></div>
        <button className="btn-primary" onClick={() => setOpen(true)}><Plus size={16} />New notification</button>
      </div>
      <DataTable key={refreshKey} title="" service={notificationService} filterKey="status" filterOptions={NOTIFICATION_STATUS} actions={['view', 'edit', 'delete']}
        columns={[{ key: 'title', label: 'Title' }, { key: 'type', label: 'Type' }, { key: 'audience', label: 'Audience' }, { key: 'status', label: 'Status' }]} />
      <Modal open={open} onClose={() => setOpen(false)} title="New notification">
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Title</label><input name="title" className="input" required /></div>
          <div><label className="label">Message</label><textarea name="message" rows={3} className="input" required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Type</label><select name="type" className="input">{NOTIFICATION_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label className="label">Status</label><select name="status" className="input">{NOTIFICATION_STATUS.map((s) => <option key={s}>{s}</option>)}</select></div>
          </div>
          <div><label className="label">Audience</label><input name="audience" className="input" placeholder="All users" /></div>
          <div className="flex justify-end gap-2 pt-2"><button type="button" className="btn-outline" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary">Save</button></div>
        </form>
      </Modal>
    </div>
  )
}
