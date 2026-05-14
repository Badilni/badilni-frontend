import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
