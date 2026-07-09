import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import ChatSidebar from './ChatSidebar'
import ChatWindow from './ChatWindow'
import ChatInfoPanel from './ChatInfoPanel'
import { getConversations, getMessages, sendMessage, markMessagesAsRead } from '../../api/chatApi'
import { getUserProfileRequest } from '../../api/authApi'
import { getAccessToken } from '../../api/axios'
import useAuthStore from '../../store/authStore'
import { socketBaseUrl } from '../../utils/constants'

const ChatPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [chats, setChats] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isInfoOpen, setIsInfoOpen] = useState(true)
  const [activeChatId, setActiveChatId] = useState(null)
  const [viewMode, setViewMode] = useState('sidebar')
  const [currentChat, setCurrentChat] = useState(null)
  const messagesEndRef = useRef(null)

  const socketRef = useRef(null)
  const activeChatIdRef = useRef(activeChatId)
  const [hasLoadedConversations, setHasLoadedConversations] = useState(false)

  // Sync ref to avoid stale closures in socket events
  useEffect(() => {
    activeChatIdRef.current = activeChatId
  }, [activeChatId])

  // Fetch initial conversations list
  useEffect(() => {
    getConversations().then((data) => {
      const chatsArray = data?.data?.conversations || []
      setChats(chatsArray)
      setHasLoadedConversations(true)

      // Default to selecting the first (latest) conversation on page load if no other state is requested
      if (!activeChatId && !location.state?.selectUserId && chatsArray.length > 0) {
        setActiveChatId(chatsArray[0]._id)
        setViewMode('chat')
      }
    }).catch((err) => {
      console.error('Error fetching conversations:', err)
      setHasLoadedConversations(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle select user id from router state (e.g. from MentorCard/profile)
  useEffect(() => {
    if (hasLoadedConversations && location.state?.selectUserId) {
      const targetUserId = location.state.selectUserId

      // Consume the state parameter immediately to prevent unexpected automated re-focusing
      navigate(location.pathname, { replace: true, state: null })

      const targetChat = chats.find((chat) =>
        chat.participants?.some((p) => p._id === targetUserId)
      )

      setTimeout(() => {
        if (targetChat) {
          setActiveChatId(targetChat._id)
          setViewMode('chat')
        } else {
          // Fetch target user profile and construct a pending/temporary chat object
          getUserProfileRequest(targetUserId)
            .then((res) => {
              const profile = res?.data?.user || res?.data || res
              if (!profile) return
              const newPendingChat = {
                _id: `pending_${targetUserId}`,
                participants: [
                  user,
                  {
                    _id: targetUserId,
                    name: profile.name,
                    avatar: profile.avatar,
                  },
                ],
                unreadCount: 0,
                messages: [],
              }
              setChats((prev) => [newPendingChat, ...prev])
              setActiveChatId(newPendingChat._id)
              setViewMode('chat')
            })
            .catch((err) => {
              console.error('Error fetching target user profile:', err)
            })
        }
      }, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.selectUserId, chats, user, hasLoadedConversations, location.pathname])

  // Fetch messages for active conversation and mark it as read
  useEffect(() => {
    let isCurrent = true

    if (activeChatId) {
      const selected = chats.find((c) => c._id === activeChatId)
      if (selected) {
        // If it's a pending chat, we don't have messages on server yet
        if (activeChatId.startsWith('pending_')) {
          setTimeout(() => {
            if (isCurrent) {
              setCurrentChat({ ...selected, messages: [] })
            }
          }, 0)
          return
        }

        getMessages(activeChatId)
          .then((res) => {
            const msgs = res?.data?.messages || []
            if (isCurrent) {
              setCurrentChat({ ...selected, messages: msgs })
            }
          })
          .catch((err) => {
            console.error('Error fetching messages:', err)
          })

        // Mark as read
        markMessagesAsRead(activeChatId)
          .then(() => {
            if (isCurrent) {
              setChats((prevChats) =>
                prevChats.map((c) =>
                  c._id === activeChatId ? { ...c, unreadCount: 0 } : c
                )
              )
            }
          })
          .catch((err) => {
            console.error('Error marking conversation as read:', err)
          })
      }
    }

    return () => {
      isCurrent = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatId])

  // Polling fallback: re-fetch active conversation messages every 5s silently
  useEffect(() => {
    if (!activeChatId || activeChatId.startsWith('pending_')) return
    const interval = setInterval(() => {
      getMessages(activeChatId)
        .then((res) => {
          const msgs = res?.data?.messages || []
          setCurrentChat((prev) => {
            if (!prev) return prev
            const existingIds = new Set((prev.messages || []).map((m) => m._id))
            const added = msgs.filter((m) => !existingIds.has(m._id))
            if (added.length === 0) return prev
            return { ...prev, messages: [...(prev.messages || []), ...added] }
          })
        })
        .catch(() => {})
    }, 5000)
    return () => clearInterval(interval)
  }, [activeChatId])

  // Socket.IO real-time connection and event registration
  useEffect(() => {
    const token = getAccessToken()
    if (!token) return

    const socket = io(socketBaseUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[Chat Socket] Connected successfully')
    })

    socket.on('message:new', (payload) => {
      console.log('[Chat Socket] New message:', payload)

      // conversation can be a populated object or a plain string id
      const conversationId =
        typeof payload.conversation === 'object'
          ? payload.conversation?._id
          : payload.conversation

      setChats((prevChats) => {
        const existingChatIdx = prevChats.findIndex((c) => c._id === conversationId)

        if (existingChatIdx > -1) {
          const updatedChats = [...prevChats]
          const existingChat = updatedChats[existingChatIdx]
          const isCurrentActive = conversationId === activeChatIdRef.current
          const newUnreadCount = isCurrentActive ? 0 : (existingChat.unreadCount || 0) + 1

          updatedChats[existingChatIdx] = {
            ...existingChat,
            lastMessage: {
              body: payload.body || '📎 Attachment',
              sender: payload.sender,
              createdAt: payload.createdAt,
            },
            lastActivityAt: payload.createdAt,
            unreadCount: newUnreadCount,
          }

          return updatedChats.sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt))
        } else {
          // If conversation is new/not in sidebar, refetch conversations list
          getConversations().then((data) => {
            setChats(data?.data?.conversations || [])
          })
          return prevChats
        }
      })

      // Append message if it belongs to current active conversation
      if (conversationId === activeChatIdRef.current) {
        setCurrentChat((prev) => {
          if (!prev) return prev
          if (prev.messages?.some((m) => m._id === payload._id)) return prev
          return {
            ...prev,
            messages: [...(prev.messages || []), payload],
          }
        })

        // Instantly mark as read
        markMessagesAsRead(conversationId).catch((err) =>
          console.error('Error marking message read:', err)
        )
      }
    })

    socket.on('message:read', (payload) => {
      console.log('[Chat Socket] Messages read:', payload)
      if (payload.conversation === activeChatIdRef.current) {
        setCurrentChat((prev) => {
          if (!prev || !prev.messages) return prev
          return {
            ...prev,
            messages: prev.messages.map((m) =>
              (m.sender?._id || m.sender) === user?._id ? { ...m, isRead: true } : m
            ),
          }
        })
      }
    })

    socket.on('typing:start', (payload) => {
      if (payload.conversation) {
        setChats((prevChats) =>
          prevChats.map((c) =>
            c._id === payload.conversation ? { ...c, typing: true } : c
          )
        )
      }
    })

    socket.on('typing:stop', (payload) => {
      if (payload.conversation) {
        setChats((prevChats) =>
          prevChats.map((c) =>
            c._id === payload.conversation ? { ...c, typing: false } : c
          )
        )
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [user?._id])

  const handleSelectChat = (id) => {
    setActiveChatId(id)
    setViewMode('chat')
  }

  const handleTyping = (isTyping) => {
    if (!socketRef.current || !activeChatId || !currentChat) return
    // Skip if it is a pending chat
    if (activeChatId.startsWith('pending_')) return

    const otherParticipant = currentChat.participants?.find(
      (p) => p._id !== user?._id
    )
    if (!otherParticipant) return

    const event = isTyping ? 'typing:start' : 'typing:stop'
    socketRef.current.emit(event, {
      conversation: activeChatId,
      recipientId: otherParticipant._id,
    })
  }

  const handleSendMessage = async (e, file) => {
    if (e) e.preventDefault()
    if (!messageText.trim() && !file) return

    const recipient = currentChat?.participants?.find(
      (p) => p._id !== user?._id
    )

    if (!recipient?._id) return

    const formData = new FormData()
    if (messageText.trim()) formData.append('body', messageText)
    if (file) formData.append('attachments', file)

    try {
      const response = await sendMessage(recipient._id, formData)
      const newMessage = response?.data?.message || response

      // Stop typing status instantly upon send
      handleTyping(false)

      // If it was a pending conversation, we now have a real conversation ID!
      if (activeChatId.startsWith('pending_')) {
        // Refetch conversations to sync state and select the newly created chat
        getConversations().then((data) => {
          const conversations = data?.data?.conversations || []
          setChats(conversations)
          const matched = conversations.find((c) =>
            c.participants?.some((p) => p._id === recipient._id)
          )
          if (matched) {
            setActiveChatId(matched._id)
          }
        })
      } else {
        setCurrentChat((prev) => ({
          ...prev,
          messages: [...(prev?.messages || []), newMessage],
        }))
        // Update last message in sidebar
        setChats((prevChats) =>
          prevChats.map((c) =>
            c._id === activeChatId
              ? {
                  ...c,
                  lastMessage: {
                    body: newMessage.body || '📎 Attachment',
                    sender: user._id,
                    createdAt: newMessage.createdAt,
                  },
                  lastActivityAt: newMessage.createdAt,
                }
              : c
          ).sort((a, b) => new Date(b.lastActivityAt) - new Date(a.lastActivityAt))
        )
      }

      setMessageText('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert(error.message || 'Failed to send message. Please try again.')
    }
  }

  const filteredChats = Array.isArray(chats)
    ? chats.filter((chat) => {
        const otherParticipant = chat.participants?.find(
          (p) => p._id !== user?._id
        )
        return otherParticipant?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
    : []

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-[var(--background-light)] text-[var(--black-text)] font-sans overflow-hidden">
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
          onTyping={handleTyping}
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

