import DataTable from '../../components/admin/DataTable'
import orderService from '../../services/orderService'
import { ORDER_STATUS } from '../../constants/statuses'

export default function Orders() {
  return <DataTable title="Service Orders" service={orderService} searchable={false} filterKey="status" filterOptions={ORDER_STATUS} actions={['view', 'edit', 'delete']}
    columns={[
      { key: 'customer.name', label: 'Customer', editable: false }, { key: 'service.title', label: 'Service', editable: false },
      { key: 'location', label: 'Location' }, { key: 'amount', label: 'Amount', render: (r) => `\u20B9${r.amount}` }, { key: 'status', label: 'Status' },
    ]} />
}
