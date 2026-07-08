import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { startConversation } from '../../services/Chat/chatService'

export const useStartChat = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, messageText }) => startConversation(userId, messageText),
    onSuccess: (data) => {
      const conversationId = data?.conversation?._id || data?._id

      if (conversationId) {
        queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
        navigate('/chat', { state: { selectUserId: conversationId } })
      }
    },
    onError: (error) => {
      console.error('Mutation failed:', error)
    },
  })
}
