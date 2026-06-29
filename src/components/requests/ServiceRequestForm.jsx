import { useState } from 'react'
import { useCategories } from '../../hooks/Timeline/useCategories'
import ImageUploader from '../shared/ImageUploder'

const blankState = {
  category: '',
  title: '',
  description: '',
  creditsOffered: '',
  deadline: '', // bound to a <input type="datetime-local">
  images: { existing: [], files: [] },
}

export default function ServiceRequestForm({
  initialValues,
  onSubmit,
  isSubmitting,
  fieldErrors = {},
  submitLabel = 'Post Request',
}) {
  const [form, setForm] = useState(() => (initialValues ? { ...blankState, ...initialValues } : blankState))
  const { data: categoriesData } = useCategories()
  const categories = categoriesData?.data?.categories ?? []

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
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
        {fieldErrors.category && <p className="text-xs text-red-500 mt-1">{fieldErrors.category}</p>}
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
        {fieldErrors.title && <p className="text-xs text-red-500 mt-1">{fieldErrors.title}</p>}
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
        {fieldErrors.description && <p className="text-xs text-red-500 mt-1">{fieldErrors.description}</p>}
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
          {fieldErrors.creditsOffered && <p className="text-xs text-red-500 mt-1">{fieldErrors.creditsOffered}</p>}
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
          {fieldErrors.deadline && <p className="text-xs text-red-500 mt-1">{fieldErrors.deadline}</p>}
        </div>
      </div>

      <ImageUploader
        value={form.images}
        onChange={(value) => update('images', value)}
        label="Reference Images (optional)"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 transition-all disabled:opacity-60"
      >
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}