export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-24 h-24 bg-gray-50 dark:bg-[#1e293b] rounded-full flex items-center justify-center border border-gray-100 dark:border-[#334155] shadow-sm mb-6">
        <span className="text-4xl">🔍</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        No Results
      </h3>
      <p className="text-sm text-gray-400 max-w-sm">
        We couldn't find any speakers matching your exact search criteria. Try
        adjusting your filters or spelling.
      </p>
    </div>
  )
}
