import { useState } from 'react'
import { useCategories } from '../../hooks/Timeline/useCategories'
import { useCreateServiceRequest } from '../../hooks/Timeline/useServiceRequestMutations'

const initialState = {
  category: '',
  title: '',
  description: '',
  creditsOffered: '',
  deadline: '', // bound to a <input type="datetime-local">
  referenceImages: null,
}

/**
 * Fields and shape confirmed against img 2 / img 5:
 *  - category: ObjectId string (select, not free text)
 *  - title, description: text
 *  - creditsOffered: number
 *  - deadline: ISO 8601 string, e.g. "2026-07-06T18:00:00.000Z"
 *  - referenceImages: file(s), optional
 * Submitted as multipart/form-data via buildServiceRequestFormData (api/posts.js).
 */
export default function CreateServiceRequestModal({
  open,
  onClose,
  onCreated,
}) {
  const [form, setForm] = useState(initialState)
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.data?.categories ?? []
  const { mutate, isPending, error } = useCreateServiceRequest()

  // Backend validation errors are expected as { errors: { fieldName: 'message' } }
  // via the axios interceptor's normalized error shape — adjust the key path
  // here once the real error response shape is confirmed.
  const fieldErrors = error?.errors || {}

  if (!open) return null

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(
      {
        category: form.category,
        title: form.title,
        description: form.description,
        creditsOffered: form.creditsOffered,
        deadline: form.deadline
          ? new Date(form.deadline).toISOString()
          : undefined,
        referenceImages: form.referenceImages,
      },
      {
        onSuccess: (created) => {
          setForm(initialState)
          onCreated?.(created)
          onClose()
        },
      }
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--whiteBackground)] dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Post a Request
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && !Object.keys(fieldErrors).length && (
          <div className="mb-4 text-sm font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl px-4 py-3">
            {error.message || "Couldn't post your request. Try again."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
              Category
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {fieldErrors.category && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.category}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
              Title
            </label>
            <input
              required
              maxLength={120}
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Need help proofreading and localizing a flyer"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none"
            />
            {fieldErrors.description && (
              <p className="text-xs text-red-500 mt-1">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
                Credits Offered
              </label>
              <input
                required
                type="number"
                min={1}
                value={form.creditsOffered}
                onChange={(e) => update('creditsOffered', e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
              />
              {fieldErrors.creditsOffered && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.creditsOffered}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
                Deadline
              </label>
              <input
                required
                type="datetime-local"
                value={form.deadline}
                onChange={(e) => update('deadline', e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
              />
              {fieldErrors.deadline && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldErrors.deadline}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
              Reference Images (optional)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => update('referenceImages', e.target.files)}
              className="w-full text-sm text-gray-600 dark:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 transition-all disabled:opacity-60"
          >
            {isPending ? 'Posting…' : 'Post Request'}
          </button>
        </form>
      </div>
    </div>
  )
}
