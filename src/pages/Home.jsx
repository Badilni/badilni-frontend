import { useState } from 'react'
import FirstSection from '../components/home/FirstSection'
import SecondSection from '../components/home/SecondSection'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import useLocalStorageState from '../hooks/useLocalStorageState'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser, removeUser] = useLocalStorageState('user', null)

  const handleLogin = () => navigate('/SignIn')
  const handleTest = () => navigate('/test')
  const handleSignOut = () => {
    removeUser()
    // redirect to home to refresh UI
    navigate('/')
  }

  return (
    <div className="min-h-screen w-full">
      <header className="w-full flex justify-end p-4">
        {!user ? (
          <div className="flex gap-2">
            <Button variant="primary" size="lg" onClick={handleLogin}>
              Sign In
            </Button>
            <Button variant="primary" size="lg" onClick={handleTest}>
              Test Page
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
              Welcome, {user.name || user.email}
            </div>
            <Button variant="outline" size="md" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </header>

      <main>
        <SecondSection />
      </main>
    </div>
  )
}

export default Home
