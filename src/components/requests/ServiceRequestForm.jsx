import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import ImageUploader from '../shared/ImageUploder'
import { RequestSchema, requestDefaultValues } from '../../utils/RequestSchema'

export default function RequestForm({
  initialValues,
  onSubmit,
  isSubmitting,
  fieldErrors = {},
  submitLabel = 'Post Request',
}) {
  const [form, setForm] = useState(() => initialValues || requestDefaultValues)
  const [localErrors, setLocalErrors] = useState({})
  const { categories } = useCategories()

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (localErrors[key])
      setLocalErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = RequestSchema.safeParse(form)

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors
      setLocalErrors(formattedErrors)
      return
    }

    onSubmit(result.data)
  }

  const getError = (key) => localErrors[key]?.[0] || fieldErrors[key]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
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
        {getError('category') && (
          <p className="text-xs text-red-500 mt-1">{getError('category')}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
          Title
        </label>
        <input
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        {getError('title') && (
          <p className="text-xs text-red-500 mt-1">{getError('title')}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
          Description
        </label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
        />
        {getError('description') && (
          <p className="text-xs text-red-500 mt-1">{getError('description')}</p>
        )}
      </div>

      {/* Credits & Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
            Credits
          </label>
          <input
            type="number"
            value={form.creditsOffered}
            onChange={(e) => update('creditsOffered', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
          />
          {getError('creditsOffered') && (
            <p className="text-xs text-red-500 mt-1">
              {getError('creditsOffered')}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={form.deadline}
            onChange={(e) => update('deadline', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
          />
          {getError('deadline') && (
            <p className="text-xs text-red-500 mt-1">{getError('deadline')}</p>
          )}
        </div>
      </div>

      <ImageUploader
        value={form.images}
        onChange={(v) => update('images', v)}
        label="Images"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600"
      >
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
