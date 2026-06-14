import { createHashRouter, Outlet, Navigate } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from '../pages/Home'
import ShowcasePage from '../components/common/test'
import LoginPage from '../pages/Login'
import Signup from '../pages/Signup'
import VerificationPassword from '../pages/verifyResetPass/verifyPassword'
import ForgetPassPage from '../pages/verifyResetPass/forgetPass'
import AdvancedResultsView from '../components/AdvancedSearch/searchResultView'
import AdvancedSearchSystem from '../components/AdvancedSearch/AdvancedSearchSystem'


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
    element: <LoginPage />,
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
    path:'/search',
    element:<AdvancedSearchSystem/>
  },
  {
    path:'/searchResult',
    element:<AdvancedResultsView/>
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
])

export default router
