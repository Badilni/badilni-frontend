import { useState, useEffect } from 'react'

export default function FloatingActionButton({ onClick }) {
  const [bottomPosition, setBottomPosition] = useState(32)

  useEffect(() => {
    const handleScroll = () => {
      const footer =
        document.querySelector('footer') || document.getElementById('footer')
      if (!footer) return

      const totalDocHeight = document.documentElement.scrollHeight
      const scrollPosition = window.innerHeight + window.scrollY
      const footerHeight = footer.getBoundingClientRect().height
      const distanceToBottom = totalDocHeight - scrollPosition

      if (distanceToBottom < footerHeight) {
        const newBottom = footerHeight - distanceToBottom + 32
        setBottomPosition(newBottom)
      } else {
        setBottomPosition(32)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        bottom: `${bottomPosition}px`,
      }}
      className="fixed right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-200 z-40 group focus:outline-none"
      aria-label="Create Post"
    >
      <svg
        className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>

      <span className="absolute right-16 bg-gray-900 dark:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
        Create Post
      </span>
    </button>
  )
}
