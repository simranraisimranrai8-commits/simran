import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import cmsService from '../../services/cmsService'
import { useToast } from '../../components/Toast'
import LoadingState from '../../components/LoadingState'

const sections = [
  ['homepage-banner', 'Homepage Banner'], ['about', 'About'], ['faqs', 'FAQs'], ['help', 'Help Content'],
]

export default function Cms() {
  const toast = useToast()
  const [section, setSection] = useState(sections[0][0])
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', body: '' })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { items } = await cmsService.list()
      const map = Object.fromEntries(items.map((i) => [i.section, i]))
      setContent(map)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])
  useEffect(() => { setForm({ title: content[section]?.title || '', body: content[section]?.body || '' }) }, [section, content])

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await cmsService.save(section, form)
      toast.success('Content saved.')
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div><h1 className="text-xl font-extrabold sm:text-2xl">CMS</h1><p className="text-sm text-muted">Edit website content shown to visitors.</p></div>
      <div className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-white p-1">
        {sections.map(([key, label]) => <button key={key} onClick={() => setSection(key)} className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold ${section === key ? 'bg-navy text-white' : 'text-muted'}`}>{label}</button>)}
      </div>
      {loading ? <LoadingState /> : (
        <form onSubmit={save} className="card space-y-4 p-5">
          <div><label className="label">Title</label><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="label">Body</label><textarea rows={4} className="input" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
          <button className="btn-primary" disabled={saving}><Save size={16} />{saving ? 'Saving...' : 'Save changes'}</button>
        </form>
      )}
    </div>
  )
}
