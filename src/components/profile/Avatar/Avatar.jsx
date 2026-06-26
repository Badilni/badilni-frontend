import { FiCamera, FiTrash2 } from 'react-icons/fi'
import ConfirmModal from './AvatarConfirmModal'

const ALLOWED_AVATAR_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const AvatarSection = ({
  name,
  avatarPreview,
  setAvatarPreview,
  setAvatarFile,
  setIsAvatarRemoved,
  showConfirmModal,
  setShowConfirmModal,
  errors,
  setErrors,
  confirmRemoveAvatar,
}) => {
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
    setIsAvatarRemoved(false)
  }

  return (
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
            onClick={() => setShowConfirmModal(true)}
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

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmRemoveAvatar}
        title="Remove Profile Picture"
        message="Are you sure you want to remove your profile picture? This change will be saved when you submit the form."
      />
    </section>
  )
}

export default AvatarSection
