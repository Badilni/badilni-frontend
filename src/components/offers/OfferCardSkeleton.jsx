export default function OfferCardSkeleton() {
  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gray-100 dark:bg-slate-800" />
      <div className="h-40 w-full bg-gray-100 dark:bg-slate-800" />
      <div className="p-7">
        <div className="flex items-center justify-between mb-3">
          <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-4 w-14 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-slate-800 mb-3" />
        <div className="h-3 w-full rounded bg-gray-100 dark:bg-slate-800 mb-2" />
        <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-slate-800 mb-6" />
        <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-slate-800">
          <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-slate-800 shrink-0" />
          <div className="flex-1">
            <div className="h-3 w-24 rounded bg-gray-100 dark:bg-slate-800 mb-2" />
            <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
