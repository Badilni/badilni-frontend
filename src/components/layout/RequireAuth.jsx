import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { Outlet } from 'react-router-dom'
import Spinner from '../common/Spinner'

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />
  }

  return <Outlet />
}
