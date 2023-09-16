import SearchComponent from "../search";
import ButtonComponents from "../button";
import {
  DownOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getItem } from "../../utils/format";
import { BiCategory } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { socket } from "../../socket";
import NotificationsComponent from "../notification";

function HeaderComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.account);
  const items = [
    {
      label: "Thoát",
      key: "1",
      icon: <LogoutOutlined />,
    },
  ];
  const itemsMenu = [
    getItem("Tổng quan", null, <BiCategory />, [
      getItem("Dashboard", "/"),
      getItem("Thực đơn món ăn", "/menu"),
      getItem("Bill ", "/order"),
      getItem("Đánh giá", "/rate"),
    ]),
    getItem("Nhà hàng", null),
  ];
  const handleMenuClick = (e) => {
    console.log("click", e);
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  useEffect(() => {
    socket.emit("new user", { userName: "Taile", role: "R4" });
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
  }, []);
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

      <div className="hidden sm:block">
        <SearchComponent
          className="bg-secondaryColor w-full min-w-[20rem]"
          textColor={true}
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
            content={user?.user.name}
            onClick={() => setIcon(!icon)}
          />
        </Dropdown>
      </div>
      <Drawer
        title={
          <div>
            <SearchComponent maxWidth={"max-w-md"} />
          </div>
        }
        placement="left"
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
          items={itemsMenu}
          style={{ border: "none" }}
          onClick={(e) => navigate(e.key)}
        />
      </Drawer>
    </div>
  );
}

export default HeaderComponent;
