import { createHashRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'
import Login from '../components/login/Login'
import Signup from '../pages/Signup'

const RequireAuth = () => {
  const user = localStorage.getItem('user')
  if (!user) return 'anything' // <SignIn/>;
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
    path: '*',
    element: <h1>Not Found</h1>,
  },
])
export default router
