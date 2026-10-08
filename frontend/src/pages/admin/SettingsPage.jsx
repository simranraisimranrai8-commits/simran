import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import settingsService from '../../services/settingsService'
import { useToast } from '../../components/Toast'
import LoadingState from '../../components/LoadingState'

const tabs = ['General', 'Brand', 'Notifications', 'Security', 'Platform']

export default function SettingsPage() {
  const toast = useToast()
  const [tab, setTab] = useState(tabs[0])
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try { setSettings((await settingsService.get()).item) } catch (err) { toast.error(err.message) }
  }
  useEffect(() => { load() }, [])

  const save = async (patch) => {
    setSaving(true)
    try {
      const item = (await settingsService.update(patch)).item
      setSettings(item)
      toast.success('Settings saved.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    if (tab === 'General') save({ general: { platformName: f.get('platformName'), supportEmail: f.get('supportEmail'), defaultCity: f.get('defaultCity') } })
    if (tab === 'Brand') save({ brand: { navy: f.get('navy'), blue: f.get('blue'), green: f.get('green'), cyan: f.get('cyan') } })
    if (tab === 'Notifications') save({ notifications: { email: f.get('email') === 'on', sms: f.get('sms') === 'on', push: f.get('push') === 'on' } })
    if (tab === 'Security') save({ security: { sessionTimeoutMinutes: Number(f.get('sessionTimeoutMinutes')), requireTwoFactor: f.get('requireTwoFactor') === 'on' } })
    if (tab === 'Platform') save({ platform: { maintenanceMode: f.get('maintenanceMode') === 'on', defaultCurrency: f.get('defaultCurrency') } })
  }

  if (!settings) return <LoadingState />

  return (
    <div className="space-y-4">
      <div><h1 className="text-xl font-extrabold sm:text-2xl">Settings</h1><p className="text-sm text-muted">Configure platform-wide settings, stored in the database.</p></div>
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-white p-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold ${tab === t ? 'bg-navy text-white' : 'text-muted'}`}>{t}</button>)}
      </div>
      <form onSubmit={submit} className="card space-y-4 p-5">
        {tab === 'General' && <>
          <div><label className="label">Platform name</label><input name="platformName" className="input" defaultValue={settings.general.platformName} /></div>
          <div><label className="label">Support email</label><input name="supportEmail" className="input" defaultValue={settings.general.supportEmail} /></div>
          <div><label className="label">Default city</label><input name="defaultCity" className="input" defaultValue={settings.general.defaultCity} /></div>
        </>}
        {tab === 'Brand' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['navy', 'blue', 'green', 'cyan'].map((k) => (
              <div key={k}><label className="label capitalize">{k}</label><div className="flex items-center gap-2"><span className="h-9 w-9 rounded-lg border border-line" style={{ background: settings.brand[k] }} /><input name={k} className="input" defaultValue={settings.brand[k]} /></div></div>
            ))}
          </div>
        )}
        {tab === 'Notifications' && ['email', 'sms', 'push'].map((k) => (
          <label key={k} className="flex items-center justify-between rounded-lg border border-line p-3 text-sm font-medium capitalize"><span>{k} notifications</span><input type="checkbox" name={k} defaultChecked={settings.notifications[k]} className="h-4 w-4 accent-brand" /></label>
        ))}
        {tab === 'Security' && <>
          <div><label className="label">Session timeout (minutes)</label><input name="sessionTimeoutMinutes" type="number" className="input" defaultValue={settings.security.sessionTimeoutMinutes} /></div>
          <label className="flex items-center justify-between rounded-lg border border-line p-3 text-sm font-medium"><span>Require two-factor authentication for admins</span><input type="checkbox" name="requireTwoFactor" defaultChecked={settings.security.requireTwoFactor} className="h-4 w-4 accent-brand" /></label>
        </>}
        {tab === 'Platform' && <>
          <label className="flex items-center justify-between rounded-lg border border-line p-3 text-sm font-medium"><span>Maintenance mode</span><input type="checkbox" name="maintenanceMode" defaultChecked={settings.platform.maintenanceMode} className="h-4 w-4 accent-brand" /></label>
          <div><label className="label">Default currency</label><input name="defaultCurrency" className="input" defaultValue={settings.platform.defaultCurrency} /></div>
        </>}
        <button className="btn-primary" disabled={saving}><Save size={16} />{saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  )
}
