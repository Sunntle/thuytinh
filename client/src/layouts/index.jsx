import Navbar from "../pages/Navbar/Navbar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SelectTable from "../pages/SelectTable/index.jsx";

const Layout = () => {
    //1.1 get ban` -> emit backend get accesstoken(thongtin ban`) -> store accesstoken in redux 
    //1.2 ban` kh co' -> chon. ban`
    //2 nhap ten xong moi duoc di tiep-> store ten cua khach hang duoi redux
    const location = useLocation();
    const idTable = location.pathname.split("/")[1].split("-")[1];
    const [table, setTable] = useState(idTable)
    return (
        <>
            <Header/>
            {table ? <Outlet /> : <SelectTable/>}
            <Navbar />
            <Footer />
        </>
    );
};

export default Layout;
