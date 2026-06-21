import api from './axios'

export const startConversationRequest = (userId) =>
  api.post('/conversations/start', { userId }).then((r) => r.data)