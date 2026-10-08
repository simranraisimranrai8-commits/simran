import DataTable from '../../components/admin/DataTable'
import jobService from '../../services/jobService'
import { JOB_STATUS } from '../../constants/statuses'

export default function JobsAdmin() {
  return <DataTable title="Jobs" service={jobService} filterKey="status" filterOptions={JOB_STATUS} actions={['view', 'edit', 'delete']}
    columns={[
      { key: 'title', label: 'Title' }, { key: 'category', label: 'Category' }, { key: 'location', label: 'Location' },
      { key: 'jobType', label: 'Type' }, { key: 'workMode', label: 'Mode' }, { key: 'status', label: 'Status' },
    ]} />
}
