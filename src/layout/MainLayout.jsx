import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from '../components/layout/NavBar'
import Footer from '../components/layout/Footer'
import Spinner from '../components/common/Spinner'

const MainLayout = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show spinner on initial load and on every route change
    setTimeout(() => {
      setLoading(true)
    }, 0)
    const t = setTimeout(() => setLoading(false), 3000) // Lowered from 6000ms
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
