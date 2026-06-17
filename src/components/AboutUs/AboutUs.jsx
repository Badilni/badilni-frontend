
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import OurTeam from './team';
import LastSection from './LastSection';

export default function BadilniLandingPage() {

  return (
    <div className="bg-[var(--background-light)] text-[var(--black-text)] font-sans antialiased overflow-x-hidden transition-colors duration-300">

      {/* 1. SectionOne*/}
      <SectionOne />

      {/* 2. SectionTwo*/}
      <SectionTwo />

      {/* 3. Interconnected Growth Ecosystem Section */}
      <SectionThree />

      {/* 4. Statistics Section */}
      <section className="bg-[var(--primary-light)] text-white py-16 px-6 rounded-[2rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-center justify-items-center">
          <div className="space-y-2 flex flex-col items-center">
            <h3 className="text-5xl font-light">20k+</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Learning Sessions</p>
            <p className="text-xs text-blue-100/70 max-w-xs leading-relaxed mx-auto">
              Synchronous exchanges held across 42 time zones monthly.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center">
            <h3 className="text-5xl font-light">94%</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Satisfaction Rate</p>
            <p className="text-xs text-blue-100/70 max-w-xs leading-relaxed mx-auto">
              Of our learners report immediate career advancement.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center">
            <h3 className="text-5xl font-light">120+</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Unique Skills</p>
            <p className="text-xs text-blue-100/70 max-w-xs leading-relaxed mx-auto">
              From Quantum Computing to Renaissance Art appreciation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Our Team Section */}
      <OurTeam />

      {/* 6. CTA Footer Card */}
      <LastSection />

    </div>
  );
}
