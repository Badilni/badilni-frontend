import { useState, useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

const FirstSection = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-light)] dark:bg-gray-950">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-[var(--background-light)] text-[var(--black-text)] font-poppins p-10 transition-colors duration-300">
        <header className="max-w-6xl mx-auto flex justify-between items-center mb-20">
          <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
            Badilni
          </h2>
          <div className="flex gap-2 items-center">
            <Button variant="primary" size="lg">
              Logout
            </Button>
            <Button variant="primary" size="md">
              Logout
            </Button>
            <Button variant="primary" size="sm">
              Logout
            </Button>

            {/* Animated Theme Switcher placed directly next to Logout buttons */}
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-between w-16 h-8 p-1 rounded-full cursor-pointer bg-slate-200 dark:bg-slate-700 transition-colors duration-300 shadow-inner focus:outline-none ml-2 border border-slate-300/50 dark:border-slate-600/50"
          aria-label="Toggle Theme"
        >
          <div
            className={`absolute w-6 h-6 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
              isDarkMode
                ? 'translate-x-8 bg-slate-900 text-yellow-400'
                : 'translate-x-0 bg-white text-amber-500'
            }`}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 animate-[spin_10s_linear_infinite]"
              >
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-slate-700"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </div>

          <span className="ml-1.5 opacity-30 dark:opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-900">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </span>
          <span className="mr-1.5 opacity-10 dark:opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-500">
              <circle cx="12" cy="12" r="5" />
            </svg>
          </span>
        </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-6 py-10">
            <h1 className="text-5xl font-extrabold tracking-tight transition-all duration-300">
              Welcome to{' '}
              <span className="text-[var(--primary-light)] bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
                Badilni
              </span>
            </h1>
            <p className="text-[var(--grat-text)] text-lg max-w-2xl mx-auto font-light">
              The first platform for smart exchange. Experience the power of
              reusable components and modern design now.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="primary" size="lg" className="px-12">
                Start primary
              </Button>
              <Button variant="primary" size="md" className="px-12">
                Start primary
              </Button>
              <Button variant="primary" size="sm" className="px-12">
                Start primary
              </Button>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="secondary" size="lg" className="px-12">
                Start secondary
              </Button>
              <Button variant="secondary" size="md" className="px-12">
                Start secondary
              </Button>
              <Button variant="secondary" size="sm" className="px-12">
                Start secondary
              </Button>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
              <Button variant="outline" size="md">
                Learn More
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </section>

          <section className="bg-[var(--backgDangerOpacity)] p-8 rounded-3xl border border-[var(--danger)]/20 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-[var(--danger)] font-bold text-lg">
                  Danger Zone
                </h4>
                <p className="text-[var(--grat-text)] text-sm">
                  Once the account is deleted, you cannot recover your data
                  again.
                </p>
              </div>
              <Button variant="danger" onClick={() => confirm('Are you sure?')}>
                Delete Account Permanently
              </Button>
            </div>
          </section>

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-[var(--border-color)] shadow-sm transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-[var(--black-text)] font-bold text-lg">
                  Danger Zone
                </h4>
                <p className="text-[var(--grat-text)] text-sm">
                  Once the account is deleted, you cannot recover your data
                  again.
                </p>
              </div>
              <Button
                variant="Disable"
                onClick={() => confirm('Are you sure?')}
              >
                Disable
              </Button>
            </div>
          </section>

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl shadow-sm transition-all duration-300">
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-[var(--black-text)] font-bold text-xl tracking-tight">
                  Skills
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="skills">All</Button>
                <Button variant="skills">Programming</Button>
                <Button variant="skills">Design</Button>
                <Button variant="skills">Graphic Design</Button>
                <Button variant="skills">Photography</Button>
                <Button variant="skills">Cook</Button>
                <Button variant="skills">Content Writing</Button>
                <Button variant="skills">Data Analytics</Button>
                <Button variant="Skip">Skip for now</Button>
              </div>
            </div>
          </section>

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl shadow-sm space-y-4 transition-all duration-300">
            <h4 className="font-bold text-lg mb-4 text-[var(--black-text)]">
              Status Badges
            </h4>

            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-1 rounded-full text-[var(--danger)] bg-[var(--backgDangerOpacity)] border border-[var(--danger)]/20 text-sm font-medium">
                Rejected
              </span>

              <span className="px-4 py-1 rounded-full text-[var(--success)] bg-[var(--backgSuccessOpacity)] border border-[var(--success)]/20 text-sm font-medium">
                Completed
              </span>

              <span className="px-4 py-1 rounded-full text-[var(--warning)] bg-[var(--backWarningOpacity)] border border-[var(--warning)]/20 text-sm font-medium">
                Pending
              </span>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default FirstSection
