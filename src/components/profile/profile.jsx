import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import ProfileHeader from './ProfileHeader'
import ReviewCard, { StarRating } from './ReviewCard'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import { FaGraduationCap } from 'react-icons/fa'
import {
  FiSettings,
  FiLock,
  FiKey,
  FiChevronDown,
  FiCheck,
} from 'react-icons/fi'

// ─── Static mock data (replace with API calls when backend is ready) ─────────
const MOCK_SKILLS = [
  'UI/UX Design',
  'Tailwind CSS',
  'React Architecture',
  'Design Systems',
  'Typography',
]

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    session: 'UI Design Basics',
    time: '2 days ago',
    img: null,
    comment:
      'An incredible mentor! The approach to design systems helped me understand complex components in a very simple way. Already applied it to my current project.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    session: 'Tailwind Mastery',
    time: '1 week ago',
    img: null,
    comment:
      'Really solid advice on performance optimisation. Explains the "why" behind every decision, not just the "what". Looking forward to our next deep dive!',
    rating: 4,
  },
  {
    id: 3,
    name: 'Layla Hassan',
    session: 'React Patterns',
    time: '2 weeks ago',
    img: null,
    comment:
      'The session was super practical and well-structured. I came with a vague idea and left with a clear architecture. Highly recommend!',
    rating: 5,
  },
]

const RATING_BARS = [
  { stars: 5, pct: 85 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const SkillsCard = ({ skills }) => {
  return (
    <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2">
          <FaGraduationCap className="text-[var(--primary-light)]" /> Skills
        </h2>
        <button className="text-[var(--primary-light)] font-semibold text-sm hover:underline transition-all">
          Manage
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1.5 bg-[var(--primary-light)]/10 text-[var(--primary-light)] rounded-full text-sm font-medium border border-[var(--primary-light)]/20 hover:bg-[var(--primary-light)]/20 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
        <button className="px-4 py-1.5 bg-transparent border border-dashed border-[var(--gray-text)]/40 text-[var(--gray-text)] rounded-full text-sm font-medium hover:border-[var(--primary-light)] hover:text-[var(--primary-light)] transition-all flex items-center gap-1">
          + Add New
        </button>
      </div>
    </div>
  )
}

const AccountCard = () => {
  const user = useAuthStore((s) => s.user)
  const email = user?.email || 'user@badilni.com'

  return (
    <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
      <h2 className="font-bold text-[var(--black-text)] text-lg flex items-center gap-2 mb-5">
        <FiSettings className="text-[var(--primary-light)]" /> Account Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gray-text)] mb-1.5 uppercase tracking-wide">
            Email Address
          </label>
          <div className="p-3 bg-[var(--background-light)] rounded-lg border border-[var(--gray-text)]/20 flex justify-between items-center">
            <span className="text-sm text-[var(--black-text)]">{email}</span>
            <span className="text-[var(--gray-text)]">
              <FiLock size={14} />
            </span>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 border border-[var(--primary-light)] text-[var(--primary-light)] font-semibold py-2.5 rounded-xl hover:bg-[var(--primary-light)]/5 transition-colors text-sm active:scale-95">
          <FiKey size={15} /> Reset Password
        </button>
      </div>
    </div>
  )
}

const RatingsCard = () => (
  <div className="bg-[var(--whiteBackground)] rounded-2xl p-6 border border-[var(--secondary-light)]/10 shadow-[0_2px_12px_rgba(47,151,233,0.07)]">
    <h2 className="font-bold text-[var(--black-text)] text-lg mb-6">
      Ratings &amp; Reviews
    </h2>
    <div className="flex flex-col sm:flex-row gap-8 items-center">
      {/* Big score */}
      <div className="text-center shrink-0">
        <div className="text-6xl font-extrabold text-[var(--primary-light)] leading-none mb-2">
          4.8
        </div>
        <StarRating rating={5} />
        <div className="text-xs text-[var(--gray-text)] mt-2">
          124 Total Reviews
        </div>
      </div>

      {/* Bars */}
      <div className="flex-1 w-full space-y-2">
        {RATING_BARS.map(({ stars, pct }) => (
          <div key={stars} className="flex items-center gap-3">
            <span className="w-3 text-xs text-[var(--gray-text)] text-right shrink-0">
              {stars}
            </span>
            <div className="flex-1 h-2.5 bg-[var(--background-light)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-xs text-[var(--gray-text)]">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// ─── Main Profile Component ───────────────────────────────────────────────────

const ProfileScreen = () => {
  const [visibleCount, setVisibleCount] = useState(2)
  const [sortBy, setSortBy] = useState('Most Recent')
  const [sortOpen, setSortOpen] = useState(false)
  const sortOptions = ['Most Recent', 'Highest Rated']
  const visibleReviews = MOCK_REVIEWS.slice(0, visibleCount)

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8">
        {/* Hero header */}
        <ProfileHeader />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-5">
            <AccountCard />
            <SkillsCard skills={MOCK_SKILLS} />

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] rounded-2xl p-6 text-white shadow-lg">
              <p className="font-semibold mb-1">
                Ready to share your knowledge?
              </p>
              <p className="text-sm opacity-80 mb-4">
                Start a live session and help others grow.
              </p>
              <button className="w-full bg-white text-[var(--primary-light)] font-bold py-2.5 rounded-xl hover:bg-[var(--background-light)] transition-colors active:scale-95 text-sm">
                Start a Session
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            <RatingsCard />

            {/* Reviews list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[var(--black-text)] text-lg">
                  Recent Feedback
                </h3>

                {/* Custom Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    className="flex items-center gap-2 bg-[var(--whiteBackground)] border border-[var(--gray-text)]/20 rounded-xl text-sm text-[var(--black-text)] px-4 py-2 hover:border-[var(--primary-light)]/40 hover:bg-[var(--primary-light)]/5 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/20"
                  >
                    <span className="font-medium">{sortBy}</span>
                    <FiChevronDown
                      size={14}
                      className={`text-[var(--gray-text)] transition-transform duration-200 ${
                        sortOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-[var(--whiteBackground)] border border-[var(--gray-text)]/15 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden z-20">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt)
                            setSortOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                            sortBy === opt
                              ? 'bg-[var(--primary-light)]/10 text-[var(--primary-light)] font-semibold'
                              : 'text-[var(--black-text)] hover:bg-[var(--background-light)]'
                          }`}
                        >
                          {opt}
                          {sortBy === opt && <FiCheck size={13} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {visibleReviews.map((r) => (
                <ReviewCard key={r.id} {...r} />
              ))}

              {visibleCount < MOCK_REVIEWS.length && (
                <button
                  onClick={() => setVisibleCount((c) => c + 2)}
                  className="w-full py-3.5 text-[var(--primary-light)] font-semibold text-sm hover:bg-[var(--primary-light)]/5 transition-colors rounded-xl border border-dashed border-[var(--primary-light)]/30 active:scale-95"
                >
                  Load More Reviews
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProfileScreen
