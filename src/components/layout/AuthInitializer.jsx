import { useEffect, useRef } from 'react'
import useAuthStore from '../../store/authStore'

export default function AuthInitializer() {
  const checkAuth = useAuthStore((s) => s.checkAuth)
  const didRun = useRef(false)

  useEffect(() => {
    // StrictMode Guard: prevents double-execution in development
    if (didRun.current) return
    didRun.current = true

    checkAuth()
  }, [checkAuth])

  return null
}
