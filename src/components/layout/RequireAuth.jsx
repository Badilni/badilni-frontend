import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { Outlet } from 'react-router-dom'

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />
  }

  return <Outlet />
}
