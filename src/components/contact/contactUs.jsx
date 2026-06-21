import { FaEnvelope, FaMapPin, FaChevronDown, FaArrowRight } from 'react-icons/fa6';
import useContactUs from '../../hooks/Contact/useContact';
import HelpHeroSection from './HeaderContact';

function ContactUs() {
  const {
    formData,
    handleInputChange,
    handleFormSubmit,
  } = useContactUs();

  return (
    <div className="relative min-h-screen bg-[var(--background-light)] text-[var(--black-text)] font-sans antialiased transition-colors duration-300 w-full">

      <HelpHeroSection />

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 mt-8">
        <div className="lg:col-span-2 bg-[var(--whiteBackground)] rounded-xl border border-slate-200/10 dark:border-slate-700/50 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--black-text)] mb-6">
            Send us a message
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--gray-text)] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name here"
                  className="w-full bg-[var(--background-light)] border border-slate-200/20 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-[var(--black-text)] focus:outline-none focus:border-[var(--primary-light)] placeholder:text-[var(--Disabled)] transition-colors"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--gray-text)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-[var(--background-light)] border border-slate-200/20 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-[var(--black-text)] focus:outline-none focus:border-[var(--primary-light)] placeholder:text-[var(--Disabled)] transition-colors"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--gray-text)] mb-1.5">
                Subject
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[var(--background-light)] border border-slate-200/20 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-[var(--primary-light)] text-[var(--black-text)] transition-colors"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                >
                  <option className="bg-[var(--whiteBackground)]">Technical Support</option>
                  <option className="bg-[var(--whiteBackground)]">Account Issues</option>
                  <option className="bg-[var(--whiteBackground)]">Feedback</option>
                </select>
                <FaChevronDown className="absolute right-3 top-4 h-3 w-3 text-[var(--gray-text)] pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--gray-text)] mb-1.5">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="How can we help you today?"
                className="w-full bg-[var(--background-light)] border border-slate-200/20 dark:border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-[var(--black-text)] focus:outline-none focus:border-[var(--primary-light)] resize-none placeholder:text-[var(--Disabled)] transition-colors"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[var(--primary-light)] text-white dark:text-[var(--black-text)] dark:bg-[var(--primary-light)] font-medium text-sm px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-[var(--whiteBackground)] rounded-xl border border-slate-200/10 dark:border-slate-700/50 p-6 shadow-sm space-y-6">
            <h2 className="text-sm font-semibold text-[var(--black-text)] mb-4">
              Contact Information
            </h2>

            <div className="flex items-start gap-4">
              <div className="bg-blue-500/10 text-[var(--primary-light)] p-2.5 rounded-lg flex items-center justify-center shrink-0">
                <FaEnvelope className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-[var(--gray-text)]">Email Support</p>
                <p className="text-sm font-semibold text-[var(--black-text)] break-all">benrt101@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-500/10 text-[var(--primary-light)] p-2.5 rounded-lg flex items-center justify-center shrink-0">
                <FaMapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-[var(--gray-text)]">Main Office</p>
                <p className="text-sm text-[var(--black-text)] font-semibold leading-tight">
                  Fayoum City, Egypt
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--primary-light)] to-[var(--secondary-light)] h-70 rounded-xl p-8 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-2">Have a quick question?</h3>
              <p className="text-xs text-blue-50/90 dark:text-slate-900/80 leading-relaxed">
                You might find the answer you're looking for in our FAQ section.
              </p>
            </div>
            <button className="bg-white text-blue-600 dark:bg-slate-900 dark:text-[var(--primary-light)] text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer w-full mt-4">
              <span>Browse FAQs</span>
              <FaArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </main>

      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-[var(--whiteBackground)] rounded-xl border border-slate-200/20 dark:border-slate-700/50 h-64 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="bg-[var(--background-light)] rounded-xl shadow-lg border border-slate-200/10 dark:border-slate-700/50 p-4 flex items-center gap-3 z-10 max-w-sm">
            <div className="bg-[var(--owl-logo)] text-white dark:bg-[var(--primary-light)] dark:text-slate-900 p-2.5 rounded-full flex items-center justify-center shrink-0">
              <FaMapPin className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--black-text)]">Badilni Office</h4>
              <p className="text-[11px] text-[var(--gray-text)]">Fayoum Government, Egypt</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactUs;
