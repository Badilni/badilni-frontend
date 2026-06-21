import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleToastMessage } from '../../utils/helper'
import { FiCamera, FiX, FiSave, FiTrash2 } from 'react-icons/fi'
import { useProfile, useUpdateProfile } from '../../hooks/Profile/useProfile'

const ALLOWED_AVATAR_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
const MAX_SKILL_TAGS = 20
const MAX_BIO_LENGTH = 500

const sameTagSet = (a = [], b = []) =>
  a.length === b.length &&
  JSON.stringify([...a].sort()) === JSON.stringify([...b].sort())

const EditProfile = () => {
  const navigate = useNavigate()
  const { profile, isLoading: isProfileLoading } = useProfile()
  const updateProfileMutation = useUpdateProfile()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [skillTags, setSkillTags] = useState([])
  const [newSkill, setNewSkill] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [errors, setErrors] = useState({})

  // Prefill once GET /users/me resolves
  useEffect(() => {
    if (profile) {
      setName(profile.name || '')
      setBio(profile.bio || '')
      setSkillTags(Array.isArray(profile.skillTags) ? profile.skillTags : [])
      setAvatarPreview(profile.avatar?.url || '')
    }
  }, [profile])

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || 'User'
  )}&background=2f97e9&color=fff&size=160`

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: 'Only JPG, PNG, or WEBP images are allowed.',
      }))
      e.target.value = ''
      return
    }

    setErrors((prev) => ({ ...prev, avatar: undefined }))
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleRemoveAvatar = () => {
    setAvatarFile(null)
    setAvatarPreview('')
  }

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (!trimmed) return

    if (skillTags.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill('')
      return
    }

    if (skillTags.length >= MAX_SKILL_TAGS) {
      setErrors((prev) => ({
        ...prev,
        skillTags: `You can add up to ${MAX_SKILL_TAGS} skills.`,
      }))
      return
    }

    setSkillTags((prev) => [...prev, trimmed])
    setNewSkill('')
    setErrors((prev) => ({ ...prev, skillTags: undefined }))
  }

  const removeSkill = (skill) =>
    setSkillTags((prev) => prev.filter((s) => s !== skill))

  const validate = () => {
    const next = {}
    if (name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters.'
    }
    if (bio.length > MAX_BIO_LENGTH) {
      next.bio = `Bio must be ${MAX_BIO_LENGTH} characters or fewer.`
    }
    setErrors((prev) => ({ ...prev, ...next }))
    return !next.name && !next.bio
  }

  const handleSave = () => {
    if (!validate()) return

    const formData = new FormData()
    const nameChanged = name.trim() !== (profile?.name || '')
    const bioChanged = bio !== (profile?.bio || '')
    const tagsChanged = !sameTagSet(skillTags, profile?.skillTags || [])

    if (nameChanged) formData.append('name', name.trim())
    if (bioChanged) formData.append('bio', bio)
    if (avatarFile) formData.append('avatar', avatarFile)
    if (tagsChanged) {
      skillTags.forEach((tag) => formData.append('skillTags', tag))
    }

    if (![...formData.keys()].length) {
      handleToastMessage('Nothing to update yet.', 'default')
      return
    }

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        handleToastMessage('Profile updated successfully!', 'success')
        navigate('/profile')
      },
      onError: (err) => {
        handleToastMessage(
          err?.response?.data?.message ||
            'Something went wrong while updating your profile.',
          'error'
        )
      },
    })
  }

  if (isProfileLoading) {
    return (
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <p className="text-[var(--gray-text)] text-sm">Loading your profile…</p>
      </main>
    )
  }

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-28 md:pb-10">
      {/* Page title & actions */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[var(--black-text)]">
          Edit Profile
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/profile')}
            disabled={updateProfileMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--gray-text)] hover:bg-[var(--background-light)] border border-[var(--gray-text)]/20 transition-all disabled:opacity-50"
          >
            <FiX size={14} /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={updateProfileMutation.isPending}
            className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
          >
            <FiSave size={14} />
            {updateProfileMutation.isPending ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Card wrapper */}
      <div className="bg-[var(--whiteBackground)] rounded-2xl border border-[var(--secondary-light)]/10 shadow-[0_4px_24px_rgba(47,151,233,0.09)] p-8 md:p-12 space-y-10">
        {/* ── Avatar ───────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[var(--secondary-light)]/30 shadow-xl bg-[var(--background-light)]">
              <img
                src={avatarPreview || fallbackAvatar}
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
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            {avatarPreview && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="absolute bottom-1 left-1 w-10 h-10 bg-[var(--whiteBackground)] text-red-500 rounded-full flex items-center justify-center border-4 border-[var(--whiteBackground)] hover:scale-110 transition-transform shadow-lg"
                aria-label="Remove avatar"
              >
                <FiTrash2 size={16} />
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm text-[var(--black-text)]">
              Profile Photo
            </p>
            <p className="text-xs text-[var(--gray-text)]">JPG, PNG, or WEBP</p>
            {errors.avatar && (
              <p className="text-xs text-red-500 mt-1">{errors.avatar}</p>
            )}
          </div>
        </section>

        {/* ── Personal Information ──────────────────────────────── */}
        <section className="space-y-5">
          <h3 className="font-bold text-[var(--black-text)] text-lg border-b border-[var(--gray-text)]/20 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[var(--gray-text)] uppercase tracking-wide">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[var(--gray-text)] uppercase tracking-wide">
                  Bio / About Me
                </label>
                <span
                  className={`text-xs ${
                    bio.length > MAX_BIO_LENGTH
                      ? 'text-red-500'
                      : 'text-[var(--gray-text)]'
                  }`}
                >
                  {bio.length}/{MAX_BIO_LENGTH}
                </span>
              </div>
              <textarea
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Tell others about yourself..."
                className="w-full bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-3 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all resize-none"
              />
              {errors.bio && (
                <p className="text-xs text-red-500">{errors.bio}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--gray-text)]/20 pb-2">
            <h3 className="font-bold text-[var(--black-text)] text-lg">
              Skills &amp; Expertise
            </h3>
            <span className="text-xs text-[var(--gray-text)]">
              {skillTags.length}/{MAX_SKILL_TAGS}
            </span>
          </div>

          {/* Existing skills */}
          {skillTags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {skillTags.map((skill) => (
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
          )}

          {/* Add skill row */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSkill()
                }
              }}
              placeholder="Add a new skill..."
              disabled={skillTags.length >= MAX_SKILL_TAGS}
              className="flex-1 bg-[var(--background-light)] border border-[var(--gray-text)]/20 rounded-xl px-4 py-2.5 text-sm text-[var(--black-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 transition-all disabled:opacity-50"
            />
            <button
              onClick={addSkill}
              disabled={skillTags.length >= MAX_SKILL_TAGS}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--secondary-light)] to-[var(--primary-light)] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              + Add
            </button>
          </div>
          {errors.skillTags && (
            <p className="text-xs text-red-500">{errors.skillTags}</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default EditProfile
