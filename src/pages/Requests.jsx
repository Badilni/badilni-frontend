import { useState } from 'react'
import RequestsHeader from '../components/requests/RequestsHeader'
import RequestFilters from '../components/requests/RequestFilters'
import RequestsStats from '../components/requests/RequestsStats'
import RequestCard from '../components/requests/RequestCard'
import RequestsCTA from '../components/requests/RequestsCTA'

// TODO: replace with real API data from services/
const REQUESTS = [
  {
    id: 1,
    badge: { label: '85% Match', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' },
    postedAt: '2h ago', title: 'React Native Performance Optimization',
    description: 'Looking for an experienced mobile dev to help me debug memory leaks in a social commerce app. I can offer advanced Figma prototyping or Brand Identity strategy in exchange.',
    offers: ['Figma', 'Brand Identity'],
    author: { name: 'Sarah Jenkins', role: 'Senior Designer', rating: 4.9, reviews: 42, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face' },
    category: 'Mobile Dev', accentColor: 'from-emerald-500 to-teal-600', urgent: false,
  },
  {
    id: 2,
    badge: { label: 'New Request', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' },
    postedAt: '5h ago', title: 'Italian Conversation Practice',
    description: "Intermediate speaker looking to improve fluency for an upcoming trip. Happy to share my knowledge of Python/Django or AWS infrastructure setup. Let's talk!",
    offers: ['Python/Django', 'AWS'],
    author: { name: 'Marco Rossi', role: 'Cloud Architect', rating: 5.0, reviews: 18, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    category: 'Languages', accentColor: 'from-blue-500 to-indigo-600', urgent: false,
  },
  {
    id: 3,
    badge: { label: 'Top Expert', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' },
    postedAt: '1d ago', title: 'Go-to-Market Strategy for SaaS',
    description: 'Early-stage founder seeking a veteran marketer to review our GTM plan. Offering mentorship in Venture Capital fundraising or Full-stack Web Development.',
    offers: ['VC Fundraising', 'Full-stack Dev'],
    author: { name: 'Elena Dragan', role: 'Tech Founder', rating: 4.8, reviews: 112, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face' },
    category: 'Digital Marketing', accentColor: 'from-amber-500 to-orange-600', urgent: true,
  },
  {
    id: 4,
    badge: { label: 'Skill: Pottery', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400' },
    postedAt: '3d ago', title: 'Wheel Throwing Basics',
    description: 'Absolute beginner wants to learn basic wheel throwing techniques. In exchange, I can provide professional architectural 3D rendering or interior design consulting.',
    offers: ['3D Rendering', 'Interior Design'],
    author: { name: 'David Lowery', role: 'Architect', rating: 4.9, reviews: 24, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    category: 'UI/UX Design', accentColor: 'from-purple-500 to-pink-600', urgent: false,
  },
  {
    id: 5,
    badge: { label: '72% Match', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' },
    postedAt: '4h ago', title: 'Data Visualization Dashboard',
    description: 'Need a data scientist to help build an interactive analytics dashboard for e-commerce KPIs. I can exchange SEO strategy and content marketing expertise.',
    offers: ['SEO Strategy', 'Content Marketing'],
    author: { name: 'Yuki Tanaka', role: 'E-commerce Lead', rating: 4.7, reviews: 37, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    category: 'Data Science', accentColor: 'from-teal-500 to-cyan-600', urgent: false,
  },
  {
    id: 6,
    badge: { label: 'Urgent', color: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400' },
    postedAt: '30m ago', title: 'Public Speaking Coaching',
    description: 'Have a TEDx talk in 2 weeks and need intensive coaching on delivery and stage presence. Offering full Kubernetes DevOps setup or backend API development.',
    offers: ['Kubernetes', 'API Dev'],
    author: { name: 'James Okafor', role: 'DevOps Engineer', rating: 4.6, reviews: 51, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    category: 'Public Speaking', accentColor: 'from-red-500 to-rose-600', urgent: true,
  },
]

export default function RequestsPage() {
  const [activeCategory, setActiveCategory] = useState('All Requests')
  const [activeStatus, setActiveStatus] = useState('open')
  const [sortBy, setSortBy] = useState('Newest First')

  const filtered = REQUESTS.filter((r) =>
    activeCategory === 'All Requests' || r.category === activeCategory
  )

  return (
    <div className="w-full min-h-screen bg-[var(--background-light)] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <RequestsHeader sortBy={sortBy} onSortChange={setSortBy} />

        <RequestFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          matchScore={85}
        />

        <RequestsStats />

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No requests found</h3>
            <button onClick={() => setActiveCategory('All Requests')} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors">
              Show all requests
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((req) => <RequestCard key={req.id} request={req} />)}
          </div>
        )}

        <RequestsCTA totalShowing={filtered.length} />
      </div>
    </div>
  )
}
