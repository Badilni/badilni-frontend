export default function PostPopupFooter({ onClose, handlePostSubmit }) {
  return (
    <div className="p-4 px-6 flex items-center justify-end gap-3 border-t border-slate-200/10 dark:border-slate-700/50 bg-[var(--background-light)]/30 dark:bg-slate-900/40">
      <button
  type="button"
  onClick={onClose}
  className="px-4 py-2 text-xs font-bold text-[var(--gray-text)] hover:text-[var(--black-text)] hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer rounded-xl"
>
  Cancel
</button>

      <button
        type="button"
        onClick={handlePostSubmit}
        className="px-5 py-2.5 bg-[var(--primary-light)] dark:bg-[var(--primary-light)] text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 duration-200 cursor-pointer"
      >
        Post to Community
      </button>
    </div>
  );
}
