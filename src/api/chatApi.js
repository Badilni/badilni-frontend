import api from './axios';

export const getUnreadCount = () => {
  return api.get('/conversations/unread-count').then((r) => r.data);
};

export const getConversations = (page = 1, limit = 20) => {
  return api.get(`/conversations?page=${page}&limit=${limit}`).then((r) => r.data);
};

export const getMessages = (conversationId, page = 1) => {
  return api.get(`/conversations/${conversationId}/messages?page=${page}`).then((r) => r.data);
};

export const sendMessage = (recipientId, formData) => {
  return api.post(`/conversations/${recipientId}/messages`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((r) => r.data);
};

export const markMessagesAsRead = (conversationId) => {
  return api.patch(`/conversations/${conversationId}/messages/read`).then((r) => r.data);
};
