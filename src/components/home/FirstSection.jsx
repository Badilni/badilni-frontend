import { useThemeStore } from '../../store/themeStore'
import Button from '../common/Button'

const FirstSection = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()

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
              className="relative flex items-center justify-between w-16 h-8 p-1 rounded-full cursor-pointer bg-slate-300 dark:bg-slate-700 transition-colors duration-300 shadow-inner focus:outline-none ml-2"
              aria-label="Toggle Theme"
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-white dark:bg-[#0f172a] shadow-md flex items-center justify-center transform transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400 animate-pulse"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-.464-6.364a1 1 0 0 1 .02 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414.02ZM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2h1Zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-5.05-1.758a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707ZM5 11a1 1 0 1 1 0-2H4a1 1 0 1 1 0 2h1Zm.464-6.364a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 1 0 1.414-1.414l-.707-.707ZM17.243 16.536a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707Z"
                      clipRule="evenodd"
                    />
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
              <span className="ml-1.5 opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-slate-900"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </span>
              <span className="mr-1.5 opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3.5 h-3.5 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm4 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-.464-6.364a1 1 0 0 1 .02 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414.02ZM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2h1Zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm-5.05-1.758a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707ZM5 11a1 1 0 1 1 0-2H4a1 1 0 1 1 0 2h1Zm.464-6.364a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 1 0 1.414-1.414l-.707-.707ZM17.243 16.536a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707Z"
                    clipRule="evenodd"
                  />
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

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-[var(--border-color)] shadow-sm transition-all duration-300">
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

          <section className="bg-[var(--whiteBackground)] p-8 rounded-3xl border border-[var(--border-color)] shadow-sm space-y-4 transition-all duration-300">
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
