import { AiOutlineShop } from "react-icons/ai";

import { HiOutlineClipboardList, HiSearch } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiFlag } from "react-icons/bi";
import { Dropdown, Menu } from "antd";

import { MdOutlineRestaurantMenu, MdRoomService } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router-dom";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineRoomService } from "react-icons/md";
import { regexRouter } from "../../utils/regex.js";

const navbarRoute = [
  {
    id: 1,
    route: "/ban-1/home",
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
  const location = useLocation();
  const navigate = useNavigate();
  const idTable = location.pathname.split("/")[1].split("-")[1];

  useEffect(() => {
    const compareRegex = regexRouter.test(location.pathname)
    if(!compareRegex) {
      navigate('/')
    }
  }, []);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

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
                  ? "flex items-center px-3 py-2 text-primary rounded-full bg-primary bg-opacity-20 shadow transition-all duration-400"
                  : "flex items-center transition-all duration-400"
              }
            >
              {item.icon}
              <span
                className={`text-sm font-medium ${
                  location.pathname !== item.route ? "hidden ml-0" : "flex ml-1"
                }`}
              >
                {item.routeName}
              </span>
            </NavLink>
          ))}
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex lg:justify-between lg:items-center lg:fixed z-30 bg-white top-0 w-full h-20 px-16 py-2 drop-shadow-md">
        <div className="text-2xl font-bold">LOGO</div>
        <nav className="lg:flex lg:space-x-6">
          <NavLink
            to="/"
            className="font-medium text-base hover:text-primary transition-colors duration-300"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/service"
            className="font-medium text-base hover:text-primary transition-colors duration-300"
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
              <NavLink to="/menu" className="font-medium text-base">
                Thực đơn
              </NavLink>
              <div
                className={`ml-1 mt-1 transform transition-transform duration-300 ${
                  isMenuHovered ? "rotate-180" : "rotate-0"
                }`}
              >
                {isMenuHovered ? <BsChevronUp /> : <BsChevronDown />}
              </div>
            </div>
            {isMenuHovered && (
              <ul className="z-10 absolute space-y-2 bg-white border border-gray-200 py-2 px-3 transition-all duration-300">
                <li>
                  <NavLink
                    to="/menu/category1"
                    className="hover:text-primary whitespace-nowrap"
                  >
                    Món Lẩu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/menu/category2"
                    className="hover:text-primary whitespace-nowrap"
                  >
                    Món Nướng
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/menu/category3"
                    className="hover:text-primary whitespace-nowrap"
                  >
                    Món Hấp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/menu/category4"
                    className="hover:text-primary whitespace-nowrap"
                  >
                    Món Tráng Miệng
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <NavLink
            to="/contact"
            className="font-medium text-base hover:text-primary transition-colors duration-300"
          >
            Liên hệ
          </NavLink>
          <NavLink
            to="/about-us"
            className="font-medium text-base hover:text-primary transition-colors duration-300"
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
          <div className="cursor-pointer flex items-center space-x-2">
            <PiShoppingCartLight className="w-6 h-6 hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
