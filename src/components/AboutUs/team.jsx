import shahdImg from '../../assets/TeamImage/shahd.png';
import asmaaImg from '../../assets/TeamImage/asmaa.jpeg';
import BeminImg from '../../assets/TeamImage/404.avif';
import SajaImg from '../../assets/TeamImage/Saja.jpeg';
import sohilaImg from '../../assets/TeamImage/sohila.jpeg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function OurTeam() {

  const teamMembers = [
    {
      id: 1,
      name: "Shahd Mohamed",
      role: "Software Engineer",
      image: shahdImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/shahdelmeniawy/",
        github: "https://github.com/ShahdElmeniawy"
      }
    },
    {
      id: 2,
      name: "Asmaa Mohamed",
      role: "Software Engineer",
      image: asmaaImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/asmaa-soliman99/",
        github: "https://github.com/asmaasoliman99"
      }
    },
    {
      id: 3,
      name: "Bemin Raffat",
      role: "Software Engineer",
      image: BeminImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/bemin-raafat/",
        github: "https://github.com/Bemin12"
      }
    },
    {
      id: 4,
      name: "Saja Malek",
      role: "Software Engineer",
      image: SajaImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/saja-malek/",
        github: "https://github.com/sajamalek90"

      }
    },
    {
      id: 5,
      name: "Sohila Ahmed",
      role: "Software Engineer",
      image: sohilaImg,
      socials: {
        linkedin: "https://www.linkedin.com/in/sohila-ahmed-13441828b/e",
        github: "https://github.com/sohilaahmed00"
      }
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Meet the Visionaries</h2>
          <p className="text-[var(--gray-text)] text-sm max-w-md mx-auto leading-relaxed">
            The minds behind the mission, committed to democratizing high-level professional expertise.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="space-y-4 group cursor-pointer">

            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[var(--whiteBackground)] shadow-sm border border-[var(--gray-text)]/10">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80";
                }}
              />
            </div>

            <div className="space-y-1 relative">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[var(--black-text)]">{member.name}</h4>

                <div className="flex items-center gap-2 transition-colors duration-300">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gray-text)]/70 hover:text-[#0077b5] transition-colors"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gray-text)]/70 hover:text-[var(--black-text)] dark:hover:text-white transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-[var(--primary-light)] font-medium">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
