import { FaXmark } from 'react-icons/fa6';

export default function PostPopupHeader({ onClose, username = "Arjun Mehta", rating = "4.9", role = "Senior Mentor" }) {
  return (
    <div className="flex items-start justify-between p-6 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-700/50">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-bold text-[var(--black-text)] text-sm leading-tight dark:text-white">
            {username}
          </h3>
          <p className="text-[11px] text-[var(--warning)] font-medium flex items-center gap-0.5 mt-0.5">
            ★{' '}
            <span className="text-[var(--gray-text)] font-normal">
              {rating} {role}
            </span>
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="text-[var(--gray-text)] hover:text-[var(--black-text)] dark:hover:text-white p-1 transition-colors cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Close popup"
      >
        <FaXmark size={16} />
      </button>
    </div>
  );
}
