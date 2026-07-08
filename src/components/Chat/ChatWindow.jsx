import { useState, useRef, useEffect } from 'react'
import {
  FiChevronLeft,
  FiSend,
  FiSmile,
  FiPaperclip,
  FiX,
  FiImage,
  FiFile,
  FiFileText,
} from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react'
import useAuthStore from '../../store/authStore'

const ChatWindow = ({
  viewMode,
  setViewMode,
  currentChat,
  messages = [],
  messageText,
  setMessageText,
  onSendMessage,
  messagesEndRef,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const pickerRef = useRef(null)
  const fileInputRef = useRef(null)
  const user = useAuthStore((s) => s.user)

  // Identify the other participant to display their details in the header
  const otherParticipant = currentChat?.participants?.find(
    (p) => p._id !== user?._id
  )

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
  }

  return (
    <div
      className={`flex-1 h-full flex flex-col p-4 md:p-6 transition-all duration-300 bg-blue-50/50 dark:bg-slate-950 ${viewMode === 'chat' ? 'flex' : 'hidden lg:flex'}`}
    >
      {/* Chat Header */}
      <div className="flex justify-between items-center pb-4 border-b border-blue-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('sidebar')}
            className="p-2 bg-blue-100 rounded-xl text-blue-600 md:hidden"
          >
            <FiChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md">
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
              <h3 className="font-bold text-slate-800 dark:text-white">
                {otherParticipant?.name || 'Unknown User'}
              </h3>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>{' '}
                Active now
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List Section */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1 scrollbar-hide">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === user?._id
          return (
            <div
              key={msg._id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-blue-100 dark:border-none'}`}
              >
                {/* Render Image attachment */}
                {msg.fileType?.startsWith('image/') && (
                  <img
                    src={msg.fileUrl}
                    alt="attachment"
                    className="max-w-full rounded-lg mb-2"
                  />
                )}

                {/* Render Document/File link */}
                {msg.fileType && !msg.fileType.startsWith('image/') && (
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
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field and Action Bar */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-lg border border-blue-100 dark:border-slate-800 flex items-center gap-2 relative"
      >
        {/* Emoji Picker trigger */}
        <div ref={pickerRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-3 text-blue-400 hover:text-blue-600"
          >
            <FiSmile size={22} />
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
          className="p-3 text-blue-400 hover:text-blue-600"
        >
          <FiPaperclip size={22} />
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
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 bg-transparent p-2 focus:outline-none text-slate-700 dark:text-white"
          placeholder="Type a message..."
        />

        {/* Send message button */}
        <button
          type="submit"
          className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FiSend size={18} />
        </button>
      </form>
    </div>
  )
}

export default ChatWindow
