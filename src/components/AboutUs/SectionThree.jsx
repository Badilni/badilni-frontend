
import { FaCheckCircle, FaBrain } from 'react-icons/fa';

export default function SectionThree() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <div className="relative min-h-[380px] flex items-center justify-center group/map overflow-visible">
        <div className="w-28 h-28 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-xl z-10 transition-transform duration-500 group-hover/map:scale-105">
          <FaBrain className="w-8 h-8 mb-2 animate-bounce duration-1000" />
          <span className="text-xs font-bold tracking-wider uppercase">Mind</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center -z-0 pointer-events-none opacity-30 transition-colors duration-300">
          <div className="w-[80%] h-[80%] border border-dashed border-[var(--black-text)] dark:border-white rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="w-[50%] h-[50%] absolute border border-dashed border-[var(--black-text)] dark:border-white rounded-full animate-[spin_30s_linear_infinite_reverse]" />
        </div>

        <div className="absolute top-4 left-12 bg-[var(--whiteBackground)] px-4 py-2 rounded-xl shadow-md border border-[var(--gray-text)]/10 text-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-[var(--primary-light)] animate-[float_4s_ease-in-out_infinite]">
          <p className="text-[10px] text-[var(--primary-light)] animate-pulse">▲</p>
          <p className="text-xs font-bold text-[var(--black-text)]">Design</p>
        </div>

        <div className="absolute top-12 right-12 bg-[var(--whiteBackground)] px-4 py-2 rounded-xl shadow-md border border-[var(--gray-text)]/10 text-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-[var(--secondary-light)] animate-[float_5s_ease-in-out_infinite_1s]">
          <p className="text-[10px] text-[var(--secondary-light)] font-mono">&lt; &gt;</p>
          <p className="text-xs font-bold text-[var(--black-text)]">Engineering</p>
        </div>

        <div className="absolute bottom-12 right-24 bg-[var(--whiteBackground)] px-4 py-2 rounded-xl shadow-md border border-[var(--gray-text)]/10 text-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-[var(--danger)] animate-[float_4.5s_ease-in-out_infinite_0.5s]">
          <p className="text-[10px] text-[var(--danger)]">📈</p>
          <p className="text-xs font-bold text-[var(--black-text)]">Strategy</p>
        </div>

        <div className="absolute bottom-6 left-10 bg-[var(--whiteBackground)] px-4 py-2 rounded-xl shadow-md border border-[var(--gray-text)]/10 text-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-[var(--warning)] animate-[float_6s_ease-in-out_infinite_1.5s]">
          <p className="text-[10px] text-[var(--warning)]">✍️</p>
          <p className="text-xs font-bold text-[var(--black-text)]">Fine Art</p>
        </div>
      </div>

      {/*  RightSide-titles*/}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold leading-tight">
          Interconnected <br /> Growth Ecosystem
        </h2>
        <p className="text-[var(--gray-text)] text-sm leading-relaxed">
          We reject the siloed approach to learning. On Badilni, a designer learns strategy, an engineer explores aesthetics, and a leader understands the code that drives their vision.
        </p>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3 group cursor-pointer">
            <FaCheckCircle className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-120" />
            <p className="text-xs text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--black-text)]">
              <strong className="text-[var(--black-text)]">Cross-Disciplinary Mentorship:</strong> Engage with mentors outside your immediate domain.
            </p>
          </div>
          <div className="flex items-start gap-3 group cursor-pointer">
            <FaCheckCircle className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-120" />
            <p className="text-xs text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--black-text)]">
              <strong className="text-[var(--black-text)]">Fluid Skill Mapping:</strong> Visualize how your skills connect and lead to new opportunities.
            </p>
          </div>
          <div className="flex items-start gap-3 group cursor-pointer">
            <FaCheckCircle className="w-5 h-5 text-[var(--success)] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-120" />
            <p className="text-xs text-[var(--gray-text)] transition-colors duration-300 group-hover:text-[var(--black-text)]">
              <strong className="text-[var(--black-text)]">Open Knowledge Exchange:</strong> No paywalls, just peer-to-peer value creation.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
