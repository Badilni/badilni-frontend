import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LastSection() {
  const [isLoggedIn] = useState(() => !!localStorage.getItem('token'))

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="bg-[linear-gradient(to_left,var(--secondary-light),var(--primary-light))]  text-white rounded-[2rem] py-16 px-8 text-center space-y-6 shadow-xl relative overflow-hidden transition-colors duration-300">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--primary-light)]/10 blur-3xl rounded-full pointer-events-none" />

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Your Future, Shared.
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Join the world's most ambitious professional community and start
          gaining real-world skills.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 relative z-10">
          <Link
            to="/signup"
            className="bg-white text-slate-900 px-6 py-3 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors inline-block text-center"
          >
            Create Your Profile
          </Link>

          <Link
            to={isLoggedIn ? '/requests' : '/signin'}
            className="border border-[var(--background-light)] text-white px-6 py-3 rounded-xl text-xs font-semibold
            hover:bg-[var(--whiteBackground)]  hover:text-[#3b82f6] dark:hover:text-[var(--black-text)] transition-colors inline-block text-center"
          >
            Request Skills
          </Link>
        </div>
      </div>
    </section>
  )
}
