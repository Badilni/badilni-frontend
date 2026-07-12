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
      setLocalErrors(result.error.flatten().fieldErrors)
      return
    }
    onSubmit(result.data)
  }

  const getError = (key) => localErrors[key]?.[0] || fieldErrors[key]

  const inputClass =
    'w-full bg-[var(--background-light)] dark:bg-slate-800 border border-[var(--gray-text)]/20 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-[var(--black-text)] dark:text-white placeholder:text-[var(--Disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/20 transition-all'

  const labelClass =
    'text-xs font-bold text-[var(--gray-text)] uppercase tracking-wide mb-1.5 block'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className={labelClass}>Category</label>
        <select
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          className={inputClass}
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
          <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
            {getError('category')}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Need help proofreading my CV"
          className={inputClass}
        />
        {getError('title') && (
          <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
            {getError('title')}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className={`${inputClass} resize-none`}
        />
        {getError('description') && (
          <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
            {getError('description')}
          </p>
        )}
      </div>

      {/* Credits & Deadline */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Credits</label>
          <input
            type="number"
            min={1}
            value={form.creditsOffered}
            onChange={(e) => update('creditsOffered', e.target.value)}
            className={inputClass}
          />
          {getError('creditsOffered') && (
            <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
              {getError('creditsOffered')}
            </p>
          )}
        </div>
        <div>
          <label className={labelClass}>Deadline</label>
          <input
            type="datetime-local"
            value={form.deadline}
            onChange={(e) => update('deadline', e.target.value)}
            className={inputClass}
          />
          {getError('deadline') && (
            <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
              {getError('deadline')}
            </p>
          )}
        </div>
      </div>

      {/* Images */}
      <ImageUploader
        value={form.images}
        onChange={(v) => update('images', v)}
        label="Reference Images (optional)"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-60"
      >
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}