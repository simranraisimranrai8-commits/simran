import DataTable from '../../components/admin/DataTable'
import userService from '../../services/userService'
import { USER_STATUS } from '../../constants/statuses'

export default function UsersPage() {
  return <DataTable title="Users" service={userService} filterKey="status" filterOptions={USER_STATUS} actions={['view', 'edit', 'suspend', 'delete']}
    columns={[
      { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role', editable: false },
      { key: 'city', label: 'City' }, { key: 'status', label: 'Status' },
      { key: 'createdAt', label: 'Joined', editable: false, render: (r) => new Date(r.createdAt).toLocaleDateString('en-IN') },
    ]} />
}
