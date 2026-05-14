import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default MainLayout;
