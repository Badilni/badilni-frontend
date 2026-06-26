import {
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiFolder,
} from 'react-icons/fi'

const ChatInfoPanel = ({
  viewMode,
  setViewMode,
  currentChat,
  isInfoOpen,
  setIsInfoOpen,
}) => {
  // دمج الحالات التي يجب فيها إظهار اللوحة بشكل صريح
  const shouldShow = isInfoOpen || viewMode === 'info'

  const handleClosePanel = () => {
    setIsInfoOpen(false)
    if (setViewMode) {
      setViewMode('chat')
    }
  }

  return (
    <>
      {/* Mobile/Tablet Backdrop Overlay: Closes the panel when clicking outside */}
      {shouldShow && (
        <div
          onClick={handleClosePanel}
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-[999] lg:hidden animate-fade-in"
        />
      )}

      <div
        className={`
        /* Base positioning & Responsive width */
        fixed top-0 right-0 h-full w-full sm:w-80 bg-[var(--whiteBackground)] z-[1000]

        /* Desktop transformation: turns into a standard inline layout dynamically */
        lg:static lg:h-full lg:w-80 xl:w-1/4 lg:z-auto

        /* Layout flex flow & inner paddings */
        p-4 md:p-6 shrink-0

        /* Smooth Slide-in/Out animation transitions */
        transition-all duration-300 ease-in-out transform

        /* التحكم المطلق في الظهور والاختفاء بناءً على الحالة الموحدة لمنع أي تعليق */
        ${
          shouldShow
            ? 'translate-x-0 flex opacity-100'
            : 'translate-x-full opacity-0 pointer-events-none hidden lg:hidden'
        }
      `}
      >
        {/* Main Content Wrapper */}
        <div className="w-full h-full flex flex-col overflow-hidden min-w-[240px]">
          {/* Panel Header Controls */}
          <div className="flex items-center gap-3 mb-6 shrink-0">
            {/* Close button for Mobile/Tablets viewports */}
            <button
              onClick={handleClosePanel}
              className="p-1.5 bg-[var(--background-light)] rounded-lg text-[var(--gray-text)] lg:hidden hover:text-[var(--black-text)] transition-colors"
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Close button for Desktop viewports */}
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
              {/* Target User Profile Overview */}
              <div className="flex flex-col items-center text-center mb-6 shrink-0">
                <div className="relative">
                  <img
                    src={currentChat?.img}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mb-3 shadow-md"
                    alt=""
                  />
                  <span className="absolute bottom-3 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--whiteBackground)] rounded-full"></span>
                </div>
                <h4 className="font-bold text-sm md:text-base text-[var(--black-text)] truncate max-w-full px-2">
                  {currentChat?.name}
                </h4>
                <span className="text-xs text-[var(--gray-text)] font-medium mt-0.5">
                  Active now
                </span>
              </div>

              {/* Shared Media Numerical Analytics Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6 shrink-0">
                <div className="bg-[var(--backgSuccessOpacity)] p-3 rounded-xl flex items-center gap-2 md:gap-3">
                  <FiFileText className="text-[var(--success)] size-5 md:size-6 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[9px] text-[var(--success)] font-bold uppercase tracking-wider truncate">
                      All files
                    </div>
                    <div className="text-sm md:text-base font-black text-[var(--black-text)] leading-tight">
                      {currentChat?.filesCount}
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
                      {currentChat?.linksCount}
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-[var(--gray-text)] block mb-3 shrink-0">
                File type
              </span>

              {/* Shared Files Categorized Scrollable List Container */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {currentChat?.fileBreakdown &&
                currentChat.fileBreakdown.length > 0 ? (
                  currentChat.fileBreakdown.map((file, i) => {
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
