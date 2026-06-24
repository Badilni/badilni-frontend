import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCompass } from 'react-icons/fi'
import logo404 from '../../../public/logo.png'
import WaveBackground from './WaveAnimation'
import OrbitingCircles from './OrbitingCircles'
import OwlLogo from '../auth/OwlLogo'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden py-12 md:py-20 select-none bg-[var(--background-light)] transition-colors duration-300">

      {/* Wave Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <WaveBackground opacityTop="opacity-20" opacityBottom="opacity-25" />
        <OrbitingCircles />
      </div>

      <div className="absolute text-[12rem] md:text-[16rem] font-extrabold text-[var(--gray-text)]/20 dark:text-[var(--gray-text)]/10 tracking-widest pointer-events-none select-none z-0 font-sans">
        404
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-center gap-10 lg:gap-16 max-w-6xl px-6 my-auto text-center lg:text-left">

        {/* OwlLogo */}
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <OwlLogo src={logo404} />
        </div>

        <div className="flex flex-col items-center lg:items-start max-w-xl">
          <h1 className="text-3xl md:text-5xl font-black text-[var(--primary-light)] tracking-tight leading-tight mb-6">
            Looks like you've hit a <br className="hidden sm:inline" /> creative block
          </h1>

          <p className="text-sm md:text-base text-slate-500 dark:text-[var(--gray-text)] font-medium max-w-lg leading-relaxed mb-8 md:mb-10">
            The skill or page you are looking for has migrated or doesn't exist yet.
            Let's get you back to the flow of shared knowledge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-[var(--primary-light)] text-white dark:text-[#0f172a] font-semibold text-sm rounded-lg shadow-md hover:bg-[var(--secondary-light)] transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <FiArrowLeft size={16} />
              Go Back Home
            </button>

            <button
              onClick={() => navigate('/explore')}
              className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-[var(--whiteBackground)] border border-slate-300 dark:border-[var(--border-color)] text-[var(--black-text)] font-semibold text-sm rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <FiCompass size={16} className="text-slate-500 dark:text-[var(--gray-text)]" />
              Explore Skills
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default NotFound
