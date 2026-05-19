import { useSpinner } from '../../hooks/useSpinner'
import logoImg from '/logo.png'
import { useThemeStore } from '../../store/themeStore'

const Spinner = () => {
  const { text, showText } = useSpinner('Badilni')
  // Accessing the theme store ensures it gets initialized/loaded
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background-light)] transition-colors duration-300">
      <div className="flex items-center space-x-3">
        <div
          className={`transition-transform duration-700 ease-in-out ${showText ? '-translate-x-2' : 'translate-x-12'}`}
        >
          <div className=" flex items-center justify-center">
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        <div className="relative">
          <h1 className="text-[var(--black-text)] text-3xl font-poppins font-bold tracking-wider transition-colors duration-300">
            {text}
            {showText && (
              <span className="inline-block w-[2px] h-7 bg-[var(--secondary-light)] ml-1 animate-pulse"></span>
            )}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Spinner
