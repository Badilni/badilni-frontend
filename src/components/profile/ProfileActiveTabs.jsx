import { useState } from 'react'
import ProfileServiceRequests from './ProfileServiceRequests'
import ProfileOffers from './ProfileOffers'

const TABS = [
  { key: 'requests', label: 'Service Requests' },
  { key: 'offers', label: 'Offers' },
]

/**
 * userId: omit for the logged-in user's own profile (hits the /me
 * endpoints), pass it to show someone else's posted requests/offers.
 */
export default function ProfileActivityTabs({ userId, isOwnProfile = false }) {
  const [activeTab, setActiveTab] = useState('requests')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-bold text-[var(--black-text)] text-lg">
          {isOwnProfile ? 'My Activity' : 'Activity'}
        </h3>

        <div className="flex items-center gap-2 bg-[var(--whiteBackground)] rounded-2xl p-1.5 border border-[var(--secondary-light)]/10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'bg-[var(--primary-light)] text-white shadow-sm'
                  : 'text-[var(--gray-text)] hover:text-[var(--black-text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'requests' ? (
        <ProfileServiceRequests userId={userId} isOwnProfile={isOwnProfile} />
      ) : (
        <ProfileOffers userId={userId} isOwnProfile={isOwnProfile} />
      )}
    </div>
  )
}