export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-5">
        <svg
          className="w-7 h-7 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zM12 15.75h.008"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        Couldn't load requests
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {message ||
          'The server did not respond. Check your connection and try again.'}
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110"
      >
        Try again
      </button>
    </div>
  )
}
