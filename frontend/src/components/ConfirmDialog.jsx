import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Confirm', danger = false, loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title}
      footer={<>
        <button className="btn-outline" onClick={onClose} disabled={loading}>Cancel</button>
        <button className={danger ? 'btn bg-red-600 text-white hover:bg-red-700' : 'btn-primary'} onClick={onConfirm} disabled={loading}>
          {loading ? 'Please wait...' : confirmLabel}
        </button>
      </>}>
      <p className="text-sm text-muted">{description}</p>
    </Modal>
  )
}
