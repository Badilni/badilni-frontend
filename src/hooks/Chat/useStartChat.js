import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { startConversation } from '../../services/Chat/chatService'

export const useStartChat = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables) => {
      const uId =
        typeof variables === 'object' &&
        variables !== null &&
        'userId' in variables
          ? variables.userId
          : variables
      const msgText =
        typeof variables === 'object' &&
        variables !== null &&
        'messageText' in variables
          ? variables.messageText
          : undefined
      return startConversation(uId, msgText)
    },
    onSuccess: (data, variables) => {
      const recipientId =
        typeof variables === 'object' &&
        variables !== null &&
        'userId' in variables
          ? variables.userId
          : variables

      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
      navigate('/chat', { state: { selectUserId: recipientId } })
    },
    onError: (error) => {
      console.error('Mutation failed:', error)
    },
  })
}
