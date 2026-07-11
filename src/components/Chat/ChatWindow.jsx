import { useState, useRef, useEffect } from 'react'
import {
  FiChevronLeft,
  FiSend,
  FiSmile,
  FiPaperclip,
  FiX,
  FiFile,
  FiFileText,
} from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

const ChatWindow = ({
  viewMode,
  setViewMode,
  currentChat,
  messages = [],
  messageText,
  setMessageText,
  onSendMessage,
  onTyping,
  compact = false,
}) => {
  const navigate = useNavigate()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const pickerRef = useRef(null)
  const fileInputRef = useRef(null)
  const user = useAuthStore((s) => s.user)

  const internalMessagesEndRef = useRef(null)
  const prevChatIdRef = useRef(null)

  // Scroll to bottom when messages or currentChat changes
  useEffect(() => {
    if (messages && messages.length > 0) {
      const isSameChat = prevChatIdRef.current === currentChat?._id
      internalMessagesEndRef.current?.scrollIntoView({
        behavior: isSameChat ? 'smooth' : 'auto',
      })
    }
    prevChatIdRef.current = currentChat?._id
  }, [messages, currentChat?._id])

  const typingTimeoutRef = useRef(null)
  const isTypingRef = useRef(false)

  console.log('ChatWindow messages list:', messages)

  // Identify the other participant to display their details in the header
  const otherParticipant = currentChat?.participants?.find(
    (p) => p._id !== user?._id
  )

  // Clean up typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  const handleInputChange = (e) => {
    setMessageText(e.target.value)

    if (onTyping) {
      if (!isTypingRef.current) {
        isTypingRef.current = true
        onTyping(true)
      }

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

      typingTimeoutRef.current = setTimeout(() => {
        isTypingRef.current = false
        onTyping(false)
      }, 2000)
    }
  }

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setShowEmojiPicker(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle file selection and generate preview
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file))
      } else {
        setFilePreview('file')
      }
    }
  }

  // Handle form submission and reset state
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!messageText.trim() && !selectedFile) return
    onSendMessage(e, selectedFile)
    setMessageText('')
    setSelectedFile(null)
    setFilePreview(null)

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    isTypingRef.current = false
  }

  return (
    <div
      className={`flex-1 h-full flex flex-col transition-all duration-300 bg-blue-50/50 dark:bg-slate-950 ${compact ? 'p-2' : 'p-4 md:p-6'} ${compact ? 'flex' : viewMode === 'chat' ? 'flex' : 'hidden lg:flex'}`}
    >
      {/* Chat Header */}
      {!compact && (
        <div className="flex justify-between items-center pb-4 border-b border-blue-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('sidebar')}
              className="p-2 bg-blue-100 rounded-xl text-blue-600 md:hidden"
            >
              <FiChevronLeft size={18} />
            </button>
            <div
              onClick={() => {
                if (otherParticipant?._id) {
                  navigate(`/profile/${otherParticipant._id}`)
                }
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={
                    otherParticipant?.avatar?.url ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                  }
                  alt={otherParticipant?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">
                  {otherParticipant?.name || 'Unknown User'}
                </h3>
                {/* <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>{' '}
                  Active now
                </p> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages List Section */}
      <div
        className={`flex-1 overflow-y-auto pr-1 scrollbar-hide ${compact ? 'my-2 space-y-2' : 'my-4 space-y-4'}`}
      >
        {messages.map((msg) => {
          const isMe = (msg.sender?._id || msg.sender) === user?._id
          return (
            <div
              key={msg._id}
              className={`flex gap-2.5 items-start mb-4 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Message Sender Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white dark:border-slate-800 shadow-sm shrink-0">
                <img
                  src={
                    isMe
                      ? user?.avatar?.url ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                      : otherParticipant?.avatar?.url ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl shadow-sm leading-relaxed ${isMe ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-700/50'}`}
                >
                  {/* Render Attachments (Array structure from backend) */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="space-y-2 mt-1 mb-2">
                      {msg.attachments.map((att, index) => {
                        const isImg =
                          att.fileType === 'image' ||
                          att.url?.match(/\.(jpeg|jpg|gif|png|webp)/i)
                        return isImg ? (
                          <img
                            key={index}
                            src={att.url}
                            alt={att.fileName || 'attachment'}
                            className="max-w-full max-h-60 rounded-lg object-contain cursor-pointer"
                            onClick={() => window.open(att.url, '_blank')}
                          />
                        ) : (
                          <a
                            key={index}
                            href={att.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 p-2 bg-blue-100/50 dark:bg-slate-700 rounded-lg text-xs hover:underline text-blue-600 dark:text-blue-400 font-semibold"
                          >
                            <FiFileText /> {att.fileName || 'Download File'}
                          </a>
                        )
                      })}
                    </div>
                  )}

                  {/* Render old attachment structure (fallback) */}
                  {msg.fileType?.startsWith('image/') && msg.fileUrl && (
                    <img
                      src={msg.fileUrl}
                      alt="attachment"
                      className="max-w-full rounded-lg mb-2"
                    />
                  )}

                  {msg.fileType &&
                    !msg.fileType.startsWith('image/') &&
                    msg.fileUrl && (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 mb-2 p-2 bg-blue-100/50 dark:bg-slate-700 rounded-lg text-xs"
                      >
                        <FiFileText /> {msg.fileName || 'Download File'}
                      </a>
                    )}

                  {/* Render Text message body */}
                  {msg.body && <p className="text-sm">{msg.body}</p>}
                </div>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          )
        })}
        <div ref={internalMessagesEndRef} />
      </div>

      {/* Input Field and Action Bar */}
      <form
        onSubmit={handleSubmit}
        className={`bg-white dark:bg-slate-900 shadow-lg border border-blue-100 dark:border-slate-800 flex items-center relative ${compact ? 'rounded-2xl p-1 gap-1' : 'rounded-3xl p-2 gap-2'}`}
      >
        {/* Emoji Picker trigger */}
        <div ref={pickerRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`text-blue-400 hover:text-blue-600 ${compact ? 'p-1.5' : 'p-3'}`}
          >
            <FiSmile size={compact ? 18 : 22} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-20 left-0 z-30">
              <EmojiPicker
                onEmojiClick={(e) => setMessageText((prev) => prev + e.emoji)}
              />
            </div>
          )}
        </div>

        {/* File attachment trigger */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className={`text-blue-400 hover:text-blue-600 ${compact ? 'p-1.5' : 'p-3'}`}
        >
          <FiPaperclip size={compact ? 18 : 22} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Selected file preview overlay */}
        {selectedFile && (
          <div className="absolute -top-16 left-0 bg-white p-2 rounded-xl border border-blue-200 flex items-center gap-2 shadow-sm">
            {filePreview === 'file' ? (
              <FiFile className="text-blue-600" />
            ) : (
              <img
                src={filePreview}
                className="w-10 h-10 rounded-lg object-cover"
              />
            )}
            <span className="text-xs text-slate-600 truncate max-w-[100px]">
              {selectedFile.name}
            </span>
            <button type="button" onClick={() => setSelectedFile(null)}>
              <FiX />
            </button>
          </div>
        )}

        <input
          value={messageText}
          onChange={handleInputChange}
          className={`flex-1 bg-transparent focus:outline-none text-slate-700 dark:text-white ${compact ? 'p-1 text-xs' : 'p-2 text-sm'}`}
          placeholder="Type a message..."
        />

        {/* Send message button */}
        <button
          type="submit"
          className={`bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors shrink-0 ${compact ? 'p-2' : 'p-4'}`}
        >
          <FiSend size={compact ? 15 : 18} />
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
