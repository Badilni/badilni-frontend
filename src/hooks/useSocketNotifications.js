import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import { getAccessToken } from '../api/axios'
import useAuthStore from '../store/authStore'
import { NOTIFICATIONS_KEY } from './useNotifications'

const SOCKET_URL = 'http://localhost:3000'

export function useSocketNotifications() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const queryClient = useQueryClient()
  const socketRef = useRef(null)

  useEffect(() => {
    // 1. Clean up any previous socket connection
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }

    if (!user || !isAuthenticated) return

    let active = true
    let delayTimeout = null

    // 2. We try to connect. If token is not ready yet, we schedule a retry.
    function tryConnect() {
      if (!active) return

      const token = getAccessToken()
      if (token) {
        console.log('[Socket] Token is ready! Connecting to socket server...')

        const socket = io(SOCKET_URL, {
          auth: { token },
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 5000,
        })

        socketRef.current = socket

        socket.on('connect', () => {
          console.log(
            '[Socket] ✅ Connected, real-time events active. ID:',
            socket.id
          )
        })

        socket.on('connect_error', (err) => {
          console.warn('[Socket]  Connection error:', err.message)
        })

        socket.on('notification:new', (payload) => {
          console.log('[Socket] 🔔 notification:new payload received:', payload)

          // Instantly update ALL cache permutations in queryClient
          const cache = queryClient.getQueryCache()
          const queries = cache.findAll({
            queryKey: NOTIFICATIONS_KEY,
            exact: false,
          })

          queries.forEach((q) => {
            queryClient.setQueryData(q.queryKey, (old) => {
              if (!old?.data?.notifications) return old
              if (old.data.notifications.some((n) => n._id === payload._id))
                return old

              return {
                ...old,
                unreadCount: (old.unreadCount ?? 0) + 1,
                data: {
                  ...old.data,
                  notifications: [payload, ...old.data.notifications],
                },
              }
            })
          })

          // Invalidate to fetch fresh stats
          queryClient.invalidateQueries({
            queryKey: NOTIFICATIONS_KEY,
            exact: false,
          })
        })
      } else {
        // Token not ready yet (checkAuth is still setting up the memory state).
        // Retry in 1.5 seconds. This runs dynamically until token is retrieved.
        console.log(
          '[Socket] Token not ready in memory yet, scheduling retry in 1.5s...'
        )
        delayTimeout = setTimeout(tryConnect, 1500)
      }
    }

    tryConnect()

    return () => {
      active = false
      if (delayTimeout) clearTimeout(delayTimeout)
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [user, isAuthenticated, queryClient]) // Reactive: runs as soon as auth resolves or user logs in

  return socketRef
}
