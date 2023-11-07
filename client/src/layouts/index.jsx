import Navbar from "../components/Navbar/Navbar.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../services/socket.js";
const Layout = () => {
  useEffect(()=>{
    socket.on("status order", arg=>{
      console.log(arg);
    })
    return ()=>{
      socket.off("status order")
    }
  },[])
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
