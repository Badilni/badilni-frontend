import { createHashRouter, Outlet, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../pages/Home";

const RequireAuth = () => {
  const user = localStorage.getItem("user");
  if (!user) return "anything"; // <SignIn/>;
  return <Outlet />;
};

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <div>Signin</div>,
  },
]);
export default router;
