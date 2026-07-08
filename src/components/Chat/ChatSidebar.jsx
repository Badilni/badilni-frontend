import { FiSearch } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'

const ChatSidebar = ({
  viewMode,
  searchQuery,
  setSearchQuery,
  filteredChats,
  activeChatId,
  onSelectChat,
}) => {
  const user = useAuthStore((s) => s.user)

  const formatTime = (iso) =>
    iso ? new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''

  return (
    <div
      className={`w-full md:w-80 lg:w-1/4 h-full bg-[var(--whiteBackground)] dark:border-r dark:border-[var(--border-color)] flex flex-col p-4 md:p-6 shrink-0 transition-all duration-300 ${
        viewMode === 'sidebar' ? 'flex' : 'hidden md:flex'
      }`}
    >
      {/* User Profile Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative">
          <img
            src={user?.avatar?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
            alt="My Profile"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[var(--success)]"
          />
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[var(--success)] border-2 border-[var(--whiteBackground)] rounded-full"></span>
        </div>
        <h2 className="text-lg md:text-xl font-bold mt-3 text-[var(--black-text)]">
          {user?.name || 'Jontray Arnold'}
        </h2>
        <button className="mt-1 px-3 py-0.5 bg-[var(--backgSuccessOpacity)] text-[var(--success)] text-[11px] font-semibold rounded-full flex items-center gap-1">
          available <span className="text-[9px]">▼</span>
        </button>
      </div>

      {/* Search Input Section */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-3.5 text-[var(--gray-text)] size-4" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--background-light)] text-[var(--black-text)] pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40"
        />
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-sm md:text-base text-[var(--black-text)]">
          Last chats
        </span>
      </div>

      {/* Chats Scrollable Container List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredChats.map((chat) => {
          console.log("Rendering Chat Item:", chat);

          const otherParticipant = chat.participants?.find((p) => p._id !== user?._id)
          const lastMessageText = chat.lastMessage?.body || ''
          const lastMessageTime = formatTime(chat.lastMessage?.createdAt || chat.updatedAt)
          const isActive = chat._id === activeChatId

          return (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat._id)}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                isActive
                  ? 'bg-[var(--background-light)] scale-[0.99]'
                  : 'hover:bg-[var(--background-light)]/40'
              }`}
            >
              <img
                src={otherParticipant?.avatar?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover shrink-0"
                alt=""
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-sm truncate text-[var(--black-text)]">
                    {otherParticipant?.name || 'Unknown User'}
                  </h4>
                  <span className="text-[10px] md:text-[11px] text-[var(--gray-text)] ml-2 shrink-0">
                    {lastMessageTime}
                  </span>
                </div>

                {chat.typing ? (
                  <p className="text-xs text-[var(--success)] font-medium truncate mt-0.5 animate-pulse">
                    typing...
                  </p>
                ) : (
                  <p className="text-xs text-[var(--gray-text)] truncate mt-0.5">
                    {lastMessageText}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatSidebar
