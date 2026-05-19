import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'

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
      element: <div>Signin</div>,
    },
  ],
  {
    basename: '/badilni-frontend',
  }
)

export default router
