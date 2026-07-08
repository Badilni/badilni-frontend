import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import ChatInfoPanel from './ChatInfoPanel'
import { getConversations, getMessages, sendMessage } from '../../api/chatApi'
import useAuthStore from '../../store/authStore'

const ChatPage = () => {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const [chats, setChats] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null)
  const [viewMode, setViewMode] = useState('sidebar')
  const [currentChat, setCurrentChat] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    getConversations().then((data) => {
      const chatsArray = Array.isArray(data) ? data : (data?.data || [])
      setChats(chatsArray)
    })
  }, [])

  useEffect(() => {
    if (chats.length > 0 && location.state?.selectUserId) {
      const targetUserId = location.state.selectUserId
      const targetChat = chats.find(chat =>
        chat.participants?.some(p => p._id === targetUserId)
      )

      if (targetChat) {
        setActiveChatId(targetChat._id)
        setViewMode('chat')
      }
    }
  }, [location.state?.selectUserId, chats])

  useEffect(() => {
    if (activeChatId) {
      const selected = chats.find(c => c._id === activeChatId)
      if (selected) {
        getMessages(activeChatId).then(msgs => {
          setCurrentChat({ ...selected, messages: msgs || [] })
        })
      }
    }
  }, [activeChatId, chats])

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setViewMode('chat')
  }

  const handleSendMessage = async (e, file) => {
    if (e) e.preventDefault()
    if (!messageText.trim() && !file) return

    const recipient = currentChat?.participants?.find(p => p._id !== user?._id)

    const formData = new FormData()
    formData.append('body', messageText)

    if (recipient?._id) {
        formData.append('recipientId', recipient._id)
    }

    if (file) formData.append('file', file)

    try {
      const newMessage = await sendMessage(activeChatId, formData)

      setCurrentChat(prev => ({
        ...prev,
        messages: [...(prev?.messages || []), newMessage]
      }))

      setMessageText('')
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  const filteredChats = Array.isArray(chats)
    ? chats.filter((chat) => chat.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <div className="flex h-screen w-full bg-[var(--background-light)] text-[var(--black-text)] font-sans overflow-hidden">
      <div className="flex w-full h-full relative">
        <ChatSidebar
          viewMode={viewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredChats={filteredChats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          currentChat={currentChat}
        />

        <ChatWindow
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentChat={currentChat}
          messages={currentChat?.messages || []}
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isInfoOpen={isInfoOpen}
          setIsInfoOpen={setIsInfoOpen}
        />

        <ChatInfoPanel
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentChat={currentChat}
          isInfoOpen={isInfoOpen}
          setIsInfoOpen={setIsInfoOpen}
        />
      </div>
    </div>
  )
}

export default ChatPage
