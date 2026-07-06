import { useNavigate } from 'react-router-dom'

export default function ExploreCTA() {
  const navigate = useNavigate()

  return (
    <>
      {/* CTA Banner */}
      <section className="mt-24 relative group">
        {/* Glow halo backing */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 to-indigo-650 rounded-[2.5rem] opacity-75 blur-[2px] z-0" />
        <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-600 to-indigo-650 rounded-[3rem] opacity-10 blur-xl pointer-events-none z-0" />

        <div className="relative z-10 overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Internal floating background lights */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-80 h-80 rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 rounded-full bg-purple-500/10 blur-[80px]" />
          </div>

          <div className="relative z-10 text-center md:text-left space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/15 px-3.5 py-1.5 rounded-full border border-blue-500/25">
              Share Your Knowledge
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Ready to Share Your Talents?
            </h3>
            <p className="text-slate-400 text-sm md:text-base max-w-md font-semibold">
              Update your profile, list what you want to teach, and help others in the Badilni community grow.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/profile/edit')}
              className="bg-white text-slate-900 font-extrabold text-sm px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer w-full md:w-auto text-center"
            >
              Become a Swapper
            </button>
            <button
              onClick={() => navigate('/about')}
              className="border border-white/20 text-white font-extrabold text-sm px-8 py-4 rounded-2xl hover:bg-white/5 transition-all duration-200 active:scale-95 cursor-pointer w-full md:w-auto text-center"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
