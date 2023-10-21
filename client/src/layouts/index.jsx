import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import {  useEffect } from "react";
import {  getPreciseDistance } from 'geolib';

const Layout = () => {
    
    //test
    useEffect(()=>{
        const position1 = {
          latitude: 10.779984,
          longitude: 106.675157,
        };
        navigator.geolocation.getCurrentPosition((position) => {
            const position2 = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
        const distance = getPreciseDistance(position1, position2);
        console.log(distance)
        });
    },[])
    
    return (
        <>
            <Header/>
            <div className="main-layout">
            <Outlet/>
            </div>
            <Navbar />
            <Footer />
        </>
    );
};

export default Layout;
