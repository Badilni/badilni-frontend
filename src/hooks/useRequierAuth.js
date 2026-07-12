import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'


export function useRequireAuth() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (action) => {
    if (!user) {
      navigate('/signIn')
      return
    }
    action?.()
  }
}