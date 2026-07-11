export default function MatchCardSkeleton() {
  return (
    <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)] overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gray-100 dark:bg-slate-800" />
      <div className="p-6 space-y-5">
        {/* Score row */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 rounded-full bg-gray-100 dark:bg-slate-800" />
          <div className="h-4 w-16 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
        {/* Progress bar */}
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-slate-800" />
        {/* Participants */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 shrink-0" />
          <div className="h-3 w-20 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-px flex-1 bg-gray-100 dark:bg-slate-800" />
          <div className="h-3 w-20 rounded bg-gray-100 dark:bg-slate-800" />
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 shrink-0" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 rounded-xl bg-gray-100 dark:bg-slate-800" />
          <div className="h-20 rounded-xl bg-gray-100 dark:bg-slate-800" />
        </div>
        {/* Reasoning */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-100 dark:bg-slate-800" />
          <div className="h-3 w-4/5 rounded bg-gray-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}
