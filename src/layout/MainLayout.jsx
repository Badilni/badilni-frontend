import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Spinner from '../components/common/Spinner'
import { useSocketNotifications } from '../hooks/useSocketNotifications'
import api, { setAccessToken, getAccessToken, navigateTo } from '../api/axios'

const MainLayout = () => {
  useSocketNotifications()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    const silentRefresh = async () => {
      if (getAccessToken()) {
        setIsAuthChecking(false)
        return
      }

      try {
        const response = await api.post('/auth/refresh')
        const newAccessToken = response.data.accessToken
        setAccessToken(newAccessToken)
      } catch (error) {
        console.error("Failed to restore session:", error)
        navigateTo('/signIn')
      } finally {
        setIsAuthChecking(false)
      }
    }

    silentRefresh()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 0)
    const t = setTimeout(() => setLoading(false), 3000) 
    return () => clearTimeout(t)
  }, [location.pathname])

  const isChatRoute = location.pathname.startsWith('/chat')

  if (isAuthChecking) {
    return (
      <div className="flex w-full flex-col items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center">
      {loading ? (
        <div className="w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <NavBar />
          <Outlet />
          {!isChatRoute && <Footer />}
        </>
      )}
    </div>
  )
}

export default MainLayout