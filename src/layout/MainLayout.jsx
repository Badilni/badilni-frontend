import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Spinner from '../components/common/Spinner'
import { useSocketNotifications } from '../hooks/useSocketNotifications'

const MainLayout = () => {
  useSocketNotifications()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 0)
    const t = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(t)
  }, [location.pathname])

  const isChatRoute = location.pathname.startsWith('/chat')

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