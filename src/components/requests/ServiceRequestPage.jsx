import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useServiceRequest } from '../../hooks/Timeline/useServiceRequests'
import { useDeleteServiceRequest } from '../../hooks/Timeline/useServiceRequestMutations'
import useAuthStore from '../../store/authStore'
import { isOwner as checkIsOwner } from '../../utils/isOwner'
import { getProfilePath } from '../../utils/getProfilePath'
import EditServiceRequestModal from './EditServiceRequestModal'
import OfferGallery from '../offers/OfferGallery'
import ConfirmDeleteModal from '../shared/ConfirmDeleteModal'
import ErrorState from '../shared/ErrorState'
import CreateBookingModal from '../bookings/CreateBookingModal'

export default function ServiceRequestPage() {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [bookingOpen, setBookingOpen] = useState(false)

  const { data, isLoading, isError, error, refetch } =
    useServiceRequest(requestId)
  const deleteRequest = useDeleteServiceRequest()
  const currentUser = useAuthStore((state) => state.user)
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const extractResource = (payload, primaryKey, fallbackKey) => {
    const candidates = [
      payload?.[primaryKey],
      payload?.[fallbackKey],
      payload?.data?.[primaryKey],
      payload?.data?.[fallbackKey],
      payload?.data?.data?.[primaryKey],
      payload?.data?.data?.[fallbackKey],
    ].filter(Boolean)

    const firstMatch = candidates[0]
    if (Array.isArray(firstMatch)) return firstMatch[0] || null
    return firstMatch || payload?.data || payload
  }

  const request = extractResource(data, 'serviceRequest', 'serviceRequests')
  const safeRequest = request || {}
  const safeUser = safeRequest.user || {}
  const isOwner = checkIsOwner(currentUser, safeUser)
  const deadlineMs = safeRequest.deadline
    ? new Date(safeRequest.deadline).getTime()
    : NaN
  const msUntilDeadline = Number.isFinite(deadlineMs)
    ? // eslint-disable-next-line react-hooks/purity
      deadlineMs - Date.now()
    : Number.POSITIVE_INFINITY
  const isExpired = Number.isFinite(deadlineMs) && msUntilDeadline <= 0

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    )
  if (isError) return <ErrorState message={error?.message} onRetry={refetch} />
  if (!request)
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Request not found.
      </div>
    )

  const owner = checkIsOwner(currentUser, request.user)
  const profilePath = getProfilePath(request.user, currentUser)
  const normalizedStatus = String(request.status || '')
    .trim()
    .toLowerCase()
  const isFulfilled =
    normalizedStatus === 'fulfilled' ||
    normalizedStatus === 'completed' ||
    request.isFulfilled === true ||
    request.fulfilled === true ||
    request.isCompleted === true
  const isUnavailable = owner || isExpired || isFulfilled

  const handleDelete = () => {
    deleteRequest.mutate(request._id ?? request.id, {
      onSuccess: () => navigate('/requests'),
    })
  }

  return (
    <div className="w-4xl mx-auto p-6 lg:p-10">
      <div className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
        {/* Title, metadata & owner actions */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => profilePath && navigate(profilePath)}
            className="flex items-center gap-4 bg-transparent border-0 p-0"
          >
            <img
              src={
                request.user?.avatar?.url || 'https://via.placeholder.com/80'
              }
              className="w-12 h-12 rounded-full object-cover"
              alt={request.user?.name || 'User'}
            />
            <div>
              <p className="text-left font-bold text-gray-900 dark:text-white">
                {request.user?.name}
              </p>
              <p className="text-xs text-gray-500">
                Posted on {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        </div>
        <div className="flex items-start justify-between gap-4 mb-4 mt-4">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            {request.title}
          </h1>
          {owner && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDeleteOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            {request.creditsOffered} Credits
          </span>
          <span className="text-sm font-semibold text-gray-500 py-1.5">
            Category: {request.category?.name}
          </span>
        </div>

        {/* Gallery */}
        {request.referenceImages?.length > 0 && (
          <OfferGallery images={request.referenceImages} />
        )}

        {/* Description */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
          Description
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {request.description}
        </p>

        {/* Deadline */}
        {request.deadline && (
          <div className="flex items-center gap-2 mb-8">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Deadline: {new Date(request.deadline).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* skills */}
        {request.tags?.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Tags / Required Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {request.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="mt-6">
          {isFulfilled && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
              This request has already been fulfilled.
            </div>
          )}
          {isExpired && !isFulfilled && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">
              This request deadline has passed.
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (!isUnavailable) setBookingOpen(true)
            }}
            disabled={isUnavailable}
            className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
              isOwner
                ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-default'
                : isFulfilled
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 cursor-default'
                  : 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:brightness-110'
            }`}
          >
            {isOwner
              ? 'Your Request'
              : isFulfilled
                ? 'Fulfilled'
                : isExpired
                  ? 'Deadline Passed'
                  : 'Book Session'}
          </button>
        </div>
      </div>

      <EditServiceRequestModal
        open={editOpen}
        request={request}
        onClose={() => setEditOpen(false)}
      />
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        title="Delete this request?"
        description="This will permanently remove your request. This action cannot be undone."
        isDeleting={deleteRequest.isPending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDeleteOpen(false)}
      />

      {!isOwner && !isUnavailable && (
        <CreateBookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          requestId={request._id ?? request.id}
          onSuccess={(booking) => {
            const id = booking?.data?.booking?._id ?? booking?._id
            if (id) navigate(`/bookings/${id}`)
          }}
        />
      )}
    </div>
  )
}
