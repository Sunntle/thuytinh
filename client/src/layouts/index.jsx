import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import {  useEffect } from "react";
import SelectTable from "../pages/SelectTable/index.jsx";
import {  getPreciseDistance } from 'geolib';
import { useDispatch, useSelector } from "react-redux";
import { initTable } from "../redux/CustomerName/customerNameSlice.js";
const Layout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const customerName = useSelector(state => state.customerName)
    useEffect(()=>{
        dispatch(initTable({tables: [location.pathname.split("/")[1].split("-")[1]], name: "", timestamp: new Date().valueOf()}))
    },[])
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
            {customerName.isLoading == false ? <Outlet/> : <SelectTable/>}
            </div>
            <Navbar />
            <Footer />
        </>
    );
};

export default Layout;
