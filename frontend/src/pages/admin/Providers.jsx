import DataTable from '../../components/admin/DataTable'
import providerService from '../../services/providerService'

export default function Providers() {
  return <DataTable title="Providers" service={providerService} searchable={false} filterKey="status" filterOptions={['Active', 'Pending', 'Suspended']} actions={['view', 'suspend', 'delete']}
    columns={[
      { key: 'user.name', label: 'Name', editable: false }, { key: 'category.name', label: 'Category', editable: false },
      { key: 'city', label: 'City' }, { key: 'rating', label: 'Rating' }, { key: 'kyc', label: 'KYC' }, { key: 'status', label: 'Status' },
    ]} />
}
