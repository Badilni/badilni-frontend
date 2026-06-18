import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { motion } from "motion/react";
import 'react-toastify/dist/ReactToastify.css'
import router from './layout/router'

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
)

export default App
