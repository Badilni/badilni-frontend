import {
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiFolder,
  FiImage,
  FiVideo,
} from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

const ChatInfoPanel = ({
  viewMode,
  setViewMode,
  currentChat,
  isInfoOpen,
  setIsInfoOpen,
}) => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const shouldShow = isInfoOpen || viewMode === 'info'

  const otherParticipant = currentChat?.participants?.find(
    (p) => p._id !== user?._id
  )

  // Dynamically calculate statistics from currentChat.messages
  const messages = currentChat?.messages || []
  let docCount = 0
  let photoCount = 0
  let videoCount = 0
  let otherCount = 0
  let docSize = 0
  let photoSize = 0
  let videoSize = 0
  let otherSize = 0
  let linksCount = 0

  messages.forEach((msg) => {
    if (msg.attachments && Array.isArray(msg.attachments)) {
      msg.attachments.forEach((att) => {
        const type = att.fileType || ''
        const size = att.fileSize || 0
        if (type === 'image' || att.url?.match(/\.(jpeg|jpg|gif|png|webp)/i)) {
          photoCount++
          photoSize += size
        } else if (type === 'video' || att.url?.match(/\.(mp4|mov|avi|mkv|webm)/i)) {
          videoCount++
          videoSize += size
        } else if (
          type === 'document' ||
          att.fileName?.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf)/i)
        ) {
          docCount++
          docSize += size
        } else {
          otherCount++
          otherSize += size
        }
      })
    }

    if (msg.body) {
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const matches = msg.body.match(urlRegex)
      if (matches) {
        linksCount += matches.length
      }
    }
  })

  const formatSize = (bytes) => {
    if (bytes === 0) return '0B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + sizes[i]
  }

  const dynamicBreakdown = [
    {
      name: 'Documents',
      count: `${docCount} files`,
      size: formatSize(docSize),
      color: 'text-[var(--primary-light)]',
      icon: FiFileText,
    },
    {
      name: 'Photos',
      count: `${photoCount} files`,
      size: formatSize(photoSize),
      color: 'text-[var(--success)]',
      icon: FiImage,
    },
    {
      name: 'Movies',
      count: `${videoCount} files`,
      size: formatSize(videoSize),
      color: 'text-[var(--danger)]',
      icon: FiVideo,
    },
    {
      name: 'Other',
      count: `${otherCount} files`,
      size: formatSize(otherSize),
      color: 'text-[var(--gray-text)]',
      icon: FiFolder,
    },
  ].filter((item) => parseInt(item.count) > 0)

  const filesCount = docCount + photoCount + videoCount + otherCount

  const handleClosePanel = () => {
    setIsInfoOpen(false)
    if (setViewMode) {
      setViewMode('chat')
    }
  }

  return (
    <>
      {/* Mobile/Tablet Backdrop Overlay */}
      {shouldShow && (
        <div
          onClick={handleClosePanel}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-[999] lg:hidden animate-fade-in"
        />
      )}

      {/* Main Panel Container */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full sm:w-80 bg-[var(--whiteBackground)] z-[1000]
        lg:static lg:h-full lg:w-80 xl:w-1/4 lg:z-auto
        p-4 md:p-6 shrink-0
        transition-all duration-300 ease-in-out transform
        ${
          shouldShow
            ? 'translate-x-0 flex opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none hidden lg:hidden'
        }
      `}
      >
        <div className="w-full h-full flex flex-col overflow-hidden min-w-[240px]">
          {/* Panel Header Controls */}
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <button
              onClick={handleClosePanel}
              className="p-1.5 bg-[var(--background-light)] rounded-lg text-[var(--gray-text)] lg:hidden hover:text-[var(--black-text)] transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              onClick={handleClosePanel}
              className="p-1.5 bg-[var(--background-light)] rounded-lg text-[var(--gray-text)] hover:text-[var(--black-text)] transition-colors hidden lg:block"
              title="Hide Details"
            >
              <FiChevronRight size={16} />
            </button>

            <h3 className="font-bold text-[var(--black-text)] text-sm md:text-base">
              Shared files
            </h3>
          </div>

          {currentChat && (
            <>
              {/* User Profile Overview Section */}
              <div
                onClick={() => {
                  if (otherParticipant?._id) {
                    navigate(`/profile/${otherParticipant._id}`)
                  }
                }}
                className="flex flex-col items-center text-center mb-6 shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={
                      otherParticipant?.avatar?.url ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                    }
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mb-3 shadow-md border transition-transform duration-300 group-hover:scale-105"
                    alt="User avatar"
                  />
                  <span className="absolute bottom-3 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--whiteBackground)] rounded-full"></span>
                </div>
                <h4 className="font-bold text-sm md:text-base text-[var(--black-text)] truncate max-w-full px-2 group-hover:text-blue-500 transition-colors">
                  {otherParticipant?.name || 'Unknown User'}
                </h4>
                {/* <span className="text-xs text-[var(--gray-text)] font-medium mt-0.5">
                  Active now
                </span> */}
              </div>

              {/* Shared Media Analytics Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6 shrink-0">
                <div className="bg-[var(--backgSuccessOpacity)] p-3 rounded-xl flex items-center gap-2 md:gap-3">
                  <FiFileText className="text-[var(--success)] size-5 md:size-6 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[9px] text-[var(--success)] font-bold uppercase tracking-wider truncate">
                      All files
                    </div>
                    <div className="text-sm md:text-base font-black text-[var(--black-text)] leading-tight">
                      {filesCount}
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--background-light)] p-3 rounded-xl flex items-center gap-2 md:gap-3">
                  <FiFolder className="text-[var(--gray-text)] size-5 md:size-6 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[9px] text-[var(--gray-text)] font-bold uppercase tracking-wider truncate">
                      All links
                    </div>
                    <div className="text-sm md:text-base font-black text-[var(--black-text)] leading-tight">
                      {linksCount}
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-[var(--gray-text)] block mb-3 shrink-0">
                File type
              </span>

              {/* Shared Files Categorized List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {dynamicBreakdown.length > 0 ? (
                  dynamicBreakdown.map((file, i) => {
                    const Icon = file.icon
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between group cursor-pointer hover:bg-[var(--background-light)]/60 p-1.5 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-2 rounded-xl bg-[var(--background-light)] ${file.color} shrink-0`}
                          >
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-[var(--black-text)] truncate">
                              {file.name}
                            </h5>
                            <span className="text-[10px] md:text-[11px] text-[var(--gray-text)] font-medium block truncate">
                              {file.count}, {file.size}
                            </span>
                          </div>
                        </div>
                        <FiChevronRight className="text-[var(--gray-text)] group-hover:text-[var(--black-text)] transition-colors shrink-0" />
                      </div>
                    )
                  })
                ) : (
                  <p className="text-xs text-[var(--gray-text)] italic text-center pt-4">
                    No shared media yet
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatInfoPanel
