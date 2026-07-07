import ExploreCategoryGrid from '../explore/ExploreCategoryGrid'
import ExploreStats from '../explore/ExploreStats'
import { useState } from 'react'

const SecondSection = () => {
  const [activeCategory, setActiveCategory] = useState(null)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ExploreStats />
        <ExploreCategoryGrid
          activeCategory={activeCategory?._id ?? null}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </>
  )
}

export default SecondSection
