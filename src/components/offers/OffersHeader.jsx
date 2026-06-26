export default function OffersHeader({ totalCount = 0 }) {
  return (
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        {totalCount} offers found
      </div>
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
        Skill Offers
      </h1>
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
        Browse what the community is offering, or list your own skill and start
        getting booked.
      </p>
    </div>
  )
}
