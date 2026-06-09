import { createHashRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'
import Login from '../components/auth/login/Login'
import Signup from '../pages/Signup'
import VerificationPassword from '../pages/verify&ResetPass/verifyPassword'
import ForgetPassPage from '../pages/verify&ResetPass/forgetPass'
import ResetPassword from '../pages/verify&ResetPass/ResetPassword'

const RequireAuth = () => {
  const user = localStorage.getItem('user')
  if (!user) return <Navigate to="/signIn" replace />
  return <Outlet />
}

const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/test',
    element: <ShowcasePage />,
  },
  {
    path: '/signIn',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <Signup />,
  },
  {
    path: '/forgetPass',
    element: <ForgetPassPage />,
  },
  {
    path: '/verifyCode',
    element: <VerificationPassword />,
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />,
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
])

export default router
