import FirstSection from '../components/home/FirstSection'
import SecondSection from '../components/home/SecondSection'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const Home = () => {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogin = () => navigate('/SignIn')
  const handleTest = () => navigate('/test')

  const handleSignOut = async () => {
    await logout(navigate)
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
            <img
              src={user.avatar?.url}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>{user.name?.toUpperCase() || 'User'}</div>

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
