import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBooking } from '../../hooks/booking/useBookings'
import BookingDetail from './BookingDetail'
import BookingReviews from './BookingReviews'
import BookingChatCard from './BookingChatCard'
import ErrorState from '../shared/ErrorState'

export default function BookingPage() {
  const { bookingId } = useParams()
  const { data, isLoading, isError, error, refetch } = useBooking(bookingId)
  const booking = data?.data?.booking
  const [activeTab, setActiveTab] = useState('chat')

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Loading…
      </div>
    )
  }
  if (isError) {
    return <ErrorState message={error?.message} onRetry={refetch} />
  }
  if (!booking) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400">
        Booking not found.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Booking Details
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View and manage this session
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 w-full">
          <BookingDetail booking={booking} />
        </div>
        <div className="lg:col-span-4 w-full flex flex-col gap-6">
          {/* Segment Control Tab Buttons */}
          <div className="flex bg-gray-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-gray-200/20 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Chat Discussion
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'feedback'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Session Feedback
            </button>
          </div>

          {/* Shared fixed-height tab container — both panels always rendered, toggled with hidden/block */}
          <div className="relative w-full h-[500px]">

            {/* Chat Discussion Panel */}
            <div className={`absolute inset-0 ${activeTab === 'chat' ? 'block' : 'hidden'}`}>
              <BookingChatCard bookingId={bookingId} booking={booking} />
            </div>

            {/* Session Feedback Panel */}
            <div className={`absolute inset-0 ${activeTab === 'feedback' ? 'block' : 'hidden'}`}>
              <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800/80 overflow-hidden flex flex-col h-full">
                {/* Header */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-4 border-b border-gray-100 dark:border-slate-800 flex items-center shrink-0">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      Session Feedback
                    </h3>
                    <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                      Ratings &amp; Reviews
                    </p>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                  <BookingReviews booking={booking} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
