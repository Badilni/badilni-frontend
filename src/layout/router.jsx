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
import OtherProfile from '../pages/profile/OtherProfile'
import SearchPage from '../pages/Search'
import ContactPage from '../pages/contactUs/contact'
import AboutPage from '../pages/about/about'
import ExplorePage from '../pages/timeline/Explore'
import Requests from '../pages/timeline/Requests'
import VerifyEmail from '../components/auth/signup/VerifyEmail'
import RequestPage from '../pages/timeLine/RequestPage'
import Offers from '../pages/timeLine/Offers'
import OfferPage from '../pages/timeLine/OfferPage'

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
          { path: 'contact', element: <ContactPage /> },
          { path: 'about', element: <AboutPage /> },
          {
            element: <RequireAuth />,
            children: [
              { path: 'profile', element: <ProfilePage /> },
              { path: 'profile/edit', element: <EditProfilePage /> },
              { path: 'profile/:userId', element: <OtherProfile /> },
              { path: 'chat', element: <div>chat</div> },
              { path: 'chat/:conversationId', element: <div>chat</div> },
              { path: 'explore', element: <ExplorePage /> },
              { path: 'requests', element: <Requests /> },
              { path: 'requests/:requestId', element: <RequestPage /> },
              { path: 'offers', element: <Offers /> },
              { path: 'offers/:offerId', element: <OfferPage /> },
              { path: 'settings', element: <EditProfilePage /> },
              { path: 'search', element: <SearchPage /> },
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
