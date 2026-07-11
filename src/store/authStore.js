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
    } finally {
      set({ user: null, isAuthenticated: false })
      navigate?.('/', { replace: true })
    }
  },
}))

window.addEventListener('auth:sessionExpired', () => {
  useAuthStore.getState().clearUser()
})

export default useAuthStore
