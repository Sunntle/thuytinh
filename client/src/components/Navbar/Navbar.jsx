import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineRoomService } from "react-icons/md";
import { useSelector } from "react-redux";
import { fetchCategories } from "../../services/api.js";
import useHttp from "../../hooks/useHttp.js";
import { Drawer } from "antd";
import "./index.css";

const navbarRoute = [
  {
    id: 1,
    route: "/home",
    icon: <AiOutlineShop className="w-6 h-6" />,
    routeName: "Trang chủ",
  },
  {
    id: 2,
    route: "/ban-1/service",
    icon: <MdOutlineRoomService className="w-6 h-6" />,
    routeName: "Dịch vụ",
  },
  {
    id: 3,
    route: "/ban-1/menu",
    icon: <IoRestaurantOutline className="w-6 h-6" />,
    routeName: "Thực đơn",
  },
  {
    id: 4,
    route: "/ban-1/order",
    icon: <HiOutlineClipboardList className="w-6 h-6" />,
    routeName: "Món đã đặt",
  },
  {
    id: 5,
    route: "/ban-1/account",
    icon: <FiUser className="w-6 h-6" />,
    routeName: "Tài khoản",
  },
];

const Navbar = () => {
  // const idTable = location.pathname.split("/")[1].split("-")[1];
  const { tables: idTable } = useSelector((state) => state.customerName);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [categories, setCategories] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      sendRequest(fetchCategories(), setCategories);
    }
  }, [sendRequest, isLargeScreen]);

  // useEffect(() => {
  //   const compareRegex = regexRouter.test(location.pathname);
  //   if (!compareRegex) {
  //     navigate("/");
  //   }
  // }, []);

  const handleMenuMouseEnter = () => {
    setIsMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);
  };

  return (
    <div>
      <div className="fixed px-6 lg:hidden z-40 bg-white bottom-0 w-full h-16 lg:px-16 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-400 overflow-hidden">
        {navbarRoute &&
          navbarRoute.map((item) => (
            <NavLink
              key={item.id}
              to={item.route.replace("1", idTable)}
              className={({ isActive }) =>
                isActive
                  ? "relative flex items-center px-3 py-2 text-primary rounded-full bg-primary bg-opacity-20 shadow transition-all duration-400"
                  : "flex items-center transition-all duration-400"
              }
            >
              {item.icon}
            </NavLink>
          ))}
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex lg:justify-between lg:items-center lg:fixed z-30 bg-white top-0 w-full h-20 px-16 py-2 drop-shadow-md">
        <div className="text-2xl font-bold">LOGO</div>
        <nav className="lg:flex lg:space-x-6">
          <NavLink
            to="/"
            className="font-normal text-base hover:text-primary transition-colors duration-300"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/service"
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
              className={`flex items-center transition-c$olors duration-300 ${
                isMenuHovered ? "text-primary" : "text-current"
              }`}
            >
              <NavLink to="/menu" className="font-normal text-base mr-1">
                Thực đơn
              </NavLink>
              <BsChevronDown
                className={`transform transition-transform duration-300 ${
                  isMenuHovered ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isMenuHovered && (
              <ul className="z-10 absolute space-y-2 bg-white border rounded border-gray-200 py-2 px-3 transition-all duration-300">
                {categories &&
                  categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`?category=${category.id}`}
                        className="hover:text-primary whitespace-nowrap"
                      >
                        Món {category?.name_category}
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
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full p-2 pr-8 pl-2 border border-gray-100 rounded-md outline-none transition-all duration-300"
              />
              <div className="absolute top-0 right-0 flex items-center justify-center h-full w-10">
                <GoSearch className="w-4 h-4 text-gray-400 hover:text-primary transition-colors duration-300" />
              </div>
            </div>
          </div>
          <div className="cursor-pointer flex items-center space-x-2">
            <CiUser className="w-6 h-6 hover:text-primary transition-colors duration-300" />
          </div>
          <div
            onClick={() => setIsOpenOrder(true)}
            className="cursor-pointer flex items-center space-x-2"
          >
            <PiShoppingCartLight className="w-6 h-6 hover:text-primary transition-colors duration-300" />
          </div>
          <Drawer
            closable={false}
            open={isOpenOrder}
            onClose={() => setIsOpenOrder(false)}
            title={"Món đã đặt"}
            placement={"right"}
            size={"large"}
          ></Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
