import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

const LayoutContainer = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Navbar />
            <Footer />
        </>
    );
};

export default LayoutContainer;
