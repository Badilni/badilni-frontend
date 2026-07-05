import { useState } from 'react'
import { useMeetingLink } from '../../hooks/booking/useBookingMutation'

export default function BookingMeetingLink({ booking, canEdit }) {
  const [value, setValue] = useState(booking?.meetingLink || '')
  const [editing, setEditing] = useState(false)
  const { mutate, isPending } = useMeetingLink()

  const handleSave = () => {
    if (!value.trim()) return
    mutate({ id: booking._id ?? booking.id, meetingLink: value.trim() }, { onSuccess: () => setEditing(false) })
  }

  const existingLink = booking?.meetingLink

  if (!existingLink && !canEdit) return null

  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-900">
      <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
        Meeting Link
      </p>

      {existingLink && !editing && (
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={existingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            Join Meeting
          </a>
          {canEdit && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Edit link
            </button>
          )}
        </div>
      )}

      {canEdit && (!existingLink || editing) && (
        <div className="flex gap-2">
          <input
            type="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://meet.google.com/..."
            className="flex-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending || !value.trim()}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 disabled:opacity-60 transition-all"
          >
            {isPending ? 'Saving…' : 'Save'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => { setValue(existingLink || ''); setEditing(false) }}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  )
}