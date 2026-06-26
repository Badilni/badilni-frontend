import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { startConversation } from '../../services/Chat/chatService'

export const useStartChat = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (userId) => startConversation(userId),
    onSuccess: (response) => {
      const conversationId =
        response?.data?.conversation?._id ??
        response?.conversation?._id ??
        response?._id

      navigate(conversationId ? `/chat/${conversationId}` : '/chat')
    },
  })
}
