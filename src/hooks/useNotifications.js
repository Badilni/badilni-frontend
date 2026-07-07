import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAuthStore from '../store/authStore'
import {
  getNotificationsRequest,
  markAllAsReadRequest,
  markAsReadRequest,
  deleteNotificationRequest,
} from '../api/notificationApi'

export const NOTIFICATIONS_KEY = ['notifications']

export function useNotifications(params = {}) {
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // ─── Fetch ────────────────────────────────────────────────────────────────
  const query = useQuery({
    queryKey: [...NOTIFICATIONS_KEY, params],
    queryFn: async () => {
      try {
        return await getNotificationsRequest({ page: 1, limit: 20, ...params })
      } catch (err) {
        const status = err?.response?.status
        if (status === 401 || status === 403) {
          console.warn(
            '[Notifications] Auth failure, forcing logout redirect...'
          )
          useAuthStore.getState().clearUser()
          window.location.hash = '/signIn'
        }
        throw err
      }
    },
    // Only query when logged in
    enabled: Boolean(user) && isAuthenticated,
    staleTime: 1000 * 10,
    // We disable background polling (refetchInterval) completely to prevent 401/429 loops.
    // Real-time notification:new socket events handle updates.
    refetchInterval: false,
    refetchOnWindowFocus: false, // disable refetch on window focus to avoid spamming server
    retry: false,
  })

  const notifications = query.data?.data?.notifications ?? []
  const unreadCount = query.data?.unreadCount ?? 0
  const pagination = query.data?.pagination ?? {}

  const updateAllNotificationQueries = (updateFn) => {
    const cache = queryClient.getQueryCache()
    const queries = cache.findAll({ queryKey: NOTIFICATIONS_KEY, exact: false })

    queries.forEach((q) => {
      queryClient.setQueryData(q.queryKey, updateFn)
    })
  }

  // ─── Mark single as read ─────────────────────────────────────────────────
  const markAsRead = useMutation({
    mutationFn: (id) => markAsReadRequest(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: NOTIFICATIONS_KEY,
        exact: false,
      })

      updateAllNotificationQueries((old) => {
        if (!old?.data?.notifications) return old

        const target = old.data.notifications.find((n) => n._id === id)
        const wasUnread = target && !target.isRead
        const newUnread = wasUnread
          ? Math.max(0, (old.unreadCount ?? 0) - 1)
          : (old.unreadCount ?? 0)

        return {
          ...old,
          unreadCount: newUnread,
          data: {
            ...old.data,
            notifications: old.data.notifications.map((n) =>
              n._id === id ? { ...n, isRead: true } : n
            ),
          },
        }
      })
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: NOTIFICATIONS_KEY,
          exact: false,
        })
      }, 1200)
    },
  })

  // ─── Mark all as read ────────────────────────────────────────────────────
  const markAllAsRead = useMutation({
    mutationFn: markAllAsReadRequest,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: NOTIFICATIONS_KEY,
        exact: false,
      })

      updateAllNotificationQueries((old) => {
        if (!old?.data?.notifications) return old
        return {
          ...old,
          unreadCount: 0,
          data: {
            ...old.data,
            notifications: old.data.notifications.map((n) => ({
              ...n,
              isRead: true,
            })),
          },
        }
      })
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: NOTIFICATIONS_KEY,
          exact: false,
        })
      }, 1200)
    },
  })

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteNotification = useMutation({
    mutationFn: (id) => deleteNotificationRequest(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: NOTIFICATIONS_KEY,
        exact: false,
      })

      updateAllNotificationQueries((old) => {
        if (!old?.data?.notifications) return old
        const target = old.data.notifications.find((n) => n._id === id)
        const wasUnread = target && !target.isRead
        const newUnread = wasUnread
          ? Math.max(0, (old.unreadCount ?? 0) - 1)
          : (old.unreadCount ?? 0)

        return {
          ...old,
          unreadCount: newUnread,
          data: {
            ...old.data,
            notifications: old.data.notifications.filter((n) => n._id !== id),
          },
        }
      })
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: NOTIFICATIONS_KEY,
          exact: false,
        })
      }, 1200)
    },
  })

  return {
    notifications,
    unreadCount,
    pagination,

    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,

    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    deleteNotification: deleteNotification.mutate,

    isMarkingAll: markAllAsRead.isPending,
    isDeleting: deleteNotification.isPending,
  }
}
