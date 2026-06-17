import { FaArrowRight, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function SectionOne() {
  return (
    <div className="bg-[var(--background-light)] text-[var(--black-text)] transition-colors duration-300">

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* leftSide-titles*/}
        <div className="space-y-6">
          <span className="text-xs font-bold tracking-widest text-[var(--gray-text)] uppercase">
            OUR MANIFESTO
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Bridging{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Human
            </span>{' '}
            <br /> Potential
          </h1>
          <p className="text-[var(--gray-text)] max-w-md leading-relaxed text-sm md:text-base">
            Badilni isn't just a platform; it's a movement. We believe that true growth happens when you cross traditional barriers and exchange expertise across borders and industry.
          </p>
          <Link to='/signIn' className="inline-flex items-center gap-2 bg-[var(--primary-light)] text-white px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity group">
            Our Community
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative flex justify-center w-full">
          <div className="relative group w-full max-w-[450px] overflow-visible">
            <div className="absolute inset-0 bg-[#1e293b] dark:bg-[#f8fafc] rounded-[2rem] -rotate-6 scale-105 z-0 shadow-2xl transition-transform group-hover:rotate-0 duration-500"></div>

            <div className="w-full aspect-[4/5] bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2rem] relative overflow-hidden shadow-xl flex items-center justify-center z-10">
              <div className="w-[75%] p-2 rounded-lg shadow-2xl border border-[var(--primary-light)] bg-black/20 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
                  alt="Workspace"
                  className="rounded object-cover w-full aspect-video"
                />
              </div>
            </div>

            <div className="absolute bottom-6 -left-4 md:-left-6 bg-[var(--background-light)] backdrop-blur-md border border-[var(--gray-text)]/10 p-3 rounded-xl shadow-lg flex items-center gap-3 max-w-[220px] z-20">
              <div className="p-2 bg-[#3b82f6] text-white rounded-lg animate-pulse">
                <FaGlobe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--black-text)]">120+ Local Hubs</p>
                <p className="text-[10px] text-[var(--gray-text)]">Connecting learners globally</p>
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
