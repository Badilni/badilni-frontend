import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Reusable multi-image uploader: drag & drop + click-to-browse, live
 * previews for newly selected files, and individual removal for both
 * pending uploads and (when editing) existing server-side images.
 *
 * value:    { existing: { _id, url }[], files: File[] }
 * onChange: (nextValue) => void
 */
export default function ImageUploader({
  value,
  onChange,
  label = 'Images',
  maxFiles = 8,
}) {
  const { existing = [], files = [] } = value || {}
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  // Memoized blob URLs so we don't recreate (and leak) one per render.
  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  )
  useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews]
  )

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList || [])
      const room = Math.max(maxFiles - existing.length - files.length, 0)
      if (!incoming.length || room <= 0) return
      onChange({ existing, files: [...files, ...incoming.slice(0, room)] })
    },
    [existing, files, maxFiles, onChange]
  )

  const removeNewFile = (index) =>
    onChange({ existing, files: files.filter((_, i) => i !== index) })
  const removeExisting = (id) =>
    onChange({ existing: existing.filter((img) => img._id !== id), files })

  return (
    <div>
      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">
        {label}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-4 py-6 text-center text-sm transition-colors ${
          isDragging
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20'
            : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <p className="text-gray-500 dark:text-gray-400">
          Drag & drop images here, or{' '}
          <span className="text-blue-600 font-semibold">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">Up to {maxFiles} images</p>
      </div>

      {(existing.length > 0 || files.length > 0) && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
          {existing.map((img) => (
            <div key={img._id} className="relative group aspect-square">
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeExisting(img._id)
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group aspect-square"
            >
              <img
                src={previews[index]}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeNewFile(index)
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
