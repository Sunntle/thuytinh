import SearchComponent from "../search";
import ButtonComponents from "../button";
import {
  DownOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../socket";
import NotificationsComponent from "../notification";
import { NAV_ITEMS } from "../../utils/constant";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { callLogout, getAllProduct } from "../../services/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { truncateString } from "../../utils/format";
function HeaderComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const items = [
    {
      label: <span className="font-semibold">{user?.user.name}</span>,
      key: "3",
    },
    {
      label: "Thông tin",
      key: "1",
      icon: <FileSearchOutlined />,
    },
    {
      label: "Thoát",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const dataProducts = await getAllProduct({
        _sort: "sold",
        _order: "DESC",
        _limit: 8,
      });
      setData(dataProducts);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    socket.emit("new user", {
      userName: user?.user.name,
      role: user?.user.role,
    });
    socket.on("new message", (arg) => {
      setNotifications((prev) => {
        const arr = [...prev];
        if (Array.isArray(arg)) {
          arr.unshift(...arg);
        } else {
          arr.unshift(arg);
        }
        return arr;
      });
    });
  }, [user?.user.name, user?.user.role]);
  const customContent = () => {
    return (
      <div className="bg-white rounded-lg px-5 py-3 shadow-md">
        <h4 className="text-gray-500 mb-3">Tìm kiếm gần đây</h4>
        <div className="my-5">
          <Link className="border rounded-full border-gray-300 border-solid py-2 px-3 transition-all duration-500 text-gray-500 hover:text-main hover:border-secondaryColor me-2">
            Đồ nướng
          </Link>
          <Link className="border rounded-full border-gray-300 border-solid py-2 px-3 transition-all duration-500 text-gray-500 hover:text-main hover:border-secondaryColor me-2">
            Đồ xào
          </Link>
        </div>
        <h4 className="text-gray-500 my-3">Món ăn phổ biến</h4>
        <div>
          <Swiper
            speed={1000}
            slidesPerView={4}
            spaceBetween={20}
            className="mySwiper"
          >
            {data.data?.map((product, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="p-2 border border-solid rounded-md border-gray-300 hover:border-borderSecondaryColor transition duration-300 text-center">
                    <img
                      className="w-full mb-3"
                      src={product.imageUrls?.split(";")[0]}
                      alt=""
                    />
                    <h6 className="font-semibold">{product.name_product}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  };
  const handleMenuClick = async (e) => {
    if (e.key == 2) {
      dispatch(doLogoutAction());
      await callLogout();
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="flex items-center justify-between px-11 bg-main py-5 w-full">
      <div className="flex items-center justify-between">
        <div>
          <img src="Logo" className="max-w-md object-cover" alt="" />
          Logo here
        </div>
        <div className="block sm:hidden">
          <Button type="primary" onClick={() => setOpen(true)}>
            <MenuUnfoldOutlined />
          </Button>
        </div>
      </div>

      <div className="hidden sm:block flex-1 text-center">
        <SearchComponent
          className="bg-secondaryColor w-full max-w-2xl"
          textColor={true}
          size="large"
          customContent={customContent}
        />
      </div>
      <div className="flex items-center justify-center gap-x-1">
        <NotificationsComponent
          notifications={notifications}
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          setNotifications={setNotifications}
        />
        <Dropdown menu={menuProps} trigger={["click"]}>
          <ButtonComponents
            sizeIconBefore={"text-lg"}
            sizeIconAfter={"text-xs"}
            spacingContent={"ms-1 me-3"}
            className="border-borderSecondaryColor bg-secondaryColor text-white ms-3"
            iconBefore={<UserOutlined />}
            iconAfter={icon ? <DownOutlined /> : <RightOutlined />}
            content={truncateString(user?.user.name, 7)}
            onClick={() => setIcon(!icon)}
          />
        </Dropdown>
      </div>
      <Drawer
        title={
          <div>
            <SearchComponent />
          </div>
        }
        placement="left"
        className="main_area"
        headerStyle={{ border: "none" }}
        bodyStyle={{ padding: 0 }}
        closable={true}
        onClose={() => setOpen(false)}
        open={open}
        key="left"
        width={300}
      >
        <Menu
          defaultSelectedKeys={pathname}
          theme="light"
          mode="inline"
          items={NAV_ITEMS}
          style={{ border: "none" }}
          onClick={(e) => navigate(e.key)}
        />
      </Drawer>
    </div>
  );
}

export default HeaderComponent;
