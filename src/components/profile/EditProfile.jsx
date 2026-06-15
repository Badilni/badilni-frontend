import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import { FiCamera, FiLink, FiGithub, FiX, FiSave } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'

const EditProfile = () => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)

  // Pre-fill from auth store where available
  const [form, setForm] = useState({
    name: user?.name || user?.username || '',
    title: user?.title || '',
    bio: user?.bio || '',
    portfolio: user?.portfolio || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
  })

  const [skills, setSkills] = useState(
    user?.skills || [
      'UX Design',
      'UI Animation',
      'Figma',
      'User Research',
      'Design Systems',
    ]
  )
  const [newSkill, setNewSkill] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'User')}&background=2f97e9&color=fff&size=160`
  )

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill))

  const handleSave = () => {
    // TODO: wire to PATCH /profile API
    navigate('/profile')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-10">
        {/* Page title & actions */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[var(--black-text)]">
            Edit Profile
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--gray-text)] hover:bg-[var(--background-light)] border border-[var(--gray-text)]/20 transition-all"
            >
              <FiX size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              <FiSave size={14} /> Save Changes
            </button>
          </div>
        </div>

        {/* Card wrapper */}
        <div className="bg-[var(--whiteBackground)] rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_4px_24px_rgba(47,151,233,0.09)] p-8 md:p-12 space-y-10">
          {/* ── Avatar ───────────────────────────────────────────── */}
          <section className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[var(--secondary-light)]/30 shadow-xl">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-1 right-1 w-10 h-10 bg-gradient-to-br from-[var(--secondary-light)] to-[var(--primary-light)] text-white rounded-full flex items-center justify-center border-4 border-[var(--whiteBackground)] hover:scale-110 transition-transform shadow-lg cursor-pointer"
              >
                <FiCamera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-[var(--black-text)]">
                Profile Photo
              </p>
              <p className="text-xs text-[var(--gray-text)]">
                JPG, GIF or PNG. Max 800 KB
              </p>
            </div>
          </section>

          {/* ── Personal Information ──────────────────────────────── */}
          <section className="space-y-5">
            <h3 className="font-bold text-[var(--black-text)] text-lg border-b border-[var(--gray-text)]/20 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--gray-text)] uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--gray-text)] uppercase tracking-wide">
                  Professional Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior UX Designer"
                  className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[var(--gray-text)] uppercase tracking-wide">
                  Bio / About Me
                </label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell others about yourself..."
                  className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* ── Social / Web Links ────────────────────────────────── */}
          <section className="space-y-4">
            <h3 className="font-bold text-[var(--black-text)] text-lg border-b border-[var(--gray-text)]/20 pb-2">
              Web &amp; Social Presence
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: 'portfolio',
                  icon: <FiLink size={15} />,
                  placeholder: 'Portfolio URL',
                },
                {
                  name: 'linkedin',
                  icon: <FaLinkedinIn size={15} />,
                  placeholder: 'LinkedIn Profile URL',
                },
                {
                  name: 'github',
                  icon: <FiGithub size={15} />,
                  placeholder: 'GitHub Username or URL',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl focus-within:ring-2 focus-within:ring-[var(--primary-light)]/40 transition-all"
                >
                  <span className="pl-4 pr-3 text-base border-r border-[var(--gray-text)]/20">
                    {item.icon}
                  </span>
                  <input
                    name={item.name}
                    type="text"
                    value={form[item.name]}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className="flex-1 bg-transparent border-none outline-none px-3 py-3 text-sm text-[var(--black-text)] placeholder:text-[var(--gray-text)]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ── Skills ───────────────────────────────────────────── */}
          <section className="space-y-4">
            <h3 className="font-bold text-[var(--black-text)] text-lg border-b border-[var(--gray-text)]/20 pb-2">
              Skills &amp; Expertise
            </h3>

            {/* Existing skills */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-2 bg-[var(--primary-light)]/10 text-[var(--primary-light)] border border-[var(--primary-light)]/20 px-4 py-2 rounded-full text-sm font-medium transition-all"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="opacity-40 group-hover:opacity-100 hover:text-red-500 transition-all text-xs leading-none"
                    aria-label={`Remove ${skill}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Add skill row */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a new skill..."
                className="flex-1 bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-2.5 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all"
              />
              <button
                onClick={addSkill}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                + Add
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EditProfile
