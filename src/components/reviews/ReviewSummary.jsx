import { useState, useEffect } from 'react'
import { getUserReviewSummary } from '../../api/reviewSummary'
import { HiSparkles } from 'react-icons/hi'

const ReviewSummary = ({ userId }) => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    if (!userId) return
    getUserReviewSummary(userId)
      .then((res) => {
        if (res?.data?.summary) setSummary(res.data.summary)
      })
      .catch((err) => console.error('ReviewSummary API Error:', err))
  }, [userId])

  if (!summary) return null

  return (
    <div className="bg-gradient-to-br from-blue-700/50 via-blue-600 to-indigo-900/80 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <HiSparkles className="text-white/80" size={20} />
        <h4 className="text-sm font-bold text-white uppercase tracking-widest opacity-90">
          AI Review
        </h4>
      </div>

      <p className="text-sm text-white/90 leading-relaxed italic">{summary}</p>
    </div>
  )
}

export default ReviewSummary
