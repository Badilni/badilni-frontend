import { FaLightbulb, FaShareAlt, FaAward } from 'react-icons/fa';

export default function SectionTwo() {
  return (
    <section className="bg-[var(--whiteBackground)] border-y border-[var(--gray-text)]/10 rounded-[2rem] py-20 px-6 transition-colors duration-300">
      {/* 2. The Ripple Effect Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold">The Ripple Effect</h2>
        <p className="text-[var(--gray-text)] text-sm max-w-xl mx-auto leading-relaxed">
          One skill shared, a thousand paths enlightened. Explore how our ecosystem fosters exponential growth.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-[var(--gray-text)]/20 z-0" />
        <div className="flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer">
          <div className="w-20 h-20 bg-[var(--whiteBackground)] text-[var(--black-text)] rounded-full flex items-center justify-center border border-[var(--gray-text)]/10 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-[var(--warning)]/40 z-10">
            <FaLightbulb className="w-6 h-6 text-[var(--warning)] transition-transform duration-300 group-hover:rotate-12 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          </div>
          <span className="text-xs font-semibold text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--black-text)]">01. Spark</span>
          <p className="text-xs text-[var(--gray-text)] max-w-[240px] leading-relaxed">
            An expert decides to share a single insight, transforming years of experience into a concise lesson.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer">
          <div className="w-20 h-20 bg-[var(--primary-light)] text-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-[var(--primary-light)]/90 z-10">
            <FaShareAlt className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
          </div>
          <span className="text-xs font-semibold text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--primary-light)]">02. Velocity</span>
          <p className="text-xs text-[var(--gray-text)] max-w-[240px] leading-relaxed">
            That lesson reaches a seeker, who applies it instantly to a real-world project, creating immediate value.
          </p>
        </div>


        <div className="flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer">
          <div className="w-20 h-20 bg-[var(--whiteBackground)] text-[var(--black-text)] rounded-full flex items-center justify-center border border-[var(--gray-text)]/10 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-[var(--success)]/40 z-10">
            <FaAward className="w-6 h-6 text-[var(--success)] transition-transform duration-300 group-hover:scale-115" />
          </div>
          <span className="text-xs font-semibold text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--black-text)]">03. Impact</span>
          <p className="text-xs text-[var(--gray-text)] max-w-[240px] leading-relaxed">
            The seeker becomes a mentor, passing the torch to numbers. The ripple becomes a wave of change.
          </p>
        </div>
      </div>
    </section>
  );
}
