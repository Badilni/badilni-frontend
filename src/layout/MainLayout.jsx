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
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className="flex flex-col items-center">
      <NavBar />

      {loading ? (
        <div className="w-full">
          <Spinner />
        </div>
      ) : (
        <Outlet />
      )}

      <Footer />
    </div>
  )
}

export default MainLayout
