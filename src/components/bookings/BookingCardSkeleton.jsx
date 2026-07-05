export default function BookingCardSkeleton() {
  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 shrink-0" />
            <div>
              <div className="h-3 w-28 rounded bg-gray-100 dark:bg-slate-800 mb-2" />
              <div className="h-2.5 w-20 rounded bg-gray-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="h-5 w-16 rounded-full bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="h-3 w-3/4 rounded bg-gray-100 dark:bg-slate-800 mb-2" />
        <div className="flex gap-3 mb-4">
          <div className="h-2.5 w-24 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-2.5 w-12 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        <div className="h-9 w-28 rounded-xl bg-gray-100 dark:bg-slate-800" />
      </div>
    </div>
  )
}