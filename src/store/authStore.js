import { create } from 'zustand'
import { getMe } from '../services/authentication/me'
import { logoutRequest } from '../api/authApi'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  clearUser: () => set({ user: null, isAuthenticated: false }),

  setLoading: (value) => set({ isLoading: value }),

  checkAuth: async () => {
    set({ isLoading: true })
    try {
      // getMe returns null on 401 (not logged in) without throwing.
      // It only throws on unexpected errors (500, network failure, etc.).
      // This means checkAuth is always safe to call on startup — it will
      // never accidentally trigger the refresh flow.
      const userData = await getMe()
      const user = userData?.data?.user ?? userData?.user ?? userData
      set({ user, isAuthenticated: !!user, isLoading: false })
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async (navigate) => {
    try {
      await logoutRequest()
    } catch {
      // Even if the server call fails, clear local state.
    } finally {
      set({ user: null, isAuthenticated: false })
      navigate?.('/signIn', { replace: true })
    }
  },
}))

// React to session-expired events from the axios interceptor.
// Using a DOM event avoids a circular import between axios.js and authStore.js.
window.addEventListener('auth:sessionExpired', () => {
  useAuthStore.getState().clearUser()
})

export default useAuthStore
