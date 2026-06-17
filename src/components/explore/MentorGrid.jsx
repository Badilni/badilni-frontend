import { useState } from 'react'
import MentorCard from './MentorCard'

const FILTERS = ['All Mentors', 'Available Now', 'Top Rated', 'Free Sessions', 'Newest']

const MENTORS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Senior Product Designer',
    company: 'Google',
    rating: 4.9,
    reviews: 128,
    tags: ['UX Design', 'Figma', 'Career'],
    bio: 'Expert in user research and scalable design systems for global consumer products.',
    price: null,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    accentColor: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    name: 'Alex Rivera',
    role: 'Full Stack Lead',
    company: 'Vercel',
    rating: 5.0,
    reviews: 214,
    tags: ['Next.js', 'AWS', 'Node.js'],
    bio: 'Building high-performance serverless architectures and mentoring engineers globally.',
    price: 40,
    available: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    accentColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'Nike',
    rating: 4.8,
    reviews: 96,
    tags: ['Branding', 'Strategy', 'Growth'],
    bio: 'Passionate about brand storytelling and building community-driven marketing campaigns.',
    price: 65,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
    accentColor: 'from-purple-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'ML Lead',
    company: 'Spotify',
    rating: 4.7,
    reviews: 73,
    tags: ['Python', 'MLOps', 'Stats'],
    bio: 'Expert in recommendation algorithms and scaling machine learning pipelines.',
    price: null,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
    accentColor: 'from-orange-500 to-red-600',
  },
  {
    id: 5,
    name: 'Lena Mueller',
    role: 'iOS Engineer',
    company: 'Apple',
    rating: 4.9,
    reviews: 157,
    tags: ['Swift', 'SwiftUI', 'iOS'],
    bio: 'Crafting delightful iOS experiences at Apple. Helping engineers level up their mobile skills.',
    price: 55,
    available: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300',
    accentColor: 'from-teal-500 to-cyan-600',
  },
  {
    id: 6,
    name: 'James Okafor',
    role: 'DevOps Architect',
    company: 'Cloudflare',
    rating: 4.6,
    reviews: 51,
    tags: ['Kubernetes', 'CI/CD', 'Terraform'],
    bio: 'Automating everything at scale. DevOps, platform engineering, and cloud infrastructure.',
    price: 70,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
    accentColor: 'from-pink-500 to-rose-600',
  },
  {
    id: 7,
    name: 'Yuki Tanaka',
    role: 'Data Scientist',
    company: 'OpenAI',
    rating: 5.0,
    reviews: 189,
    tags: ['LLMs', 'PyTorch', 'Research'],
    bio: 'Working on frontier AI research. Happy to guide those breaking into the ML space.',
    price: null,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
    accentColor: 'from-indigo-500 to-blue-600',
  },
  {
    id: 8,
    name: 'Carlos Mendez',
    role: 'Startup Founder',
    company: 'YC Alumni',
    rating: 4.8,
    reviews: 62,
    tags: ['Fundraising', 'GTM', 'Product'],
    bio: 'Built and sold two startups. Mentoring founders on product-market fit and growth.',
    price: 90,
    available: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    tagColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    accentColor: 'from-amber-500 to-yellow-600',
  },
]

export default function MentorGrid({ searchQuery = '' }) {
  const [activeFilter, setActiveFilter] = useState('All Mentors')

  // TODO: replace with real API data
  const filteredMentors = MENTORS.filter((mentor) => {
    const matchesFilter =
      activeFilter === 'All Mentors' ||
      (activeFilter === 'Available Now' && mentor.available) ||
      (activeFilter === 'Top Rated' && mentor.rating >= 4.8) ||
      (activeFilter === 'Free Sessions' && !mentor.price) ||
      activeFilter === 'Newest'

    const matchesSearch =
      !searchQuery ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <section>
      {/* Header + filter pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Top Mentors for You</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredMentors.length}</span>{' '}
            of 2,450 mentors
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                  : 'bg-[var(--whiteBackground)] dark:bg-slate-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or empty state */}
      {filteredMentors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No mentors found</h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Try adjusting your filters or search term</p>
          <button
            onClick={() => setActiveFilter('All Mentors')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}

      {/* Load more */}
      <div className="mt-16 flex flex-col items-center gap-3">
        <button className="group flex items-center gap-3 bg-[var(--whiteBackground)] dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 px-10 py-4 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md">
          Load More Mentors
          <svg className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 dark:text-gray-500">Showing {filteredMentors.length} of 2,450 mentors</p>
      </div>
    </section>
  )
}

