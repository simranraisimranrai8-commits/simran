import DataTable from '../../components/admin/DataTable'
import auditLogService from '../../services/auditLogService'

export default function AuditLogs() {
  return <DataTable title="Audit Logs" service={auditLogService} searchable={false} actions={['view']}
    columns={[
      { key: 'admin.name', label: 'Admin' }, { key: 'action', label: 'Action' }, { key: 'module', label: 'Module' },
      { key: 'ip', label: 'IP address' }, { key: 'createdAt', label: 'Time', render: (r) => new Date(r.createdAt).toLocaleString('en-IN') },
    ]} />
}
