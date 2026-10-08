import { useState } from 'react'
import DataTable from '../../components/admin/DataTable'
import serviceService from '../../services/serviceService'

export default function ServicesAdmin() {
  const [tab, setTab] = useState('services')
  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-lg border border-line bg-white p-1 w-fit">
        <button onClick={() => setTab('services')} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${tab === 'services' ? 'bg-navy text-white' : 'text-muted'}`}>Provider Services</button>
        <button onClick={() => setTab('categories')} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${tab === 'categories' ? 'bg-navy text-white' : 'text-muted'}`}>Categories</button>
      </div>
      {tab === 'services' ? (
        <DataTable title="Provider Services" service={serviceService} actions={['view', 'edit', 'delete']}
          columns={[{ key: 'title', label: 'Title' }, { key: 'category.name', label: 'Category', editable: false }, { key: 'provider.city', label: 'City', editable: false }, { key: 'price', label: 'Price' }]} />
      ) : (
        <DataTable title="Service Categories" service={{ list: serviceService.listCategories, update: serviceService.updateCategory, remove: serviceService.removeCategory }}
          actions={['view', 'edit', 'delete']} columns={[{ key: 'name', label: 'Name' }, { key: 'slug', label: 'Slug', editable: false }]} />
      )}
    </div>
  )
}
