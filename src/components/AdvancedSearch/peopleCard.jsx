import { BsChat, BsStarFill } from 'react-icons/bs'

export default function UserCard({ user }) {
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null
    return typeof avatar === 'object' ? avatar.url : avatar
  }

  const avatarUrl = getAvatarUrl(user.avatar)

  return (
    <div
      className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between overflow-visible relative group p-4 gap-4"
      style={{
        backgroundColor: 'var(--whiteBackground)',
        borderColor: 'var(--border-color)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
        className="relative w-full aspect-square rounded-xl overflow-visible shadow-inner border-none group/img"
        style={{
          backgroundColor: 'var(--background-secondary)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-light)] to-[var(--secondary-light)] flex items-center justify-center text-white font-bold text-2xl rounded-xl z-0">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>

        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={user.name}
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 z-10"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}

        {/* Rating Badge */}
        <div
          className="absolute -top-2 -right-2 z-50 flex items-center gap-1 backdrop-blur-sm text-[10px] px-2 py-1 rounded-lg shadow-lg border font-bold"
          style={{
            backgroundColor: 'var(--whiteBackground)',
            borderColor: 'var(--border-color)',
            color: '#fbbf24',
          }}
        >
          <BsStarFill className="w-2.5 h-2.5" />
          <span style={{ color: 'var(--black-text)' }}>
            {Number(user.averageRating ?? 0).toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow text-left space-y-1 px-1">
        <h3
          className="font-bold text-base hover:opacity-80 cursor-pointer transition-opacity line-clamp-1"
          style={{
            color: 'var(--black-text)',
          }}
        >
          {user.name || 'Unknown User'}
        </h3>
        <p
          className="text-[10px] font-bold tracking-wide uppercase"
          style={{
            color: 'var(--primary-light)',
          }}
        >
          Speaker / Consultant
        </p>
      </div>

      <div className="w-full pt-1">
        <button
          onClick={() => {
            /* openChat(user._id); */
          }}
          className="w-full py-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium transition-all duration-200 border"
          style={{
            backgroundColor: 'var(--background-light)',
            color: 'var(--black-text)',
            borderColor: 'var(--border-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-light)'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--background-light)'
            e.currentTarget.style.color = 'var(--black-text)'
          }}
        >
          <BsChat className="w-3.5 h-3.5" />
          <span className="text-sm">Chat</span>
        </button>
      </div>
    </div>
  )
}
