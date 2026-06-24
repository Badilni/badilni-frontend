import { useState } from 'react'
import ExploreHero from '../components/explore/ExploreHero'
import ExploreStats from '../components/explore/ExploreStats'
import ExploreCategoryGrid from '../components/explore/ExploreCategoryGrid'
import MentorGrid from '../components/explore/MentorGrid'
import ExploreCTA from '../components/explore/ExploreCTA'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

 
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <div className="w-full min-h-screen bg-[var(--background-light)] dark:bg-slate-950">
      <ExploreHero onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ExploreStats />
        <ExploreCategoryGrid
          activeCategory={activeCategory?._id ?? null}
          onCategoryChange={handleCategoryChange}
        />
        <MentorGrid searchQuery={searchQuery} />
        <ExploreCTA />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}