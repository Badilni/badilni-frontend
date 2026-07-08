import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchConversations,
  fetchMessages,
  sendChatMessage,
  markAsRead,
  getUnreadCount,
} from '../../services/Chat/chatService'

/* ==========================================================================
   Conversations: Fetching the list of active chat threads
   ========================================================================== */

/**
 * Hook to retrieve the paginated list of user conversations.
 * @param {number} page - Current page number for pagination.
 * @param {number} limit - Number of conversations per page.
 */
export const useConversations = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['chat', 'conversations', page],
    queryFn: () => fetchConversations(page, limit),
    // Data remains "fresh" for 1 minute before refetching
    staleTime: 1000 * 60,
  })
}

/* ==========================================================================
   Messages: Fetching individual chat history
   ========================================================================== */

/**
 * Hook to fetch messages for a specific conversation.
 * @param {string} conversationId - Unique ID of the chat thread.
 * @note 'enabled' ensures the query only runs when a valid ID is provided.
 */
export const useMessages = (conversationId) => {
  return useQuery({
    queryKey: ['chat', 'messages', conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  })
}

/* ==========================================================================
   Unread Count: Real-time badge updates
   ========================================================================== */

/**
 * Hook to fetch the number of unread messages across all conversations.
 * Automatically polls the server every 30 seconds for live updates.
 */
export const useUnreadCount = () => {
  return useQuery({
    queryKey: ['chat', 'unread-count'],
    queryFn: getUnreadCount,
    refetchInterval: 30000,
  })
}

/* ==========================================================================
   Mutations: Data Modification Operations
   ========================================================================== */

/**
 * Hook for sending new messages.
 * On success, it triggers cache invalidation to ensure UI reflects the latest
 * message state across the message list, sidebar, and unread badges.
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendChatMessage,

    onSuccess: (_, variables) => {
      // Invalidate current messages cache for the recipient
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', variables.recipientId],
      })

      // Refresh conversations list to update 'last message' snippets
      queryClient.invalidateQueries({
        queryKey: ['chat', 'conversations'],
      })

      // Update global unread badge count
      queryClient.invalidateQueries({
        queryKey: ['chat', 'unread-count'],
      })
    },
  })
}

/**
 * Hook to mark conversation messages as read.
 * Invalidates queries to remove 'unread' UI indicators immediately upon success.
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markAsRead,

    onSuccess: (_, conversationId) => {
      // Refresh current messages state
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', conversationId],
      })

      // Update sidebar conversation list status
      queryClient.invalidateQueries({
        queryKey: ['chat', 'conversations'],
      })

      // Reset total unread count badge
      queryClient.invalidateQueries({
        queryKey: ['chat', 'unread-count'],
      })
    },
  })
}
