import DataTable from '../../components/admin/DataTable'
import paymentService from '../../services/paymentService'
import { PAYMENT_STATUS } from '../../constants/statuses'

export default function Payments() {
  return <DataTable title="Payments" service={paymentService} searchable={false} filterKey="status" filterOptions={PAYMENT_STATUS} actions={['view', 'edit', 'delete']}
    columns={[
      { key: 'payer.name', label: 'Payer', editable: false }, { key: 'type', label: 'Type', editable: false }, { key: 'mode', label: 'Mode', editable: false },
      { key: 'amount', label: 'Amount', editable: false, render: (r) => `\u20B9${r.amount}` }, { key: 'status', label: 'Status' },
    ]} />
}
