import { FiAlertCircle } from 'react-icons/fi'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="bg-[var(--whiteBackground)] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[var(--secondary-light)]/10 z-10 animate-in fade-in zoom-in-95 duration-200 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <FiAlertCircle size={24} />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[var(--black-text)]">
            {title || 'Confirm Action'}
          </h2>
          <p className="text-sm text-[var(--gray-text)]">
            {message || 'Are you sure you want to proceed?'}
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--gray-text)]/20 text-sm font-semibold text-[var(--gray-text)] hover:bg-[var(--background-light)] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all shadow-md shadow-red-500/10"
          >
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
