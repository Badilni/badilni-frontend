import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getServiceRequest } from '../../api/posts' // You'll need to add this to your api file

export default function RequestDetailPage() {
  const { requestId } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey: ['serviceRequest', requestId],
    queryFn: () => getServiceRequest(requestId),
  })

  if (isLoading) return <div className="p-10 text-center">Loading...</div>
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading request.
      </div>
    )

  const request = data?.serviceRequest // Match the key from your API response

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10">
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
        {/* Title & Metadata */}
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
          {request.title}
        </h1>
        <div className="flex gap-4 mb-6">
          <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {request.creditsOffered} Credits
          </span>
          <span className="text-sm font-semibold text-gray-500 py-1.5">
            Category: {request.category?.name}
          </span>
        </div>

        {/* Images Grid */}
        {request.referenceImages?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {request.referenceImages.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                className="rounded-2xl w-full h-64 object-cover"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          Description
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {request.description}
        </p>

        {/* User Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
          <img
            src={request.user?.avatar?.url}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">
              {request.user?.name}
            </p>
            <p className="text-xs text-gray-500">
              Posted on {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
