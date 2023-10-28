import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineRoomService } from "react-icons/md";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import {Drawer} from "antd";
import OrderListDesktop from "./OrderListDesktop/OrderListDesktop.jsx";
const Navbar = () => {
  const location = useLocation();
  const headerRef = useRef();
  const { sendRequest } = useHttp();
  const [categories, setCategories] = useState(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isOrderDesktop, setIsOrderDesktop] = useState(false)
  const customerName = useSelector((state) => state.customerName);
  console.log(location);
  const checkRoute = useMemo(() => {
    return location.pathname == "/" || location.pathname == "/home";
  }, [location.pathname]);

  const idTable = useMemo(() => customerName.tables, [customerName.tables]);

  const navbarRoute = useMemo(() => {
    return [
      {
        id: 1,
        route: `/home`,
        icon: <AiOutlineShop className="w-6 h-6" />,
        routeName: "Trang chủ",
        originRouteName: "home",
      },
      {
        id: 2,
        route: `/ban-${idTable}/service`,
        icon: <MdOutlineRoomService className="w-6 h-6" />,
        routeName: "Dịch vụ",
        originRouteName: "service",
      },
      {
        id: 3,
        route: `/ban-${idTable}/menu`,
        icon: <IoRestaurantOutline className="w-6 h-6" />,
        routeName: "Thực đơn",
        originRouteName: "menu",
      },
      {
        id: 4,
        route: `/ban-${idTable}/order`,
        icon: <HiOutlineClipboardList className="w-6 h-6" />,
        routeName: "Món đã đặt",
        originRouteName: "order",
      },
      {
        id: 5,
        route: `/ban-${idTable}/account`,
        icon: <FiUser className="w-6 h-6" />,
        routeName: "Tài khoản",
        originRouteName: "account",
      },
    ];
  }, [idTable]);

  const activeClassname = useMemo(() => {
    const checkActiveClassName = navbarRoute.find(
      (item) =>
        location.pathname.includes(item.originRouteName) ||
        location.state?.from.includes(item.originRouteName)
    );
    return checkActiveClassName;
  }, [location.pathname, location.state?.from, navbarRoute]);

  useLayoutEffect(() => {
    const headerTop = headerRef.current;
    const handleScroll = () => {
      if (checkRoute) {
        const { scrollY } = window;
        if (scrollY > 500) {
          headerTop.classList.replace("bg-transparent", "bg-white");
          headerTop.classList.replace("text-white", "text-black");
        } else {
          headerTop.classList.replace("bg-white", "bg-transparent");
          headerTop.classList.replace("text-black", "text-white");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [checkRoute]);

  useEffect(() => {
    sendRequest({ url: "/category", method: "get" }, setCategories);
  }, [sendRequest]);
  const handleMenuMouseEnter = useCallback(() => {
    setIsMenuHovered(true);
  },[]);

  const handleMenuMouseLeave = useCallback(() => {
    setIsMenuHovered(false);
  },[]);

  return (
    <div>
      <div className="fixed px-6 lg:hidden z-40 bg-white bottom-0 w-full h-16 lg:px-16 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-400 overflow-hidden">
        {navbarRoute &&
          navbarRoute.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              className={
                item.id === activeClassname?.id
                  ? "flex items-center px-3 py-2 text-primary rounded-full bg-primary bg-opacity-20 shadow transition-all duration-400"
                  : "flex items-center transition-all duration-400"
              }
            >
              {item.icon}
              <span
                className={`text-sm font-medium ${
                  item.id !== activeClassname?.id ? "hidden ml-0" : "flex ml-1"
                }`}
              >
                {item.routeName}
              </span>
            </NavLink>
          ))}
      </div>
      {/* Desktop */}
      <div
        ref={headerRef}
        className={`hidden  ease-in-out duration-200 lg:flex lg:justify-between  lg:items-center lg:fixed z-30 ${
          checkRoute ? "bg-transparent text-white" : "bg-white text-dark"
        } top-0 w-full h-20 px-16 py-2 drop-shadow-md`}
      >
        <div className="text-2xl font-bold ">LOGO</div>
        <nav className="lg:flex lg:space-x-6">
          <NavLink
            to="/home"
            className="font-normal text-base hover:text-primary transition-colors duration-300"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={`/ban-${idTable}/service`}
            className="font-normal text-base hover:text-primary transition-colors duration-300"
          >
            Dịch vụ
          </NavLink>
          <div
            className={`relative ${isMenuHovered ? "hovered" : ""}`}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <div
              className={`flex items-center transition-colors duration-300 ${
                isMenuHovered ? "text-primary" : "text-current"
              }`}
            >
              <NavLink to="/menu" className="font-normal text-base">
                Thực đơn
              </NavLink>
              {categories?.length > 0 && <div
                className={`ml-1 mt-1 transform transition-transform duration-300 ${
                  isMenuHovered ? "rotate-180" : "rotate-0"
                }`}
              >
                {isMenuHovered ? <BsChevronUp /> : <BsChevronDown />}
              </div>}
            </div>
            {isMenuHovered && categories?.length > 0 && (
              <ul className="z-10 absolute space-y-2 bg-white border rounded border-gray-200 py-2 px-3 transition-all duration-300">
                {categories?.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`?category=${category.id}`}
                      className="hover:text-primary text-black whitespace-nowrap"
                    >
                      Món {category.name_category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <NavLink
            to="/contact"
            className="font-normal text-base hover:text-primary transition-colors duration-300"
          >
            Liên hệ
          </NavLink>
          <NavLink
            to="/about-us"
            className="font-normal text-base hover:text-primary transition-colors duration-300"
          >
            Về chúng tôi
          </NavLink>
        </nav>
        <div className="flex justify-between items-center space-x-3">
          <div className="cursor-pointer flex items-center space-x-2 relative">
          </div>
          <div className="cursor-pointer flex items-center space-x-2">
            <CiUser className="w-6 h-6 hover:text-primary transition-colors duration-300" />
          </div>
          <div onClick={() => setIsOrderDesktop(true)} className="cursor-pointer flex items-center space-x-2">
            <PiShoppingCartLight className="w-6 h-6 hover:text-primary transition-colors duration-300" />
          </div>
          <OrderListDesktop isOrderDesktop={isOrderDesktop} setIsOrderDesktop={setIsOrderDesktop} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
