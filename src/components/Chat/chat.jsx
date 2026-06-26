import { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import ChatInfoPanel from './ChatInfoPanel'

// Mock Data Source
const initialChatsData = [
  {
    id: 'chat_1',
    userId: 'user_kate',
    name: 'Kate Johnson',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    filesCount: 12,
    linksCount: 2,
    typing: false,
    messages: [
      {
        id: 1,
        text: 'Recently I saw properties in a great location that I did not pay attention to before 🤔',
        time: '11:24 AM',
        isMe: false,
      },
      {
        id: 2,
        text: 'He creates an atmosphere of mystery ✨',
        time: '11:26 AM',
        isMe: true,
      },
    ],
    fileBreakdown: [
      {
        name: 'Documents',
        count: '10 files',
        size: '15MB',
        color: 'text-blue-500',
        icon: () => <span className="font-bold text-xs">DOC</span>,
      },
      {
        name: 'Photos',
        count: '2 files',
        size: '4MB',
        color: 'text-green-500',
        icon: () => <span className="font-bold text-xs">IMG</span>,
      },
    ],
  },
  {
    id: 'chat_2',
    userId: 'user_tamara',
    name: 'Tamara Shevchenko',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    filesCount: 5,
    linksCount: 1,
    typing: true,
    messages: [
      {
        id: 1,
        text: 'Are you going to a business meeting tomorrow?',
        time: '10:05 AM',
        isMe: false,
      },
    ],
    fileBreakdown: [
      {
        name: 'Photos',
        count: '5 files',
        size: '12MB',
        color: 'text-green-500',
        icon: () => <span className="font-bold text-xs">IMG</span>,
      },
    ],
  },
]

const ChatPage = () => {
  const location = useLocation()
  const [chats, setChats] = useState(initialChatsData)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(true)

  const messagesEndRef = useRef(null)

  // Initialize active chat fallback based on redirected router navigation state
  const [activeChatId, setActiveChatId] = useState(() => {
    const targetUserId = location.state?.selectUserId
    if (targetUserId) {
      const targetChat = initialChatsData.find(
        (chat) => chat.userId === targetUserId || chat.id === targetUserId
      )
      if (targetChat) return targetChat.id
    }
    return 'chat_1'
  })

  // Toggle layout display mode for responsive viewports
  const [viewMode, setViewMode] = useState(() => {
    return location.state?.selectUserId ? 'chat' : 'sidebar'
  })

  // Extract selected conversation reference object
  const currentChat = chats.find((c) => c.id === activeChatId) || chats[0]

  // Switch conversation channel profile
  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setViewMode('chat')
  }

  // Push new context message object into dataset stream array
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!messageText.trim()) return

    const newMessage = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isMe: true,
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    )

    setMessageText('')
  }

  // Filter channel nodes matches using search string matching query
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen w-full bg-[var(--background-light)] text-[var(--black-text)] font-sans overflow-hidden">
      <div className="flex w-full h-full relative">
        {/* Channels List Component Sidebar */}
        <ChatSidebar
          viewMode={viewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredChats={filteredChats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          currentChat={currentChat}
        />

        {/* Core Message Thread Stream Window */}
        <ChatWindow
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentChat={currentChat}
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          isInfoOpen={isInfoOpen}
          setIsInfoOpen={setIsInfoOpen}
        />

        {/* Detailed Metadata Metrics Side Panel */}
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
