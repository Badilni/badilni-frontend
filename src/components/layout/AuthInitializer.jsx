import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { setNavigate } from '../../api/axios'

export default function AuthInitializer() {
  const checkAuth = useAuthStore((s) => s.checkAuth)
  const navigate = useNavigate()
  const didRun = useRef(false)

  useEffect(() => {
    setNavigate(navigate)
  }, [navigate])

  useEffect(() => {
    // StrictMode Guard: prevents double-execution in development
    if (didRun.current) return
    didRun.current = true

    checkAuth()
  }, [checkAuth])

  return null
}
