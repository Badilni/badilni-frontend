import FooterLogo from '../../../public/logo.png'

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3
      className="font-bold text-sm mb-4"
      style={{ color: 'var(--black-text)' }}
    >
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-xs transition-colors duration-200"
            style={{ color: 'var(--gray-text)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'var(--primary-light)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--gray-text)')
            }
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const linksData = {
    services: [
      { label: 'Meetings', href: '#' },
      { label: 'chat', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
    resources: [{ label: 'Support', href: '#' }],
    company: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    footer: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Cookie settings', href: '#' },
    ],
  }

  return (
    <footer className="relative border-t transition-colors duration-300 overflow-hidden w-full"
            style={{ backgroundColor: 'var(--background-light)', borderColor: 'var(--border-color)', color: 'var(--black-text)' }}>

      {/* Background Text */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-5 text-center"
        style={{
          fontSize: '220px',
          fontWeight: 'bold',
          lineHeight: '0.85',
          color: 'var(--black-text)',
          zIndex: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          height: '140px',
        }}
      >
        Badilni
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 pb-12"
          style={{ borderBottom: '1px solid var(--border-color)' }}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={FooterLogo}
                alt="Badilni Logo"
                className="w-8 h-8 object-contain"
              />
              <span
                className="text-2xl font-bold"
                style={{ color: 'var(--secondary-light)' }}
              >
                Badilni
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-md"
              style={{ color: 'var(--gray-text)' }}
            >
              The first community marketplace empowering you to grow your
              skills—entirely exchange-based, no money involved
            </p>
            <p
              className="text-sm leading-relaxed mb-6 max-w-md"
              style={{ color: 'var(--gray-text)' }}
            >
              Your time is your currency. Barter your skills, build your future
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <FooterLinkColumn title="services" links={linksData.services} />
            <FooterLinkColumn title="Resources" links={linksData.resources} />
            <FooterLinkColumn title="Company" links={linksData.company} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs" style={{ color: 'var(--gray-text)' }}>
            {currentYear} badilni. All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {linksData.footer.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs underline transition-colors duration-200"
                style={{ color: 'var(--gray-text)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--primary-light)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--gray-text)')
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
