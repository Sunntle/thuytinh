import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import {  useMemo } from "react";
import SelectTable from "../pages/SelectTable/index.jsx";

const Layout = () => {
    //1.1 get ban` -> emit backend get accesstoken(thong tin ban`) -> store accesstoken in redux 
    //1.2 ban` kh co' -> chon. ban`
    //2 nhap ten xong moi duoc di tiep-> store ten cua khach hang duoi redux
    const location = useLocation();
    //get token from backend, set current table
    const token = localStorage.getItem("tableToken")
    const handleGetCurrent = useMemo(()=>{
        //send to backend token -> decode -> return ban + ten
        //store ban+ten -> redux
        return {tableId: 1, name: "abc"}
    },[])
    const initalIdTable = token ? handleGetCurrent()?.tableId : location.pathname.split("/")[1].split("-")[1]
    const name = token ?  handleGetCurrent()?.name : ""
    return (
        <>
            <Header/>
            {initalIdTable ? <Outlet context={name}/> : <SelectTable/>}
            <Navbar />
            <Footer />
        </>
    );
};

export default Layout;
