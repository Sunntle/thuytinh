import React from "react";
import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";

const Layout = ({ children }) => {
  return (
    <>
        <Header/>
      {children}
      <Navbar />
    </>
  );
};

export default Layout;
