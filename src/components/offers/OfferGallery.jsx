import { useState } from 'react'

export default function OfferGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) return null
  const main = images[activeIndex] || images[0]

  return (
    <div className="mb-8">
      <img
        src={main.url}
        alt=""
        className="w-full h-80 object-cover rounded-2xl mb-3"
      />
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={img._id ?? idx}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                idx === activeIndex ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
