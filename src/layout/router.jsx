import { createHashRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import AuthInitializer from '../components/layout/AuthInitializer'
import RequireAuth from '../components/layout/RequireAuth'

import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'
import LoginPage from '../pages/Login'
import Signup from '../pages/Signup'
import VerificationPassword from '../pages/verifyResetPass/verifyPassword'
import ForgetPassPage from '../pages/verifyResetPass/forgetPass'
import ProfilePage from '../pages/profile/profile'
import EditProfilePage from '../pages/profile/EditProfile'
import SearchPage from '../pages/Search'
import ExplorePage from '../pages/Explore'
import RequestsPage from '../pages/Requests'

const RootLayout = () => (
  <>
    <AuthInitializer />
    <Outlet />
  </>
)

const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'explore', element: <ExplorePage /> },
          { path: 'requests', element: <RequestsPage /> },
          {
            element: <RequireAuth />,
            children: [
              {
                path: 'profile',
                element: <ProfilePage />,
              },
              { path: 'profile/edit', element: <EditProfilePage /> },
              { path: 'chat', element: <div>chat</div> },
              { path: 'settings', element: <EditProfilePage /> },
              { path: 'search', element: <SearchPage /> }, // Renders the dedicated page now
            ],
          },
        ],
      },
      { path: '/signIn', element: <LoginPage /> },
      { path: '/signUp', element: <Signup /> },
      { path: '/forgetPass', element: <ForgetPassPage /> },
      { path: '/verifyCode', element: <VerificationPassword /> },
      { path: '/test', element: <ShowcasePage /> },
      { path: '*', element: <h1>Not Found</h1> },
    ],
  },
])

export default router