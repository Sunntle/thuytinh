import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdRoomService } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <div className="fixed lg:hidden z-30 bg-white bottom-0 w-full h-20 px-6 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-between items-center text-slate-500">
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
          <FiUser className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-xs font-medium">Tài khoản</span>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex lg:justify-between lg:items-center lg:fixed z-30 bg-white top-0 w-full h-20 px-6 py-2 drop-shadow-md">
        <div className="text-2xl font-bold">LOGO</div>
        <div className="w-44 space-y-3 h-auto bg-white p-2 border rounded-lg flex flex-col drop-shadow-md z-30">
          <NavLink
            to="/"
            className="font-medium text-base hover:text-primary transition-colors "
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/service"
            className="font-medium text-base hover:text-primary transition-colors "
          >
            Dịch vụ
          </NavLink>
          <NavLink
            to="/menu"
            className="font-medium text-base hover:text-primary transition-colors "
          >
            Thực đơn
          </NavLink>
        </div>
        <div className="flex justify-between items-center space-x-3">
          <HiOutlineClipboardList className="w-8 h-8" />
          <FiUser className="w-8 h-8" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
