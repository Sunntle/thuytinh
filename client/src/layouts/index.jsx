import React from "react";
import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import CallStaff from "../components/CallStaff.jsx";

const Layout = ({ children }) => {
    return (
        <>
            <Header/>
            {children}
            {/*<CallStaff />*/}
            <Navbar />
        </>
    );
};

export default Layout;
