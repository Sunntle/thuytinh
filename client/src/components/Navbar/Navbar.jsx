import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineRoomService } from "react-icons/md";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import NavbarDesktop from "./NavbarDesktop.jsx";

const regex = /^\/ban-\d+$/;
const Navbar = () => {
  const location = useLocation();
  const headerRef = useRef();
  const { sendRequest, isLoading } = useHttp();
  const [categories, setCategories] = useState(null);
  const customerName = useSelector((state) => state.customerName);
  const checkRoute = useMemo(() => {
    return location.pathname == "/" || location.pathname == "/home";
  }, [location.pathname]);

  const idTable = useMemo(() => customerName.tables[0], [customerName.tables]);

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
    let checkActiveClassName;
    if (regex.test(location.pathname))
      return (checkActiveClassName = navbarRoute[2]);
    if (location.pathname == "/" || location.pathname == "/home")
      return (checkActiveClassName = navbarRoute[0]);
    else {
      checkActiveClassName = navbarRoute.find(
        (item) =>
          location.pathname.includes(item.originRouteName) ||
          location.state?.from.includes(item.originRouteName),
      );
      return checkActiveClassName;
    }
  }, [location.pathname, location.state?.from, navbarRoute]);

  useLayoutEffect(() => {
    const headerTop = headerRef.current;
    const handleScroll = () => {
      if (checkRoute) {
        const { scrollY } = window;
        if (scrollY > 500) {
          headerTop.classList.replace("bg-transparent", "bg-primary");
          headerTop.classList.replace("text-white", "text-white");
        } else {
          headerTop.classList.replace("bg-primary", "bg-transparent");
          headerTop.classList.replace("text-white", "text-white");
        }
      }
    };
    const handleResize = async() => {
      if (window.screen.width > 1024 && categories == null) {
        if (isLoading) return;
        await sendRequest({ url: "/category", method: "get" }, setCategories);
      }
    };
    handleResize()
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [categories, checkRoute, isLoading, sendRequest]);
  return (
    <div>
      <div className="fixed tracking-wide px-6 lg:hidden z-40 bg-white bottom-0 w-full h-16 lg:px-16 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-400 overflow-hidden">
        {navbarRoute &&
          navbarRoute.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              className={
                item.id === activeClassname?.id
                  ? "flex items-center px-3 py-2 text-primary rounded-full bg-primary/20 shadow transition-all duration-300"
                  : "flex items-center transition-all duration-300"
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
      <NavbarDesktop
        headerRef={headerRef}
        checkRoute={checkRoute}
        categories={categories}
        idTable={idTable}
      />
    </div>
  );
};

export default Navbar;
