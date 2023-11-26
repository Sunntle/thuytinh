import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={`${props.children ? "main-layout" : ""} min-h-screen`}>{props.children ? props.children : <Outlet/>}</div>
      <Footer />
    </>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
};
export default Layout;
