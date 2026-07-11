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
import ExplorePage from '../pages/Explore'
import Requests from '../pages/timeLine/Requests'
import RequestPage from '../pages/timeLine/RequestPage'
import Offers from '../pages/timeLine/Offers'
import OfferPage from '../pages/timeLine/OfferPage'
import ResetEmailPage from '../pages/profile/ResetEmail'
import VerifyChangedEmailPage from '../pages/profile/VerfiyEmail'
import NotFoundPage from '../pages/NotFound/notFound'
import ChatBadilni from '../pages/Chat/chat'
import NotificationsPageWrapper from '../pages/Notifications/notifications'
import BookingPage from '../pages/Booking/BookingPage'
import BookingPageDetail from '../pages/Booking/BookingPageDetail'
import Matcher from '../pages/matcher/Matcher'
import { MatchPage } from '../pages/matcher/MatchPage'

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
          { path: 'requests', element: <Requests /> },
          { path: 'requests/:requestId', element: <RequestPage /> },
          { path: 'offers', element: <Offers /> },
          { path: 'offers/:offerId', element: <OfferPage /> },
          { path: 'explore', element: <ExplorePage /> },
          { path: 'search', element: <SearchPage /> },
          { path: 'profile', element: <ProfilePage /> },
          {
            element: <RequireAuth />,
            children: [
              { path: 'profile/edit', element: <EditProfilePage /> },
              { path: 'chat', element: <ChatBadilni /> },
              { path: 'notifications', element: <NotificationsPageWrapper /> },
              { path: 'booking', element: <BookingPage /> },
              { path: 'bookings/:bookingId', element: <BookingPageDetail /> },
              { path: 'profile/:userId', element: <OtherProfile /> },
              { path: 'matches', element: <Matcher /> },
              { path: 'matches/:matchId', element: <MatchPage /> },
              { path: 'settings', element: <EditProfilePage /> },
            ],
          },
        ],
      },
      { path: '/signIn', element: <LoginPage /> },
      { path: '/signUp', element: <Signup /> },
      { path: '/forgetPass', element: <ForgetPassPage /> },
      { path: '/verifyCode', element: <VerificationPassword /> },
      { path: '/test', element: <ShowcasePage /> },
      { path: 'resetemail', element: <ResetEmailPage /> },
      { path: '/verify-changed-email', element: <VerifyChangedEmailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
