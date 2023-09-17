import React, { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdRoomService } from "react-icons/md";
import { HiOutlineClipboardList, HiSearch } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { BiFlag } from "react-icons/bi";
import { Dropdown, Menu } from "antd";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  const { SubMenu } = Menu;

  const LanguageMenu = (
    <Menu>
      <Menu.Item key="1">Tiếng Việt</Menu.Item>
      <Menu.Item key="2">English</Menu.Item>
    </Menu>
  );

  const [showInput, setShowInput] = useState(false);

  const showSearchInput = (show) => {
    setShowInput(show);
  };

  return (
    <>
      <div className="fixed lg:hidden z-30 bg-white bottom-0 w-full h-20 px-6 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-500">
        <NavLink
          to="/"
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
          <FiUser className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Tài khoản</span>
        </div>
      </div>
      <div className="lg:flex lg:justify-between lg:items-center lg:fixed z-30 bg-white top-0 w-full h-20 px-6 py-2 drop-shadow-md">
        <div className="text-2xl font-bold">LOGO</div>
        <nav className="hidden lg:flex lg:space-x-6">
          <NavLink
            to="/"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/service"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Dịch vụ
          </NavLink>
          <NavLink
            to="/menu"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Thực đơn
          </NavLink>
          <NavLink
            to="/contact"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Liên hệ
          </NavLink>
          <NavLink
            to="/signup"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Đăng ký
          </NavLink>
          <NavLink
            to="/login"
            className="font-medium text-base hover:text-primary transition-colors"
          >
            Đăng nhập
          </NavLink>
        </nav>
        <div className="flex justify-between items-center space-x-3">
          <div
            className="cursor-pointer flex items-center space-x-2 relative"
            onMouseEnter={() => {
              showSearchInput(true);
            }}
            onMouseLeave={() => {
              showSearchInput(false);
            }}
          >
            <HiSearch className="w-4 h-4 text-primary hover:text-primary-dark transition-colors" />
            <div
              className={`absolute top-0 right-0 mt-4 w-52 ${
                showInput ? "" : "hidden"
              }`}
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full p-2 border border-gray-200 rounded-md outline-none"
              />
            </div>
          </div>
          <div className="cursor-pointer flex items-center space-x-2">
            <FiUser className="w-4 h-4 text-primary hover:text-primary-dark transition-colors" />
          </div>
          <Dropdown overlay={LanguageMenu}>
            <div className="flex items-center space-x-2 cursor-pointer">
              <BiFlag className="w-4 h-4 text-primary hover:text-primary-dark transition-colors" />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Navbar;
