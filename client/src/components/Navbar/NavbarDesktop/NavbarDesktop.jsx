import {
  useCallback,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import OrderListDesktop from "./OrderListDesktop/OrderListDesktop.jsx";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineChevronRight } from "react-icons/hi2";
import PropTypes from "prop-types";
import "./index.css";
import logo from "../../../assets/images/logo.svg";
import logo3 from "../../../assets/images/logo3.svg";
import { message } from "antd";
const NavbarDesktop = ({
  headerRef,
  checkRoute,
  categories,
  idTable,
  navbarList,
}) => {
  const { order: orders } = useSelector((state) => state.order);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isOrderDesktop, setIsOrderDesktop] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleMenuMouseEnter = useCallback(() => {
    setIsMenuHovered(true);
  }, []);

  const handleMenuMouseLeave = useCallback(() => {
    setIsMenuHovered(false);
  }, []);
  const location = useLocation();
  const [logoPath, setLogoPath] = useState(logo);
  const checkHome = useMemo(() => {
    return location.pathname == "/" || location.pathname == "/home";
  }, [location.pathname]);

  useEffect(() => {
    setLogoPath(checkHome ? logo : logo3);
  }, [checkHome]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (checkHome) {
        const { scrollY } = window;
        if (scrollY > 500) {
          setLogoPath(logo3);
        } else {
          setLogoPath(logo);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkHome]);
  const handleDetailOrder = () => {
    if (!idTable) {
      messageApi.info("Bạn phải chọn bàn để xem mục này!");
      return;
    }
    setIsOrderDesktop(true);
  };
  return (
    <div
      ref={headerRef}
      className={`tracking-wide hidden ease-in-out duration-200 lg:flex lg:justify-between lg:items-center lg:fixed z-30 ${checkRoute ? "bg-transparent text-white" : "bg-primary text-white"
        } top-0 w-full h-20 px-16 py-2 drop-shadow-md`}
    >
      {contextHolder}
      <div className="w-20 h-20">
        <img src={logoPath} alt="logo" />
      </div>
      <nav className="lg:flex lg:space-x-6">
        {navbarList?.map((navItem, index) => {
          if (navItem.id == 3) {
            return (
              <div
                key={index}
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
                className={`box-border relative cursor-pointer flex items-center transition-colors duration-200 p-2 rounded navbar`}
              >
                <NavLink to={navItem.route} className="font-normal text-base">
                  {navItem.routeName}
                </NavLink>
                {categories?.length > 0 && (
                  <HiOutlineChevronRight
                    size={20}
                    className={`transition-transform ml-1 duration-200 ${isMenuHovered ? "rotate-90" : "rotate-0"
                      }`}
                  />
                )}
                <AnimatePresence>
                  {isMenuHovered && categories?.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, x: "-10px" }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: "-100px" }}
                      transition={{ duration: 0.1, ease: "linear" }}
                      className="z-40 absolute w-40 top-12 left-0 space-y-2 bg-white border rounded border-gray-200 py-2 px-3 transition-all duration-300"
                    >
                      {categories?.map((category, index) => (
                        <li key={index}>
                          <Link
                            to={`?category=${category.id}`}
                            className="relative block w-full hover:text-primary hover:translate-x-4 drop-shadow text-slate-800 whitespace-nowrap transition-all duration-200"
                          >
                            Món {category.name_category}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <NavLink
              key={index}
              to={navItem.route}
              className="box-border font-normal text-base transition-colors duration-300 p-2 navbar rounded"
            >
              {navItem.routeName}
            </NavLink>
          );
        })}
      </nav>
      <div className="flex justify-between items-center space-x-3">
        <div className="cursor-pointer flex items-center space-x-2 relative"></div>
        <div className="cursor-pointer flex items-center space-x-2">
          <FiUser
            size={24}
            className="hover:text-white/60 transition-colors duration-300"
          />
        </div>
        <div
          onClick={handleDetailOrder}
          className="group cursor-pointer flex justify-between items-center border-2 border-white rounded-full space-x-2 py-2 px-4 transition-colors duration-300 hover:text-primary hover:bg-white"
        >
          <span className="font-medium">Món đã chọn</span>
          {/*<HiOutlineClipboardList size={24} className="group-hover:text-primary text-white transition-colors duration-300" />*/}
          <div className="p-3 w-5 h-5 text-sm font-medium bg-white text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {orders?.length || 0}
          </div>
        </div>
        {idTable && (
          <OrderListDesktop
            isOrderDesktop={isOrderDesktop}
            setIsOrderDesktop={setIsOrderDesktop}
          />
        )}
      </div>
    </div>
  );
};

NavbarDesktop.propTypes = {
  headerRef: PropTypes.object,
  checkRoute: PropTypes.bool,
  idTable: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  categories: PropTypes.array,
  navbarList: PropTypes.array,
};

export default NavbarDesktop;
