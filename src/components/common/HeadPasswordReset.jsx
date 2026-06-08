import ThemeToggle from '../common/ThemeToggle';



const HeadPasswordReset = () => {
  return (
    <header className="w-full max-w-[480px] flex justify-between items-center mb-4 px-2">
        <h2 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] bg-clip-text text-transparent">
          Badilni
        </h2>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
        </div>
      </header>
  )
}

export default HeadPasswordReset

