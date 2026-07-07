import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { offerSchema, offerDefaultValues } from '../../utils/offerSchema'
import { useCategories } from '../../hooks/useCategories'
import ImageUploader from '../shared/ImageUploder'

export default function OfferForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Post Offer',
}) {
  const { categories, loading, error: categoriesError } = useCategories()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    // Computed once, at mount, from whatever was passed in when editing.
    // NOTE: do not "sync" this with an effect that calls reset() on every
    // initialValues/parent re-render — isPending flips during submit would
    // re-trigger it and silently wipe unsaved edits right as the user hits
    // submit. Since the parent modal fully unmounts on close, a fresh mount
    // on each open is enough to pick up new initialValues correctly.
    defaultValues: initialValues
      ? { ...offerDefaultValues, ...initialValues }
      : offerDefaultValues,
  })

  const tags = watch('tags')

  const addTag = (e) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const value = e.target.value.trim()
    if (value && !tags.includes(value) && tags.length < 10) {
      setValue('tags', [...tags, value])
      e.target.value = ''
    }
  }

  const removeTag = (tag) =>
    setValue(
      'tags',
      tags.filter((t) => t !== tag)
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
          Title
        </label>
        <input
          {...register('title')}
          maxLength={120}
          placeholder="Guitar lessons for beginners"
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
          Category
        </label>
        <select
          {...register('category')}
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
        {errors.category && (
          <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
            Hourly Rate
          </label>
          <input
            type="number"
            min={1}
            step="0.5"
            {...register('hourlyRate')}
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          />
          {errors.hourlyRate && (
            <p className="text-xs text-red-500 mt-1">
              {errors.hourlyRate.message}
            </p>
          )}
        </div>

        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isActive')}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Active
            </span>
          </label>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
          Availability Notes
        </label>
        <textarea
          {...register('availabilityNotes')}
          rows={2}
          placeholder="Weekday evenings, weekend mornings…"
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white resize-none"
        />
        {errors.availabilityNotes && (
          <p className="text-xs text-red-500 mt-1">
            {errors.availabilityNotes.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
          Tags / Skills
        </label>
        <div className="flex flex-wrap items-center gap-1.5 p-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-semibold border border-gray-200 dark:border-slate-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-400 hover:text-red-500 font-bold leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            onKeyDown={addTag}
            placeholder="Add a tag and press Enter"
            className="flex-1 min-w-[120px] bg-transparent text-xs text-gray-900 dark:text-white outline-none"
          />
        </div>
        {errors.tags && (
          <p className="text-xs text-red-500 mt-1">{errors.tags.message}</p>
        )}
      </div>

      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <ImageUploader
            value={field.value}
            onChange={field.onChange}
            label="Sample Work (optional)"
          />
        )}
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
