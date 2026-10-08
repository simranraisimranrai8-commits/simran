import DataTable from '../../components/admin/DataTable'
import employerService from '../../services/employerService'

export default function Employers() {
  return <DataTable title="Employers" service={employerService} filterKey="plan" filterOptions={['Starter', 'Growth', 'Pro']} statusField="plan" actions={['view', 'edit', 'delete']}
    columns={[
      { key: 'company', label: 'Company' }, { key: 'industry', label: 'Industry' }, { key: 'city', label: 'City' },
      { key: 'contactPerson', label: 'Contact' }, { key: 'plan', label: 'Plan' },
    ]} />
}
