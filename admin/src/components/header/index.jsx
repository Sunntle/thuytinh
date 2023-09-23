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
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../socket";
import NotificationsComponent from "../notification";
import { NAV_ITEMS } from "../../utils/constant";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { callLogout } from "../../services/api";
function HeaderComponent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const items = [
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

      <div className="hidden sm:block flex-1 text-center">
        <SearchComponent
          className="bg-secondaryColor w-full max-w-2xl"
          textColor={true}
          size="large"
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
