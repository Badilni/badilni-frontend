import {
  getUnreadCount,
  getConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
} from '../../api/chatApi'

export const fetchUnreadCount = () => getUnreadCount()

export const fetchConversations = (page = 1, limit = 20) =>
  getConversations(page, limit)

export const fetchMessages = (conversationId, page = 1) =>
  getMessages(conversationId, page)

export const sendChatMessage = (conversationId, text, files = []) => {
  const formData = new FormData()
  formData.append('body', text)
  files.forEach((file) => formData.append('attachments', file))
  return sendMessage(conversationId, formData)
}

export const startConversation = (recipientId, messageText) =>
  sendChatMessage(recipientId, messageText)

export const markAsRead = (conversationId) => markMessagesAsRead(conversationId)
