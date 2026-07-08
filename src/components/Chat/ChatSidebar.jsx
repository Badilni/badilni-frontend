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
    iso
      ? new Date(iso).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : ''

  return (
    <div
      className={`w-full md:w-80 lg:w-1/4 h-full bg-[var(--whiteBackground)] border-r border-gray-100 dark:border-[var(--border-color)] flex flex-col p-4 md:p-6 shrink-0 transition-all duration-300 ${
        viewMode === 'sidebar' ? 'flex' : 'hidden md:flex'
      }`}
    >
      {/* User Profile Section */}
      <div className="relative flex flex-col items-center text-center mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/30 dark:from-slate-800/40 dark:to-slate-800/10 border border-blue-100/20 dark:border-slate-800">
        <div className="relative">
          <img
            src={
              user?.avatar?.url ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
            }
            alt="My Profile"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 shadow-md border-2 border-[var(--success)] transition-transform duration-300 hover:scale-105"
          />
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-[var(--success)] border-2 border-white dark:border-slate-800 rounded-full shadow-sm"></span>
        </div>
        <h2 className="text-base md:text-lg font-bold mt-3 text-[var(--black-text)] tracking-tight">
          {user?.name || 'User Profile'}
        </h2>
        <div className="mt-1.5 px-3 py-0.5 bg-green-500/10 text-[var(--success)] text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
          available
        </div>
      </div>

      {/* Search Input Section */}
      <div className="relative mb-6 group">
        <FiSearch className="absolute left-4 top-3.5 text-[var(--gray-text)] size-4 transition-colors group-focus-within:text-blue-500" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 dark:bg-slate-800/60 text-[var(--black-text)] border border-gray-100 dark:border-slate-700/50 pl-11 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm focus:shadow-md"
        />
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <span className="font-bold text-xs uppercase tracking-wider text-[var(--gray-text)]">
          Last chats
        </span>
      </div>

      {/* Chats Scrollable Container List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredChats.map((chat) => {
          console.log('Rendering Chat Item:', chat)

          const otherParticipant = chat.participants?.find(
            (p) => p._id !== user?._id
          )
          const lastMessageText = chat.lastMessage?.body || ''
          const lastMessageTime = formatTime(
            chat.lastMessage?.createdAt || chat.updatedAt
          )
          const isActive = chat._id === activeChatId

          return (
            <div
              key={chat._id}
              onClick={() => onSelectChat(chat._id)}
              className={`flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50/80 to-blue-50/20 dark:from-slate-800/80 dark:to-slate-800/30 border-blue-100 dark:border-slate-700 shadow-sm'
                  : 'bg-transparent border-transparent hover:bg-gray-50/50 dark:hover:bg-slate-800/30'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-r-full"></span>
              )}
              <img
                src={
                  otherParticipant?.avatar?.url ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                }
                className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover shrink-0 border border-gray-100 dark:border-slate-700/60 shadow-sm"
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
