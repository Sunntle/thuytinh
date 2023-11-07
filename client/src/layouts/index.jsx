import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <Header />
      <div className="main-layout min-h-screen">
        <Outlet />
      </div>
      <Navbar />
      <Footer />
    </>
  );
};

export default Layout;
