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

// Example protected pages — replace with your real ones

/**
 * RootLayout
 *
 * Wraps the entire app. AuthInitializer sits here so it runs once on mount,
 * regardless of which route the user lands on — including deep links and
 * hard refreshes on protected pages.
 *
 * createHashRouter does not use a top-level <BrowserRouter>, but it still
 * provides a router context, so useNavigate / useLocation work fine inside
 * AuthInitializer and RequireAuth.
 */
const RootLayout = () => (
  <>
    <AuthInitializer />
    <Outlet />
  </>
)

const router = createHashRouter([
  {
    // RootLayout wraps everything — AuthInitializer fires once here.
    element: <RootLayout />,
    children: [
      // ── Public routes with MainLayout (NavBar + Footer + route spinner) ──
      {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <Home /> }],
      },

      // ── Auth pages (no MainLayout — they have their own full-page design) ──
      { path: '/signIn', element: <LoginPage /> },
      { path: '/signUp', element: <Signup /> },
      { path: '/forgetPass', element: <ForgetPassPage /> },
      { path: '/verifyCode', element: <VerificationPassword /> },

      // ── Protected routes ──────────────────────────────────────────────────
      // RequireAuth handles three states:
      //   isLoading = true  → spinner (waiting for GET /auth/me)
      //   isAuthenticated   → render the child route
      //   !isAuthenticated  → redirect to /signIn
      {
        element: <RequireAuth />,
        children: [
          {
            children: [
              { path: 'profile', element: <div>profile</div> },
              { path: 'chat', element: <div>chat</div> },
              { path: 'settings', element: <div>settings</div> },
            ],
          },
        ],
      },

      // ── Misc ──────────────────────────────────────────────────────────────
      { path: '/test', element: <ShowcasePage /> },
      { path: '*', element: <h1>Not Found</h1> },
    ],
  },
])

export default router
