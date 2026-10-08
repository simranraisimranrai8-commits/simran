import DataTable from '../../components/admin/DataTable'
import applicationService from '../../services/applicationService'
import { APPLICATION_STATUS } from '../../constants/statuses'

export default function Applications() {
  return <DataTable title="Applications" service={applicationService} searchable={false} filterKey="status" filterOptions={APPLICATION_STATUS} actions={['view', 'edit', 'delete']}
    columns={[
      { key: 'candidate.name', label: 'Candidate', editable: false }, { key: 'job.title', label: 'Job', editable: false },
      { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Applied', editable: false, render: (r) => new Date(r.createdAt).toLocaleDateString('en-IN') },
    ]} />
}
