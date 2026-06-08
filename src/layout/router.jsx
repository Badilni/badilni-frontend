import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'
import Login from '../components/login/Login'
import VerificationPassword from '../pages/verify&ResetPass/verifyPassword'
import ForgetPassPage from '../pages/verify&ResetPass/forgetPass'
import ResetPassword from '../pages/verify&ResetPass/ResetPassword'

const RequireAuth = () => {
  const user = localStorage.getItem('user')
  if (!user) return 'anything' // <SignIn/>;
  return <Outlet />
}

const router = createBrowserRouter(
  [
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
      path:'/forgetPass/VerificationCode',
      element:<VerificationPassword />
    },
    {
      path:'/forgetPass',
      element:<ForgetPassPage />
    },
    {
      path:'/ResetPassword',
      element:<ResetPassword />
    }
  ],
  {
    basename: '/badilni-frontend',
  }
)

export default router
