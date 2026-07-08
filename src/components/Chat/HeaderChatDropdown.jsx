import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { FiX, FiMaximize2, FiLoader } from 'react-icons/fi'
import ChatWindow from './ChatWindow'
import {
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} from '../../api/chatApi'

const HeaderChatDropdown = () => {
  const navigate = useNavigate()
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [dropdownCoords, setDropdownCoords] = useState({ top: 0, left: 0 })

  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isDropdownOpen) {
      setIsLoading(true)
      getConversations(1, 20)
        .then((data) => {
          console.log('API Response for conversations:', data)
          const chatList = Array.isArray(data)
            ? data
            : data.conversations || data.data || []
          setChats(chatList)
        })
        .catch((err) => {
          console.error('Error fetching conversations:', err)
          setChats([])
        })
        .finally(() => setIsLoading(false))
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownCoords({
        top: rect.bottom + window.scrollY + 12,
        left: window.innerWidth < 640 ? 16 : rect.right + window.scrollX - 340,
      })
    }
  }, [isDropdownOpen])

  const handleSelectChat = async (chat) => {
    setSelectedChat({ ...chat, messages: [] })
    setIsDropdownOpen(false)
    setIsPopupOpen(true)
    try {
      const messagesData = await getMessages(chat.id)
      setSelectedChat((prev) => ({
        ...prev,
        messages: Array.isArray(messagesData) ? messagesData : [],
      }))
      await markMessagesAsRead(chat.id)
    } catch (err) {
      console.error('Error loading messages:', err)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim()) return
    const formData = new FormData()
    formData.append('text', messageText)
    try {
      const newMessage = await sendMessage(
        selectedChat.recipientId || selectedChat.id,
        formData
      )
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
          setIsDropdownOpen(!isDropdownOpen)
          setIsPopupOpen(false)
        }}
        className={`p-2.5 rounded-xl transition-all duration-300 ${isDropdownOpen || isPopupOpen ? 'bg-gray-200 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
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
      </button>

      {isDropdownOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{ top: dropdownCoords.top, left: dropdownCoords.left }}
            className="fixed w-[calc(100vw-32px)] sm:w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 z-[9999] overflow-hidden"
          >
            <div className="p-4 border-b dark:border-slate-800 font-bold text-sm text-gray-800 dark:text-white flex justify-between">
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
                    className="p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer border-b dark:border-slate-800/50"
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
          <div className="fixed bottom-0 right-4 sm:right-8 w-full sm:w-[380px] h-[500px] bg-white dark:bg-slate-900 rounded-t-xl shadow-2xl border flex flex-col z-[9998] overflow-hidden">
            <div className="bg-white dark:bg-slate-800 p-3 border-b dark:border-slate-700 flex justify-between items-center shadow-sm">
              <span className="font-bold text-sm dark:text-white truncate">
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
                messageText={messageText}
                setMessageText={setMessageText}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default HeaderChatDropdown
