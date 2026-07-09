import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { FiX, FiMaximize2, FiLoader } from 'react-icons/fi'
import { io } from 'socket.io-client'
import ChatWindow from './ChatWindow'
import {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  getUnreadCount,
} from '../../api/chatApi'
import { getAccessToken } from '../../api/axios'
import useAuthStore from '../../store/authStore'
import { socketBaseUrl } from '../../utils/constants'

const HeaderChatDropdown = () => {
  const navigate = useNavigate()
  const currentUser = useAuthStore((state) => state.user)
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 })
  const [unreadCount, setUnreadCount] = useState(0)

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const selectedChatRef = useRef(selectedChat)

  useEffect(() => {
    selectedChatRef.current = selectedChat
  }, [selectedChat])

  // Fetch initial unread count
  useEffect(() => {
    if (!currentUser) return
    getUnreadCount()
      .then((res) => {
        setUnreadCount(res?.data?.unreadCount || 0)
      })
      .catch((err) => console.error('Error fetching unread count:', err))
  }, [currentUser])

  // Connect to Socket.io for live unread updates and active popup message updates
  useEffect(() => {
    const token = getAccessToken()
    if (!token || !currentUser) return

    const socket = io(socketBaseUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    socket.on('message:new', (payload) => {
      console.log('[Header Chat Socket] New message:', payload)
      const conversationId =
        typeof payload.conversation === 'object'
          ? payload.conversation?._id
          : payload.conversation

      const activeChat = selectedChatRef.current

      if (activeChat && activeChat.id === conversationId) {
        setSelectedChat((prev) => {
          if (!prev) return prev
          const msgs = prev.messages || []
          if (msgs.some((m) => m._id === payload._id)) return prev
          return {
            ...prev,
            messages: [...msgs, payload],
          }
        })
        markMessagesAsRead(conversationId).catch(() => {})
      } else {
        setUnreadCount((prev) => prev + 1)
      }
    })

    socket.on('message:read', () => {
      getUnreadCount().then((res) => {
        setUnreadCount(res?.data?.unreadCount || 0)
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [currentUser])

  // Polling fallback when popup is open
  useEffect(() => {
    if (!isPopupOpen || !selectedChat?.id) return
    const interval = setInterval(() => {
      getMessages(selectedChat.id)
        .then((res) => {
          const msgs = res?.data?.messages || []
          setSelectedChat((prev) => {
            if (!prev) return prev
            const existingIds = new Set((prev.messages || []).map((m) => m._id))
            const added = msgs.filter((m) => !existingIds.has(m._id))
            if (added.length === 0) return prev
            return {
              ...prev,
              messages: [...(prev.messages || []), ...added],
            }
          })
        })
        .catch(() => {})
    }, 4000)
    return () => clearInterval(interval)
  }, [isPopupOpen, selectedChat?.id])

  useEffect(() => {
    if (isDropdownOpen) {
      getConversations(1, 20)
        .then((data) => {
          console.log('API Response for conversations:', data)
          const rawConversations = data?.data?.conversations || []
          const transformed = rawConversations.map((chat) => {
            const otherParticipant = chat.participants?.find((p) => p._id !== currentUser?._id)
            return {
              id: chat._id,
              recipientId: otherParticipant?._id,
              name: otherParticipant?.name || 'Unknown User',
              img: otherParticipant?.avatar?.url || '/avatar.png',
              lastMessage: chat.lastMessage?.body || (chat.lastMessage ? '📎 Attachment' : ''),
              unreadCount: chat.unreadCount || 0,
              participants: chat.participants // pass participants for ChatWindow
            }
          })
          setChats(transformed)
        })
        .catch((err) => {
          console.error('Error fetching conversations:', err)
          setChats([])
        })
        .finally(() => setIsLoading(false))
    }
  }, [isDropdownOpen, currentUser?._id])

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownCoords({
        top: rect.bottom + 12,
        left: window.innerWidth < 640 ? 16 : rect.right - 340,
      })
    }
  }, [isDropdownOpen])

  const handleSelectChat = async (chat) => {
    setSelectedChat({ ...chat, messages: [] })
    setIsDropdownOpen(false)
    setIsPopupOpen(true)
    try {
      const res = await getMessages(chat.id)
      const messagesData = res?.data?.messages || []
      setSelectedChat((prev) => ({
        ...prev,
        messages: Array.isArray(messagesData) ? messagesData : [],
      }))
      await markMessagesAsRead(chat.id)
    } catch (err) {
      console.error('Error loading messages:', err)
    }
  }

  const handleSendMessage = async (e, file) => {
    if (e) e.preventDefault()
    if (!messageText.trim() && !file) return
    const formData = new FormData()
    if (messageText.trim()) formData.append('body', messageText)
    if (file) formData.append('attachments', file)
    try {
      const response = await sendMessage(
        selectedChat.recipientId || selectedChat.id,
        formData
      )
      const newMessage = response?.data?.message || response
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }))
      setMessageText('')
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => {
          const nextState = !isDropdownOpen
          setIsDropdownOpen(nextState)
          if (nextState) {
            setIsLoading(true)
          }
          setIsPopupOpen(false)
        }}
        className={`relative p-2.5 rounded-xl transition-all duration-300 ${isDropdownOpen || isPopupOpen ? 'bg-gray-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
        aria-label="Open chat application wrapper"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {unreadCount > 0 && (
          <span
            id="chat-unread-badge"
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 shadow-md animate-bounce-once"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ top: dropdownCoords.top, left: dropdownCoords.left }}
            className="fixed w-[calc(100vw-32px)] sm:w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800/80 z-[9999] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 font-bold text-sm text-gray-800 dark:text-white flex justify-between">
              Messages {isLoading && <FiLoader className="animate-spin" />}
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {Array.isArray(chats) && chats.length === 0 && !isLoading && (
                <p className="p-4 text-center text-sm text-gray-400">
                  No conversations
                </p>
              )}

              {Array.isArray(chats) &&
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat)}
                    className="p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer border-b border-gray-100 dark:border-slate-800/50"
                  >
                    <img
                      src={chat.img || '/avatar.png'}
                      className="w-12 h-12 rounded-full object-cover"
                      alt=""
                    />
                    <div className="flex-1 overflow-hidden">
                      <h5 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h5>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>,
          document.body
        )}

      {isPopupOpen &&
        selectedChat &&
        createPortal(
          <div className="fixed bottom-0 left-4 right-4 sm:left-auto sm:right-8 w-auto sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 rounded-t-2xl shadow-2xl border border-gray-100 dark:border-slate-800/80 flex flex-col z-[9998] overflow-hidden">
            <div className="bg-white dark:bg-slate-800 p-3 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center shadow-sm">
              <span
                onClick={() => {
                  if (selectedChat.recipientId) {
                    navigate(`/profile/${selectedChat.recipientId}`)
                    setIsPopupOpen(false)
                  }
                }}
                className="font-bold text-sm dark:text-white truncate cursor-pointer hover:text-blue-500 transition-colors"
              >
                {selectedChat.name}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setIsPopupOpen(false)
                    navigate('/chat')
                  }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
                >
                  <FiMaximize2 size={14} />
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-slate-950 overflow-hidden">
              <ChatWindow
                currentChat={selectedChat}
                messages={selectedChat.messages || []}
                messageText={messageText}
                setMessageText={setMessageText}
                onSendMessage={handleSendMessage}
                compact
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default HeaderChatDropdown
