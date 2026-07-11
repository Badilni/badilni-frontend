import { useState, useRef, useEffect } from 'react'
import {
  FiSend,
  FiSmile,
  FiPaperclip,
  FiX,
  FiFile,
  FiFileText,
} from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react'
import { io } from 'socket.io-client'
import useAuthStore from '../../store/authStore'
import {
  getBookingMessages,
  sendBookingMessage,
  markBookingMessagesAsRead,
} from '../../api/bookingApi'
import { getAccessToken } from '../../api/axios'
import { socketBaseUrl } from '../../utils/constants'

export default function BookingChatCard({ bookingId, booking }) {
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const currentUser = useAuthStore((s) => s.user)
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)
  const pickerRef = useRef(null)
  const socketRef = useRef(null)
  const prevMessagesLength = useRef(0)

  const otherParticipant =
    (booking?.provider?._id || booking?.provider) === currentUser?._id
      ? booking?.receiver
      : booking?.provider

  // 1. Fetch initial booking messages
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    getBookingMessages(bookingId)
      .then((res) => {
        const msgs = res?.data?.messages || res?.messages || []
        setMessages(msgs)
        markBookingMessagesAsRead(bookingId).catch(() => {})
      })
      .catch((err) => {
        console.error('Error loading booking messages:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [bookingId])

  // 2. Polling every 4s — silently merges new messages (most reliable fallback)
  useEffect(() => {
    const interval = setInterval(() => {
      getBookingMessages(bookingId)
        .then((res) => {
          const msgs = res?.data?.messages || res?.messages || []
          setMessages((prev) => {
            if (msgs.length === prev.length) return prev
            // Merge: keep existing + add new ones by id
            const existingIds = new Set(prev.map((m) => m._id))
            const added = msgs.filter((m) => !existingIds.has(m._id))
            if (added.length === 0) return prev
            markBookingMessagesAsRead(bookingId).catch(() => {})
            return [...prev, ...added]
          })
        })
        .catch(() => {})
    }, 4000)
    return () => clearInterval(interval)
  }, [bookingId])

  // 3. Socket.IO — listen on both possible event names the server might emit
  useEffect(() => {
    const socket = io(socketBaseUrl, {
      auth: { token: getAccessToken() },
      transports: ['websocket', 'polling'],
    })
    socketRef.current = socket

    const handleNewMessage = (payload) => {
      const newMessage = payload.message || payload
      const msgBookingId =
        typeof newMessage.booking === 'object'
          ? newMessage.booking?._id
          : newMessage.booking
      if (msgBookingId === bookingId) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === newMessage._id)) return prev
          return [...prev, newMessage]
        })
        markBookingMessagesAsRead(bookingId).catch(() => {})
      }
    }

    socket.on('message:new', handleNewMessage)
    socket.on('booking:message:new', handleNewMessage)

    return () => {
      socket.disconnect()
    }
  }, [bookingId])

  // 3. Scroll to bottom on messages list change
  useEffect(() => {
    if (messages.length > 0 && containerRef.current) {
      const isNewMessage = messages.length > prevMessagesLength.current
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: isNewMessage ? 'smooth' : 'auto',
      })
    }
    prevMessagesLength.current = messages.length
  }, [messages])

  // 4. Handle close on outside click for emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile(file)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreview(event.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview('file')
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim() && !selectedFile) return

    const formData = new FormData()
    if (messageText.trim()) {
      formData.append('body', messageText)
    }
    if (selectedFile) {
      formData.append('attachments', selectedFile)
    }

    try {
      const res = await sendBookingMessage(bookingId, formData)
      const newMsg = res?.data?.message || res?.message || res
      setMessages((prev) => {
        if (prev.some((m) => m._id === newMsg._id)) return prev
        return [...prev, newMsg]
      })

      setMessageText('')
      setSelectedFile(null)
      setFilePreview(null)
    } catch (err) {
      console.error('Error sending booking message:', err)
      alert(err.message || 'Failed to send message.')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800/80 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-slate-800/50 p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white dark:border-slate-800 shadow-sm">
            <img
              src={
                otherParticipant?.avatar?.url ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Chat with {otherParticipant?.name || 'Partner'}
            </h3>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">
              Booking Discussion
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-950/20 scrollbar-hide"
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-400 italic">
            No messages yet. Send a message to start discussion!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = (msg.sender?._id || msg.sender) === currentUser?._id
            return (
              <div
                key={msg._id}
                className={`flex gap-2.5 items-start ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white dark:border-slate-800 shadow-sm shrink-0">
                  <img
                    src={
                      isMe
                        ? currentUser?.avatar?.url ||
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                        : otherParticipant?.avatar?.url ||
                          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}
                >
                  {/* Bubble */}
                  <div
                    className={`p-3 rounded-2xl shadow-sm leading-relaxed text-sm ${
                      isMe
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-700/50'
                    }`}
                  >
                    {/* Render Attachments */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="space-y-2 mt-1 mb-2">
                        {msg.attachments.map((att, idx) => {
                          const isImg =
                            att.fileType === 'image' ||
                            att.url?.match(/\.(jpeg|jpg|gif|png|webp)/i)
                          return isImg ? (
                            <img
                              key={idx}
                              src={att.url}
                              alt=""
                              className="max-w-full max-h-60 rounded-lg object-contain cursor-pointer"
                              onClick={() => window.open(att.url, '_blank')}
                            />
                          ) : (
                            <a
                              key={idx}
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

                    {/* Text body */}
                    {msg.body && <p>{msg.body}</p>}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center relative p-1.5 gap-1.5 shrink-0"
      >
        {/* Emoji Trigger */}
        <div ref={pickerRef}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-blue-400 hover:text-blue-600 p-1.5"
          >
            <FiSmile size={17} />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-2 z-30">
              <EmojiPicker
                onEmojiClick={(e) => setMessageText((prev) => prev + e.emoji)}
              />
            </div>
          )}
        </div>

        {/* File Trigger */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-blue-400 hover:text-blue-600 p-1.5"
        >
          <FiPaperclip size={17} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* File Preview */}
        {selectedFile && (
          <div className="absolute -top-16 left-2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-100 dark:border-slate-800 flex items-center gap-2 shadow-md">
            {filePreview === 'file' ? (
              <FiFile className="text-blue-600" size={16} />
            ) : (
              <img
                src={filePreview}
                className="w-10 h-10 rounded-lg object-cover"
                alt=""
              />
            )}
            <span className="text-[10px] text-gray-500 max-w-[100px] truncate">
              {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null)
                setFilePreview(null)
              }}
              className="text-red-500 hover:bg-gray-100 dark:hover:bg-slate-700 p-1 rounded-full"
            >
              <FiX size={14} />
            </button>
          </div>
        )}

        {/* Input Text */}
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 bg-gray-50 dark:bg-slate-800/50 text-gray-900 dark:text-white border border-gray-100 dark:border-slate-800/80 px-3 py-1.5 rounded-2xl text-sm focus:outline-none focus:border-blue-500"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors flex items-center justify-center shrink-0"
        >
          <FiSend size={16} />
        </button>
      </form>
    </div>
  )
}
