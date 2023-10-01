import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdRoomService } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { PiShoppingCartLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState } from "react";

const Navbar = () => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const handleMenuMouseEnter = () => {
    setIsMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);
  };

  return (
    <div>
      <div className="fixed lg:hidden z-30 bg-white bottom-0 w-full h-20 lg:px-16 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-500">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-white p-2 transition-all duration-300 bg-gradient-to-br from-[#DC0000] to-[#FFDB89] rounded-tr-2xl rounded-bl-2xl"
              : "flex flex-col items-center transition-all duration-300"
          }
        >
          <AiOutlineShop className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Trang chủ</span>
        </NavLink>
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-white p-2 transition-all duration-300 bg-gradient-to-br from-[#DC0000] to-[#FFDB89] rounded-tr-2xl rounded-bl-2xl"
              : "flex flex-col items-center transition-all duration-300"
          }
        >
          <MdRoomService className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Dịch vụ</span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-white p-2 transition-all duration-300 bg-gradient-to-br from-[#DC0000] to-[#FFDB89] rounded-tr-2xl rounded-bl-2xl"
              : "flex flex-col items-center transition-all duration-300"
          }
        >
          <MdOutlineRestaurantMenu className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Thực đơn</span>
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center text-white p-2 transition-all duration-300 bg-gradient-to-br from-[#DC0000] to-[#FFDB89] rounded-tr-2xl rounded-bl-2xl"
              : "flex flex-col items-center transition-all duration-300"
          }
        >
          <HiOutlineClipboardList className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Món đã đặt</span>
        </NavLink>
        <div className="flex flex-col items-center">
          <CiUser className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Tài khoản</span>
        </div>
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
